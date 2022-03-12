import React, { useState } from "react";
import { Provider } from "react-redux";
import { Checkbox, Grid } from 'semantic-ui-react';
import Phone from './assets/img/device/Phone.png'
import Tablet from './assets/img/device/Tablet.png'
import App from "./App.js";
import store from "./redux/store";

export default function Nebulas() {
    const [device, setDevice] = useState('tablet');
    return <Provider store={store}>
        <Grid className="demo-grid" container centered stackable verticalAlign='middle'>
            <Grid.Row>
                <Grid.Column style={{ width: '750px', minHeight: '940px' }}>
                    <div className="device-switch" style={{ 'width': (device === 'tablet' ? '720px' : '420px') }}>
                        <span>Phone <Checkbox toggle checked={device == 'tablet'} onChange={(e, data) => { data.checked ? setDevice('tablet') : setDevice('phone') }} /> Tablet</span>
                    </div>
                    <div className={"device " + (device === 'phone' ? 'phone' : '')}>
                        <div id="app" className={(device === 'phone' ? 'phone' : 'tablet')}><App /></div>
                        <img className={(device === 'phone' ? 'mockUp-phone' : 'mockUp-tablet')} src={(device === 'phone' ? Phone : Tablet)} />
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Provider>
}

