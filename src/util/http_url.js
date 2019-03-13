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
const uploadUserExcel = (file) => upload('/importUserList?token='+token, file);
const getDeptCount = (token) => post("/department/getDeptCount", token);
const getDept=(token,pageNo)=>post("department/getDept",token,pageNo);
const getDirectors=(token)=>post("/getDirectors",token);
const deleteDept=(token,id)=>post("/department/deleteModel",token,id);
const updateDeptInfo = (token, deptInfo) => postInfo("/department/deptInfo?token=" + token, deptInfo);
const getMeetingByStatus = (token,status) => post("/schedule/getMeetringByStatus",token,status);
const getExpertsInfo = (pageNo,caseTypeId) => post("getExpertsInfo",pageNo,caseTypeId);
const getExpertInfoById = (doctorId) => post("getExpertsInfoById",doctorId)
const getExpertsInfoByName = (name,pageNo,caseTypeId) => post("getExpertsInfoByName",name,pageNo,caseTypeId)
const uploadPic = (formData)=>upload("file/upload",formData);
const uploadExpress = (formData,consultId,type)=>upload("file/uploadExpress?consultId="+consultId+"&type="+type,formData);
const applyBlRequest =(consultInfo,token)=>postInfo("bldoctor/editConsult.htm?token="+token,consultInfo);
const getConsultByConsultId =(consultId,token)=>post("/blinquiry/consultDetail.htm",consultId,token);
const getPayUrl =(consult_id,payType,bcjc,token)=>post("common/consultlist.htm",consult_id,payType,bcjc,token);
const getConsultsInfo =(doctorType,token,userId)=>post("/blinquiry/getCount.htm",doctorType,token,userId);
const getConsultsByUserId =(userId,token,doctorType) => post("/blinquiry/doctorGetConsultList.htm",userId,token,doctorType);
const deleteConsult =(token,consultNo,consultStatus) => post("blConsult/changeStatusByNo",token,consultNo,consultStatus);
const editConsultCollection=(consult_id,token,doctorType,collection)=>post("bldoctor/editConsultCollection.htm",consult_id,token,doctorType,collection);
const expertDiagnose=(consultId,slideEstimate,diagnosisEstimate,diagnose,mirrorView)=>post("blexpert/expertDiagnose.htm",consultId,slideEstimate,diagnosisEstimate,diagnose,mirrorView);
const expertDiagnoseBCJC=(immuneTag,isCandle,materialNum,token)=>post("blexpert/expertAddDiagnose.htm",immuneTag,isCandle,materialNum,token);
const getDiagnoseDetail=(consultId,token)=>post("blexpert/getDiagnoseDetail.htm",consultId,token)
const createPdf=(consult_id,type)=>post("common/createPdf.htm",consult_id,type);
const editAddress =(address_id,province,ity,address,name,phone,isDefault,token)=>post("bldoctor/editAddress.htm",address_id,province,ity,address,name,phone,isDefault,token);
const getAddress=()=>post("blinquiry/getAddresses.htm",null)
const editDefault=(addressId)=>post("bldoctor/editDefault.htm",addressId)
const setBCJCByConsultId=(supplementInfo)=>postInfo("bldoctor/setBCJCByConsultId.htm",supplementInfo);
const getBCJCsectionByConsId=(consult_id)=>post("bldoctor/getBCJCsectionByConsId.htm",consult_id)
const editBCJCByConsultId=(supplementInfo)=>postInfo("bldoctor/editBCJCByConsultId.htm",supplementInfo);
const applyBCJCByExpress=(consultId,addressId)=>post("bldoctor/applyBCJCByExpress.htm",consultId,addressId);
const getConsultCollection=(userId,pageNum)=>post("blinquiry/getConsultCollection.htm",userId,pageNum)
const editMailInfo=(mailCode,mailCompany,address_id)=>post("bldoctor/editMailInfo.htm",mailCode,mailCompany,address_id);
const getAddressByConsultId=(consultId,type)=>post("blinquiry/getAddressByConsultId.htm",consultId,type);
const adminGetConsultList=(form)=>post("blinquiry/adminGetConsultList.htm",form)
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
    uploadPic,
    applyBlRequest,
    getConsultByConsultId,
    getPayUrl,
    getConsultsInfo,
    getConsultsByUserId,
    deleteConsult,
    editConsultCollection,
    expertDiagnose,
    getDiagnoseDetail,
    expertDiagnoseBCJC,
    createPdf,
    editAddress,
    getAddress,
    editDefault,
    setBCJCByConsultId,
    getBCJCsectionByConsId,
    editBCJCByConsultId,
    applyBCJCByExpress,
    getConsultCollection,
    uploadExpress,
    editMailInfo,
    getAddressByConsultId,
    adminGetConsultList
}