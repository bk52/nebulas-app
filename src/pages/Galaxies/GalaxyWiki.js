import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Dimmer, List, Input, Grid } from 'semantic-ui-react'
import CustomEditor from '../../components/CustomEditor';
import WikiPages from './Pages/WikiPages';
import NewWiki from './Pages/WikiNew';

const pageStatus = {
    'normal': 1,
    'edit': 2,
}

const Header = ({ title, isNew, onClick }) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(pageStatus.normal);
    let buttons;

    const onButtonClick = (e, a) => {
        e.preventDefault();
        onClick(a);
        if (a === 'edit') setStatus(pageStatus.edit);
        else if (a === 'ok') setStatus(pageStatus.normal);
    }

    if (status == pageStatus.normal) {
        buttons = <>
            {/* <Button onClick={(e) => { onButtonClick(e, 'download') }} circular icon='download' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FFFFFF' }} /> */}
            {!isNew && <Button onClick={(e) => { onButtonClick(e, 'edit') }} circular icon='edit' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FFFFFF' }} />}
        </>
    }
    else if (status == pageStatus.edit) {
        buttons = <>
            <Button onClick={(e) => { dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Files cannot be modified in beta version' } }) }} circular icon='trash' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FF0000' }} />
            <Button onClick={(e) => { onButtonClick(e, 'ok') }} circular icon='check' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#00FF00' }} />
        </>
    }
    return <div style={{ 'width': '100%', 'height': '40px', 'color': '#FFFFFF', 'backgroundColor': '#0A9396', 'display': 'flex', 'alignItems': 'center' }}>
        <Button onClick={(e) => { onButtonClick(e, 'menu') }} circular icon='bars' style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'color': '#FFFFFF' }} />
        {title}
        <div style={{ 'marginLeft': 'auto' }}>{buttons}</div>
    </div>
}

const GalaxyWiki = ({ Id }) => {
    try {
        const childRef = useRef();
        const GalaxyState = useSelector(state => state.galaxies);
        const glx = GalaxyState.galaxies.filter(g => g.id === Id)[0];
        const [menuActive, setmenuActive] = useState(false);
        const [selectedFile, setselectedFile] = useState({ id: '', title: '', isNew: false })

        useEffect(() => {
            if (glx.filesList.length > 0) {
                setselectedFile({
                    id: glx.filesList[0].id,
                    title: glx.filesList[0].title,
                })
            }

        }, [])

        const onFileSelected = (f) => {
            try {
                const wikiFile = glx.files.filter(fl => fl.filename == f.id);
                const isNew = wikiFile.length > 0 ? false : true;
                setselectedFile({ id: f.id, title: f.title, isNew })
                setmenuActive(false);
            }
            catch (e) {
                console.error(e)
            }
        }

        const onButtonClick = (action) => {
            if (action === 'edit') { childRef.current.enable(); }
            else if (action === 'ok') { childRef.current.disable(); }
            else if (action === 'menu') { setmenuActive(true); }
        }

        return <div style={{ 'height': '100%', 'overflowY': 'scroll' }}>
            <Header isNew={selectedFile.isNew} title={selectedFile.title} onClick={onButtonClick} />
            {
                selectedFile.isNew ? <NewWiki /> : <CustomEditor galaxyId={Id} fileId={selectedFile.id} ref={childRef} style={{ 'height': 'calc(100% - 110px)' }} />
            }
            <Dimmer verticalAlign='top' active={menuActive} style={{ 'overflowY': 'scroll', 'alignItems': 'baseline' }}>
                <Button onClick={(e) => { setmenuActive(false) }} circular color='google plus' icon='close' style={{ 'position': 'absolute', 'right': '8px' }} />
                <div className='custom-content'>
                    <WikiPages menuItems={glx.filesList} onFileSelected={onFileSelected} />
                </div>
            </Dimmer>
        </div>
    }
    catch (e) {
        console.error(e);
    }
}

export default GalaxyWiki;