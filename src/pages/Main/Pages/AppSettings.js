import React from 'react';
import { Grid, Checkbox, Select } from 'semantic-ui-react';

const langs = [
    { key: 'en', value: 'en', text: 'English' },
]

const AppSettings = () => {
    return <>
        <Grid className='settings-grid' divided inverted style={{ 'color': '#C4C4C4' }}>
            <Grid.Row columns={2}>
                <Grid.Column>App Version</Grid.Column>
                <Grid.Column>0.1.0</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>Notifications</Grid.Column>
                <Grid.Column><Checkbox toggle /></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>Main Music</Grid.Column>
                <Grid.Column><Checkbox toggle /></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>Sound Effects</Grid.Column>
                <Grid.Column><Checkbox toggle /></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>Language</Grid.Column>
                <Grid.Column> <Select className='custom-dropdown' placeholder='Select a language' options={langs} defaultValue='en' /></Grid.Column>
            </Grid.Row>
        </Grid>
    </>
}

export default AppSettings;