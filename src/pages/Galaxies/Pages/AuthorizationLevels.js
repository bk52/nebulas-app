import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { Button, Dimmer, Input, Grid, Form, Checkbox, Card } from 'semantic-ui-react';
import UserBadges from '../../../components/UserBadges';


const BadgeLevels = [
    {
        'id': 1,
        'title': 'Grand Admiral',
        'description': 'Only this level can be Admin.',
        'badge': 'Badge2',
        'amount': 50,
        'unit': 'USD',
        'color': '#EE9B00'
    },
    {
        'id': 2,
        'title': 'Admiral',
        'description': 'Can access all resources, planets, and social. Can edit Wiki pages.',
        'badge': 'Badge5',
        'amount': 30,
        'unit': 'USD',
        'color': '#F44336'
    },
    {
        'id': 3,
        'title': 'Sergeant',
        'description': 'Only can enter allowed galaxies and Wiki pages.',
        'badge': 'Badge1',
        'amount': 20,
        'unit': 'USD',
        'color': '#00D916'
    },
    {
        'id': 4,
        'title': 'Warrior',
        'description': 'Only can enter allowed galaxies and Wiki pages.',
        'badge': 'Badge3',
        'amount': 10,
        'unit': 'USD',
        'color': '#0A9396'
    },
    {
        'id': 5,
        'title': 'Everybody',
        'description': 'Only can access Wiki pages.',
        'badge': 'Badge6',
        'amount': 0,
        'unit': 'USD',
        'color': '#E04F5F'
    },

]

const AuthorizationEdit = ({ id }) => {
    const [data, setData] = useState({
        title: '',
        amount: '',
    })
    const formRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {

        if (id > -1) {
            const bdg = BadgeLevels.filter(b => b.id == id)[0];
            setData({
                title: bdg.title,
                amount: bdg.amount,
                color: bdg.color
            })
        }
    }, [id])

    return <>
        <div style={{ 'color': (data.color), 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>{data.title}</div>

        <Form ref={formRef}>
            <Grid divided className='custom-content center nopad'>
                <Grid.Row>
                    <Grid.Column>
                        <div style={{ 'width': '100%', 'textAlign': 'left' }}>
                            Active <Checkbox checked className='custom-switch' toggle style={{ 'marginLeft': '16px', 'marginRight': '16px' }} />
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div style={{ 'color': '#0A9396', 'textAlign': 'left', 'width': '100%', 'marginBottom': '8px' }}>Minimum Donation</div>
                        <Input defaultValue={data.amount} name='txtTitle' placeholder='Name' className='login' fluid />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>

        <Button onClick={() => dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Default elements cannot be changed in beta.' } })} color='blue' inverted fluid className='dimmer-bottom'>Save</Button>
    </>
}

const AuthorizationLevels = () => {
    const [menuActive, setmenuActive] = useState({
        visible: false,
        id: -1
    });

    return <div style={{ 'textAlign': 'left', 'paddingLeft': '8px', 'paddingRight': '8px', 'marginTop': '16px' }}>
        {
            BadgeLevels.map((bdg, inx) => {
                return <Card key={inx} fluid style={{ 'backgroundColor': 'rgba(0,0,0,0.6)' }}>
                    <Card.Content>
                        <Card.Header>
                            <div style={{ 'display': 'inline-flex', 'width': '100%' }}>
                                <img src={UserBadges[bdg.badge]} style={{ 'width': '30px', 'height': '30px' }} />
                                <div style={{ 'marginLeft': '8px', 'color': (bdg.color), 'width': '100%' }}>{bdg.title}</div>
                                <Button onClick={() => setmenuActive({ visible: true, id: bdg['id'] })} circular icon='edit' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#c4c4c4' }} />
                            </div>
                        </Card.Header>
                        <Card.Description style={{ 'color': '#c4c4c4' }} content={bdg.description} />
                        <Card.Description style={{ 'color': '#F72585' }} content={`Minimum donation required is ${bdg.amount} ${bdg.unit}`} />
                    </Card.Content>
                </Card>
            })
        }

        <Dimmer verticalAlign='top' active={menuActive.visible} style={{ 'overflowY': 'scroll' }}>
            <Button onClick={(e) => { setmenuActive({ visible: false, id: -1 }) }} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
            <div className='custom-content'>
                <AuthorizationEdit id={menuActive.id} />
            </div>
        </Dimmer>
    </div>
}

export default AuthorizationLevels;