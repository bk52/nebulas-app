import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Dimmer, Button, Icon } from 'semantic-ui-react';
import AppHeader from '../../components/AppHeader';
import NavBar from '../../components/NavBar';
import MyGalaxies from './MyGalaxies';
import Universe from './Universe';
import Settings from './Settings';
import ErrorPage from '../../components/ErrorPage';
import { Planet as Picon, Universe as Uicon } from '../../components/SvgIcons';

import PageNewGalaxy from './Pages/NewGalaxy';
import PageFriends from './Pages/Friends';
import PageAchievements from './Pages/Achievements';
import PageBankAccount from './Pages/BankAccount';
import PageSkills from './Pages/Skills';
import PageSearch from './Pages/SearchData';
import PageNotifications from './Pages/Notifications';
import PageInterests from './Pages/Interests';
import PageGalaxyDetails from './Pages/GalaxyDetails';

const Pages = {
    'MyGalaxies': 1,
    'Universe': 2,
    'Settings': 3,

    'NewGalaxy': 4,
    'Friends': 5,
    'Achievements': 6,
    'BankAccount': 7,
    'Skills': 8,
    'Search': 9,
    'Notifications': 10,
    'Interests': 11,
    'GalaxyDetails': 12
}

const MenuItems = [
    {
        id: Pages.MyGalaxies,
        icon: <Picon />,
        title: 'My Galaxies',
        activeColor: '#F72585'
    },
    {
        id: Pages.Universe,
        icon: <Uicon />,
        title: 'Universe',
        activeColor: '#0A9396'
    },
    {
        id: Pages.Settings,
        icon: <Icon name='setting' size='big' />,
        title: 'Settings',
        activeColor: '#CA6702'
    }
]

let prevPage = Pages.MyGalaxies;
export default function Main() {
    try {
        const dispatch = useDispatch();
        const [active, setActive] = useState(1);
        const [subPage, setsubPage] = useState({ show: false, page: -1, params: {} })
        let page, subPageContent;

        const onSearchClick = (e) => {
            e.preventDefault();
            setsubPage({ show: true, page: Pages.Search })
        }

        const onNotificationClick = (e) => {
            e.preventDefault();
            setsubPage({ show: true, page: Pages.Notifications })
            dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: 6, detail: Pages.Notifications } })
        }

        const onPageChange = (id) => {
            setActive(id)
            dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: 6, detail: id } })
            if (id == Pages.MyGalaxies || id == Pages.Universe) prevPage = id;
        }

        const onSubPage = (pageId, params) => {
            setsubPage({ show: true, page: pageId, params })
            dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: 6, detail: pageId } })
        }

        const onClosePopup = () => {
            if (subPage.page === Pages.GalaxyDetails || subPage.page === Pages.NewGalaxy || subPage.page === Pages.Search || subPage.page === Pages.Notifications) {
                if (prevPage == Pages.MyGalaxies) {
                    dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: 6, detail: Pages.MyGalaxies } })
                }
                else {
                    dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: 6, detail: Pages.Universe } })
                }
            }
            else {
                dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: 6, detail: Pages.Settings } })
            }
            setsubPage({ show: false, page: -1 })
        }

        useEffect(() => {
            dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: 6, detail: Pages.MyGalaxies } })
        }, [])

        if (active === Pages.MyGalaxies) page = <MyGalaxies onSubPage={onSubPage} />;
        else if (active === Pages.Universe) page = <Universe onSubPage={onSubPage} />;
        else if (active === Pages.Settings) page = <Settings onSubPage={onSubPage} />;

        if (subPage.show) {
            if (subPage.page === Pages.NewGalaxy) subPageContent = <PageNewGalaxy />
            else if (subPage.page === Pages.Friends) subPageContent = <PageFriends FriendsType={subPage.params.type} />
            else if (subPage.page === Pages.Achievements) subPageContent = <PageAchievements Type={subPage.params.type} />
            else if (subPage.page === Pages.BankAccount) subPageContent = <PageBankAccount Type={subPage.params.type} Value={subPage.params.value} />
            else if (subPage.page === Pages.Skills) subPageContent = <PageSkills onClose={() => { setsubPage({ show: false, page: -1 }) }} />
            else if (subPage.page === Pages.Search) subPageContent = <PageSearch />
            else if (subPage.page === Pages.Notifications) subPageContent = <PageNotifications />
            else if (subPage.page === Pages.Interests) subPageContent = <PageInterests onClose={() => { setsubPage({ show: false, page: -1 }) }} />
            else if (subPage.page === Pages.GalaxyDetails) subPageContent = <PageGalaxyDetails showTitle={true} Id={subPage.params.id} onClose={() => { setsubPage({ show: false, page: -1 }) }} />
        }

        return <>
            {active !== Pages.Settings && <AppHeader onSearchClick={onSearchClick} onNotificationClick={onNotificationClick} />}
            <div className='main-content'>{page}</div>
            <NavBar active={active} items={MenuItems} onSelectedChange={onPageChange} />
            <Dimmer verticalAlign='top' active={subPage.show}>
                <Button onClick={() => { onClosePopup() }} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
                <div className='custom-content' style={{ width: '100%' }}>{subPageContent}</div>
            </Dimmer>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}












