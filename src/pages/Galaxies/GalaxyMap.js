import React, { Suspense, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown, Checkbox } from 'semantic-ui-react';
import { Node as NodeIcon, VR } from '../../components/SvgIcons';
import ErrorPage from '../../components/ErrorPage';
import SolarSystem2D from '../../components/SolarSystem2D';
import SolarSystem3D from '../../components/SolarSystem3D';
import GraphView from '../../components/GraphView';
import PlanetPreview from './Pages/PlanetPreview';

const MapType = {
    '2D': 1,
    '3D': 2,
    'Graph': 3
};

const GalaxyMap = ({ Id = -1 }) => {
    try {
        const dispatch = useDispatch();
        const [mapType, setmapType] = useState(MapType['2D']);
        const GalaxyState = useSelector(state => state.galaxies);
        const GalaxySettings = useSelector(state => state.glxSettings);
        const glx = GalaxyState.galaxies.filter(g => g.id === Id)[0];
        let content;

        if (mapType === MapType['2D']) {
            content = <SolarSystem2D connections={glx.connections} orbits={glx.orbits} planets={glx.planets} style={{ 'width': '100%', 'height': '100%', 'position': 'absolute' }} />
        }
        else if (mapType == MapType['3D']) {
            content = <SolarSystem3D connections={glx.connections} orbits={glx.orbits} planets={glx.planets} style={{ 'width': '100%', 'height': '100%', 'position': 'absolute' }} />
        }
        else if (mapType == MapType['Graph']) {
            content = <GraphView connections={glx.connections} planets={glx.planets} />
        }

        return <>
            {content}
            {
                mapType != MapType['Graph'] && <div style={{ 'position': 'absolute', 'bottom': '16px', 'left': '8px' }}>
                    <Dropdown
                        upward
                        icon='filter'
                        floating
                        button
                        className='icon'
                        style={{ 'height': '42px', 'paddingTop': '14px' }}>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => { dispatch({ type: 'VIEW_TOGGLE_CONNECTIONS' }) }}>
                                <Checkbox
                                    label='Connections'
                                    checked={GalaxySettings.showConnections}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => { dispatch({ type: 'VIEW_TOGGLE_LABELS' }) }}>
                                <Checkbox
                                    label='Labels'
                                    checked={GalaxySettings.showLabels}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => { dispatch({ type: 'VIEW_TOGGLE_PROGRESS' }) }}>
                                <Checkbox
                                    label='Progress'
                                    checked={GalaxySettings.showProgress}
                                    onChange={(e, data) => console.log(data.checked)}
                                />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            }

            {
                mapType == MapType['3D'] && <div style={{ 'position': 'absolute', 'bottom': '70px', 'left': '50%', 'transform': 'translateX(-50%)' }}>
                    <Button circular style={{ 'padding': '10px' }} onClick={() => dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'VR mode not available in beta version' } })}>
                        <VR style={{ 'height': '20px' }} />
                    </Button>
                </div>
            }

            <div style={{ 'position': 'absolute', 'bottom': '16px', 'left': '50%', 'transform': 'translateX(-50%)' }}>
                <Button.Group>
                    <Button style={{ color: (mapType == MapType['2D'] ? 'black' : '') }} onClick={() => setmapType(MapType['2D'])}>2D</Button>
                    <Button style={{ color: (mapType == MapType['3D'] ? 'black' : '') }} onClick={() => setmapType(MapType['3D'])}>3D</Button>
                    <Button style={{ color: (mapType == MapType['Graph'] ? 'black' : '') }} onClick={() => setmapType(MapType['Graph'])}><NodeIcon style={{ 'height': '20px' }} /></Button>
                </Button.Group>
            </div>

            <div style={{ 'position': 'absolute', 'bottom': '16px', 'right': '8px' }}>
                <Button.Group vertical>
                    <Button onClick={() => { dispatch({ type: 'SET_ZOOM', payload: { zoom: GalaxySettings.zoom + 0.5 } }) }} disabled={GalaxySettings.zoom > 4} icon='zoom-in' style={{ 'height': '42px', 'paddingTop': '14px', 'marginBottom': '8px' }} />
                    <Button onClick={() => { dispatch({ type: 'SET_ZOOM', payload: { zoom: GalaxySettings.zoom - 0.5 } }) }} disabled={GalaxySettings.zoom < 1} icon='zoom-out' style={{ 'height': '42px', 'paddingTop': '14px' }} />
                </Button.Group>
            </div>

            <PlanetPreview GalaxyId={Id} />

        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default GalaxyMap;