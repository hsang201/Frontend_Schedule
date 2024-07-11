import React, { Component } from "react";
import { connect } from "react-redux";
// import './MedicalFacility.scss';
// import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section-share section-mediacl-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-mediacl-facility" />
                                <div>Bệnh viện Thống Nhất</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-mediacl-facility" />
                                <div>Nhi Đồng 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-mediacl-facility" />
                                <div>Bệnh viện Tâm Anh</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-mediacl-facility" />
                                <div>Bệnh viện Hùng Vương</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-mediacl-facility" />
                                <div>Bệnh viện Y dược TPHCM</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-mediacl-facility" />
                                <div>Bệnh viện Tai Mũi Họng</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
