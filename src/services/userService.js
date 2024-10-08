import { stringify } from "react-auth-wrapper/helpers";
import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  //temlate string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
}

const saveDetailDoctorService = (data) => {
  return axios.post('/api/save-infor-doctor', data);
}

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor?id=${inputId}`);
}

const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleDoctor = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`);
}

const getInforDoctor = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctor = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBooking = (data) => {
  return axios.post('/api/patient-book-appointmnet', data);
}

const postVerifyBookAppointment = (data) => {
  return axios.post('/api/verify-book-appointmnet', data);
}

const createNewSpecialty = (data) => {
  return axios.post('/api/create-new-specialty', data);
}

const getAllSpecialty = (data) => {
  return axios.get(`/api/get-specialty`);
}

const getDetailSpecialty = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const getAllPatientDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}
const updatePatientStatus = (data) => {
  return axios.put(`/api/update-status?patientId=${data.patientId}&doctorId=${data.doctorId}`);
};

export {
  handleLoginApi, getAllUsers,
  createNewUserService, deleteUserService,
  editUserService, getAllCodeService,
  getTopDoctorHomeService, getAllDoctors,
  saveDetailDoctorService, getDetailInforDoctor,
  saveBulkScheduleDoctor, getScheduleDoctor,
  getInforDoctor, getProfileDoctor, postPatientBooking,
  postVerifyBookAppointment, createNewSpecialty,
  getAllSpecialty, getDetailSpecialty, getAllPatientDoctor,
  updatePatientStatus
};
