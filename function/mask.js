const removeMask = ()=>{
    const mask = document.querySelector('.modal-backdrop')
    mask.classList.remove('show')
    setTimeout(() => {mask.remove()}, 500);
}