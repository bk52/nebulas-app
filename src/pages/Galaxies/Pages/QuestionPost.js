import React, { useRef, useState } from 'react';
import { Button, Input, TextArea, List } from 'semantic-ui-react'
import { nanoid } from 'nanoid'


const QuestionPost = () => {
    const [items, setItems] = useState([]);
    const [newItem, setnewItem] = useState(false);
    const titleRef = useRef()

    const AddNewOption = () => {
        const title = titleRef.current["txtTitle"].value;
        if (title) {
            const exItems = [...items];
            exItems.push({ id: nanoid(), title });
            setItems(exItems);
            setnewItem(false);
        }
    }

    const DeleteOption = (id) => {
        const exItems = items.filter(x => x.id != id)
        setItems(exItems);
    }

    return <>
        <TextArea name='txtPost' placeholder='Question' className='login' style={{ 'width': '100%', 'height': '100px', 'backgroundColor': 'rgba(0,0,0,0.6)', 'color': '#c4c4c4', 'marginTop': '16px' }} />
        {!newItem && <Button onClick={() => setnewItem(true)} inverted color='green' fluid style={{ 'marginTop': '16px' }}>Add Option</Button>}
        <List selection>
            {
                items.map((item, index) => {
                    return <List.Item key={index} style={{ 'backgroundColor': 'rgba(255,255,255,0.3)', 'textAlign': 'left', 'padding': '0px', 'paddingLeft': '4px', 'marginTop': '4px' }}>
                        <List.Content>
                            <div style={{ 'display': 'flex', 'alignItems': 'center' }}>
                                <List.Header onClick={null} style={{ 'color': '#ffffff', 'width': '100%' }}>{item.title}</List.Header>
                                <Button onClick={() => DeleteOption(item.id)} size='huge' circular icon='trash' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FF0000' }} />
                            </div>
                        </List.Content>
                    </List.Item>
                })
            }
            {
                newItem && <List.Item key={-1} style={{ 'padding': '0px', 'marginTop': '4px' }}>
                    <List.Content >
                        <div style={{ 'display': 'flex' }}>
                            <form ref={titleRef}>
                                <Input name='txtTitle' placeholder='Title' />
                            </form>
                            <Button onClick={() => setnewItem(false)} size='huge' circular icon='trash' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FF0000' }} />
                            <Button onClick={() => AddNewOption()} size='huge' circular icon='check' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#00FF00' }} />
                        </div>
                    </List.Content>

                </List.Item>
            }
        </List>
    </>
}

export default QuestionPost;