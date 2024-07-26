import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import moment from 'moment';
// import { LANGUAGES } from '../../../utils';
import { getScheduleDoctor } from '../../../services/userService';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvaiableTime: [],
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        //let { language } = this.props;
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`
                object.label = today;
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object)
        }
        this.setState({
            allDays: arrDate
        }, async () => {
            // Automatically load the first element
            if (arrDate.length > 0) {
                let res = await getScheduleDoctor(this.props.doctorIdFromParent, arrDate[0].value);
                this.setState({
                    allAvaiableTime: res.data ? res.data : []
                });
            }
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.props;
            // 
            if (allDays.length > 0) {
                let res = await getScheduleDoctor(this.props.doctorIdFromParent, allDays[0].value);
                this.setState({
                    allAvaiableTime: res.data ? res.data : []
                });
            }
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctor(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvaiableTime: res.data ? res.data : []
                })
            }
            console.log(res);
        }
    }

    render() {
        let { allDays, allAvaiableTime } = this.state;
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}> {item.label} </option>
                                )
                            })}
                    </select>
                </div>
                <div className='all-avaiable-time'>
                    <div className='text-calendar'>
                        <i class="fas fa-calendar-alt"><span>Lịch khám</span></i>
                    </div>
                    <div className='time-content'>

                        {allAvaiableTime && allAvaiableTime.length > 0 ?
                            <>
                                <div className='time-content-button'>
                                    {allAvaiableTime.map((item, index) => {
                                        let timeDisplay = item.timeTypeData.valueVi;
                                        return (
                                            <button key={index}>{timeDisplay}</button>
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span>Chọn <i class="fas fa-hand-point-up"></i> và đặt (miễn phí)</span>
                                </div>
                            </>


                            : <div className='notification'>Không có lịch hẹn trong thời gian này, vui lòng chọn ngày khác!</div>
                        }

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
