document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('driving-range-image');
    const container = document.querySelector('.image-container');
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    const downloadBtn = document.getElementById('download-btn');
    const rangeSelect = document.getElementById('range-select');
    let markers = [];
    let undoStack = [];

    const drivingRanges = [
        { path: 'img/Scallys - Moon Twp PA.jpg', name: 'Scallys - Moon Twp PA' },
        // Add more driving ranges here
        // { path: 'img/Range2.jpg', name: 'Range 2' },
        // { path: 'img/Range3.jpg', name: 'Range 3' }
    ];

    // Populate the driving range dropdown
    drivingRanges.forEach(range => {
        const option = document.createElement('option');
        option.value = range.path;
        option.textContent = range.name;
        rangeSelect.appendChild(option);
    });

    // Set the initial image source based on the first driving range in the array
    if (drivingRanges.length > 0) {
        image.src = drivingRanges[0].path;
    }

    image.addEventListener('click', (event) => {
        const rect = image.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;
    
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
        html2canvas(container, {
            scale: window.devicePixelRatio, // Ensures proper scaling
            useCORS: true, // Ensures cross-origin images are rendered properly
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'driving-range-shots.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
    
    rangeSelect.addEventListener('change', (event) => {
        const selectedRange = event.target.value;
        image.src = selectedRange;
        // Clear existing markers when the image changes
        markers.forEach(marker => container.removeChild(marker));
        markers = [];
        undoStack = [];
    });
});
