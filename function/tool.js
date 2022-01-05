// set id to actor and touchpoint
const setID = (array) => {
    let id = 0
    for (let i =0; i< array.length; i++){
        array[i].id = i
        id = i+1
    }
    return id
}
// delete items 
const deleteItem = () => {
    const btns = document.querySelectorAll('.delete')
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('.item').getAttribute('id')
            if (id ==`actor${id.replace(/[^0-9]/ig, "")}`){
                console.log('this is actor ')
                const selectedIndex = actors.findIndex((item) => {
                    return item.id == id.replace(/[^0-9]/ig, "")
                })
                actors.splice(selectedIndex, 1)
            }else{
                console.log('this is touch ')
                const selectedIndex = touchpoints.findIndex((item) => {
                    return item.id == id.replace(/[^0-9]/ig, "")
                })
                touchpoints.splice(selectedIndex, 1)
            }
            renderForm()
        })
    })
}
// update the info of array
const updateActorName = ()=>{
    const inputs = document.querySelectorAll('.inputActor')
    inputs.forEach((input)=>{
        input.addEventListener('input',(e)=>{
            const index = e.target.closest('.item').getAttribute('id').replace(/[^0-9]/ig, "")
            actors[index].name = e.target.value
            console.log(actors)
        })
    })
}
const updateActorRole = ()=>{
    const inputs = document.querySelectorAll('.inputRole')
    inputs.forEach((input)=>{
        input.addEventListener('change',(e)=>{
            const index = e.target.closest('.item').getAttribute('id').replace(/[^0-9]/ig, "")
            actors[index].role = e.target.value
            console.log(actors)
        })
    })
}

// click button add more actors to array
const addActor = () => {
    const actor = {
        id: setID(actors),
        name: '',
        role: ''
    }

    actors.push(actor)
    printActor(actor)
    renderForm()
}
// print actor
const printActor =(actor)=>{
    const actorText = `<div class="item" id="actor${actor.id}">
        <button type="button" class="btn btn-outline-danger btn-sm border delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        </button>
        <span class="fw-bold">Actor ${actor.id+1}</span>:<br>
        <div class="row">
            <div class="col-md-5">
                <label for="inputActor" class="form-label">Name</label>
                <input type="text" name="inputActor" class="form-control inputActor" value="${actor.name}">
            </div>
            <div class="col-md-4">
                <label for="inputRole" class="form-label">Role</label>
                <select id="" class="form-select inputRole" name="inputRole">
                    <option value="${actor.role}" selected>${actor.role}</option>
                    <option value="user/customer">user/customer</option>
                    <option value="service provider">service provider</option>
                    <option value="employee">employee</option>
                    <option value="attacker">attacker</option>
                    <option value="system">system</option>
                </select>
            </div>
        </div>
    </div>`
    actorContainer.innerHTML+= actorText
}


// Hide button after click 
function HideButtons(button) {
    button.hidden = true;
    let btns = button.parentElement.querySelectorAll(".hide")
    btns.forEach(btn => {
        btn.hidden = true;
    })
}

// click to add more touchpoints
const addTouchpoints = ()=>{
    const touchpoint = {
        id : setID(touchpoints),
        type : '',
        sender:'',
        receiver: '',
        senderDescription: '',
        receiverDecription: '',
        time:null
    }

    touchpoints.push(touchpoint)
    printTouchpoint(touchpoint)
    renderForm()
}


// print touchpoint
const printTouchpoint=(touchpoint)=>{
    const touchpointsBtn = `
    <div class="item" id="touchpoint${touchpoint.id}">
    <button type="button" class="btn btn-outline-danger btn-sm border delete">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
    </button>
    <span class="fw-bold">Touchpoint ${touchpoint.id+1}</span>:<br>
    <button type="button" class="btn btn-outline-primary actionBtn hide">Add action</button>
    <button type="button" class="btn btn-outline-primary communicationBtn hide">Add communication</button>
    </div>
    `
    touchpointContainer.innerHTML+=touchpointsBtn
}


// add more actions
const addAction=(touchpoint)=>{
    const btns = document.querySelectorAll('.actionBtn')
    btns.forEach((btn)=>{
        btn.addEventListener('click', (e)=>{
            
            HideButtons(e.target)
            touchpoint.type = 'action'
            printAction(touchpoint)
            console.log(touchpoints)
            
        })
    } )
}
// print action 
const printAction =(touchpoint)=>{
    const actionText = 
    `Action:<br>Who did this action? Please choose the initiator:<div class="act_list"></div>
    <br>Action Start Time:<br>
    <input type="datetime-local" class = "form-control"/><br>
    <label for="action_des" class="form-label">Please describe this touchpoint within 50 characters.</label>
    <input type="text" class="form-control action_des" name="action_des"></input>
    `
    document.querySelector(`#touchpoint${touchpoint.id}`).innerHTML+=actionText
}
// add more communication points 
const addCommunication= ()=>{

}
//print communication point
const printCommunication = (touchpoint)=>{
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
    document.querySelector(`#touchpoint${touchpoint.id}`).innerHTML+= communicationText
}
// render form
const renderForm = ()=>{
    actorContainer.innerHTML=''
    touchpointContainer.innerHTML=''

    setID(actors)
    actors.forEach((actor)=>{
        printActor(actor)
    })

    setID(touchpoints)
    touchpoints.forEach((touchpoint)=>{

        //if type == '' - print touchpoint
        printTouchpoint(touchpoint)
        //if type == 'action' - print action
        addAction(touchpoint)
        //if type == 'communication' - print coummunication
    })
    deleteItem()
    updateActorName()
    updateActorRole()
    
}
renderForm()