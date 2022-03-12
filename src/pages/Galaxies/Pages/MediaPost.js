import React, { useState } from 'react';
import { Feed, Radio, Button } from 'semantic-ui-react'
import Avatars from '../../../components/Avatars';
import { DateTime } from "luxon";

const QuestionPost = ({ options }) => {
    const [opt, setOpt] = useState(-1);
    const handleChange = (e, { value }) => { setOpt(value) }

    return <>
        {
            options.map((o, i) => {
                return <div key={i} style={{ 'borderRadius': '4px', 'paddingLeft': '4px', 'width': '200px', 'display': 'flex', 'alignItems': 'center', 'marginBottom': '4px', 'paddingTop': '12px', 'paddingBottom': '12px', 'backgroundColor': 'rgba(0,0,0,0.6)' }}>
                    <Radio
                        className='custom-rd'
                        value={o.id}
                        label={o.title}
                        name='radioGroup'
                        onChange={handleChange}
                        checked={opt === o.id}
                    />
                </div>
            })
        }
        {opt > -1 && <Button style={{ 'width': '200px' }} color='green'>Send</Button>}
    </>
}

const Post = ({ item }) => {
    const dt = new Date(item.dt);
    return <Feed.Event>
        <Feed.Label image={Avatars[item.avatar]} />
        <Feed.Content>
            <Feed.Summary style={{ 'color': '#ffffff' }}>
                <Feed.User>{item.ownerName}</Feed.User>
                {
                    item.postType == 'image' ? ` added ${item.photo.length} new photos` : ''
                }
                <Feed.Date style={{ 'color': '#c4c4c4' }}> {DateTime.fromMillis(dt.getTime()).setLocale('en').toRelative()}</Feed.Date>
            </Feed.Summary>
            {
                item.postType == 'text' && <Feed.Extra style={{ 'color': '#c4c4c4' }} text>{item.text}</Feed.Extra>
            }
            {
                item.postType == 'image' && <Feed.Extra images>
                    {
                        item.photo.map((photo, index) => <a key={`a${index}`}><img src={photo} /></a>)
                    }
                </Feed.Extra>
            }
            {
                item.postType == 'question' && <>
                    <Feed.Extra style={{ 'color': '#c4c4c4' }} text>{item.text}</Feed.Extra>
                    <Feed.Extra style={{ 'color': '#c4c4c4' }}>
                        {
                            <QuestionPost options={item.options} />
                        }
                    </Feed.Extra>
                </>
            }
        </Feed.Content>
    </Feed.Event>
}

export default Post;