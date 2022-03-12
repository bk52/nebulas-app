import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import { Button, Input, Grid, TextArea, Form, Checkbox, Label } from 'semantic-ui-react';
import ErrorPage from '../../../components/ErrorPage';
import ImageUpload from '../../../components/ImageUpload';

const GeneralSettings = ({ Id }) => {
    try {
        const GalaxyState = useSelector(state => state.galaxies);
        const glx = GalaxyState.galaxies.filter(g => g.id == Id)[0]
        const formRef = useRef();

        return <>
            <Form ref={formRef}>
                <Grid divided className='custom-content center nopad'>
                    <Grid.Row>
                        <Grid.Column>
                            <Input defaultValue={glx.title} disabled={true} name='txtTitle' placeholder='Title' className='login' fluid />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <TextArea defaultValue={glx.description} disabled={true} name='txtDescription' placeholder='Description' className='login' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ImageUpload disabled={false} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{ 'color': '#ffffff' }}>
                            <div>Decide whether the galaxy will be private or public.</div>
                            <div style={{ 'marginTop': '16px', 'marginBottom': '16px' }}>
                                Private <Checkbox checked={glx.public} className='custom-switch' toggle style={{ 'marginLeft': '16px', 'marginRight': '16px' }} /> Public
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{ 'color': '#ffffff' }}>
                            <div>Do you expect support from other people? <br /><Label as='a' color='teal' content='Need Support' icon='hand paper' /> badge is displayed on the profile.</div>
                            <div style={{ 'marginTop': '16px', 'marginBottom': '16px' }}>
                                No <Checkbox checked={glx.needSupport} className='custom-switch' toggle style={{ 'marginLeft': '16px', 'marginRight': '16px' }} /> Yes
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{ 'textAlign': 'left' }}>
                            <Form.Field>
                                <label style={{ 'color': '#0A9396' }}>Fork Key</label>
                                <Input defaultValue={glx.forkKey} disabled={true} action={{ icon: 'copy' }} placeholder='' className='login' />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{ 'textAlign': 'left' }}>
                            <Form.Field>
                                <label style={{ 'color': '#0A9396' }}>Invitation Link</label>
                                <Input defaultValue={glx.invitationLink} disabled={true} action={{ icon: 'copy' }} placeholder='' className='login' />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{ 'textAlign': 'left' }}>
                            <Form.Field>
                                <label style={{ 'color': '#0A9396' }}>API Key</label>
                                <Input defaultValue={glx.apiKey} disabled={true} action={{ icon: 'copy' }} placeholder='' className='login' />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{ 'textAlign': 'left' }}>
                            <Button inverted color='teal' fluid>Save</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{ 'textAlign': 'left' }}>
                            <Form.Field>
                                <label style={{ 'color': '#FF0000' }}>Destroy Galaxy</label>
                                <label style={{ 'color': '#FFFFFF' }}><span style={{ 'fontWeight': 'bold' }}>Be careful!</span> This action deletes the entire galaxy. This action cannot be undone.</label>
                                <Button color='red' fluid>DESTROY</Button>
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </>
    }
    catch (e) {
        console.error(e)
        return <ErrorPage />
    }
}

export default GeneralSettings;