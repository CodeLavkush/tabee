import conf from '../conf/conf'
import { toast } from 'sonner';

async function getCurrentUser(){
    const options = {method: 'GET', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.authUrl}/current-user`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
    } catch (error) {
        console.error("Error fetching current user: ", error)
    }
}

async function register(user) {
    const options = {method: 'POST', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(user)};

    try {
        const response = await fetch(`${conf.authUrl}/register`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
        
    } catch (error) {
        console.error("Error while registering: ", error)
    }
}

async function login(user) {
    const options = {method: 'POST', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(user),  credentials: 'include'};

    try {
        const response = await fetch(`${conf.authUrl}/login`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
        
    } catch (error) {
        console.error("Error while login: ", error)
    }
    
}

async function logout() {
    const options = {method: 'POST', headers: {accept: 'application/json'}}

    try {
        const response = await fetch(`${conf.authUrl}/logout`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
    } catch (error) {
        console.error("Error while logout: ", error)
    }
}

async function refreshToken() {
    const options = {method: 'POST', headers: {accept: 'application/json'}};

    try {
        const response = await fetch(`${conf.authUrl}/refresh-token`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
    } catch (error) {
        console.error("Error fetching refreshToken: ", error)
    }
}

async function assignRole(userId, userAssignRole) {
    const options = {method: 'POST', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(userAssignRole)};

    try {
        const response = await fetch(`${conf.authUrl}/assign-role/${userId}`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
    } catch (error) {
        console.error("Error fetching refreshToken: ", error)
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

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
    } catch (error) {
        return "Error while verifying the email"
    }
}

async function resendVerificationEmail() {

    const options = {method: 'POST', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.authUrl}/resend-email-verification`, options)

        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.success){
            toast("Error", {
                description: apiData.message
            })
        }

        return apiData
    } catch (error) {
        return "Error fetching refreshToken"
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