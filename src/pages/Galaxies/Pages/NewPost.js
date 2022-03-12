import React, { useState } from 'react';
import { Button, Icon, TextArea } from 'semantic-ui-react'
import ImageUpload from '../../../components/ImageUpload';
import QuestionPost from './QuestionPost';

const postType = {
    'text': 1,
    'question': 2,
    'image': 3
}

const NewPost = ({ onClose }) => {
    const [postype, setPosType] = useState(postType.text);
    let content;

    if (postype == postType.text) {
        content = <TextArea name='txtPost' placeholder='' className='login' style={{ 'width': '100%', 'height': '200px', 'backgroundColor': 'rgba(0,0,0,0.6)', 'color': '#c4c4c4', 'marginTop': '16px' }} />
    }
    else if (postype == postType.question) {
        content = <QuestionPost />
    }
    else if (postype == postType.image) {
        content = <ImageUpload style={{ 'marginTop': '16px' }} disabled={false} />
    }

    return <div>
        <Button.Group fluid style={{ 'marginTop': '48px' }}>
            <Button onClick={() => setPosType(postType.text)} inverted={postype != postType.text} color='teal' icon labelPosition='left'> <Icon name='file text' />Text</Button>
            <Button onClick={() => setPosType(postType.question)} inverted={postype != postType.question} color='teal' icon labelPosition='left'> <Icon name='list ul' />Question</Button>
            <Button onClick={() => setPosType(postType.image)} inverted={postype != postType.image} color='teal' icon labelPosition='left'> <Icon name='image' />Image</Button>
        </Button.Group>
        {content}
        <Button onClick={() => { onClose() }} inverted color='teal' fluid style={{ 'marginTop': '16px' }}>Send</Button>
    </div>
}

export default NewPost;