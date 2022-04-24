

let touchpoints = []
let titleNos = []
const touchpointContainer = document.querySelector('#touchpoint-container')

const updateTouchpointTitles = () => {
    const touchpointTitles = document.querySelectorAll('.touchpoint-title-span')
    let touchpointIndex = 1;
    touchpointTitles.forEach(title => {
        title.innerText = 'Touchpoint ' + touchpointIndex.toString()
        touchpointIndex++
    })
}
const getTitleNum = (touchpoint)=>{
    titleNos.push(touchpoint.id)
}

const createTouchpoint = (e) => {
    //e.preventDefault()
    // Creates a new touchpoint object
    const touchpoint = {
        id: Math.floor(Math.random() * 10000),
        type: '',
        sender: '',
        senderID:null,
        receiver: '',
        receiverID:null,
        channel: '',
        senderDescription: '',
        senderThreat:false,
        senderIncident:false,
        receiverDescription: '',
        receiverThreat:false,
        receiverIncident:false,
        time: null
    }

    // Adds new touchpoint to touchpoints array
    touchpoints.push(touchpoint);
    console.log("Created new touchpoint object");
    console.log(touchpoints)

    // Appends Add action and communication points button
    touchpointContainer.innerHTML += (createTouchpointElement(touchpoint))
    updateTouchpointTitles()
    getTitleNum(touchpoint)
    createOverview()
    // new
    updateTouchpointSender()
    updateTouchpointReciver()
    updateTouchpointChannel()
    updateTouchpointSenderDescription()
    updateTouchpointReceiverDescription()
    updateTouchpointTime()
}

const createTouchpointElement = (touchpoint) => {
    return (`
    <div class="item" data-id="${touchpoint.id}" id="${touchpoint.id}">
        <div class="touchpoint-title">
            <span class="fw-bold touchpoint-title-span">Touchpoint:</span>
            <button type="button" onclick='deleteButtonHandler(this)' data-id="${touchpoint.id}" class="btn btn-outline-danger btn-sm border delete">
            ${deleteImg}
            </button>
        </div>
        <div class="touchpoint-content" data-tc="${touchpoint.id}"></div>
        <div class="touchpointBtns">
            <button type="button" onclick='actionButtonHandler(this)' data-id="${touchpoint.id}" class="btn btn-outline-primary actionBtn hide">Add Action</button>
            <button type="button" onclick='communicationButtonHandler(this)' data-id="${touchpoint.id}" class="btn btn-outline-primary communicationBtn hide">Add Communication point</button>
        </div>
    </div>`
    )
}

const createAction = (e) => {
    console.log('Created action')
    e.innerHTML += createActionElement(e);

    console.log('create actor list in action')
 
    updateActorList4Action(e)

    updateTouchpointSender()
    updateTouchpointReciver()
    updateTouchpointChannel()
    updateTouchpointSenderDescription()
    updateTouchpointReceiverDescription()
    updateTouchpointTime()
}

const updateActorList4Action = (e)=>{
    const elementID = e.getAttribute('data-tc')
    e.firstElementChild.querySelector('.act_list').innerHTML = updateActors2Touchpoint(elementID)
}

const createActionElement = (e) => {
    console.log('Created action element')
    const elementID = e.getAttribute('data-tc')
    console.log(elementID)
    return (
        `<div class="actionContent">
        <p class="touchpoint-subtitle">Action:</p>
        <div class="question-block">
            <p class="question">Who did this action? Please choose the initiator:</p>
            <div class="act_list senders actorList"></div>
        </div>
        <div class="question-block">
            <label for="action_date" class="form-label"><span class="question date-question">
            Action Start Time:</span>${addDateExplanation()}</label>
            <input type="datetime-local" name="action_date" class = "form-control date"/>
        </div>
        <div class="question-block">
            <label for="action_des" class="form-label"><span class="question">Please describe this touchpoint within 50 characters.</span></label>
            <input type="text" class="form-control sender_des" name="action_des"></input>
        </div>
        <div class="question-block">
            <p class="question">(Optional) Is this action a <u>threat</u> or <u>unwanted incident</u>?</p>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${elementID+2}" id="threat" value="threat">
                <label class="form-check-label" for="threat">Threat</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${elementID+2}" id="unwantedIncident" value="unwantedIncident">
                <label class="form-check-label" for="unwantedIncident">Unwanted Incident</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${elementID+2}" id="none" value="None">
                <label class="form-check-label" for="none">Neither of them</label>
            </div>
        
        </div>
        </div>`
    )
}

