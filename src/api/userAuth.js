import conf from '../conf/conf'
import { setMessage } from '../store/userAuthSlice';

async function getCurrentUser(dispatch){
    const options = {method: 'GET', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.authUrl}/current-user`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            dispatch(setMessage({error: true, text: apiData.message}))
        }

        return apiData
    } catch (error) {
        console.error("Error fetching current user: ", error)
    }
}

async function register(user, dispatch) {
    const options = {method: 'POST', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(user)};

    try {
        const response = await fetch(`${conf.authUrl}/register`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            dispatch(setMessage({error: true, text: apiData.message}))
        }

        return apiData
        
    } catch (error) {
        console.error("Error while registering: ", error)
    }
}

async function login(user, dispatch) {
    const options = {method: 'POST', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(user),  credentials: 'include'};

    try {
        const response = await fetch(`${conf.authUrl}/login`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            dispatch(setMessage({error: true, text: apiData.message}))
        }

        return apiData
        
    } catch (error) {
        console.error("Error while login: ", error)
    }
    
}

async function logout(dispatch) {
    const options = {method: 'POST', headers: {accept: 'application/json'}, credentials: 'include'}

    try {
        const response = await fetch(`${conf.authUrl}/logout`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            dispatch(setMessage({error: true, text: apiData.message}))
        }

        return apiData
    } catch (error) {
        console.error("Error while logout: ", error)
    }
}

async function refreshToken(dispatch) {
    const options = {method: 'POST', headers: {accept: 'application/json'}};

    try {
        const response = await fetch(`${conf.authUrl}/refresh-token`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            dispatch(setMessage({error: true, text: apiData.message}))
        }

        return apiData
    } catch (error) {
        console.error("Error fetching refreshToken: ", error)
    }
}

async function assignRole(userId, userAssignRole, dispatch) {
    const options = {method: 'POST', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(userAssignRole)};

    try {
        const response = await fetch(`${conf.authUrl}/assign-role/${userId}`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            dispatch(setMessage({error: true, text: apiData.message}))
        }

        return apiData
    } catch (error) {
        console.error("Error while assign role: ", error)
    }
}

async function verifyEmail(token) {
    const options = {method: 'GET', headers: {accept: 'application/json'}}
    try {
        const response = await fetch(`${conf.authUrl}/verify-email/${token}`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while verifying the email ", error)
    }
}

async function resendVerificationEmail(dispatch) {

    const options = {method: 'POST', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.authUrl}/resend-email-verification`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            dispatch(setMessage({error: true, text: apiData.message}))
        }

        return apiData
    } catch (error) {
        console.error("Error fetching refreshToken ", error)
    }
}

export {
    getCurrentUser,
    register,
    login,
    logout,
    refreshToken,
    assignRole,
    resendVerificationEmail,
    verifyEmail
}