import React from "react";
import {
  Icon,
  Popover,
  Button,
  InputGroup,
  ControlGroup,
} from "@blueprintjs/core";
import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

class CheckoutForm extends React.Component {
  state = {
    subscribing: false,
    successSubscription: null,
    errorToDisplay: "",
  };

  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    this.setState({ subscribing: true});
    
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // If a previous payment was attempted, get the lastest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      "latestInvoicePaymentIntentStatus"
    );

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[createPaymentMethod error]", error);
      this.setState({
        subscribing: false,
        errorToDisplay: error && error.message,
      });
      //   setSubscribing(false);
      //   setErrorToDisplay(error && error.message);
      return;
    }
    console.log("[PaymentMethod]", paymentMethod);
    const paymentMethodId = paymentMethod.id;
    //check having previous error payment not complete
    if (latestInvoicePaymentIntentStatus === "requires_payment_method") {
      // Update the payment method and retry invoice payment
      const invoiceId = localStorage.getItem("latestInvoiceId");
      this.retryInvoiceWithNewPaymentMethod({
        paymentMethodId: paymentMethodId,
        invoiceId: invoiceId,
      });
      return;
    }

    // Create the subscription
    this.createSubscription({
      paymentMethodId: paymentMethodId,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  createSubscription = ({ paymentMethodId }) => {
    // const priceId = productSelected.name.toUpperCase();
    const {subscribePrimaryPack, subscribeExtraPacks} = this.props;
    let subscriptionItems = [{price: subscribePrimaryPack.packprice.stripe_id, quantity: 1}];
    subscribeExtraPacks.forEach((extraPack) => {
        subscriptionItems.push({price: extraPack.packprice.stripe_id, quantity: Number(extraPack.qty)});
      });

    const postData = {
      transmitCall: "stripePayment",
      customerId: this.props.customerId,
      paymentMethodId: paymentMethodId,
      items: subscriptionItems,
    };

    return (
      axios
        .post(`/core/subscribePassage/`, postData)
        .then((response) => {
          return response;
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer
            throw result;
          }
          return result;
        })
        // Normalize the result to contain the object returned
        // by Stripe. Add the addional details we need.
        .then((result) => {
          return {
            // Use the Stripe 'object' property on the
            // returned result to understand what object is returned.
            subscription: result.data,
            paymentMethodId: paymentMethodId,
            // priceId: productSelected.name,
            items: postData.items,
          };
        })
        // .then(handlePaymentThatRequiresCustomerAction)
        .then(this.handleRequiresPaymentMethod)
        // No more actions required. Provision your service for the user.
        .then(this.onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          this.setState({
            subscribing: false,
            errorToDisplay: error.message || error.error.decline_code,
          });
          //setSubscribing(false);
          //setErrorToDisplay(error.message || error.error.decline_code);
          console.log(error.message);
        })
    );
  };

  onSubscriptionComplete = (result) => {
    console.log(result);
    // Payment was successful. Provision access to your service.
    // Remove invoice from localstorage because payment is now complete.
    // clearCache();
    if (result && !result.subscription) {
      const subscription = { id: result.invoice.subscription };
      result.subscription = subscription;
      localStorage.clear();
    }

    // setAccountInformation(result);
    this.setState({ subscribing: false, successSubscription: result});

    // setTimeout(()=>{ this.props.onStripePaymentComplete(result.subscription) }, 2*1000);
    this.props.onStripePaymentComplete(result.subscription)

    // Change your UI to show a success message to your customer.
    // onSubscriptionSampleDemoComplete(result);
    // Call your backend to grant access to your service based on
    // the product your customer subscribed to.
    // Get the product by using result.subscription.price.product
  };

  // Some payment methods require a customer to do additional
  // authentication with their financial institution.
  // Eg: 2FA for cards.
  handlePaymentThatRequiresCustomerAction = ({
    subscription,
    invoice,
    items,
    paymentMethodId,
    isRetry,
  }) => {
    if (subscription && (subscription.status === "active" || subscription.status === "trialing") ) {
      // subscription is active, no customer actions required.
      return { subscription, items, paymentMethodId };
    }
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    const paymentIntent = invoice
      ? invoice.payment_intent
      : subscription.latest_invoice.payment_intent;

    if (
      paymentIntent.status === "requires_action" ||
      (isRetry === true && paymentIntent.status === "requires_payment_method")
    ) {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // start code flow to handle updating the payment details
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            throw result;
          } else {
            if (result.paymentIntent.status === "succeeded") {
              // There's a risk of the customer closing the window before callback
              // execution. To handle this case, set up a webhook endpoint and
              // listen to invoice.payment_succeeded. This webhook endpoint
              // returns an Invoice.
              return {
                items: items,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        });
    } else {
      // No customer action needed
      return { subscription, items, paymentMethodId };
    }
  };

  // If attaching this card to a Customer object succeeds,
  // but attempts to charge the customer fail. You will
  // get a requires_payment_method error.
  handleRequiresPaymentMethod = ({ subscription, paymentMethodId, items }) => {
    // console.log("handleRequiresPaymentMethod:", subscription);
    if (subscription.status === "active" || subscription.status === "trialing") {
      // subscription is active, no customer actions required.
      return { subscription, paymentMethodId, items};
    } else if (
      subscription.latest_invoice.payment_intent.status ===
      "requires_payment_method"
    ) {
      // Using localStorage to store the state of the retry here
      // (feel free to replace with what you prefer)
      // Store the latest invoice ID and status
      localStorage.setItem("latestInvoiceId", subscription.latest_invoice.id);
      localStorage.setItem(
        "latestInvoicePaymentIntentStatus",
        subscription.latest_invoice.payment_intent.status
      );
      throw new Error("Your card was declined.");
    } else {
      return { subscription, paymentMethodId, items };
    }
  };

  retryInvoiceWithNewPaymentMethod = ({ paymentMethodId, invoiceId }) => {
    // const priceId = productSelected.name.toUpperCase();
    // const items = [
    //   { price: "price_1HFUztIB6hqvVBOalOLyG1YB", quantity: 1 },
    //   { price: "price_1HFVcLIB6hqvVBOane8UIMQK", quantity: 2 },
    // ];

    return (
      axios
        .post("/core/subscribePassage/", {
          transmitCall: "stripeRetryPayment",
          customerId: this.props.customerId,
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId,
        })
        .then((response) => {
          return response.json();
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer.
            throw result;
          }
          return result;
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the addional details we need.
        .then((result) => {
          return {
            // Use the Stripe 'object' property on the
            // returned result to understand what object is returned.
            invoice: result,
            paymentMethodId: paymentMethodId,
            // items: items,
            isRetry: true,
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(this.handlePaymentThatRequiresCustomerAction)
        // No more actions required. Provision your service for the user.
        .then(this.onSubscriptionComplete)
        .catch((error) => {
          console.log(error);
          // An error has happened. Display the failure to the user here.
          this.setState({
            subscribing: false,
            errorToDisplay: error && error.error && error.error.decline_code,
          });
          //   setSubscribing(false);
          //   setErrorToDisplay(error && error.error && error.error.decline_code);
        })
    );
  };

  render() {
    const {
      stripe,
      subscribePrimaryPack,
      subscribeExtraPacks,
      payAmount,
    } = this.props;
    let extraPacks = [];
    subscribeExtraPacks.forEach((extraPack) => {
      extraPacks.push(`${extraPack.licpack.name} x ${extraPack.qty}`);
    });

    return (

     <div id="checkout-form" className="checkout-form">
        <div className="checkout-body">
          <div className="checkout-txtline" style={{marginBottom: "40px"}}>
            <h4 className="bp3-heading">Enter your card details </h4>
            <blockquote  className="bp3-blockquote">
              <p>Your subscription will start now.</p>
              <p>Total amount now <span style={{fontWeight: "bold"}}>{`(${subscribePrimaryPack.packprice.currency}) ${payAmount}`}</span></p>
            </blockquote >
          </div>
          
          {/* <div className="subscribing-items">
            <div > → Subscribing to services</div>
            <div>{`Primary Service Package: ${subscribePrimaryPack.name}`}</div>
            {extraPacks.length ? (
            <div>{`Extra Service Package: ${extraPacks.join(", ")}`}</div>
            ) : (
            <></>
            )}
          </div> */}

          <div className="checkout-card">
            <div className="card-name-input">
              {/* <div className=""> */}
                <label className="bp3-label">
                  Full name
                </label>
                <input
                  className="bp3-input"
                  id="name"
                  type="text"
                  placeholder="First and last name"
                  required
                />
              {/* </div> */}
            </div>
            <form id="payment-form" onSubmit={this.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3 mb-0">
                  <label className="bp3-label">
                    Card
                  </label>
                  <div
                    // className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-md py-3 px-2 leading-tight focus:outline-none focus:bg-white"
                    id="card-element"
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#32325d',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                            '::placeholder': {
                              color: '#a0aec0',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="bp3-running-text" role="alert" style={{color: "red"}}>
                    {this.state.errorToDisplay ? this.state.errorToDisplay : null}
                  </div>
                </div>
              </div>
              <Button
                id="submit-Subscribe"
                intent="primary"
                large={true}
                type="submit" 
                disabled={!stripe}
                text={this.state.subscribing ? 'Subscribing...' : 'Subscribe'}
              />
                {/* <div className=""> */}
                  {/* <div>{this.state.subscribing ? 'Subscribing...' : 'Subscribe'}</div> */}
                {/* </div> */}
              {/* </Button> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
