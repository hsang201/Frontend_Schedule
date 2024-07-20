import React, { Component } from "react";
import { connect } from "react-redux";



class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Đặt lịch khám và thanh toán mọi lúc mọi nơi
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400"
                            src="https://www.youtube.com/embed/EChsR0m-M0s"
                            title="[UMC Podcast] Đặt lịch khám và thanh toán mọi lúc mọi nơi | UMC | Bệnh viện Đại học Y Dược TPHCM"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>˜Bệnh viện Đại học Y Dược TPHCM là bệnh viện đa khoa trực thuộc Đại học Y Dược TPHCM được xây dựng trên mô hình tiên tiến của sự kết hợp Trường-Viện với tầm nhìn trở thành Bệnh viện Đại học dẫn đầu Việt Nam và chuẩn quốc tế. Với sứ mệnh mang đến giải pháp chăm sóc sức khoẻ tối ưu bằng sự tích hợp giữa điều trị, nghiên cứu và đào tạo, Bệnh viện luôn nỗ lực phát huy những giá trị cốt lõi bền vững: Tiên phong - Thấu hiểu - Chuẩn mực - An toàn </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
