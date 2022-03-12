import React, { useState, useEffect } from 'react';
import { Button, List, Input } from 'semantic-ui-react'

const WikiPages = ({ menuItems = [], onFileSelected }) => {
    const [selectedId, setSelectedId] = useState('');
    const [newFile, setNewFile] = useState({ show: false, type: 'file' })

    useEffect(() => {
        if (menuItems.length > 0) {
            setSelectedId(menuItems[0].id)
        }
    }, [])

    const onButtonClick = (e, a) => {
        if (a === 'file' || a === 'folder') {
            setNewFile({ show: true, type: a })
        }
        else if (a === 'cancel') {
            setNewFile({ show: false, type: 'file' })
        }
        else if (a === 'add') {
            setNewFile({ show: false, type: 'file' })
        }
    }

    const onItemClick = (id, title) => {
        try {
            const fileType = id.substring(0, 2);
            if (fileType == 'fi') {
                setSelectedId(id)
                onFileSelected({ id, title });
            }
        }
        catch (e) { console.error(e) }
    }

    return <div style={{ 'textAlign': 'left' }}>
        <div>
            {
                newFile.show ? <>
                    <div style={{ 'display': 'flex', 'width': 'calc(100% - 120px)' }}>
                        <Input name='txtfileName' iconPosition='left' placeholder={newFile.type === 'file' ? 'File name' : 'Folder name'} className='login' />
                    </div>
                    <Button onClick={(e) => { onButtonClick(e, 'cancel') }} size='huge' circular icon='trash' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FF0000' }} />
                    <Button onClick={(e) => { onButtonClick(e, 'add') }} size='huge' circular icon='check' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#00FF00' }} />
                </> :
                    <>
                        <Button onClick={(e) => { onButtonClick(e, 'file') }} size='huge' circular icon='file' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FFFFFF' }} />
                        <Button onClick={(e) => { onButtonClick(e, 'folder') }} size='huge' circular icon='folder' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FFFFFF' }} />
                    </>
            }
        </div>

        <div style={{ 'marginTop': '16px', 'color': '#A0A0A0' }}>
            <List selection>
                {
                    menuItems.map((item, index) => {
                        return <List.Item key={index} >
                            <List.Icon style={{ 'color': selectedId == item.id ? '#ffffff' : '#A0A0A0' }} name={item.files ? 'folder' : 'file'} />
                            <List.Content>
                                <List.Header onClick={() => onItemClick(item.id, item.title)} style={{ 'color': selectedId == item.id ? '#ffffff' : '#A0A0A0' }}>{item.title}</List.Header>
                                {
                                    item.files && <List.List>
                                        {item.files.map((file, findex) => {
                                            return <List.Item key={findex}>
                                                <List.Icon name='file' style={{ 'color': selectedId == file.id ? '#ffffff' : '#A0A0A0' }} />
                                                <List.Content>
                                                    <List.Header onClick={() => onItemClick(file.id, file.title)} style={{ 'color': selectedId == file.id ? '#ffffff' : '#A0A0A0' }}>{file.title}</List.Header>
                                                </List.Content>
                                            </List.Item>
                                        })}
                                    </List.List>
                                }
                            </List.Content>
                        </List.Item>
                    })
                }
            </List>
        </div>
    </div>
}

export default WikiPages;