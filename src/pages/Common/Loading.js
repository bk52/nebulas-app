import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Header, Loader } from 'semantic-ui-react';
import RocketImg from '../../assets/img/rocket.gif';

const aphorisms = [
    { title: 'Problems are not stop signs, \n they are guidelines.', owner: 'Robert H. Schuller' },
    { title: 'We cannot solve our problems \n with the same thinking \n we used when we created them.', owner: 'Albert Einstein' },
    { title: 'It isn’t that they cannot find the solution. \n It is that they cannot see the problem.', owner: 'G.K Chesterton' },
    { title: 'Curiosity is the essence of our existence.', owner: 'Gene Cernan' },
]

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function Loading({ id = '' }) {
    const [info, setInfo] = useState({ title: '', owner: '', nextPage: '' });
    const appState = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const rnd = randomInt(0, 3);
        const aph = aphorisms[rnd];
        let nextPage = "";
        setInfo({
            title: aph.title,
            owner: aph.owner,
            nextPage
        })

        setTimeout(() => {
            dispatch({ type: 'SET_PAGE', payload: { page: appState.nextPage } })
        }, 3500);

    }, [])


    return <div style={{ 'padding': '8px' }}>
        <img src={RocketImg} className='logo' style={{ 'width': '200px' }} />
        <div className='vertically-center'>
            <Header as='h2' textAlign='center' className='custom-text'>{info.title}</Header>
            <Header as='h5' textAlign='center' className='custom-text' style={{ 'fontStyle': 'italic' }}>{info.owner}</Header>
        </div>

        <div className="login-bottom" style={{ 'color': '#C4C4C4', 'fontWeight': 'normal', 'bottom': '50px' }}>
            <Loader active inverted content={`Loading ${info.nextPage}`} />
        </div>
    </div>
}