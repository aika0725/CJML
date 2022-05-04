const removeMask = () => {
    const mask = document.querySelector(".modal-backdrop");
    mask.classList.remove("show");
    setTimeout(() => {
        mask.remove();
    }, 500);
};

const readDocs = () => {
    removeMask();
    window.open("docs/doc.html", "_blank");
};

const readMore = () => {
    removeMask();
    window.open("https://www.cjml.no", "_blank");
};
