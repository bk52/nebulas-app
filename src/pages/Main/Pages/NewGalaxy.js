import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Button, Grid, TextArea, Input, Checkbox, Icon, Form, Label } from 'semantic-ui-react';


const NewGalaxy = () => {
    const dispatch = useDispatch();
    const [isNew, setIsNew] = useState(true)
    return <>
        <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px' }}>New Galaxy</div>
        <div style={{ 'marginTop': '32px', 'marginBottom': '16px' }}>
            <Icon name='plus' />Create <Checkbox className='custom-switch' toggle style={{ 'marginLeft': '16px', 'marginRight': '16px' }} onChange={(e, data) => setIsNew(!data.checked)} />  <Icon name='fork' /> Fork
        </div>
        {isNew ? <Form>
            <Grid divided className='custom-content center nopad' style={{ 'marginTop': '40px' }}>
                <Grid.Row>
                    <Grid.Column>
                        <Input name='txtTitle' placeholder='Title' className='login' fluid />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <TextArea name='txtDescription' placeholder='Description' className='login' style={{ 'width': '100%' }} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Button icon labelPosition='left' className='btn-sign-in'><Icon name='upload' />Upload Image</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div>Decide whether the galaxy will be private or public.</div>
                        <div style={{ 'marginTop': '16px', 'marginBottom': '16px' }}>
                            Private <Checkbox className='custom-switch' toggle style={{ 'marginLeft': '16px', 'marginRight': '16px' }} /> Public
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div>Do you expect support from other people? <br /><Label as='a' color='teal' content='Need Support' icon='hand paper' /> badge is displayed on the profile.</div>
                        <div style={{ 'marginTop': '16px', 'marginBottom': '16px' }}>
                            No <Checkbox className='custom-switch' toggle style={{ 'marginLeft': '16px', 'marginRight': '16px' }} /> Yes
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form> : <Grid divided className='custom-content center nopad' style={{ 'marginTop': '40px' }}>
            <Grid.Row>
                <Grid.Column>
                    <Input name='txtForkKey' placeholder='Fork Key' className='login' fluid />
                </Grid.Column>
            </Grid.Row>
        </Grid>}
        <Button onClick={() => { dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'New galaxy cannot be created in beta version.' } }) }} inverted color='blue' className='dimmer-bottom'>Save</Button>
    </>
}

export default NewGalaxy;