const createCommunicationPoint = (e) => {

    e.innerHTML += createCommunicationPointElement();

    console.log('create actor list in communication')

    updateActorList4Communication(e)
    updateTouchpointSender()
    updateTouchpointReciver()
    updateTouchpointChannel()
    updateTouchpointSenderDescription()
    updateTouchpointReceiverDescription()
    updateTouchpointTime()
}

const updateActorList4Communication = (e)=>{
    const elementID = e.getAttribute('data-tc')
    e.firstElementChild.querySelector('.sender_list').innerHTML = updateActors2Touchpoint(elementID)
    const elementIdPlus = elementID + 1
    e.firstElementChild.querySelector('.recevier_list').innerHTML = updateActors2Touchpoint(elementIdPlus)
}

const createCommunicationPointElement = (touchpoint) => {
    console.log('Created communication element')
    return (
    `<div class="communicationContent">
        <p class="touchpoint-subtitle">Communication Point:</p>
        <div class="question-block">
            <p class="question">Who started this event? Please choose the initiator:</p>
            <div class="sender_list senders actorList"></div>
        </div>
        <div class="question-block">
            <label for="channel" class="form-label"><span class="question">Please choose the communication method.</span></label>
            <select id="" class="form-select channel" name="channel">
                <option value="" selected> </option>
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
                <option value="Telephone conversation">Telephone conversation</option>
                <option value="Face-to-Face">Face-to-Face</option>
                <option value="Website">Website</option>
                <option value="Letter">Letter</option>
                <option value="Payment">Payment</option>
                <option value="Self-service machine">Self-service machine</option>
            </select>
        </div>
        <div class="question-block">
            <p class="question">Please choose the other participant (Receiver)</p>
            <div class="recevier_list receivers actorList"></div>
        </div>
        <div class="question-block">
            <label for="communication_date" class="form-label"><span class="question date-question">
            Communication Start Time:${addDateExplanation()}</span>
            </label>
            <input type="datetime-local" name="communication_date" class = "form-control date"/>
        </div>
        <div class="question-block">
            <label for="sender_describe" class="form-label"><span class="question">Please describe senders activity within 50 characters.</span></label>
            <input type="text" class="form-control sender_des" name="sender_describe">
        </div>
        <div class="question-block">
            <label for="receiver_describe" class="form-label"><span class="question">Please describe receiver activity within 50 characters.</span></label>
            <input type="text" class="form-control receiver_des" name="receiver_describe">
        </div>
    </div>
    `
    )
}

const actionButtonHandler = (e) => {
    const elementID = e.getAttribute('data-id')
    // console.log('Clicked action button with id: ' + elementID)
    const filteredTouchpoints = touchpoints.filter(touchpoint => {
        return (touchpoint.id == elementID)
    })
    filteredTouchpoints[0].type = 'action'
    createAction(document.querySelector(`[data-tc="${elementID}"]`))
    e.parentNode.remove()
}

const communicationButtonHandler = (e) => {
    const elementID = e.getAttribute('data-id')
    // console.log('Clicked communication button with id: ' + e.getAttribute('data-id'))
    const filteredTouchpoints = touchpoints.filter(touchpoint => {
        return (touchpoint.id == e.getAttribute('data-id'))
    })
    filteredTouchpoints[0].type = 'communication'
    createCommunicationPoint(document.querySelector(`[data-tc="${elementID}"]`))
    e.parentNode.remove()
}

