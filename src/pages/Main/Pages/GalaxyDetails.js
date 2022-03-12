import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Label, Progress } from 'semantic-ui-react';
import RocketImg from '../../../assets/img/rocket.gif';
import SunImg from '../../../assets/img/planets/sun1.png';
import { types } from '../../../redux/constants/action-types';
import ErrorPage from '../../../components/ErrorPage';
import Avatars from '../../../components/Avatars';
import AppPages from '../../../AppPages';

const GalaxyDetails = ({ Id = '-1', showTitle = false }) => {
    try {
        const GalaxiesState = useSelector(state => state.galaxies);
        const glx = GalaxiesState.galaxies.filter(g => g.id == Id)[0];
        const dispatch = useDispatch();
        const EnterGalaxy = (e) => {
            dispatch({ type: types.GO_LOADING, payload: { page: AppPages.GALAXYDETAIL, galaxyId: glx.id } });
        }

        return <>
            {showTitle && <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>{glx.title}</div>}
            <img src={glx.image} style={{ 'width': '100%' }} />
            <div style={{ 'marginTop': '16px', 'textAlign': 'justify' }}>{glx.description}</div>

            <div style={{ 'textAlign': 'left', 'marginTop': '16px' }}>
                <Label color='teal' content='Creators' ribbon />
                <div style={{ 'width': '100%', 'marginTop': '8px' }}>
                    <Label image style={{ 'backgroundColor': '#00b5ad', 'color': '#ffffff', 'marginBottom': '4px' }} ><img src={Avatars[glx.ownerAvatar]} />{glx.owner}</Label>
                </div>
            </div>

            <div style={{ 'textAlign': 'left', 'marginTop': '16px' }}>
                <Label color='teal' content='Progress' ribbon />
                <div style={{ 'display': 'flex', 'width': '100%', 'marginTop': '8px' }}>
                    <img src={RocketImg} style={{ 'width': '30px', 'height': '30px', 'marginTop': '8px' }} />
                    <Progress percent={glx.progress} color='teal' style={{ 'width': '100%', 'marginLeft': '16px', 'marginRight': '16px', 'backgroundColor': 'rgba(196,196,196,0.3)', 'marginBottom': '0px' }} progress active />
                    <img src={SunImg} style={{ 'width': '30px', 'height': '30px', 'marginTop': '8px' }} />
                </div>
            </div>


            <div style={{ 'textAlign': 'left', 'marginTop': '16px' }}>
                <Label color='teal' content='Tags' ribbon />
                <div style={{ 'width': '100%', 'marginTop': '8px' }}>
                    {
                        glx.tags.map((t, i) => {
                            return <Label key={i} style={{ 'marginBottom': '4px' }} color='green' as='a'>{t}</Label>
                        })
                    }
                </div>
            </div>

            <Button inverted color='green' style={{ 'width': '100%', 'marginTop': '32px' }} onClick={(e) => EnterGalaxy(e)}>Enter Galaxy</Button>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default GalaxyDetails;