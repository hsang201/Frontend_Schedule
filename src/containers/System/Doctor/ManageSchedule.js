import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { dateFormat } from '../../../utils';
import { saveBulkScheduleDoctor } from '../../../services/userService';


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            let data = this.props.scheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = `${item.firstName} ${item.lastName}`;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

    }

    handleOnChangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Ngày không hợp lệ!");
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Bác sĩ đã chọn không hợp lệ!");
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Thời gian đã chọn không hợp lệ!");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success("Lưu thành công!");
        } else {
            toast.error("Lưu thất bại!");
            console.log('error saveBulkScheduleDoctor >>> res', res);
        }
    }

    render() {
        let { rangeTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        // console.log('check', rangeTime);
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        Quản lý kế hoạch khám bệnh của bác sĩ
                    </div>
                    <div className='container'>
                        <div className='row mb-1'>
                            <div className='col-6 form-group mb-1'>
                                <label>Chọn bác sĩ</label>
                                <Select
                                    Value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className='col-6 form-group mb-1'>
                                <label>Chọn ngày</label>
                                <DatePicker
                                    onChange={this.handleOnChangDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0
                                    && rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                onClick={() => this.handleClickBtnTime(item)}
                                                key={index}>{item.valueVi}</button>
                                        )
                                    })
                                }
                            </div>
                            <div className='col-12'>
                                <button className="btn btn-primary btn-save-schedule"
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    Lưu thông tin
                                </button>
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
        allDoctors: state.admin.allDoctors,
        scheduleTime: state.admin.scheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
