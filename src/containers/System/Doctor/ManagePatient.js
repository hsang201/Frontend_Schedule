import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientDoctor, updatePatientStatus } from '../../../services/userService';
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
        this.getDataPatient(user, formatedDate);
    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientDoctor({
            doctorId: user.id,
            date: formatedDate
        });
        if (res && res.errCode === 0) {
            let dataPatient = res.data.map(patient => ({
                ...patient,
                confirmed: patient.statusId === 'S3'
            }));
            this.setState({
                dataPatient
            });
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
            this.getDataPatient(user, formatedDate);
        });
    }

    handleBtnConfirm = async (item) => {
        let res = await updatePatientStatus({
            patientId: item.patientId,
            doctorId: item.doctorId
        });
        if (res && res.errCode === 0) {
            let dataPatient = this.state.dataPatient.map(patient => {
                if (patient.patientId === item.patientId && patient.doctorId === item.doctorId) {
                    return {
                        ...patient,
                        statusId: 'S3',
                        confirmed: true
                    };
                }
                return patient;
            });

            this.setState({
                dataPatient
            });
        } else {
            // Handle error case
            console.error(res.errMessage);
        }
    }

    render() {
        let { dataPatient } = this.state;
        console.log(this.state);
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
                                        <th>Địa chỉ</th>
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
                                                        <button
                                                            className={`mp-btn-confirm ${item.confirmed ? 'confirmed' : ''}`}
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                            disabled={item.confirmed}
                                                        >
                                                            {item.confirmed ? 'Đã xác nhận' : 'Xác nhận'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan="6">Không có dữ liệu</td>
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
