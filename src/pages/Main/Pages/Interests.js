import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown } from 'semantic-ui-react';

const skillOptions = [
    { key: 1, value: 1, text: 'Robotics' },
    { key: 2, value: 2, text: 'Computer Science' },
    { key: 3, value: 3, text: 'Global Warming' },
    { key: 4, value: 4, text: 'Clean Energy' },
    { key: 5, value: 5, text: 'Geology' },
    { key: 6, value: 6, text: 'Social Media' },
    { key: 7, value: 7, text: 'Politics' },
    { key: 8, value: 8, text: 'Art' },
    { key: 9, value: 9, text: 'Human Rights' },
    { key: 10, value: 10, text: 'Astronomy' },
]

const AddInterests = ({ onClose }) => {
    const dispatch = useDispatch();
    const UserState = useSelector(state => state.user);
    let selected = [];

    const onChange = (e, { value }) => {
        selected = [...value];
    }

    const onAddClick = () => {
        try {
            let newSkills = [];
            selected.map(s => {
                if (!UserState.interests.some(sk => sk.id === s)) {
                    newSkills.push({
                        id: s,
                        title: skillOptions.filter(a => a.key == s)[0].text
                    })
                }
            })
            dispatch({ type: 'USER_ADD_INTEREST', payload: { interests: newSkills } })
            onClose();
        }
        catch (e) {
            console.error(e)
        }
    }
    return <>
        <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Add Interest</div>
        <Dropdown onChange={onChange} placeholder='Interest' fluid multiple selection options={skillOptions} style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'borderColor': 'rgba(255,255,255,0.4)', 'color': 'rgba(255,255,255,0.4)' }} />
        <Button onClick={() => onAddClick()} inverted color='blue' className='dimmer-bottom'>Save</Button>
    </>
}

export default AddInterests;