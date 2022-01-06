const test= ()=>{
    console.log('collected data')
    console.log(actors)
    console.log(touchpoints)
    const newArray = touchpoints.sort((a, b) => (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0))
    console.log(newArray)
}