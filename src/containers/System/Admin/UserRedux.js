import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllCodeService } from '../../../services/userService';
import * as actions from "../../../store/actions"
import './UserRedux.scss';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avata: '',
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
    }

    handleOnChangeImgae = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avata: file
            })
        }
        console.log('check file', file);
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    onChangInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        console.log('check input onchange: ', this.state);
        //fire action redux
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isGetGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName,
            phoneNumber, address, gender, position,
            role, avata } = this.state;

        return (
            <div className="user-redux-container" >
                <div className='title'>Tạo mới người dùng</div>
                <div>{isGetGender === true ? 'Loading gender' : ''}</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12  my-3'>Thêm mới người dùng</div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangInput(event, 'email') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Mật khẩu</label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangInput(event, 'password') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Họ</label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangInput(event, 'firstName') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Tên</label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangInput(event, 'lastName') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Số điện thoại</label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangInput(event, 'phoneNumber') }}
                                ></input>
                            </div>
                            <div className='col-9'>
                                <label>Địa chỉ</label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangInput(event, 'address') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Giới tính</label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (<option key={index} value={item.key}>{item.valueVi}</option>)
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Chức danh</label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (<option key={index} value={item.key}>{item.valueVi}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Vai trò</label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (<option key={index} value={item.key}>{item.valueVi}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Hình ảnh</label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImgae(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'
                                    onClick={() => this.handleSaveUser()}>Save</button>
                            </div>
                        </div>
                    </div>

                </div>
                {/* {this.state.isOpen === true &&
                    <SlideshowLightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                } */}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
