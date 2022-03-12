import React from 'react';
import { useSelector } from "react-redux";
import { Icon, Label, Progress } from 'semantic-ui-react';
import RocketImg from '../../assets/img/rocket.gif';
import SunImg from '../../assets/img/planets/sun1.png';
import ErrorPage from '../../components/ErrorPage';
import Avatars from '../../components/Avatars';

const GalaxyInfo = ({ Id = -1 }) => {
    try {
        const GalaxyState = useSelector(state => state.galaxies);
        const glx = GalaxyState.galaxies.filter(g => g.id === Id)[0];

        return <div style={{ 'paddingLeft': '8px', 'paddingRight': '8px', 'overflowY': 'scroll', 'height': '100%' }}>
            <img src={glx.image} style={{ 'width': '100%' }} />
            <div style={{ 'marginTop': '16px', 'textAlign': 'justify', 'color': '#c4c4c4' }}>
                <Label color='teal' content='Description' ribbon />
                <div>{glx.description}</div></div>

            <div style={{ 'textAlign': 'left', 'marginTop': '16px' }}>
                <Label color='teal' content='Creators' ribbon />
                <div style={{ 'width': '100%', 'marginTop': '8px' }}>
                    <Label image style={{ 'backgroundColor': '#00b5ad', 'color': '#ffffff', 'marginBottom': '4px' }} ><img src={Avatars[glx.ownerAvatar]} />{glx.owner}</Label>
                </div>
            </div>

            <div style={{ 'textAlign': 'left', 'marginTop': '16px' }}>
                <Label as='a' color='teal' content='Progress' ribbon />
                <div style={{ 'display': 'flex', 'width': '100%', 'marginTop': '8px' }}>

                    <img src={RocketImg} style={{ 'width': '30px', 'height': '30px', 'marginTop': '8px' }} />
                    <Progress percent={glx.progress} color='teal' style={{ 'width': '100%', 'marginLeft': '16px', 'marginRight': '16px', 'backgroundColor': 'rgba(196,196,196,0.3)', 'marginBottom': '0px' }} progress active />
                    <img src={SunImg} style={{ 'width': '30px', 'height': '30px', 'marginTop': '8px' }} />
                </div>
            </div>

            <div style={{ 'textAlign': 'left', 'marginTop': '16px' }}>
                <Label as='a' color='teal' content='Tags' ribbon />
                <div style={{ 'width': '100%', 'marginTop': '8px' }}>
                    {
                        glx.tags.map((t, i) => {
                            return <Label key={i} style={{ 'marginBottom': '4px' }} color='green'>{t}</Label>
                        })
                    }
                </div>
            </div>
        </div>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default GalaxyInfo;