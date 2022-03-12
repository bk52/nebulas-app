import React from 'react';
import { ItemImage, Segment } from 'semantic-ui-react';
import { DateTime } from "luxon";
import Error from '../../../components/ErrorPage';
import Avatars from '../../../components/Avatars';
import AchIcons from '../../../components/Achievements';

const NotifyType = {
    'Event': { id: 1, color: '#480CA8' },
    'Follow': { id: 2, color: '#F72585' },
    'Badge': { id: 3, color: '#EE9B00' },
}

const NotificationData = [
    {
        icon: Avatars['avatar2'],
        text: 'Thomas A. Parker created a new galaxy',
        type: 'Event',
        dt: '2022-02-21T13:33:03'
    },
    {
        icon: Avatars['avatar3'],
        text: 'Edna Riley following you now',
        type: 'Follow',
        dt: '2022-02-20T16:33:03'
    },
    {
        icon: Avatars['avatar2'],
        text: 'Thomas A. Parker invited you to Ocean Cleanup galaxy',
        type: 'Event',
        dt: '2022-02-18T14:33:03'
    },
    {
        icon: Avatars['avatar2'],
        text: 'Thomas A. Parker became a Grand Admiral on Robot Dog galaxy',
        type: 'Event',
        dt: '2022-02-15T12:33:03'
    },
    {
        icon: AchIcons['Ach6'],
        text: 'You have earned a ANGEL INVESTOR badge',
        type: 'Badge',
        dt: '2022-02-13T11:33:03'
    }
]

const Notifications = () => {
    try {
        return <>
            <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Notifications</div>
            {
                NotificationData.map((item, index) => {
                    const dt = new Date(item.dt);
                    return <Segment key={index} inverted style={{ 'display': 'flex', 'padding': '4px', 'backgroundColor': (NotifyType[item.type].color) }}>
                        <div style={{ 'width': '50px' }}><img style={{ 'width': '30px', 'height': '30px', 'borderRadius': '15px' }} src={item.icon} /></div>
                        <div style={{ 'width': 'calc(100% - 50px)', 'textAlign': 'left', 'paddingLeft': '4px' }}>
                            <div>{item.text}</div>
                            <div style={{ 'fontSize': '10px', 'color': '#C4C4C4', 'marginTop': '4px' }}>{DateTime.fromMillis(dt.getTime()).setLocale('en').toRelative()}</div>
                        </div>
                    </Segment>
                })
            }
        </>
    }
    catch (e) {
        return <Error />
    }
}

export default Notifications;