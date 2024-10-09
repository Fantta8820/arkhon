import { Point, Path, type Canvas } from 'fabric';
import { add } from './objects';

export function centerView(canvas: Canvas, width: number, height: number): void {
    canvas.setZoom(1);

    canvas.absolutePan(
        new Point(-canvas.width / 2 + width / 2 + 200, -canvas.height / 2 + height / 2)
    );
}

export function renderAll(canvas: Canvas): void {
    canvas.renderAll();
}

function draw(canvas: Canvas, value: boolean): void {
    canvas.isDrawingMode = value;
    renderAll(canvas);
}

export function startDraw(canvas: Canvas): void {
    draw(canvas, true);
}

export function stopDraw(canvas: Canvas): void {
    draw(canvas, false);
}

export function drawGrid(canvas: Canvas, grid: number, width: number, height: number) {        

    const gridPath = [];

    for (let i = 0; i <= Math.round(width) / grid; i++) {
        const x = Math.round(i * grid);
        gridPath.push(`M ${x} 0 L ${x} ${Math.round(height)}`);
    }

    for (let i = 0; i <= Math.round(height) / grid; i++) {
        const y = Math.round(i * grid);
        gridPath.push(`M 0 ${y} L ${Math.round(width)} ${y}`);
    }

    const path = new Path(gridPath.join(' '), {
        fill: '',
        stroke: '#A3A3A3',
        strokeWidth: 2,
        strokeUniform: true,
        selectable: false,
        evented: false,
        objectCaching: false
    });
    
    add(canvas, path);
    path.setCoords();
}

export function resize(canvas: Canvas, width: number, height: number) {
    if (width >= 1536) {
        canvas.setDimensions({
            width: width - width / 5,
            height: height - (height / 100) * 5.5
        });
    } else if (width >= 1280) {
        canvas.setDimensions({
            width: width - width / 4,
            height: height - (height / 100) * 5.5
        });
    } else {
        canvas.setDimensions({
            width: width,
            height: height - (height / 100) * 5.5
        });
    }
}