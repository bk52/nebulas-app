import React, { useState, } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Dimmer, List, Icon } from 'semantic-ui-react';
import ErrorPage from '../../../components/ErrorPage';
import ConnectionDetails from './ConnectionDetails';

const connIcon = {
    '1': 'long arrow alternate left',
    '2': 'long arrow alternate right',
    '3': 'arrows alternate horizontal'
}

const PlanetConnections = ({ Id }) => {
    try {
        const dispatch = useDispatch();
        const GalaxyState = useSelector(state => state.galaxies);
        const glx = GalaxyState.galaxies.filter(g => g.id == Id)[0];
        const [details, setDetails] = useState({ visible: false, itemId: '' });

        const onButtonClick = (itemId, buttonType) => {
            if (buttonType == 'delete') {
                dispatch({ type: 'DELETE_PLANET_CONNECTION', payload: { GalaxyId: Id, ConnId: itemId } })
            }
            else {
                setDetails({ visible: true, itemId: itemId })
            }
        }

        return <>
            <div style={{ 'paddingLeft': '8px', 'paddingRight': '8px', 'marginTop': '16px' }}></div>
            <Button onClick={() => setDetails({ visible: true, itemId: '' })} color='teal' fluid inverted>Add Connection</Button>
            <List>
                {
                    glx.connections.map((c, inx) => {
                        return <List.Item key={inx} style={{ 'paddingBottom': '8px' }}>
                            <List.Content>
                                <div style={{ 'backgroundColor': 'rgba(0,0,0,0.4)', 'borderRadius': '4px', 'padding': '8px', }}>
                                    <div style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-between' }}>
                                        <div>
                                            <div style={{ 'width': '40px', 'height': '40px', 'borderRadius': '20px', 'backgroundColor': `${c.p1.color1}`, 'margin': 'auto' }}></div>
                                            <div style={{ 'color': `${c.p1.color1}`, 'marginTop': '4px' }}>{c.p1.name}</div>
                                        </div>
                                        <Icon name={connIcon[c.connType]} size='big' color='grey' />
                                        <div>
                                            <div style={{ 'width': '40px', 'height': '40px', 'borderRadius': '20px', 'backgroundColor': `${c.p2.color1}`, 'margin': 'auto' }}></div>
                                            <div style={{ 'color': `${c.p2.color1}`, 'marginTop': '4px' }}>{c.p2.name}</div>
                                        </div>
                                        <div>
                                            <Button onClick={() => onButtonClick(c.id, 'edit')} circular icon='edit' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#c4c4c4' }} />
                                            <Button onClick={() => onButtonClick(c.id, 'delete')} circular icon='trash' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#c4c4c4' }} />
                                        </div>

                                    </div>
                                    <div style={{ width: '100%', textAlign: 'left', color: '#c4c4c4', marginTop: '12px' }}>{c.description}</div>
                                </div>
                            </List.Content>
                        </List.Item>
                    })
                }
            </List>

            <Dimmer verticalAlign='top' active={details.visible} style={{ 'overflowY': 'scroll' }}>
                <Button onClick={(e) => { setDetails({ visible: false, itemId: '' }) }} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
                <div className='custom-content'>
                    <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Connection</div>
                    {details.visible && <ConnectionDetails galaxyId={Id} connId={details.itemId} onClose={() => { setDetails({ visible: false, itemId: '' }) }} />}
                </div>
            </Dimmer>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default PlanetConnections;