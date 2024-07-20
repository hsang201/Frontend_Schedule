import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from '../../../components/Input/DatePicker';


class ManageSchedule extends Component {
    render() {
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    Quản lý kế hoạch khám bệnh của bác sĩ
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Chọn bác sĩ</label>
                            <input className='form-control'></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker />
                            <input className='form-control'></input>
                        </div>
                        <div className='col-12 pick-hour-container'>
                        </div>
                        <button className="btn btn-primary">Lưu thông tin</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
