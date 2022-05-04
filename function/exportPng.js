const exportPng = () => {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
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
