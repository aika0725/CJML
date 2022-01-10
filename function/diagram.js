// actors for rows
// touchpoints for boxes
const canvas = document.querySelector('.canvas')

const createSwimlane = () => {
    sortTouchpoints()
    canvas.innerHTML = ''
    actors.forEach((actor) => {
        canvas.innerHTML += createSwimlaneElement(actor)
    })
    replaceBoxes()  
}
const createSwimlaneElement = (actor) => {
    //image get from function. pass actor.role
    const swimlane = `
    <div class="swimlane-row" data-id = "${actor.id}">
        <div class="swimlane-actor">
            <div class="actor-img">${getActorImg(actor)}</div>
            <div class="actor-name">${actor.name}</div>
        </div>
        ${generateDefaultBoxes()}
    </div>`
    return swimlane
}

const createActionBoxes = (touchpoint) => {
    const actionBox = document.createElement('div')
    actionBox.className = 'swimlane-action'
    const actionContent = document.createElement('div')
    actionContent.className = 'action-content'
    actionContent.textContent = `${touchpoint.senderDescription}`
    actionBox.append(actionContent)
    return actionBox
}

const generateDefaultBoxes = () => {
    let box = ''
    touchpoints.forEach((touchpoint) => {
        console.log('box')
        box += `<div class="box" box-id="${touchpoint.id}"></div>`
    })
    return box
}

const replaceBoxes = () => {
    touchpoints.forEach((touchpoint) => {
        if (touchpoint.type == 'action') {
            const rowID = touchpoint.senderID
            const columnID = touchpoint.id
            const replacedBox = document.querySelector(`div[data-id='${rowID}'] div[box-id="${columnID}"]`)

            replacedBox.replaceWith(createActionBoxes(touchpoint))
        } else {
            const rowID_1 = touchpoint.senderID
            const rowID_2 = touchpoint.receiverID
            const columnID = touchpoint.id
            const replacedSender =document.querySelector(`div[data-id='${rowID_1}'] div[box-id="${columnID}"]`)
            const replacedReceiver = document.querySelector(`div[data-id='${rowID_2}'] div[box-id="${columnID}"]`)

            replacedSender.replaceWith(createSenderBoxes(touchpoint))
            replacedReceiver.replaceWith(createReceiverBoxes(touchpoint))
            connectBoxes(touchpoint)
        }
    })
}

const createSenderBoxes = (touchpoint) => {
    const senderBox = document.createElement('div')
    senderBox.className = 'swimlane-sender swimlane-item'
    senderBox.setAttribute('senderBox-id',touchpoint.id)

    const channelImg = document.createElement('div')
    channelImg.className = 'channel-img'
// insert channel pic
    channelImg.innerHTML= getChannelImg(touchpoint)
    const communicationContent = document.createElement('div')
    communicationContent.className = 'communication-content'
    communicationContent.textContent = `${touchpoint.senderDescription}`
// add arrow with senderbox
    const arrow = createArrowElement(touchpoint)

    senderBox.append(channelImg, communicationContent)
    senderBox.innerHTML+=arrow
    return senderBox
}

const createReceiverBoxes = (touchpoint) => {
    const receiverBox = document.createElement('div')
    receiverBox.className = 'swimlane-receiver swimlane-item'
    receiverBox.setAttribute('receiverBox-id',touchpoint.id)

    const channelImg = document.createElement('div')
    channelImg.className = 'channel-img'
// insert channel pic
    channelImg.innerHTML= getChannelImg(touchpoint)
    const communicationContent = document.createElement('div')
    communicationContent.className = 'communication-content'
    communicationContent.textContent = `${touchpoint.receiverDescription}`

    receiverBox.append(channelImg, communicationContent)
    return receiverBox
}

const getActorImg = (actor) =>{
    let img
    switch (actor.role) {
        case 'user/customer':
            img = '<img class="actor-img" src="symbols/actors/user-4.png">'
            break
        case 'service provider':
            img = '<img class="actor-img" src="symbols/actors/service-provider-4.png">'
            break
        case 'employee':
            img = '<img class="actor-img" src="symbols/actors/employee-4.png">'
            break
        case 'attacker':
            img = '<img class="actor-img" src="symbols/actors/attacker.png">'
            break
        case 'system':
            img = '<img class="actor-img" src="symbols/actors/datasystem.png">'
            break
        case 'bank' :
            img = '<img class="actor-img" src="symbols/actors/bank-4.png">'
            break
        case 'staff-IT' :
            img = '<img class="actor-img" src="symbols/actors/staff IT.png">'
            break
    }
    return img
}

const getChannelImg = (touchpoint) =>{
    let img
    switch (touchpoint.channel) {
        case 'SMS':
            img = '<img class="channel-img" src="symbols/channels/sms.png">'
            break
        case 'Email':
            img = '<img class="channel-img" src="symbols/channels/email.png">'
            break
        case 'Telephone conversation':
            img = '<img class="channel-img" src="symbols/channels/telephone.png">'
            break
        case 'Face-to-Face':
            img = '<img class="channel-img" src="symbols/channels/face-to-face.png">'
            break
        case 'Website':
            img = '<img class="channel-img" src="symbols/channels/internet.png">'
            break
        case 'Letter':
            img = '<img class="channel-img" src="symbols/channels/letter.png">'
            break
        case 'Payment':
            img = '<img class="channel-img" src="symbols/channels/payment.png">'
            break
        case 'Self-service machine':
            img = '<img class="channel-img" src="symbols/channels/self-service machine.png">'
            break
    }
    return img
}

const createArrowElement = (touchpoint)=>{
    const arrowElement = `
    <div class="arrow" arrow-id='${touchpoint.id}'>
        <div class="arrow-head">
            <svg width="20px" height="10px">
                <polygon fill=black stroke-width=0 points="0,10 20,10 10,0" />
            </svg>
        </div>
        <div class="arrow-body">
            <svg width="30px" height="100%">
                <path d="m 10 00 V 3000 0" stroke="#000" />
            </svg>
        </div>
    </div>`
    return arrowElement
}