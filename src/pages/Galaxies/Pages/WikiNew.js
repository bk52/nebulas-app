import React from 'react';
import { useDispatch } from "react-redux";
import { Button, Grid } from 'semantic-ui-react'

const NewWiki = () => {
    const dispatch = useDispatch();

    const onButtonClick = () => {
        dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Files cannot be created in beta version' } })
    }

    return <div style={{ 'width': '100%', 'height': '100%', 'marginTop': '16px' }}>
        <div style={{ 'width': '100%', 'color': '#ffffff', 'textAlign': 'center', 'fontSize': '18px', 'marginBottom': '24px' }}>Choose a template</div>
        <Grid columns='equal'>
            <Grid.Row>
                <Grid.Column>
                    <Button onClick={onButtonClick} content='Empty' icon='file' basic style={{ 'width': '150px', 'height': '150px' }} color='teal' />
                </Grid.Column>
                <Grid.Column>
                    <Button onClick={onButtonClick} content='Missions' icon='table' basic style={{ 'width': '150px', 'height': '150px' }} color='teal' />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button onClick={onButtonClick} content='Requirements' icon='list' basic style={{ 'width': '150px', 'height': '150px' }} color='teal' />
                </Grid.Column>
                <Grid.Column>
                    <Button onClick={onButtonClick} content='Calendar' icon='calendar' basic style={{ 'width': '150px', 'height': '150px' }} color='teal' />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
}

export default NewWiki;