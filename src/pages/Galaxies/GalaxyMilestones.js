import React from 'react';
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import ImgFunding from '../../assets/img/achievement/badge6.png';
import ImgProgress from '../../assets/img/achievement/badge10.png';
import ImgNewGalaxy from '../../assets/img/planets/planet24.png';
import ImgOKGalaxy from '../../assets/img/planets/planet22.png';
import ImgPrize from '../../assets/img/prize.png';
import ImgCreated from '../../assets/img/planets/galaxy.png';


const MilestoneTypes = {
    'progress': {
        'color': 'rgba(10,147,150,0.6)',
        'icon': ImgProgress
    },
    'funding': {
        'color': 'rgba(238,155,0,0.6)',
        'icon': ImgFunding
    },
    'create': {
        'color': 'rgba(247,37,133,0.6)',
        'icon': ImgCreated
    },
    'new': {
        'color': 'rgba(10,147,150,0.6)',
        'icon': ImgNewGalaxy
    },
    'prize': {
        'color': 'rgba(238,155,0,0.6)',
        'icon': ImgPrize
    },
    'conquered': {
        'color': 'rgba(33,86,69,0.6)',
        'icon': ImgOKGalaxy
    }
}

const Milestone = ({ item }) => {
    const { color, icon } = MilestoneTypes[item.type];
    const dt = new Date(item.dt);
    return <div style={{ 'width': '100%', 'display': 'inline-flex', 'position': 'relative', 'paddingTop': '8px', 'color': '#FFFFFF' }}>
        <div style={{ 'width': '60px', 'height': '60px', 'borderRadius': '30px', 'backgroundColor': `${color}`, 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
            <img src={icon} style={{ 'width': '50px' }} />
        </div>
        <div style={{ 'width': 'calc(100% - 68px)', 'backgroundColor': `${color}`, 'marginLeft': '8px', 'borderRadius': '4px', 'textAlign': 'left', 'padding': '4px' }}>
            <div style={{ 'width': '100%' }}>{item.text}</div>
            <div style={{ 'width': '100%', 'fontSize': '10px', 'marginTop': '12px', 'color': '#C4C4C4' }}>
                {DateTime.fromMillis(dt.getTime()).setLocale('en').toRelative()}
            </div>
        </div>
    </div>
}

const GalaxyMilestones = ({ Id }) => {
    try {
        const GalaxyState = useSelector(state => state.galaxies);
        const glx = GalaxyState.galaxies.filter(g => g.id == Id)[0];
        return <div style={{ 'paddingLeft': '8px', 'paddingRight': '8px', 'overflowY': 'scroll', 'height': '100%' }}>
            {glx.milestones.map((d, i) => <Milestone key={i} item={d} />)}
        </div>
    }
    catch (e) {
        console.error(e);
    }
}

export default GalaxyMilestones;