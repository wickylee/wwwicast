import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { Icon, Button } from "@blueprintjs/core";
// import Apphelper from "../apphelper";

function getActiv(page, match) {
  let css = "";
  if (
    (match == null && page == "iCast") ||
    (match != null && match.params.id == page.toLowerCase())
  )
    css += "activeMenuItem";
  return css;
}

const ListItemLink = ({ to, page, text, icon }) => (
  <Route
    path="/:id"
    children={({ match }) => (
      <Fragment>
        <span className="bp3-navbar-divider navbar-divider"></span>
        <div className={"bp3-button bp3-minimal appLink " + getActiv(page, match)}>
          <Icon icon={icon} iconSize={16} />
            <Link to={to}>{text}</Link>
        </div>
      </Fragment>
    )}
  />
);

function NavMenu(props) {
  const contactUs = e => {
    e.preventDefault();
    console.log("contactUs")
  };

  let links = [
    { to: "/home", requireAuth: true, name: "home", text: "iCast", icon: "desktop" },
    { to: "/features", requireAuth: true, name: "features", text: "Product Features", icon: "cube" },
    { to: "/subscribe", requireAuth: true, name: "subscribe", text: "subscribe", icon: "endorsed" },
  ];

  return (
    <nav className="bp3-navbar">
      <div className="bp3-navbar-group bp3-align-left">
        <div className="bp3-navbar-heading">
          <img src="/static/images/icastlogo.png" className="icastlogo" />
        </div>
      </div>
      <div className="bp3-navbar-group bp3-align-left">
        {links.map((link, index) => (
          <ListItemLink
            key={index}
            to={link.to}
            page={link.name}
            text={link.text}
            icon={link.icon}
          />
        ))}
      </div>
      <div className="bp3-navbar-group bp3-align-right">
        <span className="bp3-navbar-divider navbar-divider"></span>
        <Button className="rightside-button" icon="chat" minimal={true} onClick={contactUs} title="contact us" />
      </div>
    </nav>
  );
}



export default NavMenu;
