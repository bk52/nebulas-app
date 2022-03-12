import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Image } from 'semantic-ui-react';
import ErrorPage from '../../../components/ErrorPage';
import Avatars from '../../../components/Avatars';

const Friends = ({ FriendsType }) => {
    try {
        const UserState = useSelector(state => state.user);
        const friendsArr = FriendsType === 'fl' ? [...UserState.following] : [...UserState.followers]
        return <>
            <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px' }}> {FriendsType === 'fl' ? 'Following' : 'Followers'}</div>
            <div style={{ 'width': '100%', 'textAlign': 'left', 'paddingTop': '48px' }}>
                <List divided verticalAlign='middle'>
                    {
                        friendsArr.map((f, i) => {
                            return <List.Item key={i}>
                                <List.Content floated='right'>
                                    {FriendsType === 'fl' ? <Button style={{ 'backgroundColor': '#7209B7', 'color': 'white' }}>Unfollow</Button> : null}
                                </List.Content>
                                <Image avatar src={Avatars[f.avatar]} />
                                <List.Content>{f.name}</List.Content>
                            </List.Item>
                        })
                    }
                </List>
            </div>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default Friends;