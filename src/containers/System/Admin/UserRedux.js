import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllCodeService } from '../../../services/userService';
import * as actions from "../../../store/actions"
import './UserRedux.scss';
import TableManageUser from './TableManageUser';
import { CRUD_Actions, CommonUtils } from "../../../utils";


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            // isUserCreated: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        //check khi co thay doi nguoi dung se load lai 
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrPositions = this.props.positionRedux;
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_Actions.CREATE,
                previewImgURL: '',
            })
        }
    }

    handleOnChangeImgae = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
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

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        // 
        console.log('check handle edit user from parent: ', user);
        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_Actions.EDIT,
            userEditId: user.id,
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
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_Actions.CREATE) {
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
                avatar: this.state.avatar,
            })
        }
        if (action === CRUD_Actions.EDIT) {
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isGetGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName,
            phoneNumber, address, gender, position,
            role, avatar } = this.state;

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
                                    onChange={(event) => {
                                        this.onChangInput(event, 'email')
                                    }}
                                    disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Mật khẩu</label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => {
                                        this.onChangInput(event, 'password')
                                    }}
                                    disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
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
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (<option key={index} value={item.keyMap}>{item.valueVi}</option>)
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Chức danh</label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangInput(event, 'position') }}
                                    value={position}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (<option key={index} value={item.keyMap}>{item.valueVi}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Vai trò</label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangInput(event, 'role') }}
                                    value={role}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (<option key={index} value={item.keyMap}>{item.valueVi}</option>)
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
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_Actions.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}> {this.state.action === CRUD_Actions.EDIT ? 'Lưu cập nhật ' : 'Lưu người dùng'} </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action} />
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
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
