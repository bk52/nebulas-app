import React, { useLayoutEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'semantic-ui-react';
import { Stage, Layer, Rect, Transformer, Circle, Image, Line, Text } from 'react-konva';
import useImage from 'use-image';

const CustomC = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return <>
        <Circle
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            {...shapeProps}
            draggable
            onDragEnd={(e) => {
                onChange({
                    ...shapeProps,
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
            onTransformEnd={(e) => {
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                    ...shapeProps,
                    x: node.x(),
                    y: node.y(),
                    width: Math.max(5, node.width() * scaleX),
                    height: Math.max(node.height() * scaleY),
                });
            }}
        />
        {isSelected && (
            <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
        )}
    </>
}

const CustomR = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Rect
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};

const CustomI = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    let image;
    if (shapeProps.src) {
        image = useImage(shapeProps.src)[0]
    }

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Image
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                image={image}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
}

const CustomL = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Line
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
}

const CustomT = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Text
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
}

const DrawLayer = forwardRef((props, ref) => {
    const layoutRef = useRef(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [shapes, setShapes] = React.useState([]);
    const [selectedId, selectShape] = React.useState(null);

    const onDelete = (e) => {
        e.preventDefault();
        const newShapes = shapes.filter(x => { return x.id != selectedId; })
        setShapes(newShapes)
    }

    useLayoutEffect(() => {
        setSize({
            w: layoutRef.current.offsetWidth,
            h: layoutRef.current.offsetHeight
        })
        setShapes(props.shapeList)
    }, []);

    useImperativeHandle(ref, () => ({
        save() {
            // console.log(shapes)
        },
    }));

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) { selectShape(null); }
    };

    const onShapeSelected = (id) => { selectShape(id); }

    return (
        <div ref={layoutRef} style={{ 'width': '100%', 'height': '100%' }}>
            {selectedId && <Button circular color='red' icon='trash' onClick={(e) => onDelete(e)}></Button>}
            <Stage
                draggable
                width={size.w}
                height={size.h}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Layer>
                    {shapes.map((s, i) => {
                        if (s.type === 'r') {
                            return <CustomR
                                key={i}
                                shapeProps={s}
                                isSelected={s.id === selectedId}
                                onSelect={() => {
                                    onShapeSelected(s.id);
                                }}
                                onChange={(newAttrs) => {
                                    const ss = shapes.slice();
                                    ss[i] = newAttrs;
                                    setShapes(ss);
                                }}
                            />
                        }
                        else if (s.type === 'c') {
                            return <CustomC
                                key={i}
                                shapeProps={s}
                                isSelected={s.id === selectedId}
                                onSelect={() => {
                                    onShapeSelected(s.id);
                                }}
                                onChange={(newAttrs) => {
                                    const ss = shapes.slice();
                                    ss[i] = newAttrs;
                                    setShapes(ss);
                                }}
                            />
                        }
                        else if (s.type === 'i') {
                            return <CustomI
                                key={i}
                                shapeProps={s}
                                isSelected={s.id === selectedId}
                                onSelect={() => {
                                    onShapeSelected(s.id);
                                }}
                                onChange={(newAttrs) => {
                                    const ss = shapes.slice();
                                    ss[i] = newAttrs;
                                    setShapes(ss);
                                }}
                            />
                        }
                        else if (s.type === 'l') {
                            return <CustomL
                                key={i}
                                shapeProps={s}
                                isSelected={s.id === selectedId}
                                onSelect={() => {
                                    onShapeSelected(s.id);
                                }}
                                onChange={(newAttrs) => {
                                    const ss = shapes.slice();
                                    ss[i] = newAttrs;
                                    setShapes(ss);
                                }}
                            />
                        }
                        else if (s.type === 't') {
                            return <CustomT
                                key={i}
                                shapeProps={s}
                                isSelected={s.id === selectedId}
                                onSelect={() => {
                                    onShapeSelected(s.id);
                                }}
                                onChange={(newAttrs) => {
                                    const ss = shapes.slice();
                                    ss[i] = newAttrs;
                                    setShapes(ss);
                                }}
                            />
                        }
                    })}
                </Layer>
            </Stage>
        </div>
    );
});


export default DrawLayer;
