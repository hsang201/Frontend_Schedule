import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
// import { FormattedMessage } from "react-intl";
// import DatePicker from '../../../components/Input/DatePicker';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';
import { CRUD_Actions } from '../../../utils/constant';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'chocolate' },
    { value: 'strawberry', label: 'strawberry' },
    { value: 'vanilla', label: 'vanilla' }
]

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailInfor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE
        })
        console.log(this.state.selectedDoctor);
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.infor.errCode === 0 && res.infor.data && res.infor.data.Markdown) {
            let markdown = res.infor.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        console.log('check channel: ', res);
    }

    handleONChangeDESC = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Thêm thông tin bác sĩ
                </div>
                <div className='more-infor'>
                    <div className='content-left'>
                        <label className=''>Chọn bác sĩ</label>
                        <Select
                            Value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleONChangeDESC(event)}
                            defaultValue={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={this.handleSaveContentMarkdown}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                >
                    {hasOldData === true ?
                        <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailInfor: (data) => dispatch(actions.saveDetailInforDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
