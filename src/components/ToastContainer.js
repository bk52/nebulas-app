import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import { types } from '../redux/constants/action-types';


const ToastContainer = () => {
    const dispatch = useDispatch();
    const ToastState = useSelector(state => state.toast);
    let icon;
    let bColor = '#000';
    if (ToastState.toastType == 'error') {
        icon = <Icon size='large' name='close' />
        bColor = '#AE2012';
    }
    else if (ToastState.toastType == 'success') {
        icon = <Icon size='large' name='check' />;
        bColor = '#21BA45';
    }
    else if (ToastState.toastType == 'warning') {
        icon = <Icon size='large' name='warning sign' />;
        bColor = '#CA6702';
    }
    else {
        icon = <Icon size='large' name='info circle' />
    }

    useEffect(() => {
        if (ToastState.active) {
            setTimeout(() => { dispatch({ type: types.HIDE_TOAST, payload: {} }) }, 2500);
        }
    }, [
        ToastState.active
    ])

    return ToastState.active ? <div id='customToast' style={{ 'backgroundColor': `${bColor}` }}>
        <div id='toastContent'>
            <div id='toastIcon' style={{ 'width': '30px' }}>{icon} </div>
            <div id='toastText' style={{ 'width': '100%', 'marginLeft': '8px' }}>{ToastState.text}</div>
        </div>
    </div> : <></>
}

export default ToastContainer;