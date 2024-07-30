import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from "reactstrap";
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import Select from 'react-select';
import { postPatientBooking } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: null,
            doctorId: '',
            genders: [],
            timeType: ''
        };
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueVi;
                object.value = item.keyMap;
                result.push(object);
                return null; // to avoid warning of .map not returning value
            });
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                });
            }
        }
    }

    handleOnChangInput = (event, id) => {
        let valueInput = event.target.value;
        this.setState({
            [id]: valueInput
        });
    }

    handleOnChangDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    }

    handleConfirmBooking = async () => {
        //validate input
        // if (!data.email || !data.doctorId || !data.timeType || !data.date)
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.timeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let res = await postPatientBooking({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            toast.success('Đặt lịch thành công!');
            this.props.closeModalBooking();
        } else {
            toast.error('Đặt lịch thất bại!');
        }
    }

    timeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;
            let date = moment.unix(+dataTime.date / 1000).format('dddd-DD/MM/YYYY')
            return `${time}, ${date}`;
        }
        return <></>
    }

    buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return ''
    }

    render() {
        let { isOpenModal, closeModalBooking, dataTime } = this.props;

        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className={"booking-modal-container"}
                size="lg"
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right' onClick={closeModalBooking}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className='booking-modal-body container'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={this.state.doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày sinh</label>
                                <DatePicker
                                    onChange={this.handleOnChangDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking'
                            onClick={() => this.handleConfirmBooking()}
                        >Xác nhận</button>
                        <button className='btn-cancel'
                            onClick={closeModalBooking}
                        >Hủy</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
