import React from 'react';
import Ach from '../../../components/Achievements';

const AchievementType = {
    'Ach1': {
        title: 'EXPLORER',
        description: 'Enter to over 10 galaxies',
        icon: Ach['Ach1'],
        color: '#C4C4C4',
    },
    'Ach2': {
        title: 'ARCHITECT',
        description: 'Contribute to more than 10 planets',
        icon: Ach['Ach2'],
        color: '#5DDDD3',
    },
    'Ach6': {
        title: 'ANGEL INVESTOR',
        description: 'Invest in 5 different galaxies',
        icon: Ach['Ach6'],
        color: '#EE9B00',
    }
}

const Achievements = ({ Type = '' }) => {
    const { title, description, icon, color } = AchievementType[Type]

    return <>
        <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Achievements</div>
        <img src={icon} style={{ 'width': '160px', 'marginTop': '16px' }} />
        <div style={{ 'color': `${color}`, 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '48px' }}>{title}</div>
        <div style={{ 'color': `${color}`, 'marginTop': '36px' }}>{description}</div>
    </>
}

export default Achievements;