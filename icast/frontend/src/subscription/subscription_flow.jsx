import React, { Component, Fragment } from "react";
import {
  Popover,
  Button,
  InputGroup,
  ControlGroup,
  HTMLSelect,
  Position,
  Dialog,
  ProgressBar,
} from "@blueprintjs/core";
import {
  Segment,
  Grid,
  Container,
  Header,
  Icon,
  Breadcrumb,
  Divider,
  Table,
  Message,
  Label,
  Form,
} from "semantic-ui-react";

import axios from "axios";
import $ from "jquery";
import Apphelper from "../apphelper";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout_form";
import "../css/stripe.scss";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
if (!process.env.STRIPE_PUBLISHABLE_KEY) {
  console.error("**Stripe publishable key environment variable not set**");
  console.error(
    "**Add an environemnt variable REACT_APP_STRIPE_PUBLISHABLE_KEY**"
  );
  console.error("**Replace .env.example with .env and **");
}

class SubscriptionFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "Stripe",
      icastUrl: `http${process.env.HTTPS == "True" ? "s" : ""}://${
        process.env.ICAST_APP_SERVER
      }`,
      periodOption: [],
      currencyOption: [],
      activeTabId: "subscribeDesc",
      flowStep: 0,
      subscribeSteps: [
        "subscribeDesc",
        "subscribePack",
        "accountRegister",
        "confirmPayments",
        "paymentProcessing",
        "subscribeCompleted",
      ],
      licPacks: {
        primaryPackages: [],
        extraPacks: [],
      },
      //subscribe input data
      subscribeDesc_data: {
        descTxt:
          "Subscribe is defined as to support or promise to contribute, or to register to pay for something.",
      },
      //subscribe State
      subscribePrimaryPack: null, //{licpack: {} , packprice: {}}
      subscribeExtraPacks: [], //[{licpack: {} , packprice: {},  qty: 1},],
      subscribePeriod: "Yearly",
      subscribeCurrency: "USD",
      //accountRegister
      orgName: "",
      orgAdmin: "",
      orgEmail: "",
      firstName: "",
      lastName: "",
      // orgName: "testOrg",
      // orgAdmin: "testAdmin",
      // orgEmail: "wickylee@isignage.com.hk",
      // firstName: "test",
      // lastName: "test",
      adminInvalid: false,
      onSubmitting: false,
      //--
      subscribeConfirm: false,
      stripeCheckoutForm: false,
      orgId: null,
      stripe_cus_id: null,
      //subscribe submit return
      progressbarValue: 0.1,
      // subscribeResult: null,
      subscribeResult: {"org":{"id":112,"name":"testOrg","admin":"testAdmin","email":"wickylee@isignage.com.hk","first_name":"test","last_name":"test","licrecords":[{"id":987,"licprop":{"id":1,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"User"},"org":112,"status":"valid","period":30,"active_at":"2020-10-16T03:54:00.258615Z","expiry":"2020-11-16T03:53:59.659612Z","create_at":"2020-10-16T03:54:00.258615Z","updated_at":"2020-10-16T03:54:00.258615Z"},{"id":984,"licprop":{"id":2,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Brand"},"org":112,"status":"valid","period":30,"active_at":"2020-10-16T03:54:00.242613Z","expiry":"2020-11-16T03:53:59.659612Z","create_at":"2020-10-16T03:54:00.242613Z","updated_at":"2020-10-16T03:54:00.242613Z"},{"id":985,"licprop":{"id":3,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Display"},"org":112,"status":"valid","period":30,"active_at":"2020-10-16T03:54:00.248610Z","expiry":"2020-11-16T03:53:59.659612Z","create_at":"2020-10-16T03:54:00.248610Z","updated_at":"2020-10-16T03:54:00.248610Z"},{"id":988,"licprop":{"id":3,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Display"},"org":112,"status":"valid","period":30,"active_at":"2020-10-16T03:54:00.261617Z","expiry":"2020-11-16T03:53:59.659612Z","create_at":"2020-10-16T03:54:00.261617Z","updated_at":"2020-10-16T03:54:00.261617Z"},{"id":986,"licprop":{"id":6,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Storage"},"org":112,"status":"valid","period":30,"active_at":"2020-10-16T03:54:00.252636Z","expiry":"2020-11-16T03:53:59.659612Z","create_at":"2020-10-16T03:54:00.252636Z","updated_at":"2020-10-16T03:54:00.252636Z"}]},"subscribe":{"id":69,"status":"trialing","payperiod":"Yearly","availdate":"2020-11-16","fee":"16.00","create_at":"2020-10-16T03:53:59.660664Z","payments":"Stripe","cancel_at":null,"comments":"","org_id":112,"stripe_sub_id":"sub_IDALrgc6Frnw4i","org":{"id":112,"name":"testOrg","admin":"testAdmin","email":"wickylee@isignage.com.hk","token":"IGq2nKEd9f60D7q00kuuTyFC_szy0FUg5MZklWrcXOA","lickey":"mc9f2p-u4OmI8QrVbQkRzt8EV249XZQ9zpn1NCOB33c=","first_name":"test","last_name":"test","stripe_cus_id":"cus_IDAKPnGRZE8U1N"},"subscribelicpacks":[{"id":155,"qty":1,"licpack":{"id":4,"name":"Basic Signage Pack","desc":"Basic Signage Pack","groupid":2,"stripe_prod_id":"prod_Hp9IL6kj0FSa0Z","licpackprops":[{"id":4,"qty":1,"licprop":{"id":2,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Brand"}},{"id":5,"qty":1,"licprop":{"id":3,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Display"}},{"id":6,"qty":1,"licprop":{"id":6,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Storage"}},{"id":7,"qty":1,"licprop":{"id":1,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"User"}}],"packprices":[{"id":5,"period":"Yearly","currency":"HKD","price":"100.00","stripe_id":"price_1HH3vbIB6hqvVBOaXJ4Bpe74","licpack":4},{"id":17,"period":"Yearly","currency":"USD","price":"13.00","stripe_id":"price_1HMU7tIB6hqvVBOaY7doF0EH","licpack":4}]},"packprice":{"id":17,"period":"Yearly","currency":"USD","price":"13.00","stripe_id":"price_1HMU7tIB6hqvVBOaY7doF0EH","licpack":4}},{"id":156,"qty":1,"licpack":{"id":9,"name":"1 Display pack","desc":"1 Display pack","groupid":3,"stripe_prod_id":"prod_HqmS9YTVxF7M22","licpackprops":[{"id":32,"qty":1,"licprop":{"id":3,"application":{"id":1,"appname":"iCast","licprops":[{"id":2,"name":"Brand","application":1},{"id":3,"name":"Display","application":1},{"id":6,"name":"Storage","application":1},{"id":1,"name":"User","application":1}]},"name":"Display"}}],"packprices":[{"id":11,"period":"Yearly","currency":"HKD","price":"20.00","stripe_id":"price_1HH4tjIB6hqvVBOaFin6ZzyF","licpack":9},{"id":20,"period":"Yearly","currency":"USD","price":"3.00","stripe_id":"price_1HMUEZIB6hqvVBOaA9EAL6Iu","licpack":9}]},"packprice":{"id":20,"period":"Yearly","currency":"USD","price":"3.00","stripe_id":"price_1HMUEZIB6hqvVBOaA9EAL6Iu","licpack":9}}],"payrecords":[{"id":77,"payments":"Stripe","status":"valid","payfee":"16.00","transitdate":"2020-10-16T03:54:00.263610Z","invoice":"in_1Hck0wIB6hqvVBOaJfJuA3ce","subscribe":69}]},"iCastApi":{"Organization":"testOrg","notifyEmail":true,"admin":"testAdmin","email":"wickylee@isignage.com.hk","password":"6MIIDZur","licPropGroup":{"iCast:Brand":1,"iCast:Display":2,"iCast:Storage":1,"iCast:User":1},"appHost":"127.0.0.1:8000"}},
      submitError: false,
      errorMsg: [
        "Srroy! Your registration have something problem in processing, please to try later!",
      ],
    };
    this.progressbarAnimaInterval = null;
  }

  componentDidMount() {
    axios
      .post("/core/subscribePassage/", { transmitCall: "licpacks" })
      .then((res) => {
        const licPacksData = res.data;
        let primaryPackGroup = [];
        let extraPackGroup = [];
        licPacksData.forEach((licpack) => {
          if (licpack.groupid == 2) primaryPackGroup.push(licpack);
          else if (licpack.groupid == 3) extraPackGroup.push(licpack);
        });

        const licPacks = {
          primaryPackages: primaryPackGroup,
          extraPacks: extraPackGroup,
        };

        this.setState({ licPacks: licPacks });
      })
      .catch((err) => {
        Apphelper.handelApiFailed(err);
      });

    // get packprice period and currency options data
    axios
      .post("/core/subscribePassage/", { transmitCall: "priceoption" })
      .then((res) => {
        //console.log(res.data);
        let currencyOption = [];
        res.data.currencyOption.forEach((currency) => {
          for (const [key, value] of Object.entries(currency)) {
            // console.log(key, value);
            currencyOption.push({ label: value, value: key });
          }
        });
        this.setState({
          periodOption: res.data.periodOption,
          currencyOption: currencyOption,
        });
      })
      .catch((err) => {
        Apphelper.handelApiFailed(err);
      });
  }

  handleTabChange = (tabId) => {
    console.log(tabId);
    // this.setState({activeTabId: tabId});
  };

  jumpCompleted = () =>{
    this.setState({
      activeTabId: this.state.subscribeSteps[5],
      flowStep: 5,
    });
  }

  goSubscribeStep = (e) => {
    const changeStep = parseInt(e.target.getAttribute("data-gostep"));
    const goFlowStep = this.state.flowStep + changeStep;
    console.log("goFlowStep:", goFlowStep);
    console.log("subscribeSteps:", this.state.subscribeSteps[goFlowStep]);
    this.setState({
      activeTabId: this.state.subscribeSteps[goFlowStep],
      flowStep: goFlowStep,
    });

    if (e.target.id == "doPaying") {
      this.onSubscriptionSubmit();
    }

    // console.log("this.state", this.state);
  };

  checkPeriodDisabled = (primaryPackage, period) => {
    let disabled = true;
    primaryPackage.packprices.forEach((packprice) => {
      if (packprice.period == period) disabled = false;
    });
    return disabled;
  };

  checkCurrencyDisabled = (primaryPackage, currency) => {
    let disabled = true;
    primaryPackage.packprices.forEach((packprice) => {
      if (packprice.currency == currency) disabled = false;
    });
    return disabled;
  };

  onChangeSubscribePeriod = (e) => {
    this.setState({
      subscribePeriod: e.target.value,
    });
    setTimeout(() => this.updateSeletedLicpackPrice(), 200);
  };

  onChangeSubscribeCurrency = (e) => {
    this.setState({
      subscribeCurrency: e.target.value,
    });
    setTimeout(() => this.updateSeletedLicpackPrice(), 200);
  };

  updateSeletedLicpackPrice = () => {
    let subscribePrimaryPack = this.state.subscribePrimaryPack;
    if (subscribePrimaryPack) {
      subscribePrimaryPack.packprice = this.getLicpackPrice(
        "primary",
        subscribePrimaryPack.licpack.id
      );
      this.setState({ subscribePrimaryPack: subscribePrimaryPack });
    }
    let subscribeExtraPacks = this.state.subscribeExtraPacks;
    if (subscribeExtraPacks.length) {
      subscribeExtraPacks.forEach((extraPack, index) => {
        subscribeExtraPacks[index].packprice = this.getLicpackPrice(
          "extra",
          extraPack.licpack.id
        );
      });
      this.setState({ subscribeExtraPacks: subscribeExtraPacks });
    }
  };

  getLicpackPrice = (licpackGroup, licpackId) => {
    let packprice = null;
    if (licpackGroup == "primary") {
      let primaryPackage = this.state.licPacks.primaryPackages.find(
        (licpack) => licpack.id == licpackId
      );
      // console.log("primaryPackage:", primaryPackage)
      packprice = primaryPackage.packprices.find(
        (packprice) =>
          packprice.period == this.state.subscribePeriod &&
          packprice.currency == this.state.subscribeCurrency
      );
    } else {
      let extraPack = this.state.licPacks.extraPacks.find(
        (licpack) => licpack.id == licpackId
      );
      packprice = extraPack.packprices.find(
        (packprice) =>
          packprice.period == this.state.subscribePeriod &&
          packprice.currency == this.state.subscribeCurrency
      );
    }
    // console.log("packprice:", packprice)
    if (typeof packprice == undefined) packprice = null;

    return packprice;
  };

  getLicpackPriceText = (licpackGroup, licpackId) => {
    let priceText = "---";
    const packprice = this.getLicpackPrice(licpackGroup, licpackId);
    if (packprice) priceText = packprice.price;
    return priceText;
  };

  onSelectPrimarypackage = (e) => {
    const primaryPackId = e.target.getAttribute("licpack_id");

    const primaryPack = this.state.licPacks.primaryPackages.find(
      (licpack) => licpack.id == primaryPackId
    );

    let subscribePrimaryPack = {
      licpack: primaryPack,
      packprice: this.getLicpackPrice("primary", primaryPack.id),
    };

    this.setState({ subscribePrimaryPack: subscribePrimaryPack });

    setTimeout(() => this.updateSeletedLicpackPrice(), 200);
  };

  getSelectedExtraPackQty = (licpackid) => {
    let qty = 0;
    const findSelectedExtraPack = this.state.subscribeExtraPacks.find(
      (extrapack) => extrapack.licpack.id == licpackid
    );
    if (findSelectedExtraPack != undefined) qty = findSelectedExtraPack.qty;

    return qty;
  };

  getExtrapackRequestInput = (extraPackId) => {
    let renderOut = <></>;
    const extraPack = this.state.licPacks.extraPacks.find(
      (licpack) => licpack.id == extraPackId
    );
    const extraPackPrice = this.getLicpackPrice("extra", extraPackId);

    if (extraPackPrice) {
      const inputValue = this.getSelectedExtraPackQty(extraPackId);
      renderOut = (
        <>
          <Table.Cell>
            <InputGroup
              type="number"
              extrapack_id={extraPackId}
              value={inputValue}
              min={0}
              max={(extraPack.name == "iFusion")? 1 : 1000 }
              style={{ width: "50px" }}
              disabled={this.state.subscribePrimaryPack ? false : true}
              onChange={this.changeExtraPackQty}
            />
          </Table.Cell>
          <Table.Cell>
            {inputValue != 0 ? (
              <div style={{ fontWeight: "bold" }}>
                {` (${this.state.subscribeCurrency}) `}
                {inputValue * extraPackPrice.price}
              </div>
            ) : (
              <></>
            )}
          </Table.Cell>
        </>
      );
    }
    return renderOut;
  };

  changeExtraPackQty = (e) => {
    const extraPackId = e.target.getAttribute("extrapack_id");
    const licpack = this.state.licPacks.extraPacks.find(
      (licpack) => licpack.id == extraPackId
    );
    const packprice = this.getLicpackPrice("extra", extraPackId);

    let subscribeExtraPacks = this.state.subscribeExtraPacks;
    const findSelectedExtraPack = subscribeExtraPacks.find(
      (selectedExtraPack) => selectedExtraPack.licpack.id == licpack.id
    );
    const inputQty = e.target.value;
    if (inputQty == 0) {
      let removeFilter = subscribeExtraPacks.filter((selectedExtraPack) => {
        return selectedExtraPack.licpack.id != licpack.id;
      });
      subscribeExtraPacks = removeFilter;
    } else {
      if (findSelectedExtraPack != undefined) {
        subscribeExtraPacks.forEach((selectedExtraPack) => {
          if (selectedExtraPack.licpack.id == licpack.id)
            selectedExtraPack.qty = inputQty;
        });
      } else {
        const addSelectedExtraPack = {
          licpack: licpack,
          packprice: packprice,
          qty: inputQty,
        };
        subscribeExtraPacks.push(addSelectedExtraPack);
      }
    }

    this.setState({ subscribeExtraPacks: subscribeExtraPacks });
  };

  getSubscribeLicpropsSummary = () => {
    let licpropSetList = [];

    if (this.state.subscribePrimaryPack) {
      this.state.subscribePrimaryPack.licpack.licpackprops.forEach(
        (licpackprop) => {
          //add to licpropList
          let licpropSetIndex = licpropSetList.findIndex(
            (item) => item.licpropId == licpackprop.licprop.id
          );
          if (licpropSetIndex == -1) {
            //push new licpropSet
            const licpropSet = {
              licpropId: licpackprop.licprop.id,
              licprop: licpackprop.licprop,
              qty: licpackprop.qty,
            };
            licpropSetList.push(licpropSet);
          } else {
            licpropSetList[licpropSetIndex].qty += licpackprop.qty;
          }
        }
      );
    }

    if (this.state.subscribeExtraPacks.length) {
      this.state.subscribeExtraPacks.forEach((extrapack) => {
        const licpack = extrapack.licpack;
        licpack.licpackprops.forEach((licpackprop) => {
          let licpropSetIndex = licpropSetList.findIndex(
            (item) => item.licpropId == licpackprop.licprop.id
          );
          if (licpropSetIndex == -1) {
            //push new licpropSet
            const licpropSet = {
              licpropId: licpackprop.licprop.id,
              licprop: licpackprop.licprop,
              qty: licpackprop.qty * extrapack.qty,
            };
            licpropSetList.push(licpropSet);
          } else {
            licpropSetList[licpropSetIndex].qty +=
              licpackprop.qty * extrapack.qty;
          }
        });
      });
    }

    //console.log("licpropSetList", licpropSetList);
    return licpropSetList;
  };

  getSubscribeSummaryPrice = () => {
    let summaryPrice = 0;
    if (this.state.subscribePrimaryPack) {
      summaryPrice = parseFloat(
        this.state.subscribePrimaryPack.packprice.price
      );

      if (this.state.subscribeExtraPacks.length) {
        this.state.subscribeExtraPacks.forEach((extrapack) => {
          summaryPrice += parseFloat(
            parseFloat(extrapack.packprice.price) * extrapack.qty
          );
        });
      }
    }

    return summaryPrice;
  };
  //end subscribePack
  registrationCheckEnableNext = () => {
    let enableNext = true;
    if (this.state.orgName == "") enableNext = false;
    if (this.state.orgName == "") enableNext = false;
    if (this.state.orgEmail == "") enableNext = false;
    if (this.state.firstName == "") enableNext = false;
    if (this.state.lastName == "") enableNext = false;
    return enableNext;
  };

  onOrgAdminChange = (e) => {
    if (/^[a-zA-Z0-9]+$/.test(e.target.value)) {
      this.setState({ orgAdmin: e.target.value });
    } else if (e.target.value == "") {
      this.setState({ orgAdmin: e.target.value });
    }
  };

  onOrgAdminBlur = (e) => {
    axios
      .post(`${this.state.icastUrl}/api/org/checkorgadmin/`, {
        orgadmin: e.target.value,
      })
      .then((res) => {
        const exsitOrg = res.data;
        if (exsitOrg.length > 0) {
          this.setState({ adminInvalid: true });
          $("#orgAdminInput").focus();
        } else {
          this.setState({ adminInvalid: false });
        }
      })
      .catch((err) => {
        Apphelper.handelApiFailed(err);
      });
  };

  onAdminEmailChange = (e) => {
    this.setState({ orgEmail: e.target.value });
  };

  onAdminEmailBlur = (e) => {
    //validation with data models
    axios
      .post(`${this.state.icastUrl}/api/org/checkorgadminemail/`, {
        adminemail: e.target.value,
      })
      .then((res) => {
        const exsitOrg = res.data;
        if (exsitOrg.length > 0) {
          this.setState({ emailInvalid: true });
          $("#orgEmailInput").focus();
        } else {
          this.setState({ emailInvalid: false });
        }
      })
      .catch((err) => {
        Apphelper.handelApiFailed(err);
      });
  };

  confirmSubscription = (e) => {
    e.preventDefault();
    if (this.state.paymentMethod == "Stripe") {
      let postData = {
        transmitCall: "createOrg",
        orgName: this.state.orgName,
        orgAdmin: this.state.orgAdmin,
        orgEmail: this.state.orgEmail,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      };
      axios
        .post(`/core/subscribePassage/`, postData)
        .then((res) => {
          // console.log(res.data)
          this.setState({
            orgId: res.data.id,
            stripe_cus_id: res.data.stripe_cus_id,
            subscribeConfirm: true,
            stripeCheckoutForm: true,
          });
        })
        .catch((err) => {
          Apphelper.handelApiFailed(err);
        });
    } else {
      console.log("confirmSubscription");
      // this.onSubscriptionSubmit();
    }
  };

  onStripePaymentComplete = (stripeSubscription) => {
    //update licpivot model data
    this.setState({ stripeCheckoutForm: false });
    this.onSubscriptionSubmit(stripeSubscription);
  };

  onSubscriptionSubmit = (stripeSubscription) => {
    if (
      !this.state.adminInvalid &&
      !this.state.emailInvalid &&
      !this.state.onSubmitting
    ) {
      let postData = {
        transmitCall: "processSubscription",
        orgName: this.state.orgName,
        orgAdmin: this.state.orgAdmin,
        orgEmail: this.state.orgEmail,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        //-- subscribe
        primaryPack: this.state.subscribePrimaryPack,
        extraPacks: this.state.subscribeExtraPacks,
        paymentMethod: this.state.paymentMethod,
        subscribeFee: this.getSubscribeSummaryPrice(),
        // stripe subscription data
        orgId: this.state.orgId,
        stripe_sub_id: stripeSubscription.id,
        invoice: stripeSubscription.latest_invoice.id,
      };

      //console.log("postData :", postData);
      const nextflowStep = this.state.flowStep + 1;
      this.setState({
        onSubmitting: true,
        flowStep: nextflowStep,
        activeTabId: this.state.subscribeSteps[nextflowStep],
      });
      this.progressbarAnimaInterval = setInterval(() => {
        this.setState({ progressbarValue: this.state.progressbarValue + 0.1 });
      }, 1000);

      axios
        .post("/core/subscribePassage/", postData)
        .then((res) => {
          console.log("Response:", res.data);
          const goFlowStep = this.state.flowStep + 1;
          this.setState({
            subscribeResult: res.data,
            onSubmitting: false,
            activeTabId: this.state.subscribeSteps[goFlowStep],
            flowStep: goFlowStep,
          });

          clearInterval(this.progressbarAnimaInterval);
        })
        .catch((err) => {
          this.setState({
            onSubmitting: false,
            submitError: true,
          });
          clearInterval(this.progressbarAnimaInterval);
          Apphelper.handelApiFailed(err);
        });
    }
  };

  gotoICastCloud = (e) => {
    e.preventDefault();
    let siteUrl = `http://${this.state.subscribeResult.iCastApi.appHost}/registered`;
    siteUrl += `?username=${this.state.subscribeResult.iCastApi.admin}`;
    siteUrl += `&password=${this.state.subscribeResult.iCastApi.password}`;
    // window.location = siteUrl;
    window.open(siteUrl);
  };

  // listOrgLicenseRecords = () => {
  //   let licrecordGroup = {};
  //   this.state.subscribeResult.org.licrecords.forEach((licrecord) => {
  //     let groupKey = `${licrecord.licprop.application.appname} : ${licrecord.licprop.name}`;
  //     console.log(groupKey);
  //     if (licrecordGroup[groupKey] == undefined) {
  //       licrecordGroup[groupKey] = 1;
  //     } else {
  //       licrecordGroup[groupKey] = licrecordGroup[groupKey] + 1;
  //     }
  //   });

  //   let licPropItems = [];
  //   for (var key in licrecordGroup) {
  //     licPropItems.push({
  //       appPropName: key,
  //       number: licrecordGroup[key],
  //     });
  //   }

  //   let orgLicRecords = (
  //     <>
  //       {licPropItems.map((lic, index) => (
  //         <div className="orglic-info" key={index}>
  //           <div>{lic.appPropName}</div>
  //           <div>{`------ (${lic.number})`} </div>
  //         </div>
  //       ))}
  //     </>
  //   );

  //   return orgLicRecords;
  // };

  render() {
    return (
      <Segment style={{ padding: "4em 0em" }} vertical id="features">
        <Container>
          <Grid.Row style={{ padding: "0em 0em 2em 0em" }}>
            <Header as="h1">iCast signage service subscription</Header>
          </Grid.Row>

          <Breadcrumb>
            <Breadcrumb.Section
              active={this.state.flowStep == 0 ? true : false}
              link={this.state.flowStep == 0 ? false : true}
              style={{ padding: "0em 0em 0.5em 0em" }}
            >
              <Icon name="user circle" />
              Subscription
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              active={this.state.flowStep == 1 ? true : false}
              link={this.state.flowStep == 1 ? false : true}
              style={{ padding: "0em 0em 0.5em 0em" }}
            >
              <Icon name="cloud download" />
              Service
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              active={this.state.flowStep == 2 ? true : false}
              link={this.state.flowStep == 2 ? false : true}
              style={{ padding: "0em 0em 0.5em 0em" }}
            >
              <Icon name="user" />
              Account
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section 
            active={this.state.flowStep == 3 ? true : false}
            link={this.state.flowStep == 3 ? false : true}
            style={{ padding: "0em 0em 0.5em 0em" }}>
              <Icon name="handshake outline" />
              Confirm
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              active={this.state.flowStep == 4 ? true : false}
              link={this.state.flowStep == 4 ? false : true}
              style={{ padding: "0em 0em 0.5em 0em" }}
            >
              <Icon name="hourglass start" />
              Processing
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              active={this.state.flowStep == 5 ? true : false}
              link={this.state.flowStep == 5 ? false : true}
              style={{ padding: "0em 0em 0.5em 0em" }}
            >
              <Icon name="hand peace outline" />
              Completed
            </Breadcrumb.Section>
          </Breadcrumb>


          {this.state.flowStep == 0 ? (
            <Segment textAlign="center" id="subscribeDesc">
              <Header>
                <Icon name="user circle" />
                Subscribe Description
              </Header>
              <Divider />
              <p>
                Subscribe is defined as to support or promise to contribute, or
                to register to pay for something.
              </p>
              <Button
                rightIcon="chevron-right"
                text="Start Subscribe"
                intent="primary"
                large={true}
                data-gostep={1}
                onClick={this.goSubscribeStep}
              ></Button>
            </Segment>
          ) : (
            ""
          )}

          {this.state.flowStep == 1 ? (
            <Segment
              textAlign="center"
              id="subscribePack"
              className="step-form-content"
            >
              <Header>
                <Icon name="cloud download" />
                Service
              </Header>
              <Divider />

              <div className="primarypackage-select">
                {this.state.licPacks.primaryPackages.map(
                  (primaryPackage, ikey) => (
                    <Segment
                      key={ikey}
                      className={
                        this.state.subscribePrimaryPack &&
                        this.state.subscribePrimaryPack.licpack.id ==
                          primaryPackage.id
                          ? "seletec-licpack"
                          : ""
                      }
                    >
                      <Message color="blue" size="large">
                        {primaryPackage.name}
                      </Message>
                      <Table>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell
                              width={12}
                              colSpan="3"
                              textAlign="center"
                            >
                              {primaryPackage.desc}
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {primaryPackage.licpackprops.map(
                            (licpackprop, ikey) => (
                              <Table.Row key={ikey}>
                                <Table.Cell colSpan="2">{`${licpackprop.licprop.application.appname} : ${licpackprop.licprop.name}`}</Table.Cell>
                                <Table.Cell textAlign="right">
                                  {licpackprop.qty}
                                </Table.Cell>
                              </Table.Row>
                            )
                          )}
                          <Table.Row>
                            <Table.Cell colSpan="2">
                              <ControlGroup fill={false} vertical={false}>
                                <HTMLSelect
                                  id={`primarypackage_period_${primaryPackage.id}`}
                                  licpack_id={primaryPackage.id}
                                  onChange={this.onChangeSubscribePeriod}
                                  value={this.state.subscribePeriod}
                                  large={true}
                                >
                                  <option value="Yearly">Yearly</option>
                                  {/* {this.state.periodOption.map(
                                        (period, ikey) => (
                                          <option
                                            key={ikey}
                                            value={period}
                                            disabled={this.checkPeriodDisabled(
                                              primaryPackage,
                                              period
                                            )}
                                          >
                                            {period}
                                          </option>
                                        )
                                      )} */}
                                </HTMLSelect>
                                <Divider />
                                <HTMLSelect
                                  id={`primarypackage_currency_${primaryPackage.id}`}
                                  licpack_id={primaryPackage.id}
                                  onChange={this.onChangeSubscribeCurrency}
                                  value={this.state.subscribeCurrency}
                                  large={true}
                                >
                                  <option value="USD">USD</option>
                                  {/* {this.state.currencyOption.map(
                                        (currency, ikey) => (
                                          <option
                                            key={ikey}
                                            value={currency.value}
                                            disabled={this.checkCurrencyDisabled(
                                              primaryPackage,
                                              currency.value
                                            )}
                                          >
                                            {currency.value}
                                          </option>
                                        )
                                      )} */}
                                </HTMLSelect>
                                <Divider />
                              </ControlGroup>
                            </Table.Cell>
                            <Table.Cell
                              textAlign="right"
                              id={`primarypackage_${primaryPackage.id}`}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                {this.getLicpackPriceText(
                                  "primary",
                                  primaryPackage.id
                                )}
                              </span>
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row textAlign="center">
                            <Table.Cell colSpan="3">
                              <Button
                                large={true}
                                icon="tick"
                                text="Select"
                                intent={
                                  this.state.subscribePrimaryPack &&
                                  this.state.subscribePrimaryPack.licpack.id ==
                                    primaryPackage.id
                                    ? "primary"
                                    : "none"
                                }
                                licpack_id={primaryPackage.id}
                                fill={true}
                                onClick={this.onSelectPrimarypackage}
                                disabled={
                                  this.getLicpackPrice(
                                    "primary",
                                    primaryPackage.id
                                  )
                                    ? false
                                    : true
                                }
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Segment>
                  )
                )}
              </div>

              <Divider hidden />

              <Segment>
                <Message color="blue">Extra Service Package</Message>
                <Table>
                  <Table.Body>
                    {this.state.licPacks.extraPacks.map((extraPack, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>#{extraPack.name}</Table.Cell>
                        <Table.Cell>
                          {extraPack.licpackprops.map((licpackprop, ikey) => (
                            <div key={ikey} className="extrapack-licprops-row">
                              <div>
                                {`${licpackprop.licprop.application.appname} : ${licpackprop.licprop.name} X ${licpackprop.qty}`}
                              </div>
                            </div>
                          ))}
                        </Table.Cell>
                        <Table.Cell>
                          {this.state.subscribePeriod}
                          {" > "}
                          {this.state.subscribeCurrency}
                          {" > "}

                          {this.getLicpackPriceText("extra", extraPack.id)}
                        </Table.Cell>

                        {this.getExtrapackRequestInput(extraPack.id)}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Segment>

              <Divider hidden />

              <Segment>
                <Message color="blue">Subscribe Service Summary</Message>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell colSpan="4">
                        <Label.Group>
                          {this.getSubscribeLicpropsSummary().map(
                            (licpropSet, index) => (
                              <Label key={index}>
                                {`${licpropSet.licprop.application.appname} : ${licpropSet.licprop.name} `}
                                {" X "}
                                {licpropSet.qty}
                              </Label>
                            )
                          )}
                        </Label.Group>
                      </Table.Cell>
                      <Table.Cell
                        textAlign="center"
                        style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                      >
                        {this.state.subscribePeriod}{" "}
                        {` (${this.state.subscribeCurrency}) `}
                        {this.getSubscribeSummaryPrice()}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>

              <Button
                icon="chevron-left"
                text="Back"
                large={true}
                data-gostep={-1}
                onClick={this.goSubscribeStep}
              />
              <Button
                rightIcon="chevron-right"
                text="Next"
                intent="primary"
                large={true}
                data-gostep={1}
                disabled={this.state.subscribePrimaryPack ? false : true}
                onClick={this.goSubscribeStep}
              />
            </Segment>
          ) : (
            ""
          )}

          {this.state.flowStep == 2 ? (
            <Segment id="accountRegister" className="account-register">
              <Header textAlign="center">
                <Icon name="user" />
                Organization Registration
              </Header>
              <Divider />
              <Segment>
                <Message color="blue">Organization Information</Message>
                <Form>
                  <Form.Field>
                    <label>Organization</label>
                    <input
                      // className="bp3-input"
                      type="text"
                      placeholder="Organization Name"
                      required={true}
                      value={this.state.orgName}
                      onChange={(e) =>
                        this.setState({ orgName: e.target.value })
                      }
                      // onBlur={this.registrationCheckEnableNext}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Organization Admin User</label>
                    <Popover
                      content={
                        <div className="invalid-popover">
                          This name have been exist! Please try others.
                        </div>
                      }
                      isOpen={this.state.adminInvalid}
                      position={Position.TOP}
                    >
                      <input
                        id="orgAdminInput"
                        // className="bp3-input"
                        type="text"
                        placeholder="Admin User Name (* Required. 128 characters or fewer. Letters and digits only.)"
                        required={true}
                        value={this.state.orgAdmin}
                        onChange={this.onOrgAdminChange}
                        onBlur={this.onOrgAdminBlur}
                        disabled={this.state.org ? true : false}
                        style={{ width: "100%" }}
                      />
                    </Popover>
                  </Form.Field>

                  <Form.Field>
                    <label>Admin User Email</label>
                    <Popover
                      content={
                        <div className="invalid-popover">
                          This been exist! Please try others.
                        </div>
                      }
                      isOpen={this.state.emailInvalid}
                      position={Position.TOP}
                    >
                      <input
                        id="orgEmailInput"
                        // className="bp3-input"
                        type="email"
                        placeholder="Admin Email (* Please enter a valid email address, as that password will auto generate at your submit.)"
                        required={true}
                        value={this.state.orgEmail}
                        onChange={this.onAdminEmailChange}
                        onBlur={this.onAdminEmailBlur}
                        disabled={this.state.org ? true : false}
                        style={{ width: "100%" }}
                      />
                    </Popover>
                  </Form.Field>

                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>{"Admin Full Name (First name)"}</label>
                      <input
                        // className="bp3-input"
                        type="text"
                        placeholder="First Name"
                        required={true}
                        value={this.state.firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                        disabled={this.state.org ? true : false}
                        // style={{ marginRight: "10px" }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>{"(Last name)"}</label>
                      <input
                        // className="bp3-input"
                        type="text"
                        placeholder="Last Name"
                        required={true}
                        value={this.state.lastName}
                        onChange={(e) =>
                          this.setState({ lastName: e.target.value })
                        }
                        disabled={this.state.org ? true : false}
                      />
                    </Form.Field>

                  </Form.Group>
                </Form>
              </Segment>

              <Divider hidden />

              <Segment>
                <Message color="blue">Subscribe Service Summary</Message>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell colSpan="4">
                        <Label.Group>
                          {this.getSubscribeLicpropsSummary().map(
                            (licpropSet, index) => (
                              <Label key={index}>
                                {`${licpropSet.licprop.application.appname} : ${licpropSet.licprop.name} `}
                                {" X "}
                                {licpropSet.qty}
                              </Label>
                            )
                          )}
                        </Label.Group>
                      </Table.Cell>
                      <Table.Cell
                        textAlign="center"
                        style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                      >
                        {this.state.subscribePeriod}{" "}
                        {` (${this.state.subscribeCurrency}) `}
                        {this.getSubscribeSummaryPrice()}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>

              <Container textAlign="center">
                <Button
                  icon="chevron-left"
                  text="Back"
                  large={true}
                  data-gostep={-1}
                  onClick={this.goSubscribeStep}
                />
                <Button
                  rightIcon="chevron-right"
                  text="Review Subscription"
                  intent="primary"
                  large={true}
                  data-gostep={1}
                  disabled={!this.registrationCheckEnableNext()}
                  onClick={this.goSubscribeStep}
                />

              </Container>
            </Segment>
          ) : (
            ""
          )}

          {this.state.flowStep == 3 ? (
            <Segment textAlign="center" id="confirmPayments">
              <Header>
                <Icon name="handshake outline" />
                Subscribe Confirmation and Payments
              </Header>

              {this.state.stripeCheckoutForm && this.state.stripe_cus_id ? (
                <Dialog
                  isOpen={this.state.stripeCheckoutForm}
                  usePortal={true}
                  canOutsideClickClose={false}
                  // onClose={() =>
                  //   this.setState({ stripeCheckoutForm: false })
                  // }
                  isCloseButtonShown={false}
                  title={
                    <div>
                      {/* <Icon icon="credit-card" iconSize={20} style={{marginRight: "5px"}}></Icon>  */}
                      <span>{"Subscribe Payment"}</span>
                    </div>
                  }
                  style={{
                    width: "60vw",
                    height: "60vh",
                    paddingBottom: "0px",
                  }}
                >
                  <div className="stripe-payment-form">
                    <Elements stripe={stripePromise}>
                      <InjectedCheckoutForm
                        customerId={this.state.stripe_cus_id}
                        subscribePrimaryPack={this.state.subscribePrimaryPack}
                        subscribeExtraPacks={this.state.subscribeExtraPacks}
                        // payAmount="120"
                        payAmount={this.getSubscribeSummaryPrice()}
                        onStripePaymentComplete={this.onStripePaymentComplete}
                      />
                    </Elements>
                  </div>
                </Dialog>
              ) : (
                <></>
              )}

              <Divider />

              <Segment>
                <Message color="blue">
                  Organization Account Registration
                </Message>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="5">Organization</Table.Cell>
                      <Table.Cell>{this.state.orgName}</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="5">Organization Admin</Table.Cell>
                      <Table.Cell>{this.state.orgAdmin}</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="5">Admin Email</Table.Cell>
                      <Table.Cell>{this.state.orgEmail}</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="5">Admin Name</Table.Cell>
                      <Table.Cell>
                        {this.state.firstName} {this.state.lastName}
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>

              <Divider hidden />

              <Segment>
                <Message color="blue">Subscribe Service Package</Message>
                <Table definition singleLine>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="5">Primary Service Package</Table.Cell>
                      <Table.Cell>{`# ${this.state.subscribePrimaryPack.licpack.name}`}</Table.Cell>
                      <Table.Cell>{`(${this.state.subscribeCurrency}) ${this.state.subscribePrimaryPack.packprice.price}`}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell width="5">Extra Service Package</Table.Cell>
                      <Table.Cell>
                        {this.state.subscribeExtraPacks.map(
                          (extrapack, index) => (
                            <div key={index}>
                              {`${extrapack.licpack.name}`} x{" "}
                              {`${extrapack.qty}`}
                            </div>
                          )
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {this.state.subscribeExtraPacks.map(
                          (extrapack, index) => (
                            <div key={index}>
                              {`(${this.state.subscribeCurrency}) ${parseFloat(
                                parseFloat(extrapack.packprice.price) *
                                  extrapack.qty
                              )} `}
                            </div>
                          )
                        )}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell width="5">Subscribe Period</Table.Cell>
                      <Table.Cell>{this.state.subscribePeriod}</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="5">Subscribe Free</Table.Cell>
                      <Table.Cell>{`(${
                        this.state.subscribeCurrency
                      }) ${this.getSubscribeSummaryPrice()}`}</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>

              <Divider hidden />

              <Segment>
                <Message color="blue">Subscribe Service Summary</Message>
                <Table fixed>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        {this.getSubscribeLicpropsSummary().map(
                          (licpropSet, index) => (
                            <Message key={index}>
                              {`${licpropSet.licprop.application.appname} : ${licpropSet.licprop.name} `}
                              {" X "}
                              {licpropSet.qty}
                            </Message>
                          )
                        )}
                      </Table.Cell>
                      <Table.Cell textAlign="center" verticalAlign="middle">
                        <Header size="huge">
                          {` (${this.state.subscribeCurrency}) `}{" "}
                          {this.getSubscribeSummaryPrice()}
                        </Header>
                        <Button
                          icon="confirm"
                          text="Confirm and Pay"
                          large={true}
                          // onClick={this.confirmSubscription}
                          onClick={this.jumpCompleted}
                          intent={
                            this.state.subscribeConfirm ? "warning" : "none"
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>

              <Button
                icon="chevron-left"
                text="Back"
                large={true}
                data-gostep={-1}
                onClick={this.goSubscribeStep}
              />
            </Segment>
          ) : (
            ""
          )}

          {this.state.flowStep == 4 ? (
            <Segment textAlign="center" id="paymentProcessing">
              <Header>
                <Icon name="hourglass start" />
                Processing
              </Header>
              <Divider />
              <div className="progressbar-container">
                <ProgressBar
                  intent="primary"
                  value={this.state.progressbarValue}
                />
              </div>
              <Divider />
            </Segment>
          ) : (
            ""
          )}

          {this.state.flowStep == 5 ? (
            <Segment textAlign="center" id="subscribeCompleted">
              <Header>
                <Icon name="hand peace outline" />
                Completed
              </Header>
              <Divider />
              <p style={{fontWeight: "bold"}}>Your subscribe have been Success, that information as below</p>
              <Divider />

              <Table style={{ marginBottom: "0px" }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={12} colSpan="3" textAlign="center">
                      Your Organization and Admin user account
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>

              <Table definition singleLine style={{ marginTop: "0px" }}>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="5">Organization</Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeResult.org.name}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width="5">Organization Admin</Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeResult.org.admin}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width="5">Admin Email</Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeResult.org.email}{" "}
                      {this.state.subscribeResult.iCastApi.notifyEmail !=
                        undefined &&
                      this.state.subscribeResult.iCastApi.notifyEmail ? (
                        <span className="bp3-text-small" style={{ color: "red" }}>
                          *A confirm email have been sent to you.
                        </span>
                      ) : (
                        <span
                          className="bp3-text-small"
                          style={{ color: "red" }}
                        >
                          *The confirm email can't been send for some reason!
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width="5">Admin Password</Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeResult.iCastApi.iCastApiError !=
                      undefined
                        ? this.state.subscribeResult.iCastApi.iCastApiError
                        : this.state.subscribeResult.iCastApi.password}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Table style={{ marginBottom: "0px" }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={12} colSpan="3" textAlign="center">
                      Subscribe Service
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>

              <Table definition singleLine style={{ marginTop: "0px" }}>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="5">Primary Service Package</Table.Cell>
                    <Table.Cell>{`# ${this.state.subscribePrimaryPack.licpack.name}`}</Table.Cell>
                    <Table.Cell>{`(${this.state.subscribeCurrency}) ${this.state.subscribePrimaryPack.packprice.price}`}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width="5">Extra Service Package</Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeExtraPacks.map(
                        (extrapack, index) => (
                          <div key={index}>
                            {`${extrapack.licpack.name}`} x {`${extrapack.qty}`}
                          </div>
                        )
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeExtraPacks.map(
                        (extrapack, index) => (
                          <div key={index}>
                            {`(${this.state.subscribeCurrency}) ${parseFloat(
                              parseFloat(extrapack.packprice.price) *
                                extrapack.qty
                            )} `}
                          </div>
                        )
                      )}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width="5">Subscribe Period</Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeResult.subscribe.payperiod}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width="5">Subscribe Free</Table.Cell>
                    <Table.Cell>{`(${this.state.subscribeCurrency}) ${this.state.subscribeResult.subscribe.fee}`}</Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width="5">Payment Method</Table.Cell>
                    <Table.Cell>
                      {this.state.subscribeResult.subscribe.payments}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Button
                icon="console"
                large={true}
                intent="primary"
                text="Start yout iCast signage sysetem"
                onClick={this.gotoICastCloud}
              />
            </Segment>
          ) : (
            ""
          )}
        </Container>
      </Segment>
    );
  }
}

export default SubscriptionFlow;

const InjectedCheckoutForm = (props) => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} {...props} />
      )}
    </ElementsConsumer>
  );
};
