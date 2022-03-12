import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown } from 'semantic-ui-react';

const skillOptions = [
    { key: 1, value: 1, text: 'App Development' },
    { key: 2, value: 2, text: 'Machine Learning' },
    { key: 3, value: 3, text: 'React' },
    { key: 4, value: 4, text: 'Figma' },
    { key: 5, value: 5, text: 'Node' },
    { key: 6, value: 6, text: 'Javascript' },
    { key: 7, value: 7, text: 'Web Development' },
    { key: 8, value: 8, text: 'NodeJS' },
    { key: 9, value: 9, text: 'Python' },
    { key: 10, value: 10, text: 'HTML' },
    { key: 11, value: 11, text: 'UI Design' },
]

const AddSkill = ({ onClose }) => {
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
                if (!UserState.skills.some(sk => sk.id === s)) {
                    newSkills.push({
                        id: s,
                        title: skillOptions.filter(a => a.key == s)[0].text
                    })
                }
            })
            dispatch({ type: 'USER_ADD_SKILL', payload: { skills: newSkills } })
            onClose();
        }
        catch (e) {
            console.error(e)
        }
    }
    return <>
        <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Add Skill</div>
        <Dropdown onChange={onChange} placeholder='Skills' fluid multiple selection options={skillOptions} style={{ 'backgroundColor': 'rgba(255,255,255,0)', 'borderColor': 'rgba(255,255,255,0.4)', 'color': 'rgba(255,255,255,0.4)' }} />
        <Button onClick={() => onAddClick()} inverted color='blue' className='dimmer-bottom'>Save</Button>
    </>
}

export default AddSkill;