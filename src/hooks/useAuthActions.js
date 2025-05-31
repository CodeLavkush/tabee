import { useDispatch } from "react-redux";
import * as authService from '../api/userAuth'


export function useAuthActions(){
    const dispatch = useDispatch()

    const getCurrentUser = async ()=>{
        return await authService.getCurrentUser(dispatch)
    }

    const userRegister = async (user)=>{
        return await authService.register(user, dispatch)
    }

    const login = async (user)=>{
        return await authService.login(user, dispatch)
    }

    const userLogout = async ()=>{
        return await authService.logout(dispatch)
    }

    const getRefreshToken = async ()=>{
        return await authService.refreshToken(dispatch)
    }

    const assignRole = async (userId, userAssignRole)=>{
        return await authService.assignRole(userId, userAssignRole, dispatch)
    }

    const verifyEmail = async (token)=>{
        return await authService.verifyEmail(token)
    }

    const resendVerificationEmail = async ()=>{
        return await authService.resendVerificationEmail(dispatch)
    }

    return {
        getCurrentUser,
        userRegister,
        login,
        userLogout,
        getRefreshToken,
        assignRole,
        resendVerificationEmail,
        verifyEmail,
    }

}