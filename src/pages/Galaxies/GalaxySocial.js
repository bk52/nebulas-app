import React, { useState } from 'react';
import { Button, Dimmer, Input, Feed } from 'semantic-ui-react'
import Post from './Pages/MediaPost';
import PostList from '../../fakeData/SocialMedia';
import NewPost from './Pages/NewPost';
import ErrorPage from '../../components/ErrorPage';

const Header = ({ title, onClick, onTextChanged }) => {
    return <div style={{ 'width': '100%', 'height': '40px', 'color': '#FFFFFF', 'backgroundColor': '#0A9396', 'display': 'flex', 'alignItems': 'center' }}>
        <Input onChange={(e, { value }) => onTextChanged(value)} name='txtfileName' icon='search' iconPosition='left' placeholder='Search' className='login' />
        <Button onClick={(e) => { onClick() }} size='huge' circular icon='add' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FFFFFF' }} />
    </div>
}

const Stream = ({ filterText = '' }) => {
    return <Feed>
        {
            filterText == '' ?
                PostList.map((item, index) => <Post key={index} item={item} />) :
                PostList.filter(p => p.text && p.text.toLowerCase().indexOf(filterText.toLowerCase()) > -1)
                    .map((item, index) => <Post key={index} item={item} />)
        }
    </Feed>
}

const GalaxySocial = () => {
    try {
        const [showModal, setshowModal] = useState(false)
        const [filterText, setfilterText] = useState('');
        return <>
            <Header title={'Introduction'} onTextChanged={(text) => setfilterText(text)} onClick={() => setshowModal(true)} />
            <div style={{ 'paddingTop': '8px', 'paddingLeft': '8px', 'paddingRight': '8px', 'height': 'calc(100% - 20px)', 'overflowY': 'scroll' }}>
                <Stream filterText={filterText} />
            </div>
            <Dimmer verticalAlign='top' active={showModal} style={{ 'overflowY': 'scroll' }}>
                <Button onClick={() => setshowModal(false)} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
                <div className='custom-content'>
                    <NewPost onClose={() => setshowModal(false)} />
                </div>
            </Dimmer>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

export default GalaxySocial;