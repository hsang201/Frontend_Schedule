import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
// import "./ManageDoctor.scss";
import 'react-markdown-editor-lite/lib/index.css';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <React.Fragment>
                <div className='manage-doctor-container'>
                    helllllllooooooooooooooooooo
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
