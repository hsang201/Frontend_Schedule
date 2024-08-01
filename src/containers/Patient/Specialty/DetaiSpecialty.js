import React, { Component } from 'react';
import { connect } from "react-redux";
// import './DetailSpecialty.scss';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() { }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {
        return (
            <div>helllo world specialty</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
