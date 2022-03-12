import React, { useRef, useEffect } from "react";
import useCanvas from './useCanvas'

export default function Canvas(props) {
    const { draw, zoom, ...rest } = props
    const canvasRef = useCanvas(draw, zoom)
    return <canvas ref={canvasRef} {...rest} />
}