// Interactive Visualizations using Plotly.js

// Home Page: Derivative Demo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('derivative-demo')) {
        createDerivativeDemo();
    }
});

function createDerivativeDemo() {
    const xPoint = parseFloat(document.getElementById('x-point').value);
    updateDerivativeVisualization(xPoint);

    document.getElementById('x-point').addEventListener('input', function() {
        document.getElementById('x-value').textContent = this.value;
        updateDerivativeVisualization(parseFloat(this.value));
    });
}

function updateDerivativeVisualization(x0) {
    // Function: f(x) = x^3 - 3x^2 + 2
    const f = x => Math.pow(x, 3) - 3 * Math.pow(x, 2) + 2;
    const fprime = x => 3 * Math.pow(x, 2) - 6 * x;

    // Generate points for the curve
    const xValues = [];
    for (let x = -5; x <= 5; x += 0.1) {
        xValues.push(x);
    }
    const yValues = xValues.map(f);

    // Point of tangency
    const y0 = f(x0);
    const slope = fprime(x0);

    // Tangent line
    const tangentX = [x0 - 2, x0 + 2];
    const tangentY = tangentX.map(x => y0 + slope * (x - x0));

    const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = x³ - 3x² + 2',
        line: { color: '#2563eb', width: 3 }
    };

    const trace2 = {
        x: tangentX,
        y: tangentY,
        type: 'scatter',
        mode: 'lines',
        name: `Tangent (slope = ${slope.toFixed(2)})`,
        line: { color: '#ef4444', width: 2, dash: 'dash' }
    };

    const trace3 = {
        x: [x0],
        y: [y0],
        type: 'scatter',
        mode: 'markers',
        name: `Point (${x0.toFixed(1)}, ${y0.toFixed(1)})`,
        marker: { color: '#10b981', size: 12 }
    };

    const layout = {
        title: 'Function and its Tangent Line',
        xaxis: { title: 'x', zeroline: true, gridcolor: '#e5e7eb' },
        yaxis: { title: 'f(x)', zeroline: true, gridcolor: '#e5e7eb' },
        hovermode: 'closest',
        showlegend: true,
        legend: { x: 0.02, y: 0.98 },
        plot_bgcolor: '#f8fafc',
        paper_bgcolor: '#ffffff'
    };

    Plotly.newPlot('derivative-demo', [trace1, trace2, trace3], layout, {responsive: true});
}

// Limit Visualization
function createLimitVisualization(elementId, func, limit, point) {
    const delta = 0.01;
    const xValues = [];
    const yValues = [];

    // Left approach
    for (let x = point - 2; x < point - delta; x += 0.05) {
        xValues.push(x);
        yValues.push(func(x));
    }

    // Skip the point itself if there's a discontinuity
    xValues.push(null);
    yValues.push(null);

    // Right approach
    for (let x = point + delta; x < point + 2; x += 0.05) {
        xValues.push(x);
        yValues.push(func(x));
    }

    const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)',
        line: { color: '#2563eb', width: 3 }
    };

    const trace2 = {
        x: [point],
        y: [limit],
        type: 'scatter',
        mode: 'markers',
        name: `Limit = ${limit.toFixed(2)}`,
        marker: { color: '#ef4444', size: 12, symbol: 'circle-open', line: { width: 2 } }
    };

    const layout = {
        title: 'Limit Visualization',
        xaxis: { title: 'x', zeroline: true },
        yaxis: { title: 'f(x)', zeroline: true },
        hovermode: 'closest',
        showlegend: true
    };

    Plotly.newPlot(elementId, [trace1, trace2], layout, {responsive: true});
}

