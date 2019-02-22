import axios from 'axios'
import { objBase,config, objInfo} from './config'


const get = (_url) => axios.get(_url, objBase);
const post = (_url, obj) => axios.post(_url, obj, objBase);
const upload = (_url, obj) => axios.post(_url, obj, config);
const postInfo = (_url, obj) => axios.post(_url, obj, objInfo);

const getAll = (token, pageNo) => post('/getAll', token, pageNo);
const getByName = (name) => post('/select', name);
const userLogin = (loginName, password) => post("/login", loginName, password);
const userSign = (loginName, password) => post("/sign", loginName, password);
const userLogout = (token, username) => post("/logout", token, username);
const deleteUser = (token, userId) => post("/deleteUser", token, userId);
const getDeptsList = (token) => post("/department/getAll", token);
const updateUserInfo = (token, userInfo) => postInfo("/userInfo?token=" + token, userInfo);
const getUserInfo = (token) => post("/getMyInfo", token);
const getUserCount = (token) => post("/getUserCount", token);
const getUserBynameCount = (token) => post("/countUsersByName", token);
const uploadUserExcel = (file,token) => upload('/importUserList?token='+token, file);
const getDeptCount = (token) => post("/department/getDeptCount", token);
const getDept=(token,pageNo)=>post("department/getDept",token,pageNo);
const getDirectors=(token)=>post("/getDirectors",token);
const deleteDept=(token,id)=>post("/department/deleteModel",token,id);
const updateDeptInfo = (token, deptInfo) => postInfo("/department/deptInfo?token=" + token, deptInfo);
const getMeetingByStatus = (token,status) => post("/schedule/getMeetringByStatus",token,status);
const getExpertsInfo = (pageNo,caseTypeId) => post("getExpertsInfo",pageNo,caseTypeId);
const getExpertInfoById = (doctorId) => post("getExpertsInfoById",doctorId)
const getExpertsInfoByName = (name) => post("getExpertsInfoByName",name)
const uploadPic = (formData,token)=>upload("file/upload?token="+token,formData);
export default {
    getAll,
    getByName,
    uploadUserExcel,
    userLogin,
    userSign,
    userLogout,
    deleteUser,
    getDeptsList,
    updateUserInfo,
    getUserInfo,
    getUserCount,
    getUserBynameCount,
    getDeptCount,
    getDept,
    getDirectors,
    deleteDept,
    updateDeptInfo,
    getMeetingByStatus,
    getExpertsInfo,
    getExpertInfoById,
    getExpertsInfoByName,
    uploadPic
}