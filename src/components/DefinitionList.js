import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Icon } from 'semantic-ui-react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { Orbit as OrbitIcon, Planet as PlanetIcon } from './SvgIcons';

const itemType = {
    'sun': 1,
    'planet': 2,
    'orbit': 3
}

const SortableItem = SortableElement(({ orbit, planets = [], OnButtonClicked }) => {
    const dispatch = useDispatch();
    return <List.Item style={{ 'paddingBottom': '8px', 'cursor': 'grab' }}>
        <List.Content>
            <div style={{ 'display': 'flex', 'alignItems': 'center' }}>
                <div style={{ 'width': '50px', 'height': '50px', 'borderRadius': '25px', 'marginRight': '8px' }}>
                    {<OrbitIcon style={{ 'color': '#c4c4c4' }} />}
                </div>
                <div style={{ 'width': 'calc(100% - 150px)', 'color': '#C4C4C4' }}>{orbit.title}</div>
                <Button onClick={() => OnButtonClicked('addPlanet', itemType.planet, '', orbit.id,)} circular style={{ 'backgroundColor': 'rgba(0, 255, 0,0.2)', 'color': '#c4c4c4', 'paddingRight': '12px', 'paddingLeft': '12px' }}><div style={{ 'width': '14px', 'height': '14px' }}><PlanetIcon style={{ 'color': '#c4c4c4' }} /></div></Button>
                <Button onClick={() => OnButtonClicked('editOrbit', itemType.orbit, '', orbit.id,)} circular icon='edit' style={{ 'backgroundColor': 'rgba(255, 165, 0,0.2)', 'color': '#c4c4c4' }} />
                <Button onClick={() => OnButtonClicked('deleteOrbit', itemType.orbit, '', orbit.id,)} circular icon='trash' style={{ 'backgroundColor': 'rgba(255, 0, 0,0.2)', 'color': '#c4c4c4' }} />
            </div>

            <List.List>
                {planets.map((planet, index) => {
                    const { color1, title, id } = planet;
                    return <List.Item key={index}>
                        <List.Content>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'paddingLeft': '30px' }}>
                                <div style={{ 'backgroundColor': `${color1}`, 'width': '30px', 'height': '30px', 'borderRadius': '15px', 'marginRight': '8px' }}></div>
                                <div style={{ 'width': 'calc(100% - 150px)', 'color': '#C4C4C4' }}>{title}</div>

                                <Button onClick={() => OnButtonClicked('editPlanet', itemType.planet, id, orbit.id)} circular icon='edit' style={{ 'backgroundColor': 'rgba(255, 165, 0,0.2)', 'color': '#c4c4c4' }} />
                                <Button onClick={() => OnButtonClicked('deletePlanet', itemType.planet, id, orbit.id)} circular icon='trash' style={{ 'backgroundColor': 'rgba(255, 0, 0,0.2)', 'color': '#c4c4c4' }} />
                            </div>
                        </List.Content>
                    </List.Item>
                })}
            </List.List>
        </List.Content>
    </List.Item>
}
);

const SortableList = SortableContainer(({ Orbits, Planets, OnButtonClicked }) => {
    return (
        <List>
            {Orbits.map((item, index) => {
                const pl = Planets.filter(p => p.orbit == item.id);
                return <SortableItem key={item.id} index={index} orbit={item} planets={pl} OnButtonClicked={OnButtonClicked} />
            })}
        </List>
    );
});



const DefinitionList = ({ GalaxyId, Planets = [], Orbits = [], OnButtonClicked }) => {
    const [items, setItems] = useState({ orbits: [] });
    const dispatch = useDispatch();

    useEffect(() => {
        const orderedOrbits = Orbits.sort((a, b) => a.index - b.index);
        setItems({ orbits: orderedOrbits })
    }, [])

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newItems = arrayMoveImmutable(items.orbits, oldIndex, newIndex);
        setItems({ orbits: newItems })
        dispatch({ type: 'ORDER_GALAXY_ORBIT', payload: { orbits: newItems, GalaxyId } })
    };

    return <SortableList Orbits={items.orbits} Planets={Planets} onSortEnd={onSortEnd} OnButtonClicked={OnButtonClicked} />
}

export default DefinitionList;