// Gradient Descent Visualization
function createGradientDescentVisualization(elementId) {
    // Function: f(x) = x^2 + 3
    const f = x => Math.pow(x, 2) + 3;
    const fprime = x => 2 * x;

    // Generate surface
    const xSurface = [];
    for (let x = -5; x <= 5; x += 0.1) {
        xSurface.push(x);
    }
    const ySurface = xSurface.map(f);

    // Gradient descent path
    let x = 4.5; // Starting point
    const learningRate = 0.1;
    const xPath = [x];
    const yPath = [f(x)];

    for (let i = 0; i < 30; i++) {
        x = x - learningRate * fprime(x);
        xPath.push(x);
        yPath.push(f(x));
    }

    const trace1 = {
        x: xSurface,
        y: ySurface,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x) = x² + 3',
        line: { color: '#2563eb', width: 2 }
    };

    const trace2 = {
        x: xPath,
        y: yPath,
        type: 'scatter',
        mode: 'markers+lines',
        name: 'Gradient Descent Path',
        marker: { color: '#ef4444', size: 8 },
        line: { color: '#ef4444', width: 2, dash: 'dot' }
    };

    const layout = {
        title: 'Gradient Descent Optimization',
        xaxis: { title: 'x (parameter)', zeroline: true },
        yaxis: { title: 'f(x) (loss)', zeroline: true },
        hovermode: 'closest',
        showlegend: true,
        annotations: [{
            x: xPath[0],
            y: yPath[0],
            text: 'Start',
            showarrow: true,
            arrowhead: 2
        }, {
            x: xPath[xPath.length - 1],
            y: yPath[yPath.length - 1],
            text: 'Minimum',
            showarrow: true,
            arrowhead: 2
        }]
    };

    Plotly.newPlot(elementId, [trace1, trace2], layout, {responsive: true});
}

// 3D Surface Plot for Multivariable Functions
function create3DSurfacePlot(elementId, func, title = '3D Surface') {
    const size = 50;
    const x = [];
    const y = [];
    const z = [];

    for (let i = 0; i < size; i++) {
        x.push(-5 + (10 * i) / size);
        y.push(-5 + (10 * i) / size);
    }

    for (let i = 0; i < size; i++) {
        const zRow = [];
        for (let j = 0; j < size; j++) {
            zRow.push(func(x[i], y[j]));
        }
        z.push(zRow);
    }

    const data = [{
        x: x,
        y: y,
        z: z,
        type: 'surface',
        colorscale: 'Viridis'
    }];

    const layout = {
        title: title,
        scene: {
            xaxis: { title: 'x' },
            yaxis: { title: 'y' },
            zaxis: { title: 'f(x,y)' }
        },
        autosize: true
    };

    Plotly.newPlot(elementId, data, layout, {responsive: true});
}

// Contour Plot
function createContourPlot(elementId, func, title = 'Contour Plot') {
    const size = 100;
    const x = [];
    const y = [];
    const z = [];

    for (let i = 0; i < size; i++) {
        x.push(-5 + (10 * i) / size);
        y.push(-5 + (10 * i) / size);
    }

    for (let i = 0; i < size; i++) {
        const zRow = [];
        for (let j = 0; j < size; j++) {
            zRow.push(func(x[i], y[j]));
        }
        z.push(zRow);
    }

    const data = [{
        x: x,
        y: y,
        z: z,
        type: 'contour',
        colorscale: 'Jet',
        contours: {
            coloring: 'heatmap'
        }
    }];

    const layout = {
        title: title,
        xaxis: { title: 'x' },
        yaxis: { title: 'y' }
    };

    Plotly.newPlot(elementId, data, layout, {responsive: true});
}

// Riemann Sum Visualization
function createRiemannSumVisualization(elementId, func, a, b, n) {
    // Generate function curve
    const xCurve = [];
    const yCurve = [];
    for (let x = a; x <= b; x += (b - a) / 200) {
        xCurve.push(x);
        yCurve.push(func(x));
    }

    const trace1 = {
        x: xCurve,
        y: yCurve,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)',
        line: { color: '#2563eb', width: 3 }
    };

    // Generate rectangles
    const dx = (b - a) / n;
    const rectangles = [];

    for (let i = 0; i < n; i++) {
        const x = a + i * dx;
        const height = func(x + dx / 2); // Midpoint rule

        rectangles.push({
            type: 'rect',
            x0: x,
            x1: x + dx,
            y0: 0,
            y1: height,
            fillcolor: 'rgba(37, 99, 235, 0.3)',
            line: { color: '#2563eb', width: 1 }
        });
    }

    const layout = {
        title: `Riemann Sum (n = ${n})`,
        xaxis: { title: 'x', range: [a - 0.5, b + 0.5] },
        yaxis: { title: 'f(x)' },
        shapes: rectangles,
        showlegend: true
    };

    Plotly.newPlot(elementId, [trace1], layout, {responsive: true});
}

