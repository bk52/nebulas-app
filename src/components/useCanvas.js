import { useRef, useEffect } from 'react'
import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

const updateCanvasSize = (canvas, context) => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.scale(ratio, ratio);
        return true;
    }

    return false;
};




const useCanvas = (draw, scale = 1) => {
    const canvasRef = useRef(null)
    let canvas = null, context = null;
    let center = { x: 0, y: 0 };
    let isDragging = false, touch = { x: 0, y: 0 }, touchPrev = { x: 0, y: 0 }, drag = { x: 0, y: 0 }, click = { active: false, x: 0, y: 0 };

    const onMouseMove = (e) => {
        if (isDragging) {
            drag = {
                x: touchPrev.x + e.clientX - touch.x,
                y: touchPrev.y + e.clientY - touch.y
            }

            // context.setTransform(1, 0, 0, 1, 0, 0);
            // context.clearRect(0, 0, canvas.width, canvas.height);

            // if (scale == 1) {
            //     context.setTransform(scale, 0, 0, scale, drag.x, drag.y);
            // }
            // else if (scale > 1) {
            //     context.setTransform(scale, 0, 0, scale, (-center.x + drag.x) * (scale - 1), (-center.y + drag.y) * (scale - 1));
            // }
            // else if (scale < 1) {
            //     context.setTransform(scale, 0, 0, scale, (-center.x - drag.x) * (scale - 1), (-center.y - drag.y) * (scale - 1));
            // }

        }
    }

    const onMouseDown = (e) => {
        isDragging = true;
        touch = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = (e) => {
        if (touch.x == e.clientX && touch.y == e.clientY) {

            const rect = e.target.getBoundingClientRect();
            click = {
                active: true,
                x: (e.clientX - rect.left),
                y: (e.clientY - rect.top)
            }

            const m = context.getTransform()
            const imtrx = math.inv([
                [m.a, m.c, m.e],
                [m.b, m.d, m.f],
                [0, 0, 1]
            ]);
            const xx = imtrx[0][0] * click.x + imtrx[0][1] * click.y + imtrx[0][2];
            const yy = imtrx[1][0] * click.x + imtrx[1][1] * click.y + imtrx[1][2];
            click.x = xx;
            click.y = yy;
        }

        if (isDragging) { touchPrev = { ...drag } }
        isDragging = false;
    }

    const onMouseOut = (e) => {
        if (isDragging) { touchPrev = { ...drag } }
        isDragging = false;
    }

    const setListeners = () => {
        try {
            canvas.removeEventListener("mousemove", onMouseMove)
            canvas.removeEventListener("mouseup", onMouseUp)
            canvas.removeEventListener("mousedown", onMouseDown)
            canvas.removeEventListener("mouseout", onMouseOut)

            canvas.addEventListener("mousemove", onMouseMove)
            canvas.addEventListener("mouseup", onMouseUp)
            canvas.addEventListener("mousedown", onMouseDown)
            canvas.addEventListener("mouseout", onMouseOut)
        }
        catch (e) { }
    }

    useEffect(() => {
        canvas = canvasRef.current;
        context = canvas && canvas.getContext('2d');
        updateCanvasSize(canvas, context);
        setListeners(canvas);
        let animationFrameId;
        center = {
            x: context.canvas.width / 2,
            y: context.canvas.height / 2
        }
        const render = () => {
            draw(context, center, scale, drag, click);
            click.active = false;
            animationFrameId = window.requestAnimationFrame(render);
        }
        render()
        return () => {
            window.cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("mousedown", onMouseDown);
            canvas.removeEventListener("mouseout", onMouseOut);
        }
    }, [draw])

    return canvasRef
}

export default useCanvas