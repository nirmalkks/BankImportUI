import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <div className="nav-bar-container">
      <div className="menu-container">
        <NavLink exact to="/" className="menu" activeClassName="active">
          Saved Transactions
        </NavLink>
      </div>
      <div className="menu-container">
        <NavLink
          to="/import/paste"
          className="menu no-arrow"
          activeClassName="active"
          isActive={(match, location) => {
            return location.pathname.startsWith("/import");
          }}
        >
          New Data Import
        </NavLink>
        <NavLink
          to="/import/paste"
          disabled
          className="menu sub-menu"
          activeClassName="active"
        >
          Paste
        </NavLink>
        <NavLink
          to="/import/mapping"
          disabled
          className="menu sub-menu"
          activeClassName="active"
        >
          Data Mapping
        </NavLink>
        <NavLink
          to="/import/review"
          disabled
          className="menu sub-menu"
          activeClassName="active"
        >
          Review & Save
        </NavLink>
      </div>
    </div>
  );
};
