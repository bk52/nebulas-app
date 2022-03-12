import React, { useRef, useState, useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react'

const ImageUpload = ({ style, disabled }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const uploadRef = useRef();
    const onImageChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    return <div style={{ ...style }}>
        {preview ? <>
            <img src={preview} style={{ 'width': '50px' }}></img>
            <Button onClick={() => setSelectedFile(undefined)} size='huge' circular icon='trash' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FF0000' }} />
        </> : <>
            <input ref={uploadRef} accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={(e) => onImageChange(e)} />
            <label htmlFor="icon-button-file">
                <Button disabled={disabled} onClick={() => uploadRef.current.click()} color='teal' icon labelPosition='left'> <Icon name='upload' />Upload Image</Button>
            </label>
        </>}
    </div>
}

export default ImageUpload;