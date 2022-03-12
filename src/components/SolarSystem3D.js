import React, { useEffect, useRef, useLayoutEffect, Suspense } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/constants/action-types"
let planetArr = [], conn = [];
let angleRad = 0;
const angleStep = 0.1 * Math.PI / 180;
const angleFull = 2 * Math.PI;
const rSun = 10;
const rOrbit = 50;
const rPlanet = 8;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 200;


const stars = new THREE.BufferGeometry();
const starsMat = new THREE.PointsMaterial({ color: 0x888888 });
const sunGeo = new THREE.SphereBufferGeometry(rSun, 20, 20);
const pGeo = new THREE.SphereBufferGeometry(rPlanet, 20, 20)

// window.onresize = function () {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// };

const Title = ({ title, color, position, scale }) => {
    return <Text position={position} scale={scale} color={color} anchorX="center" anchorY="middle" >
        {title}
    </Text>
}

const progGeo = new THREE.BoxBufferGeometry(5, 1, 0.1)
const ProgressBar = ({ offsetY, completed = 0 }) => {
    const fillColor = completed == 100 ? "#00FF00" : completed < 100 && completed > 50 ? "#00FFFF" : "#FFFF00";
    return <mesh position={[0, offsetY, 0]}>
        <boxGeometry args={[10, 1, 0.1]} />
        <meshStandardMaterial color={'#A0A0A0'} />
        <mesh position={[-5 + (completed / 20), 0, 0]}>
            <boxGeometry args={[completed / 10, 1, 0.3]} />
            <meshStandardMaterial color={fillColor} />
        </mesh>
    </mesh>
}

const Sun = ({ sun, settings }) => {
    if (sun) {
        const sunMat = new THREE.MeshLambertMaterial({ color: sun.color1 });
        return <mesh>
            <mesh geometry={sunGeo} material={sunMat} />
            {settings.showLabels ? <Title title={sun.title} color={sun.color1} position={[0, -15, 0]} scale={[30, 30, 30]} /> : null}
            {settings.showProgress ? <ProgressBar offsetY={-20} completed={sun.progress} /> : null}
        </mesh>
    }
    return <></>
}

const StarsBg = ({ count = 5000 }) => {
    useLayoutEffect(() => {
        const starsArr = [];
        for (let i = 0; i < count; i++) {
            starsArr.push(THREE.MathUtils.randFloatSpread(2000)); // x
            starsArr.push(THREE.MathUtils.randFloatSpread(2000)); // y
            starsArr.push(THREE.MathUtils.randFloatSpread(2000)); // z
        }
        stars.setAttribute('position', new THREE.Float32BufferAttribute(starsArr, 3));
    }, [])
    return <points geometry={stars} material={starsMat}> </points>
}

const orbitGeo = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    0, 0,            // xRadius, yRadius
    0, 2 * Math.PI,  // aStartAngle, aEndAngle
    false,           // aClockwise
    0                // aRotation
);


const PlanetOrbit = ({ index, title, settings }) => {
    const ref = useRef()
    useLayoutEffect(() => {
        orbitGeo.xRadius = index * rOrbit;
        orbitGeo.yRadius = index * rOrbit;
        const points = orbitGeo.getPoints(50);
        ref.current.geometry.setFromPoints(points)
    }, [])
    return <mesh>
        <line ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color="#394057" />
        </line>
        {settings.showLabels ? <Title title={title} color={"#394057"} position={[0, (index * rOrbit - 15), 0]} scale={[30, 30, 30]} /> : null}
    </mesh>
}

const Planets = ({ settings, onPlanetClick }) => {
    useFrame((state, delta) => {
        angleRad = (angleRad + angleStep) % angleFull;
        planetArr.map((p) => {
            if (p && p.type !== 's') {
                p.x = rOrbit * p.orbitIndex * Math.cos(angleRad + p.offset);
                p.y = rOrbit * p.orbitIndex * Math.sin(angleRad + p.offset);
            }
        })
    })
    return planetArr && planetArr.map((p, i) => <Planet key={i} p={p} settings={settings} onPlanetClick={onPlanetClick} />)
}

