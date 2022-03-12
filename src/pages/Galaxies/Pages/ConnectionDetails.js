import React, { useEffect, useRef, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, TextArea, Form, Select, Icon } from 'semantic-ui-react';
import ErrorPage from '../../../components/ErrorPage';

const connecType = [
    { key: 1, value: 1, text: <Icon name='long arrow alternate left' /> },
    { key: 2, value: 2, text: <Icon name='long arrow alternate right' /> },
    { key: 3, value: 3, text: <Icon name='arrows alternate horizontal' /> },
]

const ConnectionDetails = ({ galaxyId, connId, onClose }) => {
    try {
        const dispatch = useDispatch();
        const formRef = useRef();
        const GalaxyState = useSelector(state => state.galaxies);
        const glx = GalaxyState.galaxies.filter(g => g.id == galaxyId)[0];
        let planetOption = [];
        const [defaults, setDefaults] = useState({
            'planet1': '',
            'planet2': '',
            'connectType': '',
            'description': ''
        })

        glx.planets.map(pl => {
            planetOption.push({
                key: pl.id,
                value: pl.id,
                text: pl.title
            })
        })

        const Save = () => {
            try {
                if (defaults.planet1 == '') {
                    dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Select 1st planet' } })
                }
                else if (defaults.planet2 == '') {
                    dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Select 2nd planet' } })
                }
                else if (defaults.connectType == '') {
                    dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Select connection type' } })
                }
                else if (defaults.planet1 == defaults.planet2) {
                    dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Choose different planets from each other' } })
                }
                else {
                    if (connId == '') {
                        const existConn = glx.connections.filter(c =>
                            (c.p1.id == defaults.planet1 && c.p2.id == defaults.planet2) ||
                            (c.p2.id == defaults.planet1 && c.p1.id == defaults.planet2)
                        )
                        if (existConn.length > 0) {
                            dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Connection already existing' } })
                            return
                        }
                    }

                    dispatch({
                        type: 'SET_PLANET_CONNECTION',
                        payload: {
                            GalaxyId: galaxyId,
                            ConnId: connId,
                            PlanetId1: defaults.planet1,
                            PlanetId2: defaults.planet2,
                            ConnType: defaults.connectType,
                            Description: defaults.description
                        }
                    })
                    onClose()
                }
            }
            catch (e) { console.error(e) }
        }

        useEffect(() => {
            try {
                if (connId != '') {
                    const conInfo = glx.connections.filter(x => x.id == connId)[0];
                    if (conInfo) {
                        setDefaults({
                            'planet1': conInfo.p1.id,
                            'planet2': conInfo.p2.id,
                            'connectType': conInfo.connType,
                            'description': conInfo.description,
                        })
                    }
                }
            }
            catch (e) {
                console.error(e)
            }
        }, [connId])

        return <>
            <Form ref={formRef}>
                <Grid divided className='custom-content center nopad'>
                    <Grid.Row>
                        <Grid.Column>
                            <div style={{ 'color': '#0A9396', 'textAlign': 'left', 'width': '100%', 'marginBottom': '8px' }}>1st Planet</div>
                            <Select onChange={(e, { value }) => setDefaults((prevState) => ({ ...prevState, planet1: value }))} name='firstPlanet' className='custom-dropdown' placeholder='1st Planet' options={planetOption} value={defaults['planet1']} fluid />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div style={{ 'color': '#0A9396', 'textAlign': 'left', 'width': '100%', 'marginBottom': '8px' }}>Connection</div>
                            <Select onChange={(e, { value }) => setDefaults((prevState) => ({ ...prevState, connectType: value }))} className='custom-dropdown' placeholder='Connection Type' options={connecType} value={defaults['connectType']} fluid />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div style={{ 'color': '#0A9396', 'textAlign': 'left', 'width': '100%', 'marginBottom': '8px' }}>2nd Planet</div>
                            <Select onChange={(e, { value }) => setDefaults((prevState) => ({ ...prevState, planet2: value }))} name='secondPlanet' className='custom-dropdown' placeholder='2nd Planet' options={planetOption} value={defaults['planet2']} fluid />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div style={{ 'color': '#0A9396', 'textAlign': 'left', 'width': '100%', 'marginBottom': '8px' }}>Description</div>
                            <TextArea onChange={(e, { value }) => setDefaults((prevState) => ({ ...prevState, description: value }))} value={defaults.description} name='txtDescription' placeholder='Description' className='login' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
            <Button onClick={() => Save()} color='blue' inverted fluid className='dimmer-bottom'>Save</Button></>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default ConnectionDetails;