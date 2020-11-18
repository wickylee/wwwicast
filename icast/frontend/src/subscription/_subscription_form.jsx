import React, { Component, Fragment } from "react";
import {
  Icon,
  Popover,
  Button,
  InputGroup,
  ControlGroup,
  HTMLSelect,
  Divider,
  Tab,
  Tabs,
  Card,
  Position,
  Dialog,
  Classes,
  ProgressBar,
} from "@blueprintjs/core";
import axios from "axios";
import $ from "jquery";
import Apphelper from "../apphelper";
// import { periodOptions} from "./constdata";
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

class SubscriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icastUrl:  `http${process.env.HTTPS=='True'?'s':''}://${process.env.ICAST_APP_SERVER}`,
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
      adminInvalid: false,
      onSubmitting: false,
      //--
      subscribeConfirm: false,
      stripeCheckoutForm: false,
      orgId: null,
      stripe_cus_id: null,
      //subscribe submit return
      progressbarValue: 0.1,
      subscribeResult: null,
      submitError: false,
      errorMsg: [
        "Srroy! Your registration have something problem in processing, please to try later!",
      ],
    };
    this.progressbarAnimaInterval = null;
  }

  componentDidMount() {
    axios
      .post("/core/subscribePassage/", {transmitCall: "licpacks"})
      .then((res) => {
        const licPacksData = res.data;
        let primaryPackGroup = [];
        let extraPackGroup = [];
        licPacksData.forEach((licpack) => {
          if (licpack.groupid <= 2) primaryPackGroup.push(licpack);
          else if (licpack.groupid < 1000) extraPackGroup.push(licpack);
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
      .post("/core/subscribePassage/", {transmitCall: "priceoption"})
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

  goSubscribeStep = (e) => {
    const changeStep = parseInt(e.target.getAttribute("data-gostep"));
    const goFlowStep = this.state.flowStep + changeStep;
    // console.log("goFlowStep:", goFlowStep);
    // console.log("subscribeSteps:", this.state.subscribeSteps[goFlowStep]);
    this.setState({
      activeTabId: this.state.subscribeSteps[goFlowStep],
      flowStep: goFlowStep,
    });

    if (e.target.id == "doPaying") {
      this.onSubscriptionSubmit();
    }
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
    const extraPackPrice = this.getLicpackPrice("extra", extraPackId);

    if (extraPackPrice) {
      const inputValue = this.getSelectedExtraPackQty(extraPackId);
      renderOut = (
        <>
          <div className="extrapack-qty">
            <InputGroup
              type="number"
              extrapack_id={extraPackId}
              value={inputValue}
              min={0}
              style={{ width: "50px" }}
              disabled={this.state.subscribePrimaryPack ? false : true}
              onChange={this.changeExtraPackQty}
            />
          </div>
          <div className="extrapack-price">
            {inputValue != 0 ? (
              <>
                <span style={{fontSize: "0.75em", marginRight: "5px"}}>
                                      { ` (${this.state.subscribeCurrency}) `}
                          </span>
                <div>
                  {inputValue * extraPackPrice.price}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
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
    if (this.props.paymentMethod == "Stripe")
    {
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
      console.log("confirmSubscription")
      // this.onSubscriptionSubmit();
    }
  };

  onStripePaymentComplete = (stripeSubscription) =>{
    //update licpivot model data 
    this.setState({ stripeCheckoutForm: false })
    this.onSubscriptionSubmit(stripeSubscription);
  }

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
        paymentMethod: this.props.paymentMethod,
        subscribeFee: this.getSubscribeSummaryPrice(),
        // stripe subscription data
        orgId: this.state.orgId,
        stripe_sub_id: stripeSubscription.id,
        invoice: stripeSubscription.latest_invoice.id,
      };

      //console.log("postData :", postData);
      const nextflowStep = this.state.flowStep + 1;
      this.setState({ onSubmitting: true,  flowStep: nextflowStep, activeTabId:  this.state.subscribeSteps[nextflowStep]});
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

  listOrgLicenseRecords = () => {
    let licrecordGroup = {};
    this.state.subscribeResult.org.licrecords.forEach((licrecord) => {
      let groupKey = `${licrecord.licprop.application.appname} : ${licrecord.licprop.name}`;
      console.log(groupKey);
      if (licrecordGroup[groupKey] == undefined) {
        licrecordGroup[groupKey] = 1;
      } else {
        licrecordGroup[groupKey] = licrecordGroup[groupKey] + 1;
      }
    });

    let licPropItems = [];
    for (var key in licrecordGroup) {
      licPropItems.push({
        appPropName: key,
        number: licrecordGroup[key],
      });
    }

    let orgLicRecords = (
      <>
        {licPropItems.map((lic, index) => (
          <div className="orglic-info" key={index}>
            <div>{lic.appPropName}</div>
            <div>{`------ (${lic.number})`} </div>
          </div>
        ))}
      </>
    );

    return orgLicRecords;
  };

  render() {
    return (
      <div className="subscription-flow">
        <div className="main-title">iCast signage service subscription</div>
        <div className="subscription-tabs">
          <Tabs
            id="subscriptionTabs"
            onChange={this.handleTabChange}
            selectedTabId={this.state.activeTabId}
            animate={false}
            className="steps-tabs"
          >
            <Tab
              id="subscribeDesc"
              title={<div className="tabs-title"> Subscription </div>}
              panel={
                <div className="step-panel">
                  <div className="step-header">
                    {" "}
                    <Icon icon="caret-right" iconSize={24} />{" "}
                    <div>Subscribe Description</div>{" "}
                  </div>
                  <div className="step-form">
                    <div className="step-form-content bp3-text-large">
                      <div className="subscribe-desc">
                        {this.state.subscribeDesc_data.descTxt}
                      </div>
                    </div>
                    <div className="step-flow-buttons">
                      <Button
                        rightIcon="chevron-right"
                        text="Start Subscribe"
                        intent="primary"
                        large={true}
                        data-gostep={1}
                        onClick={this.goSubscribeStep}
                      />
                    </div>
                  </div>
                </div>
              }
            />
            <Tab
              id="subscribeDescFlowIcon"
              title={
                <div className="tab-icon">
                  <Icon icon="chevron-right" iconSize={24} />
                </div>
              }
              panel={<div className="step-panel"></div>}
            />
            <Tab
              id="subscribePack"
              title={<div className="tabs-title"> Service </div>}
              panel={
                <div className="step-panel">
                  <div className="step-header">
                    {" "}
                    <Icon icon="caret-right" iconSize={24} />{" "}
                    <div>Service Package Choice</div>
                  </div>
                  <div className="step-form">
                    <div className="step-form-content">
                      <div className="subscribe-fragment-header bp3-text-large">
                        Primary Service Package
                      </div>
                      <div className="primarypackage-select">
                        {this.state.licPacks.primaryPackages.map(
                          (primaryPackage) => (
                            <Card
                              className={`licpack-card ${
                                this.state.subscribePrimaryPack &&
                                this.state.subscribePrimaryPack.licpack.id ==
                                  primaryPackage.id
                                  ? "seletec-licpack"
                                  : ""
                              }`}
                              key={primaryPackage.id}
                              interactive={true}
                              elevation={1}
                            >
                              <div className="licpack-name">
                                {primaryPackage.name}
                              </div>
                              <div className="licpack-desc">
                                {primaryPackage.desc}
                              </div>
                              <div className="licpackprops">
                                {primaryPackage.licpackprops.map(
                                  (licpackprop, ikey) => (
                                    <div key={ikey} className="licpackprop-row">
                                      <div className="licpackprop-name">
                                        <Icon
                                          icon="cube"
                                          iconSize={16}
                                          style={{ marginRight: "10px" }}
                                        />
                                        {`${licpackprop.licprop.application.appname} : ${licpackprop.licprop.name}`}
                                      </div>
                                      <div className="licpackprop-qty">
                                        {licpackprop.qty}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="licpack-footer">
                                <div className="primarypackage-period">
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
                                  <div className="primarypackage-price">
                                    <div
                                      id={`primarypackage_${primaryPackage.id}`}
                                    >
                                      {this.getLicpackPriceText(
                                        "primary",
                                        primaryPackage.id
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="primarypackage-select-indicate">
                                  <Button
                                    large={true}
                                    icon="tick"
                                    text="Select"
                                    intent={
                                      this.state.subscribePrimaryPack &&
                                      this.state.subscribePrimaryPack.licpack
                                        .id == primaryPackage.id
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
                                </div>
                              </div>
                            </Card>
                          )
                        )}
                      </div>

                      <div className="subscribe-fragment-header bp3-text-large">
                        Extra Service Package
                      </div>
                      <div className="extrapack-select">
                        {this.state.licPacks.extraPacks.map(
                          (extraPack, index) => (
                            <div className="extrapack-row" key={index}>
                              <div className="extrapack-details">
                                <div className="extrapack-group-name">
                                  <Icon
                                    icon="insert"
                                    iconSize={20}
                                    style={{ marginRight: "10px" }}
                                  />
                                  {extraPack.name}
                                </div>

                                <div className="extrapack-licprops">
                                  {extraPack.licpackprops.map(
                                    (licpackprop, ikey) => (
                                      <div
                                        key={ikey}
                                        className="extrapack-licprops-row"
                                      >
                                        <Icon
                                          icon="cube"
                                          iconSize={16}
                                          style={{ marginRight: "10px" }}
                                        />
                                        <div>
                                          {`${licpackprop.licprop.application.appname} : ${licpackprop.licprop.name} X ${licpackprop.qty}`}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="extrapack-period-price">
                                  <div className="period-price-label">
                                    <div>{this.state.subscribePeriod}</div>
                                    <Icon icon="chevron-right" iconSize={16} />
                                    <div>{this.state.subscribeCurrency}</div>
                                    <div>
                                      {this.getLicpackPriceText(
                                        "extra",
                                        extraPack.id
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="extrapack-select-option">
                                  {this.getExtrapackRequestInput(extraPack.id)}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div className="subscribe-fragment-header bp3-text-large">
                        Subscribe Service Summary
                      </div>
                      <div className="subscribe-licapck-summary">
                        <div className="service-licprop-list">
                          {this.getSubscribeLicpropsSummary().map(
                            (licpropSet, index) => (
                              <div
                                className="subscribe-licprop-item"
                                key={index}
                              >
                                <Icon
                                  icon="cube"
                                  iconSize={16}
                                  style={{ marginRight: "10px" }}
                                />
                                <div>
                                  {`${licpropSet.licprop.application.appname} : ${licpropSet.licprop.name} `}
                                </div>
                                <div className="item-x">{"X"}</div>
                                <div className="item-qty">{licpropSet.qty}</div>
                              </div>
                            )
                          )}
                        </div>
                        <div className="subscribe-price-summary">
                          <div className="subscribe-period">
                            {this.state.subscribePeriod}
                          </div>
                          <div className="subscribe-price">
                          <span style={{fontSize: "0.75em", marginRight: "5px"}}>
                                      { ` (${this.state.subscribeCurrency}) `}
                          </span>
                            {this.getSubscribeSummaryPrice()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="step-flow-buttons">
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
                        disabled={
                          this.state.subscribePrimaryPack ? false : true
                        }
                        onClick={this.goSubscribeStep}
                      />
                    </div>
                  </div>
                </div>
              }
            />
            <Tab
              id="subscribePackFlowIcon"
              title={
                <div className="tab-icon">
                  <Icon icon="chevron-right" iconSize={24} />
                </div>
              }
              panel={<div className="step-panel"></div>}
            />
            <Tab
              id="accountRegister"
              title={<div className="tabs-title"> Account </div>}
              panel={
                <div className="step-panel">
                  <div className="step-header">
                    <Icon icon="caret-right" iconSize={24} />{" "}
                    <div>Organization Registration</div>
                  </div>

                  <div className="step-form">
                    <div className="step-form-content">
                      <div className="subscribe-fragment-header bp3-text-large">
                        Organization Information
                      </div>
                      <div className="org-reg-from">
                        <div className="field-row">
                          <div className="field-label">Organization</div>
                          <div className="field-value pos-relative">
                            <input
                              className="bp3-input"
                              type="text"
                              placeholder="Organization Name"
                              required={true}
                              value={this.state.orgName}
                              onChange={(e) =>
                                this.setState({ orgName: e.target.value })
                              }
                              // onBlur={this.registrationCheckEnableNext}
                            />
                          </div>
                        </div>

                        <div className="field-row">
                          <div className="field-label">
                            Organization Admin User
                          </div>
                          <div className="field-value">
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
                                className="bp3-input"
                                type="text"
                                placeholder="Admin User Name"
                                required={true}
                                value={this.state.orgAdmin}
                                onChange={this.onOrgAdminChange}
                                onBlur={this.onOrgAdminBlur}
                                disabled={this.state.org ? true : false}
                              />
                            </Popover>
                            <div
                              className="bp3-text-small"
                              style={{ marginLeft: "10px" }}
                            >
                              * Required. 128 characters or fewer. Letters and
                              digits only.
                            </div>
                          </div>
                        </div>

                        <div className="field-row">
                          <div className="field-label">Admin User Email</div>
                          <div className="field-value">
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
                                className="bp3-input"
                                type="email"
                                placeholder="Admin Email"
                                required={true}
                                value={this.state.orgEmail}
                                onChange={this.onAdminEmailChange}
                                onBlur={this.onAdminEmailBlur}
                                disabled={this.state.org ? true : false}
                              />
                            </Popover>
                            <div
                              className="bp3-text-small"
                              style={{ marginLeft: "10px" }}
                            >
                              * Please enter a valid email address, as that
                              password will auto generate at your submit.
                            </div>
                          </div>
                        </div>

                        <div className="field-row">
                          <div className="field-label">Admin Full Name</div>
                          <div className="field-value">
                            <input
                              className="bp3-input"
                              type="text"
                              placeholder="First Name"
                              required={true}
                              value={this.state.firstName}
                              onChange={(e) =>
                                this.setState({ firstName: e.target.value })
                              }
                              disabled={this.state.org ? true : false}
                              style={{ marginRight: "10px" }}
                            />
                            <input
                              className="bp3-input"
                              type="text"
                              placeholder="Last Name"
                              required={true}
                              value={this.state.lastName}
                              onChange={(e) =>
                                this.setState({ lastName: e.target.value })
                              }
                              disabled={this.state.org ? true : false}
                            />
                          </div>
                        </div>
                      </div>

                      {this.state.activeTabId == "accountRegister" ? (
                        <>
                          <div className="subscribe-fragment-header bp3-text-large">
                            Subscribe Service Summary
                          </div>
                          <div className="subscribe-licapck-summary">
                            <div className="service-licprop-list">
                              {this.getSubscribeLicpropsSummary().map(
                                (licpropSet, index) => (
                                  <div
                                    className="subscribe-licprop-item"
                                    key={index}
                                  >
                                    <Icon
                                      icon="cube"
                                      iconSize={16}
                                      style={{ marginRight: "10px" }}
                                    />
                                    <div>
                                      {`${licpropSet.licprop.application.appname} : ${licpropSet.licprop.name} `}
                                    </div>
                                    <div className="item-x">{"X"}</div>
                                    <div className="item-qty">
                                      {licpropSet.qty}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="subscribe-price-summary">
                              <div className="subscribe-period">
                                {this.state.subscribePeriod}
                              </div>
                              <div className="subscribe-price">
                              <span style={{fontSize: "0.75em", marginRight: "5px"}}>
                                      { ` (${this.state.subscribeCurrency}) `}
                          </span>
                                {this.getSubscribeSummaryPrice()}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="step-flow-buttons">
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
                    </div>
                  </div>
                </div>
              }
            />
            
            <Tab
              id="accountRegisterFlowIcon"
              title={
                <div className="tab-icon">
                  <Icon icon="chevron-right" iconSize={24} />
                </div>
              }
              panel={<div className="step-panel"></div>}
            />
            <Tab
              id="confirmPayments"
              title={<div className="tabs-title"> Confirm </div>}
              panel={
                <div className="step-panel">
                  <div className="step-header">
                    <Icon icon="caret-right" iconSize={24} />{" "}
                    <div>Subscribe Confirmation and Payments</div>{" "}
                  </div>
                  <div className="step-form">
                    {this.state.stripeCheckoutForm && this.state.stripe_cus_id ? (
                      <Dialog
                        isOpen={this.state.stripeCheckoutForm}
                        usePortal={true}
                        canOutsideClickClose={false}
                        // onClose={() =>
                        //   this.setState({ stripeCheckoutForm: false })
                        // }
                        isCloseButtonShown={false}
                        title={<div><Icon icon="credit-card" iconSize={20} style={{marginRight: "5px"}}></Icon> <span>{"Subscribe Payment"}</span></div>}
                        style={{
                          width: "80vw",
                          height: "80vh",
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
                    <div className="step-form-content">
                      <div className="subscribe-fragment-header bp3-text-large">{`Please Confirm Your Subscription Information`}</div>
                      <div className="subscribe-data-confirm">
                        <div className="confirm-data-block">
                          <div className="data-block-header">
                            Organization Account Registration
                          </div>
                          <div className="field-row">
                            <div className="field-label">Organization</div>
                            <div className="field-value">
                              {this.state.orgName}
                            </div>
                          </div>

                          <div className="field-row">
                            <div className="field-label">
                              Organization Admin
                            </div>
                            <div className="field-value">
                              {this.state.orgAdmin}
                            </div>
                          </div>

                          <div className="field-row">
                            <div className="field-label">Admin Email</div>
                            <div className="field-value">
                              {this.state.orgEmail}
                            </div>
                          </div>

                          <div className="field-row">
                            <div className="field-label">Admin Name</div>
                            <div className="field-value">
                              {this.state.firstName} {this.state.lastName}
                            </div>
                          </div>
                        </div>

                        {this.state.activeTabId == "confirmPayments" ? (
                          <>
                            <div className="confirm-data-block">
                              <div className="data-block-header">
                                Subscribe Service Package
                              </div>

                              <div className="field-row">
                                <div className="field-label">
                                  Primary Service Package
                                </div>
                                <div className="field-value">
                                  <div className="confirm-licpack-row">
                                    <div className="licpack-name">
                                      {`${this.state.subscribePrimaryPack.licpack.name}`}
                                    </div>
                                    <div className="licpack-price">
                                      {`(${this.state.subscribeCurrency}) ${this.state.subscribePrimaryPack.packprice.price}`}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="field-row">
                                <div className="field-label">
                                  Extra Service Package
                                </div>
                                <div className="field-value">
                                  {this.state.subscribeExtraPacks.map(
                                    (extrapack, index) => (
                                      <div
                                        className="confirm-licpack-row"
                                        key={index}
                                      >
                                        <div className="licpack-name">
                                          {`${extrapack.licpack.name}`} x{" "}
                                          {`${extrapack.qty}`}
                                        </div>
                                        <div className="licpack-price">
                                          {`(${this.state.subscribeCurrency}) ${parseFloat(
                                            parseFloat(
                                              extrapack.packprice.price
                                            ) * extrapack.qty
                                          )} `}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="field-row">
                                <div className="field-label">
                                  Subscribe Period
                                </div>
                                <div className="field-value">
                                  {this.state.subscribePeriod}
                                </div>
                              </div>

                              <div className="field-row">
                                <div className="field-label">
                                  Subscribe Free
                                </div>
                                <div className="field-value">
                                  {`(${this.state.subscribeCurrency}) ${this.getSubscribeSummaryPrice()}`}
                                </div>
                              </div>
                            </div>

                            <div className="confirm-data-block">
                              <div className="data-block-header">
                                Subscription Included Service Items
                              </div>
                              <div className="confirm-subscribe-licapck">
                                <div className="service-licprop-list">
                                  {this.getSubscribeLicpropsSummary().map(
                                    (licpropSet, index) => (
                                      <div
                                        className="subscribe-licprop-item"
                                        key={index}
                                      >
                                        <div className="item-column">
                                          <Icon
                                            icon="cube"
                                            iconSize={16}
                                            style={{ marginRight: "10px" }}
                                          />
                                          <div>
                                            {`${licpropSet.licprop.application.appname} : ${licpropSet.licprop.name} `}
                                          </div>
                                        </div>

                                        <div className="item-column">
                                          <div className="item-x">
                                            {"--------------"}
                                          </div>
                                          <div className="item-qty">
                                            {licpropSet.qty}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                                <div className="confirm-subscribe-price">
                                  <div className="confirm-price">
                                    <div className="subscribe-price">
                                    <span style={{fontSize: "0.75em", marginRight: "5px"}}>
                                      { ` (${this.state.subscribeCurrency}) `}
                          </span>
                                      {this.getSubscribeSummaryPrice()}
                                    </div>
                                    <div style={{ margin: "0px 5px" }}>
                                      {"/"}
                                    </div>
                                    <div className="subscribe-period">
                                      {this.state.subscribePeriod}
                                    </div>
                                  </div>
                                  <div className="confirm-button">
                                    <Button
                                      icon="confirm"
                                      text="Confirm and Pay"
                                      large={true}
                                      onClick={this.confirmSubscription}
                                      intent={
                                        this.state.subscribeConfirm
                                          ? "warning"
                                          : "none"
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="step-flow-buttons">
                      <Button
                        icon="chevron-left"
                        text="Back"
                        large={true}
                        data-gostep={-1}
                        onClick={this.goSubscribeStep}
                      />

                    </div>
                  </div>
                </div>
              }
            />
            <Tab
              id="confirmPaymentsFlowIcon"
              title={
                <div className="tab-icon">
                  <Icon icon="chevron-right" iconSize={24} />
                </div>
              }
              panel={<div className="step-panel"></div>}
            />
            <Tab
              id="paymentProcessing"
              title={<div className="tabs-title"> Processing </div>}
              panel={
                <div className="step-panel">
                  <div className="step-header">
                    <Icon icon="caret-right" iconSize={24} />{" "}
                    <div>Payment Processing</div>{" "}
                  </div>
                  <div className="step-form">
                    <div className="step-form-content">
                      <div className="subscribe-fragment-header bp3-text-large">{`Please Waiting for processing your subscribe and payment...`}</div>
                      <div className="progressbar-container">
                        <ProgressBar
                          intent="primary"
                          value={this.state.progressbarValue}
                        />
                      </div>
                    </div>
                    <div className="step-flow-buttons">
                      <Button
                        icon="chevron-left"
                        text="Back"
                        large={true}
                        data-gostep={-1}
                        onClick={this.goSubscribeStep}
                        disabled={this.state.onSubmitting}
                      />
                      <div> </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Tab
              id="paymentProcessingFlowIcon"
              title={
                <div className="tab-icon">
                  <Icon icon="chevron-right" iconSize={24} />
                </div>
              }
              panel={<div className="step-panel"></div>}
            />
            <Tab
              id="subscribeCompleted"
              title={<div className="tabs-title"> Completed </div>}
              panel={
                <div className="step-panel">
                  <div className="step-header">
                    <Icon icon="caret-right" iconSize={24} />{" "}
                    <div>Subscribe Completed</div>{" "}
                  </div>
                  {this.state.subscribeResult ? (
                    <div className="step-form">
                      <div className="step-form-content">
                        <div className="subscribe-fragment-header bp3-text-large">
                          {
                            "Your subscribe have been Success, that information as below "
                          }
                        </div>
                        <div className="subscribe-completed-result">
                          <div className="completed-data-block">
                            <div className="section-row">
                              <div className="section-title">
                                Your Organization and Admin user account :
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">Organization</div>
                              <div className="field-value pos-relative">
                                {this.state.subscribeResult.org.name}
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">
                                Organization Admin
                              </div>
                              <div className="field-value">
                                {this.state.subscribeResult.org.admin}
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">Admin Email</div>
                              <div className="field-value">
                                {this.state.subscribeResult.org.email}{" "}
                                {this.state.subscribeResult.iCastApi
                                  .notifyEmail != undefined &&
                                this.state.subscribeResult.iCastApi
                                  .notifyEmail ? (
                                  <span className="bp3-text-small">
                                    *A confirm email have been sent to you.
                                  </span>
                                ) : (
                                  <span
                                    className="bp3-text-small"
                                    style={{ color: "red" }}
                                  >
                                    *The confirm email can't been send for some
                                    reason!
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">Admin Password</div>
                              <div className="field-value">
                                {this.state.subscribeResult.iCastApi
                                  .iCastApiError != undefined
                                  ? this.state.subscribeResult.iCastApi
                                      .iCastApiError
                                  : this.state.subscribeResult.iCastApi
                                      .password}
                              </div>
                            </div>

                            <div className="section-row">
                              <div className="section-title">
                                Subscribed Services :
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">
                                Application Feature Items
                              </div>
                              <div
                                className="field-value"
                                style={{
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                }}
                              >
                                {this.listOrgLicenseRecords()}
                              </div>
                            </div>

                            <div className="section-row">
                              <div className="section-title">
                                Subscription Detials :
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">
                                Subscribed Service Package
                              </div>
                              <div className="field-value">
                                {this.state.subscribeResult.subscribe.subscribelicpacks.map(
                                  (subscribelicpacks, index) => (
                                    <div key={index}>
                                      <div
                                        style={{ fontWeight: "bold" }}
                                      >{`${subscribelicpacks.licpack.name} X ${subscribelicpacks.qty} `}</div>
                                      <div>
                                        {subscribelicpacks.licpack.licpackprops.map(
                                          (licpackprop, ikey) => (
                                            <span key={ikey}>
                                              {`${licpackprop.licprop.application.appname} 
                                          : ${licpackprop.licprop.name} 
                                          - [${licpackprop.qty}], `}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">Payment Method</div>
                              <div className="field-value">
                                {this.state.subscribeResult.subscribe.payments}
                              </div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">Subscribe Fee</div>
                              <div className="field-value">{`(${this.state.subscribeCurrency}) ${this.state.subscribeResult.subscribe.fee}`}</div>
                            </div>

                            <div className="field-row">
                              <div className="field-label">Paying Period</div>
                              <div className="field-value">
                                {this.state.subscribeResult.subscribe.payperiod}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="step-flow-buttons">
                        <Button
                          icon="console"
                          large={true}
                          intent="primary"
                          text="Start yout iCast signage sysetem"
                          onClick={this.gotoICastCloud}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              }
            />
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SubscriptionForm;

const InjectedCheckoutForm = (props) => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} {...props} />
      )}
    </ElementsConsumer>
  );
};
