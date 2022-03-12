import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import cytoscape from 'cytoscape';

const GetRandPos = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)


const GraphView = ({ planets, connections }) => {
    const ref = useRef(null)
    const [size, setSize] = useState({ w: 0, h: 0 })
    let cy;

    const InitNodes = () => {
        let nodesList = [];
        let connList = [];

        cy = cytoscape({
            container: document.getElementById('galaxyGraphView'),//
            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(name)',
                        'text-halign': 'center',
                        'text-valign': 'bottom',
                        'text-background-color': 'data(color)',
                        'background-color': 'data(color)',
                        'width': 'data(size)',
                        'height': 'data(size)'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': 'data(color)',
                        'curve-style': 'bezier',
                    }
                }
            ],
            wheelSensitivity: 0.1
        });
        cy.layout({ name: 'grid', rows: 1 })

        if (cy) {
            planets.map(p => {
                nodesList.push({
                    group: 'nodes',
                    data: {
                        id: p.id,
                        size: p.type === 's' ? 30 : 20,
                        color: p.color1,
                        name: p.title
                    },
                    position: {
                        x: p.type === 's' ? size.w / 2 : GetRandPos(0, size.w),
                        y: p.type === 's' ? size.h / 2 : GetRandPos(0, size.h),
                    }
                })
            })
            connections.map(n => {
                if (!connList.some(c => (c.p1 == n.p1.id && c.p2 == n.p2.id) || (c.p1 == n.p2.id && c.p2 == n.p1.id))) {
                    const nC = { p1: n.p1.id, p2: n.p2.id }
                    connList.push(nC);
                    nodesList.push({ group: 'edges', data: { id: `${nC.p1}${nC.p2}`, source: nC.p1, target: nC.p2, color: n.p1.color1 } })
                }
            })
            cy.add(nodesList);
        }
    }

    useLayoutEffect(() => {
        setSize({
            w: ref.current.offsetWidth,
            h: ref.current.offsetHeight
        })
    }, [])

    useEffect(() => {
        InitNodes();
    }, [size])

    return (
        <div id='galaxyGraphView' ref={ref} style={{ 'width': '100%', 'height': '100%', 'margin': '0px', 'left': '0px' }}></div>
    )
}

export default GraphView;