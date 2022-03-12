import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ErrorPage from '../../../components/ErrorPage';
import { Button, Dimmer, List, Header } from 'semantic-ui-react';
import DefinitionList from '../../../components/DefinitionList';
import AddNewItem from './GalaxyAddItem';

const itemType = {
    'sun': 1,
    'planet': 2,
    'orbit': 3
}

const SunDefinition = ({ sun, onEdit }) => {
    const dispatch = useDispatch();
    return sun ? <List>
        <List.Item style={{ 'paddingBottom': '8px' }}>
            <List.Content>
                <div style={{ 'display': 'flex', 'alignItems': 'center' }}>
                    <div style={{ 'backgroundColor': `${sun.color1}`, 'width': '50px', 'height': '50px', 'borderRadius': '25px', 'marginRight': '8px' }}></div>
                    <div style={{ 'width': 'calc(100% - 150px)', 'color': '#c4c4c4' }}>{sun.title}</div>
                    <Button onClick={() => onEdit(itemType.sun, sun.id)} circular icon='edit' style={{ 'backgroundColor': 'rgba(255, 165, 0,0.2)', 'color': '#c4c4c4' }} />
                    <Button onClick={() => { dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Default definitions cannot be deleted in beta' } }) }} circular icon='trash' style={{ 'backgroundColor': 'rgba(255, 0, 0,0.2)', 'color': '#c4c4c4' }} />
                </div>
            </List.Content>
        </List.Item>
    </List> : <Button onClick={null} color='orange' inverted fluid>Add Sun</Button>
}

const GalaxyDefinitions = ({ Id }) => {
    try {
        const dispatch = useDispatch();
        const [deleteModal, setDeleteModal] = useState({
            ItemType: '',
            ItemId: '',
            visible: false
        });
        const [editMenu, setEditMenu] = useState(
            {
                ItemType: itemType.sun,
                PlanetId: '',
                OrbitId: '',
                visible: false
            })
        const GalaxyState = useSelector(state => state.galaxies);
        const glx = GalaxyState.galaxies.filter(g => g.id === Id)[0];

        const CloseEditMenu = () => {
            setEditMenu({
                ItemType: itemType.sun,
                ItemId: '',
                OrbitId: '',
                visible: false
            })
        }

        const OnButtonClicked = (ActionType, ItemType, PlanetId = '', OrbitId = '') => {
            if (ActionType == 'deletePlanet') {
                setDeleteModal({ ItemType: itemType.planet, ItemId: PlanetId, visible: true })
            }
            else if (ActionType == 'deleteOrbit') {
                setDeleteModal({ ItemType: itemType.orbit, ItemId: OrbitId, visible: true })
            }
            else {
                setEditMenu({ ItemType, PlanetId, OrbitId, visible: true })
            }
        }

        const sun = glx.planets.filter(p => p.type === 's')[0];
        return <div style={{ 'textAlign': 'left', 'paddingLeft': '8px', 'paddingRight': '8px' }}>
            <label style={{ 'color': '#0A9396' }}>Sun</label>
            <SunDefinition sun={sun} onEdit={(ItemType, PlanetId) => { setEditMenu({ ItemType, PlanetId, OrbitId: '', visible: true }) }} />
            <label style={{ 'color': '#0A9396' }}>Planets</label>
            <Button onClick={() => { OnButtonClicked('addOrbit', itemType.orbit) }} style={{ 'marginTop': '8px' }} color='teal' inverted fluid>Add Orbit</Button>
            <DefinitionList GalaxyId={Id} Planets={glx.planets} Orbits={glx.orbits} OnButtonClicked={OnButtonClicked} />

            <Dimmer verticalAlign='top' active={editMenu.visible} style={{ 'overflowY': 'scroll', 'alignItems': 'center' }}>
                <Button onClick={(e) => { CloseEditMenu() }} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
                <div className='custom-content'>
                    {editMenu.visible && <AddNewItem onClose={CloseEditMenu} PlanetId={editMenu.PlanetId} GalaxyId={Id} OrbitId={editMenu.OrbitId} ItemType={editMenu.ItemType} />}
                </div>
            </Dimmer>

            {
                deleteModal.visible && <Dimmer verticalAlign='top' active={true} style={{ 'overflowY': 'scroll', 'alignItems': 'center' }}>
                    <div className='custom-content'>
                        <Header style={{ color: '#c4c4c4', fontSize: '1.5em' }}>{
                            deleteModal.ItemType == itemType.orbit ? 'Do you want to delete the orbit? ' : 'Do you want to delete the planet? '
                        }Planet connections will also be deleted.
                        </Header>
                        <div className='dimmer-bottom' style={{ display: 'flex' }}>
                            <Button onClick={() => {
                                if (deleteModal.ItemType == itemType.planet) {
                                    dispatch({ type: 'DELETE_PLANET_ITEM', payload: { GalaxyId: Id, PlanetId: deleteModal.ItemId } })
                                }
                                else if (deleteModal.ItemType == itemType.orbit) {
                                    dispatch({ type: 'DELETE_ORBIT_ITEM', payload: { GalaxyId: Id, OrbitId: deleteModal.ItemId } })
                                }
                                setDeleteModal({ PlanetId: '', visible: false })
                            }} color='red' inverted fluid>Delete</Button>
                            <Button onClick={() => { setDeleteModal({ ItemId: '', visible: false }) }} color='green' inverted fluid>Cancel</Button>
                        </div>
                    </div>
                </Dimmer>
            }
        </div>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default GalaxyDefinitions;