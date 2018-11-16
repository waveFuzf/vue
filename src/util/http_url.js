import axios from 'axios'
import { objBase, baseURL,config } from './config'



const get = (_url) => axios.get(_url, objBase);
const post = (_url, obj) => axios.post(_url, obj, objBase);
const upload = (_url, obj) => axios.post(_url, obj, config);

const getAll = () => get('/getAll');
const getByName = (name) => post('/select', name);
const userLogin = (loginName,password) => post("/login",loginName,password);
const uploadPic = (file) => {
	console.log("emmmm");
	console.log(file);
	upload('/file/upload',file);}
export default {
    getAll,
    getByName,
    uploadPic,
    userLogin
}