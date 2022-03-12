import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import GalaxyCard from '../../components/GalaxyCard';
import { types } from '../../redux/constants/action-types';
import ErrorPage from '../../components/ErrorPage';
import AppPages from '../../AppPages';

const Pages = {
    'NewGalaxy': 4,
    'GalaxyDetails': 12
}

export default function Universe({ onSubPage }) {
    try {
        const dispatch = useDispatch();
        const GalaxiesState = useSelector(state => state.galaxies);

        const onDetails = (id) => {
            onSubPage(Pages.GalaxyDetails, { id })
        }

        const onEnter = (id) => {
            dispatch({ type: types.GO_LOADING, payload: { page: AppPages.GALAXYDETAIL, galaxyId: id } });
        }

        return <div style={{ 'padding': '8px' }}>
            <div className='galaxy-list' style={{ 'height': 'calc(100% - 15px)' }}>
                {
                    GalaxiesState.galaxies.map(g => <GalaxyCard
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