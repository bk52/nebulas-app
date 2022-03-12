import React from 'react';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';

export default function GalaxyCard({ id, imgSrc, title, owner, description, contributors = "-", isPublic = false, needSupport = false, onDetails, onEnter }) {
    const onDetailsClicked = (e) => {
        e.preventDefault();
        onDetails(id);
    }
    const onEnterClicked = (e) => {
        e.preventDefault();
        onEnter(id);
    }

    return <Card className='galaxy-card'>
        <Image src={imgSrc} wrapped ui={false} />
        <Card.Content>
            {needSupport && <Label as='a' color='teal' ribbon='right'><Icon name='hand paper' /> Need Support</Label>}
            <Card.Header style={{ 'color': '#FFFFFF', 'fontWeight': 'bold' }}>{title}</Card.Header>
            <Card.Meta style={{ 'color': '#C4C4C4' }}><span className='date'>{owner}</span></Card.Meta>
            <Card.Description style={{ 'color': '#FFFFFF' }}>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a style={{ 'color': '#C4C4C4' }}><Icon name='rocket' />{contributors} Contributors</a>
            <a style={{ 'color': '#C4C4C4', 'float': 'right' }}>{isPublic ? 'Public' : 'Private'}</a>
        </Card.Content>
        {
            id == 'SjYxU5dIky' ? <Card.Content extra>
                <Button onClick={(e) => { onDetailsClicked(e) }} basic color='blue' style={{ 'margin': '0px', 'borderTopRightRadius': '0px', 'borderBottomRightRadius': '0px', 'width': '50%' }}>
                    Details
                </Button>
                <Button onClick={(e) => { onEnterClicked(e) }} basic color='green' style={{ 'margin': '0px', 'borderTopLeftRadius': '0px', 'borderBottomLeftRadius': '0px', 'width': '50%' }}>
                    Enter
                </Button>
            </Card.Content> : <Card.Content extra>
                <Button disabled basic color='orange' style={{ 'margin': '0px', 'borderTopRightRadius': '0px', 'borderBottomRightRadius': '0px', 'width': '100%' }}>
                    Not available in beta
                </Button>
            </Card.Content>
        }
    </Card>
}