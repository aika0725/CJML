const exportPng = () => {
    const captureDiv = document.getElementById("capture");
    const captureDivWidth = captureDiv.scrollWidth + 20;
    html2canvas(captureDiv, { width: captureDivWidth }).then((canvas) => {
        exportCanvasAsPNG(canvas);
    });
};

const exportCanvasAsPNG = (canvas) => {
    const imgURL = canvas.toDataURL("image/png");
    let dlLink = document.createElement("a");
    dlLink.download = "CJML";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [
        "image/png",
        dlLink.download,
        dlLink.href,
    ].join(":");

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
};