const deleteButtonHandler = (e) => {
    // console.log('Deleted touchpoint with id: ' + e.getAttribute('data-id'))
    const filteredTouchpoints = touchpoints.filter(touchpoint => {
        return !(touchpoint.id == e.getAttribute('data-id'))
    })
    e.closest('.item').remove()
    touchpoints = filteredTouchpoints;
    updateTouchpointTitles()

    const indexInTitleNo = titleNos.indexOf(Number(e.getAttribute('data-id')))
    titleNos.splice(indexInTitleNo, 1)
    createOverview()
}

const updateActors2Touchpoint = (touchpointId) => {
    let actorList = ''
    actors.forEach((actor) => {
        const actorElement = `<div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="${touchpointId}" data-id="${actor.id}" value="${actor.name}">
        <label class="form-check-label" >${actor.name}</label>
        </div>`
        actorList += actorElement
    })
    return actorList
}
// refresh Actor list in touchpoints if user added more actors
const refreshActors = ()=>{
    // get all current actorList
    const actorLists = document.querySelectorAll('.actorList')
    actorLists.forEach((list)=>{
        const id = list.closest('.touchpoint-content').getAttribute('data-tc')
        const idPlus = id+1

        if (list.classList.contains('recevier_list')){
            list.innerHTML=updateActors2Touchpoint(idPlus)
        }else{
            list.innerHTML=updateActors2Touchpoint(id)
        }
    })

}

const updateTouchpointSender = () => {
    const inputs = document.querySelectorAll('.senders')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].sender = e.target.value

            e.target.closest('.actorList').querySelectorAll('.form-check-input').forEach((radio)=>{
                radio.removeAttribute("checked")
            })
            e.target.setAttribute('checked', true)
            currentTouchpoint[0].senderID = e.target.getAttribute('data-id')
            console.log(touchpoints)
        })
    })
}

const updateTouchpointReciver = () => {
    const inputs = document.querySelectorAll('.receivers')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].receiver = e.target.value

            e.target.closest('.actorList').querySelectorAll('.form-check-input').forEach((radio)=>{
                radio.removeAttribute("checked")
            })
            e.target.setAttribute('checked', true)
            currentTouchpoint[0].receiverID = e.target.getAttribute('data-id')
            console.log(touchpoints)
        })
    })
}

const updateTouchpointChannel = () => {
    const inputs = document.querySelectorAll('.channel')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].channel = e.target.value
            e.target.querySelector('option').textContent = e.target.value
            // console.log(touchpoints)
        })
    })
}
const updateTouchpointSenderDescription = () => {
    const inputs = document.querySelectorAll('.sender_des')
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].senderDescription = e.target.value
            e.target.setAttribute('value',e.target.value)
            // console.log(touchpoints)
            if (e.target.value==''){
                e.target.classList.add("in-valid")
            }else {
                e.target.classList.remove("in-valid")
            }
        })
    })
}
const updateTouchpointReceiverDescription = () => {
    const inputs = document.querySelectorAll('.receiver_des')
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].receiverDescription = e.target.value
            e.target.setAttribute('value',e.target.value)

            if (e.target.value==''){
                e.target.classList.add("in-valid")
            }else {
                e.target.classList.remove("in-valid")
            }
        })
    })
}
const updateTouchpointTime = () => {
    const inputs = document.querySelectorAll('.date')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentTouchpoint = selectedObject(e)
            currentTouchpoint[0].time = e.target.value
            e.target.setAttribute('value',e.target.value)
            sortTouchpoints()
            createOverview()
        })
    })
}

const selectedObject = (e) => {
    const id = e.target.closest('.item').getAttribute('data-id')
    const currentTouchpoint = touchpoints.filter((touchpoint) => {
        return touchpoint.id == id
    })
    return currentTouchpoint
}


const addDateExplanation = ()=>{
    return`
    <span class="d-inline-block " tabindex="0" data-bs-toggle="tooltip" title="Touchpoints will be sorted by time when the tool generates the diagram">
    <a class="nav-link date-explanation" disabled>${exclamationMark}</a>
    </span>
    `
}

const checkTouchpoint = (touchpoint)=>{
    if (touchpoint.sender ==''){
        console.log('noooo')
        return false
    }

}