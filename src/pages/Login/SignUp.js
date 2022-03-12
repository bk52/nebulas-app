import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import AppPages from '../../AppPages';
import { types } from '../../redux/constants/action-types';
import { Input, Grid, Button, Icon, Message, Dimmer } from 'semantic-ui-react';
import LogoIcon from '../../assets/img/logo1sm.png';
import LogoText from '../../assets/img/logo2.png';

export default function SignUp() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState({ show: false, title: '', msg: '' });
    const [dimActive, setDimActive] = useState(false);
    const formRef = useRef();

    const onSignUp = (e) => {
        e.preventDefault();
        setDimActive(true);
    }

    const onSignIn = (e) => {
        e.preventDefault();
        dispatch({ type: types.SET_PAGE, payload: { page: AppPages.SIGNIN } });
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
                        <Input name='txtName' icon='user' iconPosition='left' placeholder='Name' className='login' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input name='txtMail' icon='mail' iconPosition='left' placeholder='Mail' className='login' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input name='txtPassword' type='password' icon='key' iconPosition='left' placeholder='Password' className='login' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Button onClick={(e) => onSignUp(e)} icon labelPosition='left' className='btn-sign-in'><Icon name='rocket' />Sign Up</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </form>

        <div style={{ 'color': '#C4C4C4', 'fontWeight': 'normal' }}>Already have an account?  <span onClick={(e) => onSignIn(e)} style={{ 'color': 'white', 'fontWeight': 'bold', 'cursor': 'pointer' }}>Sign In</span></div>
        <Dimmer active={dimActive}>
            We cannot accept new users in beta version. <br /><br />Please continue with the default user.
            <Button onClick={(e) => { e.preventDefault(); setDimActive(false) }} inverted color='blue' className='dimmer-bottom'>OK</Button>
        </Dimmer>

    </div>
}