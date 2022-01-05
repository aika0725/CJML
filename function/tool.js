// set id to actor and touchpoint
const setID = (array) => {
    let id = 0
    for (let i =0; i< array.length; i++){
        id = i+1
    }
    return id
}
// get number
const getNum = () =>{

}
// delete items 
const deleteItem = (e) => {
    console.log(e.target.closest('.item').getAttribute('id') )
    actors.filter((actor)=>{
        return actor.id !== e.target.closest('.item').getAttribute('id') 
    })
    console.log(actors)
    renderForm()

}
// update the info of array
const updateActorName = ()=>{
    const inputs = document.querySelectorAll('.inputActor')
    inputs.forEach((input)=>{
        input.addEventListener('input',(e)=>{
            const index = e.target.closest('.item').getAttribute('id')
            const currentActor = actors.filter((actor)=>{
                return actor.id == index 
            })
            currentActor[0].name = e.target.value
            console.log(actors)
        })
    })
}
const updateActorRole = ()=>{
    const inputs = document.querySelectorAll('.inputRole')
    inputs.forEach((input)=>{
        input.addEventListener('change',(e)=>{
            const index = e.target.closest('.item').getAttribute('id').replace(/[^0-9]/ig, "")
            const currentActor = actors.filter((actor)=>{
                return actor.id == index 
            })
            currentActor[0].role = e.target.value
            console.log(actors)
        })
    })
}

// click button add more actors to array
const addActor = () => {
    const actor = {
        id: Math.floor(Math.random() * 10000),
        name: '',
        role: ''
    }

    actors.push(actor)
    printActor(actor)
    renderForm()
}
// print actor
const printActor =(actor,index)=>{
    const delBtn = document.createElement('button')
    delBtn.className = 'btn btn-outline-danger btn-sm border delete'
    delBtn.innerHTML= deleteImg
    delBtn.addEventListener('click', (e)=>{
        console.log('hisdasdasdasd')
        deleteItem(e)
    })
    const actorText = `<div class="item" id="${actor.id}">
        <div class= "titleActor">

        <span class="fw-bold">Actor ${index+1}:</span>
        </div>
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
    document.getElementById(actor.id).querySelector('.titleActor').append(delBtn)
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
        id : Math.floor(Math.random() * 10000),
        type : '',
        sender:'',
        receiver: '',
        senderDescription: '',
        receiverDecription: '',
        time:null
    }

    touchpoints.push(touchpoint)
    printTouchpoint(touchpoint)

}


// print touchpoint
const printTouchpoint=(touchpoint)=>{
    const touchpointsBtn = `
    <div class="item" id="${touchpoint.id}">
        <div class="touchpoint-title">
            <button type="button" class="btn btn-outline-danger btn-sm border delete">
            ${deleteImg}
            </button>
            <span class="fw-bold">Touchpoint ${touchpoint.id+1} :</span>
        </div>
        <div class="touchpointBtns">
            <button type="button" class="btn btn-outline-primary actionBtn hide">Add action</button>
            <button type="button" class="btn btn-outline-primary communicationBtn hide">Add communication</button>
        </div>
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
    let indexActor = 0
    let indexTouch = 0
    
    actors.forEach((actor)=>{
        printActor(actor,indexActor)
        indexActor++

    })

    touchpoints.forEach((touchpoint)=>{

        //if type == '' - print touchpoint
        printTouchpoint(touchpoint)
        //if type == 'action' - print action
        //if type == 'communication' - print coummunication
        indexTouch++
    })

    
}
renderForm()