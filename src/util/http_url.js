import axios from 'axios'
import { objBase, baseURL, config,objInfo} from './config'
import { userInfo } from 'os';



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
const updateUserInfo =(token,userInfo)=>postInfo("/userInfo?token="+token,userInfo);
const getUserInfo = (token)=>post("/getMyInfo",token);
const getUserCount=(token)=>post("/getUserCount",token);
const uploadPic = (file) => {
    console.log("emmmm");
    console.log(file);
    upload('/file/upload', file);
}
export default {
    getAll,
    getByName,
    uploadPic,
    userLogin,
    userSign,
    userLogout,
    deleteUser,
    getDeptsList,
    updateUserInfo,
    getUserInfo,
    getUserCount
}