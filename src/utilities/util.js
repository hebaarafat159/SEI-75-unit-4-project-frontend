import axios from "axios";
import dayjs from 'dayjs';
const LOCAL_STORAGE_USER_TOKEN_KEY = "access_token"
const LOCAL_STORAGE_REFRECH_TOKEN_KEY = "refresh_token"


export default {
    getUserToken,
    setUserToken,
    removeUserToken,
    storeLoggedInUser,
    getRefreshToken,
    formateDate
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

function storeLoggedInUser(data) {
    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem(LOCAL_STORAGE_USER_TOKEN_KEY, data.access);
    localStorage.setItem(LOCAL_STORAGE_REFRECH_TOKEN_KEY, data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
}

function getRefreshToken() {
    return localStorage.getItem(LOCAL_STORAGE_REFRECH_TOKEN_KEY)
}

function formateDate(date) {
    const formattedDate = dayjs(new Date(date)).format("YYYY-MM-DD")
    console.log(`formated Date: ${formattedDate}`)
    return formateDate

}