const Planet = ({ p, settings, onPlanetClick }) => {
    if (p) {
        const ref = useRef()
        useFrame((state, delta) => {
            const me = planetArr.filter(pl => pl.id == p.id)[0];
            ref.current.position.x = me.x;
            ref.current.position.y = me.y;
        })
        useLayoutEffect(() => {
            ref.current.position.x = rOrbit * p.orbitIndex * Math.cos(p.offset);
            ref.current.position.y = rOrbit * p.orbitIndex * Math.sin(p.offset);
        }, [])
        const pMat = new THREE.MeshLambertMaterial({ color: p.color1 });
        return <mesh ref={ref} >
            <mesh name={p.id} geometry={pGeo} material={pMat} onClick={(e) => onPlanetClick(e.object.name)} />
            {settings.showLabels ? <Title title={p.title} color={p.color1} position={[0, -15, 0]} scale={[30, 30, 30]} /> : null}
            {settings.showProgress ? <ProgressBar offsetY={-20} completed={p.progress} /> : null}
        </mesh>
    }
    return <></>
}

const Connects = () => {
    return conn.map((c, i) => <ConnectLine key={i} p1={c.p1} p2={c.p2} />)
}

const ConnectLine = ({ p1, p2 }) => {
    const ref = useRef()
    let pl1 = {}, pl2 = {};

    useLayoutEffect(() => {
        ref.current.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)])
    }, [p1, p2])

    useFrame((state, delta) => {
        pl1 = planetArr.filter(p => p.id == p1)[0];
        pl2 = planetArr.filter(p => p.id == p2)[0];
        const positions = ref.current.geometry.attributes.position;
        positions.setXYZ(0, pl1.x, pl1.y, 0);
        positions.setXYZ(1, pl2.x, pl2.y, 0);
        positions.needsUpdate = true;
        ref.current.material.color.set(pl1.color1);
    })
    return (
        <line ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color={"white"} />
        </line>
    )
}


const SolarSystem3D = ({ style, orbits, planets, connections }) => {
    const elementRef = useRef(null);
    const dispatch = useDispatch();
    const glxSettings = useSelector(state => state.glxSettings);
    const SUN = planets && planets.filter(p => p.type === 's')[0];
    if (SUN) {
        SUN.x = 0;
        SUN.y = 0;
    }
    const InitPlanet = () => {
        planetArr = [];
        conn = [];
        planetArr.push(SUN);
        orbits && orbits.map((o, i) => {
            // planets in same orbit
            let p = planets.filter(p => p.orbit === o.id);
            p.map((pl, i) => {
                //divide each orbit into equal intervals 
                pl.orbitIndex = o.index;
                pl.offset = (angleFull / p.length) * i;
                planetArr.push(pl);

                if (glxSettings.showConnections) {
                    //create connection
                    const fc = connections.filter(c => c.p1.id == pl.id || c.p2.id == pl.id);
                    fc.map((n) => {
                        if (!conn.some(c => (c.p1 == n.p1.id && c.p2 == n.p2.id) || (c.p1 == n.p2.id && c.p2 == n.p1.id))) {
                            n.p1.id == pl.id ? conn.push({ p1: n.p1.id, p2: n.p2.id }) : conn.push({ p1: n.p2.id, p2: n.p1.id })
                        }
                    })
                }
            })
        })

    }

    const onPlanetClick = (id) => { dispatch({ type: types.SET_GALAXY, payload: { id } }) }

    useEffect(() => {
        camera.aspect = elementRef.current.offsetWidth / elementRef.current.offsetHeight;
        camera.updateProjectionMatrix();
        InitPlanet();
    }, [])
    useEffect(() => {
        camera.position.z = 200 / glxSettings.zoom;
    }, [glxSettings.zoom])

    return <Suspense fallback={null}>
        <div ref={elementRef} style={style}>
            <Canvas style={{ background: "#090a0f" }} camera={camera}>
                <ambientLight intensity={0.1} />
                <pointLight position={[0, 100, 100]} />
                <StarsBg />
                <Sun sun={SUN} settings={glxSettings} />
                <OrbitControls />
                {
                    orbits && orbits.map((o, i) => <PlanetOrbit key={i} index={o.index} title={o.title} settings={glxSettings} />)
                }
                <Planets settings={glxSettings} onPlanetClick={onPlanetClick} />
                {
                    glxSettings.showConnections ? <Connects /> : null
                }
            </Canvas >
        </div>
    </Suspense>

}

export default SolarSystem3D;