// Vector Field Visualization
function createVectorFieldPlot(elementId, fx, fy, title = 'Vector Field') {
    const xValues = [];
    const yValues = [];
    const uValues = [];
    const vValues = [];

    for (let x = -3; x <= 3; x += 0.5) {
        for (let y = -3; y <= 3; y += 0.5) {
            xValues.push(x);
            yValues.push(y);
            uValues.push(fx(x, y));
            vValues.push(fy(x, y));
        }
    }

    // Normalize vectors for better visualization
    const maxMag = Math.max(...uValues.map((u, i) => Math.sqrt(u * u + vValues[i] * vValues[i])));

    const data = [{
        type: 'cone',
        x: xValues,
        y: yValues,
        z: new Array(xValues.length).fill(0),
        u: uValues.map(u => u / maxMag * 0.4),
        v: vValues.map(v => v / maxMag * 0.4),
        w: new Array(xValues.length).fill(0),
        colorscale: 'Viridis',
        sizemode: 'absolute',
        sizeref: 0.5
    }];

    const layout = {
        title: title,
        scene: {
            camera: {
                eye: { x: 0, y: 0, z: 2 }
            },
            xaxis: { title: 'x' },
            yaxis: { title: 'y' },
            zaxis: { title: '', showticklabels: false }
        }
    };

    Plotly.newPlot(elementId, data, layout, {responsive: true});
}

// Sequence Convergence Visualization
function createSequenceVisualization(elementId, sequence, limit, terms = 20) {
    const n = Array.from({length: terms}, (_, i) => i + 1);
    const values = n.map(sequence);

    const trace1 = {
        x: n,
        y: values,
        type: 'scatter',
        mode: 'markers+lines',
        name: 'Sequence terms',
        marker: { color: '#2563eb', size: 8 }
    };

    const trace2 = {
        x: [1, terms],
        y: [limit, limit],
        type: 'scatter',
        mode: 'lines',
        name: `Limit = ${limit}`,
        line: { color: '#ef4444', width: 2, dash: 'dash' }
    };

    const layout = {
        title: 'Sequence Convergence',
        xaxis: { title: 'n (term number)' },
        yaxis: { title: 'aₙ (term value)' },
        hovermode: 'closest',
        showlegend: true
    };

    Plotly.newPlot(elementId, [trace1, trace2], layout, {responsive: true});
}

// Animation for Tangent Line
function animateTangentLine(elementId, func, fprime, a, b, fps = 30) {
    const f = func;
    const derivative = fprime;

    // Generate function curve
    const xCurve = [];
    for (let x = a; x <= b; x += (b - a) / 200) {
        xCurve.push(x);
    }
    const yCurve = xCurve.map(f);

    const frames = [];
    const numFrames = 60;

    for (let i = 0; i < numFrames; i++) {
        const x0 = a + (b - a) * i / numFrames;
        const y0 = f(x0);
        const slope = derivative(x0);

        const tangentX = [x0 - 1, x0 + 1];
        const tangentY = tangentX.map(x => y0 + slope * (x - x0));

        frames.push({
            data: [
                { x: xCurve, y: yCurve },
                { x: tangentX, y: tangentY },
                { x: [x0], y: [y0] }
            ],
            name: `frame${i}`
        });
    }

    const data = [
        {
            x: xCurve,
            y: yCurve,
            type: 'scatter',
            mode: 'lines',
            name: 'f(x)',
            line: { color: '#2563eb', width: 3 }
        },
        {
            x: [a],
            y: [f(a)],
            type: 'scatter',
            mode: 'lines',
            name: 'Tangent',
            line: { color: '#ef4444', width: 2 }
        },
        {
            x: [a],
            y: [f(a)],
            type: 'scatter',
            mode: 'markers',
            name: 'Point',
            marker: { color: '#10b981', size: 12 }
        }
    ];

    const layout = {
        title: 'Animated Tangent Line',
        xaxis: { title: 'x', range: [a - 0.5, b + 0.5] },
        yaxis: { title: 'f(x)' },
        updatemenus: [{
            type: 'buttons',
            showactive: false,
            buttons: [{
                label: 'Play',
                method: 'animate',
                args: [null, {
                    frame: { duration: 1000 / fps, redraw: true },
                    fromcurrent: true,
                    mode: 'immediate'
                }]
            }, {
                label: 'Pause',
                method: 'animate',
                args: [[null], {
                    frame: { duration: 0, redraw: false },
                    mode: 'immediate'
                }]
            }]
        }]
    };

    Plotly.newPlot(elementId, data, layout, {responsive: true}).then(() => {
        Plotly.addFrames(elementId, frames);
    });
}

// Export visualization functions
window.CalcVisualizations = {
    createDerivativeDemo,
    createLimitVisualization,
    createGradientDescentVisualization,
    create3DSurfacePlot,
    createContourPlot,
    createRiemannSumVisualization,
    createVectorFieldPlot,
    createSequenceVisualization,
    animateTangentLine
};
