// Hide button after click 
function HideButtons(button) {
    button.hidden = true;
    let btns = button.parentElement.querySelectorAll(".hide")
    btns.forEach(btn => {
        btn.hidden = true;
    })
}
// click to add more touchpoints
const addTouchpoints = () => {
    const touchpoint = {
        id: Math.floor(Math.random() * 10000),
        type: '',
        sender: '',
        receiver: '',
        senderDescription: '',
        receiverDecription: '',
        time: null
    }

    touchpoints.push(touchpoint)
    printTouchpoint(touchpoint)
    renderForm()

}
// print touchpoint
const printTouchpoint = (touchpoint, index) => {
    const touchpointsBtn = `
    <div class="item" id="${touchpoint.id}">
        <div class="touchpoint-title">
            <button type="button" class="btn btn-outline-danger btn-sm border delete">
            ${deleteImg}
            </button>
            <span class="fw-bold">Touchpoint ${index + 1} :</span>
        </div>
        <div class="touchpointBtns">
            <button type="button" class="btn btn-outline-primary actionBtn hide">Add action</button>
            <button type="button" class="btn btn-outline-primary communicationBtn hide">Add communication</button>
        </div>
    </div>
    `
    touchpointContainer.innerHTML += touchpointsBtn
}


// add more actions
const addAction = () => {
    const btns = document.querySelectorAll('.actionBtn')
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('.item').getAttribute('id')
            const currentAction = touchpoints.filter((touchpoint)=>{
                return touchpoint.id == id
            })
            currentAction[0].type='action'
            HideButtons(e.target)
            console.log(touchpoints)
            printAction(id)      
            console.log('3')     
        })
    })
    
}
// print action 
const printAction = (id) => {
    console.log(id)
    const actionText =
        `<div class="actionContent">
        Action:<br>Who did this action? Please choose the initiator:<div class="act_list"></div>
        <br>Action Start Time:<br>
        <input type="datetime-local" class = "form-control"/><br>
        <label for="action_des" class="form-label">Please describe this touchpoint within 50 characters.</label>
        <input type="text" class="form-control action_des" name="action_des"></input>
        </div>
     `
    document.getElementById(id).innerHTML += actionText
}
// add more communication points 
const addCommunication = () => {

}


//print communication point
const printCommunication = (id) => {
    const communicationText =
        `Communication Point:<br>
    Who started this event? Please choose the initiator:<div class="sender_list"></div><br>
    Please choose the communication method.<br>
    <input name = "channel" class="form-control channel" list="channel" placeholder ="Select Method..." required><br>
        <datalist id="channel">
            <option value="SMS">
            <option value="Email">
            <option value="Telephone conversation">
            <option value="Face-to-Face">
            <option value="Website">
            <option value="Letter">
            <option value="Payment">
            <option value="Self-service machine">
        </datalist>
    Please choose the other participant (Receiver)<br><div class="recevier_list"></div><br>
    Communication Start Time:<br>
    <input type="datetime-local" class = "form-control"/><br>
    <label for="sender_des" class="form-label">Please describe senders action within 50 characters.</label>
    <input type="text" class="form-control sender_des" name="sender_describe">
    <label for="receiver_des" class="form-label">Please describe receiver action within 50 characters.</label>
    <input type="text" class="form-control receiver_des" name="receiver_describe">
    `
    document.querySelector(`#${id}`).innerHTML += communicationText
}

// render form
const renderForm = () => {
    actorContainer.innerHTML = ''
    touchpointContainer.innerHTML = ''
    let indexActor = 0
    let indexTouch = 0

    actors.forEach((actor) => {
        printActor(actor, indexActor)
        indexActor++

    })

    touchpoints.forEach((touchpoint) => {
        console.log('1')
        console.log(touchpoint)
        if (touchpoint.type =='action'){
            printAction(touchpoint.id)
            console.log('2')
        } else if (touchpoint.type == 'communication'){

        } else {
            printTouchpoint(touchpoint, indexTouch)
        }
    
        indexTouch++
    })

    generateDeleteButtons()
    updateActorNameOnInput()
    updateActorRoleOnInput()
    addAction()

}
renderForm()