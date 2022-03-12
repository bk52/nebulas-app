import React from 'react';
import { Grid } from 'semantic-ui-react';

const IconButton = ({ icon, title, active, activeColor = "#ffffff" }) => {
    return <div className='custom-icon-button' style={active ? { color: activeColor } : {}}>
        <div className='ic'>{icon}</div>
        <div className='text'>{title}</div>
    </div>
}

export default function NavBar({ active = 1, items = [], onSelectedChange, position = 'bottom' }) {
    return <Grid className={"app-navbar " + (position === 'bottom' ? 'bottom' : 'top')} columns='equal' divided inverted padded>
        <Grid.Row textAlign='center'>
            {items && items.map(i => {
                return <Grid.Column key={i.id} onClick={(e) => onSelectedChange(i.id)}>
                    <IconButton icon={i.icon} title={i.title} active={active == i.id} activeColor={i.activeColor} />
                </Grid.Column>
            })}
        </Grid.Row>
    </Grid>
}

