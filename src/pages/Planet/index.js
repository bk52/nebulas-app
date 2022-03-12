import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Input } from 'semantic-ui-react'
import DrawLayer from '../../components/DrawLayer';
import Avatar1 from '../../assets/img/avatars/avatar1.png';
import ErrorPage from '../../components/ErrorPage';
import AppPages from '../../AppPages';

const ListView = ({ onClick }) => {
    return <div style={{ 'height': 'calc(100% - 60px)', 'width': '100%', 'overflowY': 'scroll', 'paddingLeft': '8px', 'paddingRight': '8px', 'marginTop': '16px' }}>
        <List selection>
            {
                <List.Item onClick={onClick} key={1} style={{ 'backgroundColor': '#0A9396', 'color': '#ffffff' }}>
                    <List.Content>
                        <div style={{ 'width': '100%', 'display': 'inline-flex', 'justifyContent': 'space-between' }}>
                            <div>
                                <div>About Electronic Design</div>
                                <div style={{ 'fontSize': '10px' }}>Created 2 day ago</div>
                            </div>
                            <img src={Avatar1} style={{ 'width': '30px', 'height': '30px', 'borderRadius': '15px' }} />
                        </div>
                    </List.Content>
                </List.Item>
            }
        </List>
    </div>
}

const initialShapes = [
    {
        type: 'i',
        x: 140,
        y: 188,
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Raspberry_Pi_3_Model_B.png',
        id: 'image1',
        rotation: 90,
        width: 184,
        height: 121
    },
    {
        height: 178,
        id: "image2",
        rotation: 0,
        src: "https://st.myideasoft.com/idea/fm/83/myassets/products/032/shopping.png",
        type: "i",
        width: 178,
        x: 220,
        y: 17,
    },
    {
        type: 'l',
        x: 260,
        y: 147,
        width: 100,
        height: 100,
        points: [0, 0, 100, 100],
        fill: 'blue',
        id: 'line1',
        tension: 1,
        stroke: "red",
        rotation: 98
    },
    {
        type: 't',
        x: 48,
        y: 398,
        id: 'text1',
        fill: '#555',
        text: "Raspberry Pi",
        align: 'center',
        rotation: 0
    },
    {
        type: 't',
        x: 333,
        y: 171,
        id: 'text2',
        fill: '#555',
        text: "L298",
        align: 'center',
        rotation: 0
    },
    {
        type: 't',
        x: 175,
        y: 231,
        id: 'text3',
        fill: '#f00',
        text: "Motor Connection",
        align: 'center',
        rotation: -37.5
    },
    {
        type: 'l',
        x: 81,
        y: 425,
        width: 100,
        height: 100,
        points: [0, 0, 0, 50],
        fill: 'blue',
        id: 'line2',
        tension: 1,
        stroke: "blue",
        rotation: 0
    },
    {
        type: 'r',
        x: 26,
        y: 488,
        width: 110,
        height: 50,
        fill: 'blue',
        id: 'rect2',
        rotation: 0
    },
    {
        type: 't',
        x: 46,
        y: 508,
        id: 'text4',
        fill: '#fff',
        text: "Wi-Fi Module",
        align: 'center',
        rotation: 0
    },
    {
        type: 'l',
        x: 150,
        y: 300,
        width: 100,
        height: 100,
        points: [0, 0, 150, 0],
        fill: 'green',
        id: 'line3',
        tension: 1,
        stroke: "green",
        rotation: 0
    },
    {
        type: 'c',
        x: 360,
        y: 300,
        width: 100,
        height: 100,
        fill: 'green',
        id: 'circle1',
        rotation: 0
    },
    {
        type: 't',
        x: 346,
        y: 373,
        id: 'text4',
        fill: 'green',
        text: "LIDAR",
        align: 'center',
        rotation: 0
    },
];

const WorkspaceView = ({ onClick }) => {
    try {
        const drawRef = useRef(null);

        const Save = (e) => {
            e.preventDefault();
            drawRef.current.save()
        }

        return <>
            <div style={{ 'height': '60px', 'width': '100%', 'display': 'inline-flex', 'backgroundColor': 'rgba(0,0,0,0.6)', 'alignItems': 'center' }}>
                <Input name='txtTitle' icon='file text outline' iconPosition='left' placeholder='Enter a title' className='login' />
                <Button onClick={onClick} circular icon='add' style={{ 'marginRight': '8px', 'backgroundColor': 'rgba(0,0,0,0)', 'color': '#c4c4c4' }} />
                <Button onClick={onClick} circular icon='save' style={{ 'marginRight': '8px', 'backgroundColor': 'rgba(0,0,0,0)', 'color': '#c4c4c4' }} />
            </div>
            <div style={{ 'width': '100%', 'height': 'calc(100% - 60px)', 'backgroundColor': 'lightgray' }}>
                <DrawLayer ref={drawRef} shapeList={initialShapes} />
            </div>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}

const PlanetView = () => {
    try {
        const dispatch = useDispatch();
        const [showList, setshowList] = useState(true);
        const AppState = useSelector(state => state.app);
        const GalaxyState = useSelector(state => state.galaxies);

        const glx = GalaxyState.galaxies.filter(g => g.id == AppState.galaxyId)[0];
        const pl = glx.planets.filter(p => p.id == AppState.planetId)[0];

        const onClose = () => {
            showList ? dispatch({ type: 'GO_LOADING', payload: { page: AppPages.GALAXYDETAIL, galaxyId: AppState.galaxyId } }) : setshowList(true);
        }

        const Toast = () => {
            dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Default elements cannot be changed in beta' } })
        }

        useEffect(() => {
            dispatch({ type: 'SET_DETAIL_PAGE', payload: { main: AppPages.PLANETDETAIL, detail: -1 } })
        }, [])
        return <div>
            <div style={{ 'height': '60px', 'width': '100%', 'display': 'inline-flex', 'backgroundColor': 'rgba(0,0,0,0.6)', 'alignItems': 'center' }}>
                <div style={{ 'width': '50px', 'marginLeft': '8px', 'marginRight': '8px' }}>
                    <div style={{ 'width': '40px', 'height': '40px', 'borderRadius': '20px', 'backgroundColor': (pl.color1) }}></div>
                </div>
                <div style={{ 'color': '#FFFFFF', 'fontSize': '18px', 'width': '100%', 'textAlign': 'left' }}>{pl.title}</div>
                {showList && <Button onClick={Toast} circular color='green' icon='add' style={{ 'marginRight': '8px' }} />}
                <Button onClick={(e) => { onClose(e) }} circular color='google plus' icon='close' />
            </div>
            {showList ? <ListView onClick={() => setshowList(false)} /> : <WorkspaceView onClick={Toast} />}
        </div>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}


export default PlanetView;