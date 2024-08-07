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

                    </div>
                    <div className='content-down'></div>
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
