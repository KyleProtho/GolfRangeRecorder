document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('driving-range-image');
    const container = document.querySelector('.image-container');
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    const downloadBtn = document.getElementById('download-btn');
    let markers = [];
    let undoStack = [];

    image.addEventListener('click', (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const marker = document.createElement('div');
        marker.classList.add('marker');
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        container.appendChild(marker);
        markers.push(marker);
    });

    undoBtn.addEventListener('click', () => {
        if (markers.length > 0) {
            const marker = markers.pop();
            undoStack.push(marker);
            container.removeChild(marker);
        }
    });

    redoBtn.addEventListener('click', () => {
        if (undoStack.length > 0) {
            const marker = undoStack.pop();
            container.appendChild(marker);
            markers.push(marker);
        }
    });

    downloadBtn.addEventListener('click', () => {
        html2canvas(container).then(canvas => {
            const link = document.createElement('a');
            link.download = 'driving-range-shots.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});
