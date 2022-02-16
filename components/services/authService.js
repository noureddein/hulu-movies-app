import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiUrl = '/login'
const tokenKey = 'token'


async function login(email, password) {
    const { data } = await http.post(apiUrl, { email, password })
    if (data.errors) return data
    localStorage.setItem(tokenKey, data.token)
    return data
}



function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt)
}

function logout() {
    localStorage.removeItem(tokenKey)
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt)
    } catch (ex) {
        return null
    }
}

function getJwt() {
    return localStorage.getItem('token')
}



const auth = {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,

}

export default auth;