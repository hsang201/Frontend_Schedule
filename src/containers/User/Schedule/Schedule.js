import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";

import './Shedule.scss';

class Schedule extends Component {

    render() {


        return (
            <div >
                aaaaaaaaaa

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
