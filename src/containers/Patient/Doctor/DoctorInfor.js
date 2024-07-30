import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import moment from 'moment';
// import { LANGUAGES } from '../../../utils';
import { getInforDoctor } from '../../../services/userService';
import { NumberFormatBase } from 'react-number-format';
import './DoctorInfor.scss';


class DoctorInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getInforDoctor(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }

    render() {
        let { extraInfor } = this.state;
        return (
            <div className='doctor-infor-container'>
                <div className='content-up'>
                    <div className='text-address'> Địa chỉ khám</div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfor);
