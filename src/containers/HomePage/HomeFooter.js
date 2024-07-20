import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss"



class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2024 HoangSang. More infomation.<a target="_blank" href="https://www.facebook.com/sang.truonghoang.201">  &#8594; Click here &#8592;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
