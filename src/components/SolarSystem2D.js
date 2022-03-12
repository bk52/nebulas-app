import React, { useEffect, useRef, useState } from "react";
import Canvas from './Canvas';
import { useDispatch, useSelector } from "react-redux";
import { types } from '../redux/constants/action-types'

const SolarSystem2D = ({ style, orbits, planets, connections }) => {
    const glxSettings = useSelector(state => state.glxSettings);
    const dispatch = useDispatch();
    const [size, setSize] = useState({ w: 0, h: 0 });
    const elementRef = useRef(null);
    let angleRad = 0;
    const angleStep = 0.1 * Math.PI / 180;
    const angleFull = 2 * Math.PI;
    const rOrbit = 100;
    const rPlanet = 8;
    const rSun = 20;
    const sun = planets && planets.filter(p => p.type === 's')[0];
    let planetArr = [], conn = [];

    const onPlanetClick = (id) => {
        dispatch({ type: types.SET_GALAXY, payload: { id } });
    }

    const InitPlanet = () => {
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

        // if (glxSettings.showConnections) {
        //     //create connection
        //     connections.map((n) => {
        //         if (!conn.some(c => (c.p1 == n.p1.id && c.p2 == n.p2.id) || (c.p1 == n.p2.id && c.p2 == n.p1.id))) {
        //             conn.push({ p1: n.p1.id, p2: n.p2.id });
        //         }
        //     })
        // }
    }

    InitPlanet();

    const CheckClick = (pos, center) => {
        if (pos.x >= center.x - rSun && pos.x <= center.x + rSun && pos.y >= center.y - rSun && pos.y <= center.y + rSun) {
            onPlanetClick(sun.id);
        }
        else {
            planetArr && planetArr.some(p => {
                const br = {
                    t: p.y - rPlanet,
                    b: p.y + rPlanet,
                    l: p.x - rPlanet,
                    r: p.x + rPlanet
                }
                if (pos.x >= br.l && pos.x <= br.r && pos.y >= br.t && pos.y <= br.b) {
                    onPlanetClick(p.id);
                    return true;
                }
            })
        }
    }

    const ScaleCanvas = (ctx, center, scale, drag) => {
        if (scale == 1) {
            ctx.setTransform(scale, 0, 0, scale, drag.x, drag.y);
        }
        else if (scale > 1) {
            ctx.setTransform(scale, 0, 0, scale, (-center.x + drag.x) * (scale - 1), (-center.y + drag.y) * (scale - 1));
        }
        else if (scale < 1) {
            ctx.setTransform(scale, 0, 0, scale, (-center.x - drag.x) * (scale - 1), (-center.y - drag.y) * (scale - 1));
        }
    }

    const DrawOrbits = (ctx, center, ORBITS) => {
        ORBITS && ORBITS.map((o, i) => {
            ctx.beginPath();
            ctx.strokeStyle = '#394057';
            ctx.arc(center.x, center.y, (o.index) * rOrbit, 0, 2 * Math.PI);
            ctx.stroke();

            if (glxSettings.showLabels) {
                DrawLabel(ctx,
                    { x: center.x, y: center.y + ((o.index) * rOrbit) },
                    { size: 12, color: '#394057', text: o.title }
                )
            }
        })
    }

    const DrawSun = (ctx, center, sun) => {
        if (sun) {
            ctx.beginPath();
            ctx.fillStyle = sun.color1;
            ctx.arc(center.x, center.y, rSun, 0, 2 * Math.PI);
            ctx.fill();
            if (glxSettings.showLabels) {
                DrawLabel(ctx,
                    { x: center.x, y: center.y + rSun },
                    { size: 14, color: sun.color1, text: sun.title }
                )
            }

            if (glxSettings.showProgress) {
                DrawProgress(ctx,
                    { x: center.x, y: center.y + rSun },
                    sun.progress
                )
            }
        }
    }

    const DrawPlanet = (ctx, center, angle) => {
        planetArr.map(p => {
            const planetX = center.x + rOrbit * p.orbitIndex * Math.cos(angle + p.offset);
            const planetY = center.y + rOrbit * p.orbitIndex * Math.sin(angle + p.offset);
            p.x = planetX;
            p.y = planetY;

            if (glxSettings.showConnections) {
                const connected = conn.filter(c => c.p1 == p.id);
                connected.map(c => {
                    const p2 = planets.filter(a => a.id == c.p2)[0];
                    ctx.beginPath();
                    ctx.setLineDash([5, 3]);
                    ctx.strokeStyle = p.color1;
                    p2.type == 's' ? ctx.moveTo(center.x, center.y) : ctx.moveTo(p2.x, p2.y);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();
                })
            }

            ctx.beginPath();
            ctx.fillStyle = p.color1;
            ctx.arc(planetX, planetY, rPlanet, 0, 2 * Math.PI);
            ctx.fill();

            if (glxSettings.showLabels) {
                DrawLabel(ctx,
                    { x: planetX, y: planetY },
                    { size: 14, color: p.color1, text: p.title }
                )
            }

            if (glxSettings.showProgress) {
                DrawProgress(ctx,
                    { x: planetX, y: planetY },
                    p.progress
                )
            }
        })
    }

    const DrawLabel = (ctx, center, t) => {
        //t.text = t.text.substring(0, 8);
        ctx.beginPath();
        ctx.font = `${t.size}px Roboto`;
        ctx.fillStyle = t.color;
        const textWidth = ctx.measureText(t.text).width;
        ctx.fillText(t.text, center.x - textWidth / 2, center.y + 25);
    }

    const DrawProgress = (ctx, center, comp) => {
        ctx.beginPath();
        ctx.fillStyle = "#A0A0A0";
        ctx.fillRect(center.x - 30, center.y + 35, 60, 4);

        ctx.beginPath();
        ctx.fillStyle = comp == 100 ? "#00FF00" : comp < 100 && comp > 50 ? "#00FFFF" : "#FFFF00";
        ctx.fillRect(center.x - 30, center.y + 35, comp * 0.6, 4);
    }

    const draw = (ctx, center, scale, drag, click) => {
        angleRad = (angleRad + angleStep) % angleFull;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ScaleCanvas(ctx, center, scale, drag)
        if (click.active) {
            CheckClick(click, center)
        }
        DrawOrbits(ctx, center, orbits);
        DrawPlanet(ctx, center, angleRad);
        DrawSun(ctx, center, sun);
    }

    useEffect(() => {
        setSize({
            w: elementRef.current.offsetWidth,
            h: elementRef.current.offsetHeight
        });
    }, []);

    return <div ref={elementRef} style={style}>
        <Canvas draw={draw} width={size.w} height={size.h} zoom={glxSettings.zoom} />
    </div>
}

export default SolarSystem2D;