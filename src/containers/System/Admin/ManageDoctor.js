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
            //save markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save doctorinfo table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = `${item.firstName} ${item.lastName}`;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = `${item.valueVi}`;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = `${item.valueVi}`;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            console.log(dataSelectPayment, dataSelectPrice, dataSelectProvince);
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
        console.log(this.state.selectedDoctor);
    }



    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.infor.errCode === 0 && res.infor.data && res.infor.data.Markdown) {
            let markdown = res.infor.data.Markdown;

            let { listPayment, listPrice, listProvince } = this.state;
            let addressClinic = '', nameClinic = '', note = '', priceId = '',
                paymentId = '', provinceId = '', selectedPayment = '', selectedPrice = '',
                selectedProvince = '';

            if (res.infor.data.Doctorinfo) {
                addressClinic = res.infor.data.Doctorinfo.addressClinic;
                nameClinic = res.infor.data.Doctorinfo.nameClinic;
                note = res.infor.data.Doctorinfo.note;
                paymentId = res.infor.data.Doctorinfo.paymentId;
                priceId = res.infor.data.Doctorinfo.priceId;
                provinceId = res.infor.data.Doctorinfo.provinceId;

                selectedPayment = listPayment.find(item => item.value === paymentId);
                selectedPrice = listPrice.find(item => item.value === priceId);
                selectedProvince = listProvince.find(item => item.value === provinceId);
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: ''
            })
        }
    }

    // handlePaymentChange = (selectedPayment) => {
    //     this.setState({ selectedPayment });
    // }

    // handlePriceChange = (selectedPrice) => {
    //     this.setState({ selectedPrice });
    // }

    // handleProvinceChange = (selectedProvince) => {
    //     this.setState({ selectedProvince });
    // }

    handleOnChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })

    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
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
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            defaultValue={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='info-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            Value={this.state.selectedPrice}
                            onChange={this.handleOnChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                            name="selectedPrice"

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            defaultValue={this.state.selectedPayment}
                            onChange={this.handleOnChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            Value={this.state.selectedProvince}
                            onChange={this.handleOnChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        ></input>
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
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailInfor: (data) => dispatch(actions.saveDetailInforDoctor(data)),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
