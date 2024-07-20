import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";

import { changelanguageApp } from "../../store/actions/appActions";

import './HomeBanner.scss';

class HomeBanner extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1"><FormattedMessage id="homebanner.title1" /></div>
                        <div className="title2"><FormattedMessage id="homebanner.title2" /></div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm chuyên khoa khám bệnh.."></input>
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital-alt"></i></div>
                                <div className="text-child">
                                    <FormattedMessage id="homebanner.child1" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-procedures"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="homebanner.child2" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="homebanner.child3" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="homebanner.child4" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="homebanner.child5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: (language) => dispatch(actions.processLogout(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
