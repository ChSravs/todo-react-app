import {fetchAllItems} from './actions'
var axios = require('axios');

//Service to get all Products list
export const getItemsList = (dispatch) => {
  return function (dispatch) {
    axios.get('http://localhost:8000/products/getItems',{})
    .then(function (response) {
        dispatch(fetchAllItems(response))      
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

//Service of User Registration
export const addUser = (userdata) => {
    return function(dispatch){
    axios.post('http://localhost:8000/customers/signup', {
        username:userdata.username,
        firstName:userdata.firstname,
        lastName:userdata.lastname,
        DOB:userdata.DOB,
        password:userdata.password,
        Gender:userdata.Gender
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
}

//Service of Admin Login
//Service of User Registration
export const isAdmin = (userdata) => {
    return function(dispatch){
    axios.post('http://localhost:8000/admin/login', {
        username:userdata.username,
        password:userdata.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
}
export const getSwitchStatus = () => {
  return function (dispatch) {
    axios.get('http://localhost:8000/products/getItems',{})
    .then(function (response) {
        dispatch(fetchAllItems(response))      
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}