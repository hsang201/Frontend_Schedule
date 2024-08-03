import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { getProfileDoctor } from '../../../services/userService';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            isShowDescriptionDoctor: false
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctor(id)
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;
            let date = moment.unix(+dataTime.date / 1000).format('dddd-DD/MM/YYYY')
            return (
                <>
                    <div>{time}, {date}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state
        let { isShowDescriptionDoctor, dataTime, isShowLinkDetail, doctorId } = this.props;
        console.log('check state', this.state);
        let nameVi = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName} `;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >

                    </div>


                    <div className='content-right'>
                        <div className='up'>
                            {nameVi}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>

                    </div>
                </div>
                {isShowLinkDetail === true && (
                    <div className='view-more'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                        {/* <a href={`/detail-doctor/${doctorId}`}>Xem thêm</a> */}
                    </div>
                )}
                {/* <div className='schedule-doctor'>
                    <div className='content-left'>
                        <DoctorSchedule
                            //doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            doctorIdFromParent={this.state.currentDoctorId}
                        />
                    </div>
                    <div className='content-right'>
                        <DoctorInfor
                            doctorIdFromParent={this.state.currentDoctorId}
                        />
                    </div>
                </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
