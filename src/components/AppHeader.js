import React from 'react';
import { useSelector } from "react-redux";
import { Grid, Icon } from 'semantic-ui-react';
import Avatars from './Avatars';

export default function AppHeader({ onNotificationClick, onSearchClick }) {
    const UserState = useSelector(state => state.user);
    return <Grid className='app-header'>
        <Grid.Row verticalAlign='middle'>
            <Grid.Column width={2} textAlign='center'>
                <img className='avatar' src={Avatars[UserState.avatar]} />
            </Grid.Column>
            <Grid.Column width={10} textAlign='left'>
                <span className='name'>{UserState.name}</span>
            </Grid.Column>
            <Grid.Column width={4} textAlign='right'>
                <Icon onClick={(e) => { onNotificationClick(e) }} className={'active'} name='bell' size='large' />
                <Icon onClick={(e) => { onSearchClick(e) }} name='search' size='large' />
            </Grid.Column>
            {/* <Grid.Column width={1} textAlign='center' style={{}}>
              
            </Grid.Column> */}
        </Grid.Row>
    </Grid>
}

