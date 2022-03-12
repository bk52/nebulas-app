import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import AppSettings from './Pages/AppSettings';
import Profile from './Pages/Profile';

export default function Settings({ onSubPage }) {
    const [tab, setTab] = useState(1);

    return <>
        <Grid className='app-header' columns='equal' divided inverted padded >
            <Grid.Row textAlign='center' style={{ 'cursor': 'pointer', 'color': '#c4c4c4' }}>
                <Grid.Column onClick={(e) => setTab(1)} verticalAlign='middle' style={tab == 1 ? { 'color': '#0A9396', 'fontWeight': 'bold' } : {}}>Profile</Grid.Column>
                <Grid.Column onClick={(e) => setTab(2)} verticalAlign='middle' style={tab == 2 ? { 'color': '#0A9396', 'fontWeight': 'bold' } : {}}>App</Grid.Column>
            </Grid.Row>
        </Grid>
        <div style={{ 'padding': '8px', 'overflowY': 'scroll', 'height': 'calc(100% - 1px)' }}>
            {tab === 1 ? <Profile onSubPage={onSubPage} /> : <AppSettings />}
        </div>
    </>
}





