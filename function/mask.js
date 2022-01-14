const removeMask = ()=>{
    const mask = document.querySelector('.modal-backdrop')
    mask.classList.remove('show')
    setTimeout(() => {mask.remove()}, 500);
}


const readDocs=()=>{
    removeMask()
    window.open("docs/doc.html", "_blank");
}

const readMore=()=>{
    removeMask()
    window.open("https://www.sintef.no/en/expertise/information-and-communication-technology-ict/software-service-and-innovation/user-journeys-and-customer-journey-modeling-language-cjml/", "_blank");
}

