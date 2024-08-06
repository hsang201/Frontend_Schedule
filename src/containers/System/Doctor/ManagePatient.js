import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientDoctor } from '../../../services/userService';
// import { FormattedDate } from 'react-intl';
import moment from 'moment';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)
    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email
        }
        console.log('check', data);
    }

    render() {
        let { dataPatient } = this.state;
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý danh sách bệnh nhân đặt lịch khám bệnh
                </div>
                <div className='manage-patient-body'>
                    <div className='row'>
                        <div className='col-4 form-group select-day'>
                            <label className='text-day'>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ Tên</th>
                                        <th>Giới tính</th>
                                        <th>Số điện thoại</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.genderData.valueVi}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm' onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            Không có dữ liệu
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
