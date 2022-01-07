//sort touchpoints by time
const sortTouchpoints = ()=>{
    touchpoints.sort((a, b) => (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0))
}

