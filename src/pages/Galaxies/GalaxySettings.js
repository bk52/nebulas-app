import React, { useState, useEffect } from 'react';
import { Button, Dimmer, List } from 'semantic-ui-react';
import GeneralSettings from './Pages/GeneralSettings';
import GalaxyDefinitions from './Pages/GalaxyDefinitions';
import PlanetConnections from './Pages/PlanetConnections';
import AuthorizationLevels from './Pages/AuthorizationLevels';

const itemType = {
    'sun': 1,
    'planet': 2,
    'orbit': 3
}

const Settings = {
    'General': 0,
    'GlxDefinition': 1,
    'PlanetCon': 2,
    'Authorization': 3
}

const MenuItems = [
    "General Settings",
    "Galaxy Definitions",
    "Planet Connections",
    "Authorization Levels"
]

const Header = ({ title, onMenuOpen }) => {
    return <div style={{ 'width': '100%', 'height': '40px', 'color': '#FFFFFF', 'backgroundColor': '#0A9396', 'display': 'flex', 'alignItems': 'center' }}>
        <Button onClick={(e) => { onMenuOpen() }} circular icon='bars' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FFFFFF' }} />
        {title}
    </div>
}

const SettingsMenu = ({ menuItems = [], onSelectChanged }) => {
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        if (menuItems.length > 0) {
            setSelectedId(menuItems[0].id)
        }
    }, [])

    const onItemClick = (id) => {
        onSelectChanged(id);
        setSelectedId(id)
    }

    return <div style={{ 'textAlign': 'left' }}>
        <div style={{ 'marginTop': '16px', 'color': '#A0A0A0' }}>
            <List selection>
                {
                    menuItems.map((item, index) => {
                        return <List.Item key={index} >
                            <List.Content>
                                <List.Header onClick={() => onItemClick(index)} style={{ 'color': selectedId == index ? '#ffffff' : '#A0A0A0' }}>{item}</List.Header>
                            </List.Content>
                        </List.Item>
                    })
                }
            </List>
        </div>
    </div>
}

const GalaxySettings = ({ Id }) => {
    const [menuActive, setmenuActive] = useState(false);
    const [selectedSettings, setselectedSettings] = useState(Settings.General);
    let content;
    if (selectedSettings === Settings.General) { content = <GeneralSettings Id={Id} /> }
    else if (selectedSettings === Settings.GlxDefinition) { content = <GalaxyDefinitions Id={Id} /> }
    else if (selectedSettings === Settings.PlanetCon) { content = <PlanetConnections Id={Id} /> }
    else if (selectedSettings === Settings.Authorization) { content = <AuthorizationLevels /> }

    return <div>
        <Header title={MenuItems[selectedSettings]} onMenuOpen={() => setmenuActive(true)} />
        <div style={{ 'height': '100%', 'overflowY': 'scroll', 'paddingBottom': '16px' }}>
            {content}
        </div>
        <Dimmer verticalAlign='top' active={menuActive} style={{ 'overflowY': 'scroll', 'alignItems': 'baseline' }}>
            <Button onClick={(e) => { setmenuActive(false) }} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
            <div className='custom-content'>
                <SettingsMenu menuItems={MenuItems} onSelectChanged={(id) => { setselectedSettings(id); setmenuActive(false) }} />
            </div>
        </Dimmer>
    </div>
}


export default GalaxySettings;