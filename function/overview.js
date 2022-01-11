
const createOverviewElement = (touchpoint,index)=>{
    const content=
    `<li class="page-item"><a class="page-link" href="#${touchpoint.id}">${index}</a></li>
    `
    return content
}
const createOverview = ()=>{
    const container = document.querySelector('.bottom-nav')
    container.innerHTML=''
    touchpoints.forEach((touchpoint)=>{

        let index = titleNos.indexOf(touchpoint.id)+1
        container.innerHTML+=createOverviewElement(touchpoint,index)
    })
    
}
