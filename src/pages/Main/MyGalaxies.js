import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from 'semantic-ui-react';
import GalaxyCard from '../../components/GalaxyCard';
import { types } from '../../redux/constants/action-types';
import ErrorPage from '../../components/ErrorPage';
import AppPages from '../../AppPages';

const Pages = {
    'NewGalaxy': 4,
    'GalaxyDetails': 12
}

export default function MyGalaxies({ onSubPage }) {
    try {
        const dispatch = useDispatch();
        const UserState = useSelector(state => state.user);
        const GalaxiesState = useSelector(state => state.galaxies);
        const GalaxyList = GalaxiesState.galaxies.filter(g => g.ownerId === UserState.id);

        const onNewGalaxy = (e) => {
            e.preventDefault();
            onSubPage(Pages.NewGalaxy, {})
        }

        const onDetails = (id) => {
            onSubPage(Pages.GalaxyDetails, { id })
        }

        const onEnter = (id) => {
            dispatch({ type: types.GO_LOADING, payload: { page: AppPages.GALAXYDETAIL, galaxyId: id } });
        }

        return <div style={{ 'padding': '8px' }}>
            <Button onClick={(e) => onNewGalaxy(e)} icon labelPosition='left' className='btn-sign-in' style={{ 'backgroundColor': '#005F73', 'marginBottom': '8px' }}><Icon name='plus' />New Galaxy</Button>
            <div className='galaxy-list'>
                {
                    GalaxyList.map(g => <GalaxyCard
                        key={g.id}
                        id={g.id}
                        imgSrc={g.image}
                        title={g.title}
                        owner={g.owner}
                        description={g.description}
                        contributors={g.contributors}
                        isPublic={g.public}
                        needSupport={g.needSupport}
                        onDetails={onDetails}
                        onEnter={onEnter}
                    />)
                }
            </div>
        </div>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}