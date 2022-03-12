import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Dimmer, Button, Icon } from 'semantic-ui-react';
import { Planet as Picon } from '../../components/SvgIcons';
import NavBar from '../../components/NavBar';
import AppPages from '../../AppPages';
import { types } from '../../redux/constants/action-types';
import GalaxyInfo from './GalaxyInfo';
import GalaxyMap from './GalaxyMap';
import GalaxyMilestones from './GalaxyMilestones';
import GalaxyWiki from './GalaxyWiki';
import GalaxySocial from './GalaxySocial';
import GalaxySettings from './GalaxySettings';

const Pages = {
    'Info': 1,
    'Map': 2,
    'Milestones': 3,
    'Wiki': 4,
    'Social': 5,
    'Settings': 6,
    'Close': 7,
}

const MenuItems = [
    {
        id: Pages.Info,
        icon: <Icon name='compass' size='big' />,
        title: 'Info',
        activeColor: '#0A9396'
    },
    {
        id: Pages.Map,
        icon: <Picon />,
        title: 'Map',
        activeColor: '#0A9396'
    },
    {
        id: Pages.Milestones,
        icon: <Icon name='flag' size='big' />,
        title: 'Events',
        activeColor: '#0A9396'
    },
    {
        id: Pages.Wiki,
        icon: <Icon name='book' size='big' />,
        title: 'Wiki',
        activeColor: '#0A9396'
    },
    {
        id: Pages.Social,
        icon: <Icon name='users' size='big' />,
        title: 'Social',
        activeColor: '#0A9396'
    },
    {
        id: Pages.Settings,
        icon: <Icon name='setting' size='big' />,
        title: 'Settings',
        activeColor: '#0A9396'
    },
    {
        id: Pages.Close,
        icon: <Icon name='close' size='big' color='red' />,
        title: 'Exit',
        activeColor: '#0A9396'
    },
]

export default function GalaxyDetail() {
    const dispatch = useDispatch();
    const AppState = useSelector(state => state.app);
    const [active, setActive] = useState(Pages.Info);
    const [modalOpen, setModalOpen] = useState(false);
    let content;
    let activeGalaxyId = AppState.galaxyId == -1 ? 'SjYxU5dIky' : AppState.galaxyId;

    const onQuit = (quit) => {
        quit ? dispatch({ type: types.SET_PAGE, payload: { page: AppPages.MAIN } }) : setModalOpen(false)
    }

    useEffect(() => {
        dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: AppPages.GALAXYDETAIL, detail: 31 } })
    }, [])

    useEffect(() => {
        dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: AppPages.GALAXYDETAIL, detail: active + 30 } })
    }, [active])

    if (active == Pages.Info) content = <GalaxyInfo Id={activeGalaxyId} />;
    else if (active == Pages.Map) content = <GalaxyMap Id={activeGalaxyId} />;
    else if (active == Pages.Milestones) content = <GalaxyMilestones Id={activeGalaxyId} />;
    else if (active == Pages.Wiki) content = <GalaxyWiki Id={activeGalaxyId} />;
    else if (active == Pages.Social) content = <GalaxySocial />;
    else if (active == Pages.Settings) content = <GalaxySettings Id={activeGalaxyId} />;

    const onPageChange = (id) => {
        if (id == Pages.Close) {
            setModalOpen(true)
        }
        else { setActive(id) }
    }

    return <>
        <NavBar active={active} items={MenuItems} onSelectedChange={onPageChange} position='top' />
        <div className='detail-content'>{content}</div>
        <CloseDetail open={modalOpen} onClose={onQuit} />
    </>
}


const CloseDetail = ({ open, onClose }) => {
    return <Dimmer verticalAlign='top' active={open}>
        <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Back to Main Menu</div>
        <div className='custom-content'>Do you want to return to the main menu?</div>
        <div className='dimmer-bottom'>
            <Button inverted icon labelPosition='left' color='green' onClick={(e) => onClose(true)}>Yes<Icon name='checkmark' /></Button>
            <Button inverted icon labelPosition='left' color='red' onClick={(e) => onClose(false)}>No<Icon name='remove' /></Button>
        </div>
    </Dimmer>
}