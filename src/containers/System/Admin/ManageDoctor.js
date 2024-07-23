import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from '../../../components/Input/DatePicker';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: ''
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleEditorChange({ html, text }) {
        console.log('handleEditorChang e', html, text);
    }
    handleSaveContentMarkdown = () => {
        alert('hello');
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Thêm thông tin bác sĩ
                </div>
                <div className='more-infor'>
                    <div className='content-left'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control'>
                            áddasdada
                        </textarea>
                    </div>
                    <div className='content-right'>
                        <label className=''>Chọn bác sĩ</label>
                        <input className='form-control'></input>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown}
                    className='save-content-doctor'>Lưu thông tin</button>
            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
