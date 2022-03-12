import Galaxies from '../../fakeData/Galaxies';
import { nanoid } from 'nanoid';

var initialState = {
    galaxies: [...Galaxies],
};

const itemType = {
    'sun': 1,
    'planet': 2,
    'orbit': 3
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_PLANET_ITEM': {
            try {
                const { GalaxyId, OrbitId, PlanetId, title, description, color, permission } = action.payload;
                const universe = state.galaxies;
                const gIndex = universe.findIndex(g => g.id == GalaxyId);
                const glx = universe[gIndex];

                if (PlanetId == '') {
                    glx.planets.push({
                        id: nanoid(),
                        type: 'p',
                        title,
                        description,
                        progress: 0,
                        orbit: OrbitId,
                        color1: color,
                        permission
                    })
                }
                else {
                    const pIndex = glx.planets.findIndex(p => p.id == PlanetId);
                    if (pIndex > -1) {
                        const p = glx.planets[pIndex];
                        p.title = title;
                        p.description = description;
                        p.color1 = color;
                        p.permission = permission;
                    }
                }

                return Object.assign({}, state, {
                    galaxies: universe
                });
            }
            catch (e) {
                console.error(e);
                return state;
            }
        }
        case 'SET_ORBIT_ITEM': {
            try {
                const { GalaxyId, OrbitId, title } = action.payload;
                const universe = state.galaxies;
                const gIndex = universe.findIndex(g => g.id == GalaxyId);
                const glx = universe[gIndex];

                if (OrbitId == '') {
                    glx.orbits.sort((a, b) => a.index - b.index);
                    const index = glx.orbits.length > 0 ? glx.orbits[glx.orbits.length - 1].index + 1 : 1;
                    glx.orbits.push({ id: nanoid(), title, index })
                }
                else {
                    const oIndex = glx.orbits.findIndex(p => p.id == OrbitId);
                    if (oIndex > -1) {
                        const o = glx.orbits[oIndex];
                        o.title = title;
                    }
                }

                return Object.assign({}, state, {
                    galaxies: universe
                });
            }
            catch (e) {
                console.error(e);
                return state;
            }
        }
        case 'DELETE_PLANET_ITEM': {
            try {
                const { GalaxyId, PlanetId } = action.payload;
                const universe = state.galaxies;
                const gIndex = universe.findIndex(g => g.id == GalaxyId);
                const glx = universe[gIndex];

                const ind = glx.planets.findIndex(p => p.id == PlanetId);
                if (ind > -1) { glx.planets.splice(ind, 1) }

                for (let i = glx.connections.length - 1; i > -1; i--) {
                    const conn = glx.connections[i];
                    if (conn.p1.id == PlanetId || conn.p2.id == PlanetId) {
                        glx.connections.splice(i, 1);
                    }
                }

                return Object.assign({}, state, {
                    galaxies: universe
                });
            }
            catch (e) {
                console.error(e);
                return state;
            }
        }
        case 'DELETE_ORBIT_ITEM': {
            try {
                const { GalaxyId, OrbitId } = action.payload;
                const universe = state.galaxies;
                const gIndex = universe.findIndex(g => g.id == GalaxyId);
                const glx = universe[gIndex];

                const ind = glx.orbits.findIndex(o => o.id == OrbitId);
                if (ind > -1) { glx.orbits.splice(ind, 1) }

                const planetIds = glx.planets.filter(p => p.orbit == OrbitId).map(p => p.id);
                let connIds = [];
                planetIds.map(id => {
                    const pInd = glx.planets.findIndex(p => p.id == id);
                    if (pInd > -1) glx.planets.splice(pInd, 1);
                    connIds.push(...glx.connections.filter(c => c.p1.id == id || c.p2.id == id).map(c => c.id));
                })
                connIds.map(id => {
                    const cInd = glx.connections.findIndex(c => c.id == id);
                    if (cInd > -1) glx.connections.splice(cInd, 1)
                })
                return Object.assign({}, state, {
                    galaxies: universe
                });
            }
            catch (e) {
                console.error(e);
                return state;
            }
        }
        case 'ORDER_GALAXY_ORBIT': {
            try {
                const { GalaxyId, orbits } = action.payload;
                const universe = state.galaxies;
                const gIndex = universe.findIndex(g => g.id == GalaxyId);
                const glx = universe[gIndex];

                orbits.map((o, i) => {
                    const oInd = glx.orbits.findIndex(or => or.id == o.id);
                    if (oInd > -1) glx.orbits[oInd].index = i + 1;
                })
                return Object.assign({}, state, {
                    galaxies: universe
                });
            }
            catch (e) {
                console.error(e);
                return state;
            }
        }
        case 'SET_PLANET_CONNECTION': {
            try {
                const { GalaxyId, ConnId, PlanetId1, PlanetId2, ConnType, Description } = action.payload;
                const universe = state.galaxies;
                const gIndex = universe.findIndex(g => g.id == GalaxyId);
                const glx = universe[gIndex];

                if (ConnId == '') {
                    const pl1 = glx.planets.filter(p => p.id == PlanetId1)[0];
                    const pl2 = glx.planets.filter(p => p.id == PlanetId2)[0];
                    const or1 = glx.orbits.filter(o => o.id == pl1.orbit);
                    const or1Title = or1.length > 0 ? or1[0].title : '';
                    const or2 = glx.orbits.filter(o => o.id == pl2.orbit);
                    const or2Title = or2.length > 0 ? or2[0].title : '';
                    const newConn = {
                        id: nanoid(),
                        p1: { name: pl1.title, id: pl1.id, color1: pl1.color1, orbit: or1Title },
                        p2: { name: pl2.title, id: pl2.id, color1: pl2.color1, orbit: or2Title },
                        connType: ConnType,
                        description: Description
                    }
                    glx.connections.push(newConn);
                }
                else {
                    const cInd = glx.connections.findIndex(c => c.id == ConnId);
                    const conn = glx.connections[cInd];
                    const pl1 = glx.planets.filter(p => p.id == PlanetId1)[0];
                    const pl2 = glx.planets.filter(p => p.id == PlanetId2)[0];
                    const or1 = glx.orbits.filter(o => o.id == pl1.orbit);
                    const or1Title = or1.length > 0 ? or1[0].title : '';
                    const or2 = glx.orbits.filter(o => o.id == pl2.orbit);
                    const or2Title = or2.length > 0 ? or2[0].title : '';
                    conn.p1 = { name: pl1.title, id: pl1.id, color1: pl1.color1, orbit: or1Title };
                    conn.p2 = { name: pl2.title, id: pl2.id, color1: pl2.color1, orbit: or2Title };
                    conn.connType = ConnType;
                    conn.description = Description
                }

                return Object.assign({}, state, {
                    galaxies: universe
                });
            }
            catch (e) {
                console.error(e);
                return state;
            }
        }
        case 'DELETE_PLANET_CONNECTION': {
            try {
                const { GalaxyId, ConnId } = action.payload;
                const universe = state.galaxies;
                const gIndex = universe.findIndex(g => g.id == GalaxyId);
                const glx = universe[gIndex];

                const cInd = glx.connections.findIndex(c => c.id == ConnId);
                if (cInd > -1) glx.connections.splice(cInd, 1);
                return Object.assign({}, state, {
                    galaxies: universe
                });
            }
            catch (e) {
                console.error(e);
                return state;
            }
        }
        default:
            return state;
    }
}
