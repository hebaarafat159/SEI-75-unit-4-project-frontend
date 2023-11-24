import axios from "axios";
import dayjs from 'dayjs';
const LOCAL_STORAGE_USER_TOKEN_KEY = "access_token"
const LOCAL_STORAGE_REFRECH_TOKEN_KEY = "refresh_token"
const LOCAL_STORAGE_USER_OBJECT_KEY = "user_object"
/* eslint-disable import/no-anonymous-default-export */
export default {
    getUserToken,
    setUserToken,
    removeUserToken,
    storeLoggedInUser,
    getRefreshToken,
    formateDate,
    getUserObject
}

function getUserToken() {
    return localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY, null)
}

function setUserToken(token) {
    localStorage.setItem(LOCAL_STORAGE_USER_TOKEN_KEY, token)
}

function removeUserToken() {
    localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY)
}

function storeLoggedInUser(token, userObject) {
    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem(LOCAL_STORAGE_USER_TOKEN_KEY, token.access);
    localStorage.setItem(LOCAL_STORAGE_REFRECH_TOKEN_KEY, token.refresh);
    localStorage.setItem(LOCAL_STORAGE_USER_OBJECT_KEY, JSON.stringify(userObject));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token["access"]}`;
}

function getRefreshToken() {
    return localStorage.getItem(LOCAL_STORAGE_REFRECH_TOKEN_KEY)
}
function getUserObject() {
    return localStorage.getItem(LOCAL_STORAGE_USER_OBJECT_KEY)
}

function formateDate(date) {
    const formattedDate = dayjs(new Date(date)).format("YYYY-MM-DD")
    console.log(`formated Date: ${formattedDate}`)
    return formateDate

}