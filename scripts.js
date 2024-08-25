document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.main-container');
    const leftSection = document.querySelector('.left-section');
    const middleSection = document.querySelector('.middle-section');
    const lastMiddleSection = document.querySelector('.last-middle-section');
    const rightSection = document.querySelector('.right-section');
    const resizerLeft = document.getElementById('resizer-left');
    const resizerMiddle = document.getElementById('resizer-middle');
    const resizerRight = document.getElementById('resizer-right');

    let isResizing = false;
    let lastDownX = 0;
    let resizer;

    function updateResizers() {
        resizerLeft.style.left = leftSection.clientWidth + 'px';
        resizerMiddle.style.left = leftSection.clientWidth + middleSection.clientWidth + 'px';
        resizerRight.style.left = leftSection.clientWidth + middleSection.clientWidth + lastMiddleSection.clientWidth + 'px';
    }

    function mouseDownHandler(e, resizerElem) {
        isResizing = true;
        lastDownX = e.clientX;
        resizer = resizerElem;

        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    function mouseMoveHandler(e) {
        if (!isResizing) return;

        const containerWidth = container.clientWidth;

        if (resizer === resizerLeft) {
            const newLeftWidth = e.clientX - container.offsetLeft;
            leftSection.style.width = newLeftWidth + 'px';
            middleSection.style.width = (containerWidth - newLeftWidth - rightSection.clientWidth - lastMiddleSection.clientWidth) + 'px';
        } else if (resizer === resizerMiddle) {
            const newMiddleWidth = e.clientX - leftSection.clientWidth - container.offsetLeft;
            middleSection.style.width = newMiddleWidth + 'px';
            lastMiddleSection.style.width = (containerWidth - newMiddleWidth - leftSection.clientWidth - rightSection.clientWidth) + 'px';
        } else if (resizer === resizerRight) {
            const newLastMiddleWidth = e.clientX - leftSection.clientWidth - middleSection.clientWidth - container.offsetLeft;
            lastMiddleSection.style.width = newLastMiddleWidth + 'px';
            rightSection.style.width = (containerWidth - newLastMiddleWidth - middleSection.clientWidth - leftSection.clientWidth) + 'px';
        }

        updateResizers();
    }

    function mouseUpHandler() {
        isResizing = false;
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    resizerLeft.addEventListener('mousedown', (e) => mouseDownHandler(e, resizerLeft));
    resizerMiddle.addEventListener('mousedown', (e) => mouseDownHandler(e, resizerMiddle));
    resizerRight.addEventListener('mousedown', (e) => mouseDownHandler(e, resizerRight));

    // Initial position of resizers
    updateResizers();
});
