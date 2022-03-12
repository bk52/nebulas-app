import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Dimmer, Label, Progress, List, Icon } from 'semantic-ui-react';
import ErrorPage from '../../../components/ErrorPage';
import RocketImg from '../../../assets/img/rocket.gif';
import AppPages from '../../../AppPages';

const PreviewTab = {
    'Info': 1,
    'Connected': 2,
    'Contributions': 3
}

const connIcon = {
    '1': 'long arrow alternate left',
    '2': 'long arrow alternate right',
    '3': 'arrows alternate horizontal'
}

const PreviewGeneral = ({ planet }) => {
    return planet ? <>   <div style={{ 'textAlign': 'left', 'marginTop': '48px' }}>
        <Label as='a' color='teal' content='Progress' ribbon />
        <div style={{ 'display': 'flex', 'width': '100%', 'marginTop': '8px' }}>
            <img src={RocketImg} style={{ 'width': '30px', 'height': '30px', 'marginTop': '8px' }} />
            <Progress percent={planet.progress} color='teal' style={{ 'width': '100%', 'marginLeft': '16px', 'marginRight': '16px', 'backgroundColor': 'rgba(196,196,196,0.3)', 'marginBottom': '0px' }} progress active />
            <div style={{ 'width': '50px' }}>
                <div style={{ 'width': '30px', 'height': '30px', 'borderRadius': '15px', 'backgroundColor': (planet.color1), 'marginTop': '8px' }}></div>
            </div>
        </div>
        <div style={{ 'marginTop': '32px', 'textAlign': 'justify', 'color': '#c4c4c4' }}>
            {planet.description}
        </div>
    </div></> : <></>
}

const PreviewConnections = ({ connections }) => {
    return <List>
        {
            connections.map((c, i) => {
                return <List.Item key={i} style={{ 'paddingBottom': '8px' }}>
                    <List.Content>
                        <div style={{ 'alignItems': 'center', 'border': '1px solid #c4c4c4', 'borderRadius': '4px', 'padding': '8px', 'justifyContent': 'space-between' }}>
                            <div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                                <div style={{ 'width': '40px', 'height': '40px', 'borderRadius': '20px', 'backgroundColor': (c.p1.color1) }}></div>
                                <div style={{ 'width': '80px' }}>
                                    <div style={{ 'width': '100%', 'color': (c.p1.color1) }}>{c.p1.name}</div>
                                    <div style={{ 'width': '100%', 'fontSize': '10px', 'color': '#c4c4c4' }}>{c.p1.orbit}</div>
                                </div>
                                <Icon name={connIcon[c.connType]} size='big' color='grey' />
                                <div style={{ 'width': '40px', 'height': '40px', 'borderRadius': '20px', 'backgroundColor': (c.p2.color1) }}></div>
                                <div style={{ 'width': '80px' }}>
                                    <div style={{ 'width': '100%', 'color': (c.p2.color1) }}>{c.p2.name}</div>
                                    <div style={{ 'width': '100%', 'fontSize': '10px', 'color': '#c4c4c4' }}>{c.p2.orbit}</div>
                                </div>
                            </div>
                            <div style={{ 'width': '100%', 'color': '#fffff', 'textAlign': 'left', 'marginTop': '8px' }}>
                                {c.description}
                            </div>
                        </div>

                    </List.Content>
                </List.Item>
            })
        }
    </List>
}

const PlanetPreview = ({ GalaxyId }) => {
    try {
        const dispatch = useDispatch();
        const [tab, setTab] = useState(PreviewTab.Info);
        const [selected, setSelected] = useState({ planet: null, connections: null })
        const GalaxySelected = useSelector(state => state.glxSelect);
        const GalaxiesState = useSelector(state => state.galaxies);
        let content;
        if (tab == PreviewTab.Info) {
            content = <PreviewGeneral planet={selected.planet} />
        }
        else if (tab == PreviewTab.Connected) {
            content = <PreviewConnections connections={selected.connections} />
        }

        useEffect(() => {
            try {
                if (GalaxySelected.selected != '') {
                    const glx = GalaxiesState.galaxies.filter(g => g.id == GalaxyId)[0];
                    const pl = glx.planets.filter(p => p.id == GalaxySelected.selected)[0];
                    const conn = glx.connections.filter(c => c.p1.id == GalaxySelected.selected || c.p2.id == GalaxySelected.selected);
                    setSelected({ planet: pl, connections: conn })
                }
            }
            catch (e) {
                console.error(e)
            }
        }, [GalaxySelected.selected])

        return <>
            <Dimmer verticalAlign='top' active={GalaxySelected.selected != ""} style={{ 'overflowY': 'scroll' }}>
                <Button onClick={(e) => { dispatch({ type: 'SET_GALAXY', payload: { id: '' } }) }} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
                <div className='custom-content'>
                    <div style={{ 'color': (selected.planet && selected.planet.color1), 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                        <div style={{ 'width': '40px', 'height': '40px', 'borderRadius': '20px', 'backgroundColor': (selected.planet && selected.planet.color1), 'marginRight': '8px' }}></div>
                        {selected.planet && selected.planet.title}
                    </div>

                    <Button.Group fluid style={{ 'marginTop': '16px' }}>
                        <Button onClick={() => setTab(PreviewTab.Info)} inverted={tab != PreviewTab.Info} color='teal'>General</Button>
                        <Button onClick={() => setTab(PreviewTab.Connected)} inverted={tab != PreviewTab.Connected} color='teal' >Connections</Button>
                        {/* <Button onClick={() => setTab(PreviewTab.Contributions)} inverted={tab != PreviewTab.Contributions} color='teal'>Contributors</Button> */}
                    </Button.Group>
                    {content}
                    <Button onClick={() => {
                        dispatch({
                            type: 'GO_LOADING_PLANET',
                            payload: {
                                page: AppPages.PLANETDETAIL,
                                galaxyId: GalaxyId,
                                planetId: selected.planet.id
                            }
                        })
                    }} color='blue' inverted fluid className='dimmer-bottom'>Enter Planet</Button>
                </div>
            </Dimmer>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }

}

export default PlanetPreview;