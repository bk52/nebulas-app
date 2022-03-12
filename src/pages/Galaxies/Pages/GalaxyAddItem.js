import React, { useState, useEffect } from 'react';
import { Button, Input, Grid, TextArea, Form, Select } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import { SliderPicker } from 'react-color';
import ErrorPage from '../../../components/ErrorPage';
import { nanoid } from 'nanoid'

const itemType = {
    'sun': 1,
    'planet': 2,
    'orbit': 3
}

const permissionLevels = [
    { key: 'ev', value: 'ev', text: 'Everybody' },
    { key: 'ga', value: 'ga', text: 'Grand Admiral' },
    { key: 'ad', value: 'ad', text: 'Admiral' },
    { key: 'se', value: 'se', text: 'Sergeant' },
    { key: 'wa', value: 'wa', text: 'Warrior' },
]

const AddNewItem = ({ ItemType, GalaxyId = '', PlanetId = '', OrbitId = '', onClose }) => {
    try {
        const dispatch = useDispatch();
        const GalaxyState = useSelector(state => state.galaxies);
        const [defaultValue, setdefaultValue] = useState({
            title: '',
            description: '',
            color: '#fff',
            permission: 'ev'
        })
        let title = '';
        if (ItemType === itemType.sun) {
            title += 'Sun'
        }
        else if (ItemType === itemType.planet) {
            title += 'Planet';
        }
        else if (ItemType === itemType.orbit) {
            title += 'Orbit';
        }

        useEffect(() => {
            try {
                if (GalaxyId != '') {
                    const glx = GalaxyState.galaxies.filter(g => g.id == GalaxyId)[0];
                    if (ItemType == itemType.planet || ItemType == itemType.sun) {
                        if (PlanetId != '') {
                            const planet = glx.planets.filter(p => p.id == PlanetId)[0];
                            setdefaultValue({
                                title: planet.title,
                                description: planet.description,
                                color: planet.color1,
                                permission: planet.permission
                            })
                        }
                    }
                    else if (ItemType == itemType.orbit) {
                        if (OrbitId != '') {
                            const orb = glx.orbits.filter(o => o.id == OrbitId)[0];
                            setdefaultValue({
                                title: orb.title,
                            })
                        }
                    }
                }
            }
            catch (e) {
                console.error(e)
            }
        }, [PlanetId])

        const Save = () => {
            try {
                if (defaultValue.title == '') {
                    dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Please enter a valid title' } })
                }
                else {
                    let newItem;
                    if (ItemType == itemType.sun || ItemType == itemType.planet) {
                        newItem = {
                            ...defaultValue,
                            GalaxyId,
                            OrbitId,
                            PlanetId
                        }
                        dispatch({ type: 'SET_PLANET_ITEM', payload: { ...newItem } })
                    }
                    else {
                        newItem = {
                            ...defaultValue,
                            GalaxyId,
                            OrbitId
                        }
                        dispatch({ type: 'SET_ORBIT_ITEM', payload: { ...newItem } })
                    }
                    onClose()
                }
            }
            catch (e) {
                console.error(e)
            }
        }

        return <>
            <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>{title}</div>
            {
                ItemType === itemType.sun || ItemType === itemType.planet ? <>
                    <Form>
                        <Grid divided className='custom-content center nopad'>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input onChange={(e, { value }) => setdefaultValue((prevState) => ({ ...prevState, title: value }))} value={defaultValue.title} name='txtTitle' placeholder='Name' className='login' fluid />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <TextArea onChange={(e, { value }) => setdefaultValue((prevState) => ({ ...prevState, description: value }))} value={defaultValue.description} name='txtDescription' placeholder='Description' className='login' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div style={{ 'color': '#0A9396', 'textAlign': 'left', 'width': '100%', 'marginBottom': '8px' }}>Color</div>
                                    <SliderPicker color={defaultValue.color} onChangeComplete={(c) => setdefaultValue((prevState) => ({ ...prevState, color: c.hex }))} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div style={{ 'color': '#0A9396', 'textAlign': 'left', 'width': '100%', 'marginBottom': '8px' }}>Permission Level</div>
                                    <Select onChange={(e, { value }) => setdefaultValue((prevState) => ({ ...prevState, permission: value }))} className='custom-dropdown' placeholder='Select permission level' options={permissionLevels} value={defaultValue.permission} fluid />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </> : <>
                    <Form>
                        <Grid divided className='custom-content center nopad'>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input style={{ width: '350px' }} onChange={(e, { value }) => setdefaultValue((prevState) => ({ ...prevState, title: value }))} value={defaultValue.title} name='txtTitle' placeholder='Name' className='login' fluid />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </>
            }
            <Button onClick={() => { Save() }} color='blue' inverted fluid className='dimmer-bottom'>Save</Button>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default AddNewItem;