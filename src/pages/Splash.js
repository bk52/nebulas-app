import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LogoIcon from '../assets/img/logo1sm.png';
import LogoText from '../assets/img/logo2.png';
import BKLogo from '../assets/img/BK.png';
import AppPages from "../AppPages";

export default function Splash() {
    const dispatch = useDispatch();
    useEffect(() => { }, [
        setTimeout(() => {
            dispatch({ type: 'SET_PAGE', payload: { page: AppPages.SIGNIN } })
        }, 2000)
    ])
    return (
        <div style={{ 'padding': '8px' }}>
            <img src={LogoIcon} className='logo' />
            <img src={LogoText} className='logo text' />
            <div className="login-bottom" style={{ 'color': '#FFFFFF', 'fontSize': '18px' }}>Created by <img src={BKLogo} style={{}} /></div>
        </div>
    )

}