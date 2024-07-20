import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";

import { changelanguageApp } from "../../store/actions/appActions";
class HomeHeader extends Component {
  changelanguage = (language) => {
    //fire redux event : actions
    this.props.changelanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;
    console.log("check user info: ", this.props.userInfo);
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img className="header-logo" src={logo}></img>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.specialty" />{" "}
                  </b>
                </div>
                <div className="subs-title">
                  {" "}
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>{" "}<FormattedMessage id="homeheader.health-facility" />{" "}</b>
                </div>
                <div className="subs-title">
                  {" "}<FormattedMessage id="homeheader.select-room" />{" "}
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="homeheader.doctor" /></b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="homeheader.medical-package" /></b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.general-check" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>{" "}
                <FormattedMessage id="homeheader.support" />
              </div>
              <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                <span onClick={() => this.changelanguage(LANGUAGES.VI)}>VN</span>
              </div>
              <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                <span onClick={() => this.changelanguage(LANGUAGES.EN)}>EN</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changelanguageAppRedux: (language) => dispatch(changelanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
