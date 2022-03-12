import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { Input, Grid, Button, Icon, Message, Loader } from 'semantic-ui-react';
import AppPages from '../../AppPages';
import { types } from '../../redux/constants/action-types';
import LogoIcon from '../../assets/img/logo1sm.png';
import LogoText from '../../assets/img/logo2.png';

export default function SignIn() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState({ show: false, title: '', msg: '' });
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    const onSignIn = (e) => {
        e.preventDefault();
        const mail = formRef.current["txtMail"].value;
        const pass = formRef.current["txtPassword"].value;
        dispatch({ type: types.GO_LOADING, payload: { page: AppPages.MAIN, galaxyId: -1 } });
    }

    const onSignUp = (e) => {
        e.preventDefault();
        dispatch({ type: types.SET_PAGE, payload: { page: AppPages.SIGNUP } });
    }

    return <div style={{ 'padding': '8px' }}>
        <img src={LogoIcon} className='logo' />
        <img src={LogoText} className='logo text' />

        <form ref={formRef}>
            <Grid divided className='custom-content center nopad' style={{ 'marginTop': '40px' }}>
                {
                    message.show && <Grid.Row>
                        <Grid.Column>
                            <Message className='custom' header={message.title} content={message.msg} />
                        </Grid.Column>
                    </Grid.Row>
                }
                <Grid.Row>
                    <Grid.Column>
                        <Input name='txtMail' icon='mail' iconPosition='left' placeholder='Mail' className='login' defaultValue='example@mail.com' disabled />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input name='txtPassword' type='password' icon='key' iconPosition='left' placeholder='Password' className='login' defaultValue='12345678' disabled />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {loading ? <Loader active inline='centered' /> : <Button onClick={(e) => onSignIn(e)} icon labelPosition='left' className='btn-sign-in'><Icon name='rocket' />Sign In</Button>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </form>

        <div style={{ 'color': '#C4C4C4', 'fontWeight': 'normal' }}>Don’t have an account? <span onClick={(e) => onSignUp(e)} style={{ 'color': 'white', 'fontWeight': 'bold', 'cursor': 'pointer' }}>Sign Up</span></div>
    </div>
}