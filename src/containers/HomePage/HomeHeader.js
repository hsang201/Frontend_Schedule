import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { withRouter } from 'react-router';

import { changelanguageApp } from "../../store/actions/appActions";
class HomeHeader extends Component {
  changelanguage = (language) => {
    //fire redux event : actions
    this.props.changelanguageAppRedux(language);
  };


  returnToHome = () => {
    window.location.href = '/home'; // Navigate to the home page
  };

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img className="header-logo" src={logo} alt="" onClick={() => this.returnToHome()}></img>
            </div>
            <div className="center-content">
              <div className="child-content">
                <b>Chuyên Khoa</b>
              </div>
              <div className="child-content">
                <b>Bác Sĩ</b>
              </div>
              <div className="child-content">
                <b>Phòng Khám</b>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>{" "}
                <FormattedMessage id="homeheader.support" />
              </div>
              {/* <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                <span onClick={() => this.changelanguage(LANGUAGES.VI)}>VN</span>
              </div>
              <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                <span onClick={() => this.changelanguage(LANGUAGES.EN)}>EN</span>
              </div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
