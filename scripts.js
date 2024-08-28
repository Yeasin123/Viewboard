document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.main-container');
    const leftSection = document.querySelector('.left-section');
    const middleSection = document.querySelector('.middle-section');
    const lastMiddleSection = document.querySelector('.last-middle-section');
    const resizerMiddle = document.getElementById('resizer-middle');

    let isResizing = false;
    let lastDownX = 0;
    let resizer;

    function updateResizers() {
        resizerMiddle.style.left = leftSection.clientWidth + middleSection.clientWidth + 'px';
    }

    function mouseDownHandler(e, resizerElem) {
        isResizing = true;
        lastDownX = e.clientX;
        resizer = resizerElem;

        // Change the resizer color while dragging
        resizer.style.backgroundColor = '#FF5733'; // Change this to your preferred color

        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    function mouseMoveHandler(e) {
        if (!isResizing) return;

        const containerWidth = container.clientWidth - document.querySelector('.right-section').clientWidth;

        const newMiddleWidth = e.clientX - leftSection.clientWidth - container.offsetLeft;
        middleSection.style.width = newMiddleWidth + 'px';
        lastMiddleSection.style.width = (containerWidth - newMiddleWidth - leftSection.clientWidth) + 'px';

        updateResizers();
    }

    function mouseUpHandler() {
        isResizing = false;
        document.body.style.cursor = 'default';

        // Revert the resizer color after dragging
        resizer.style.backgroundColor = ''; // Resets to the original color

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    resizerMiddle.addEventListener('mousedown', (e) => mouseDownHandler(e, resizerMiddle));

    // Initial position of resizer
    updateResizers();
});
