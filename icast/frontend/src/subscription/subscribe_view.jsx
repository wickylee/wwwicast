import React, { useState } from "react";
import { Icon, Button, Tab, Tabs } from "@blueprintjs/core";
import SubscriptionForm from "./subscription_form";
// import SubscribeUpdateForm from "./subscribe_uform";

const SubscribeView = props => {
  return (
    <div className="section-container">
      <div className="subscribe-block">
        <SubscriptionForm paymentMethod="Stripe"/>
      </div>
    </div>
  );
};

export default SubscribeView;