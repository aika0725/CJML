// set id to actor and touchpoint
const setID = (array) => {
    let id = 0
    for (let i = 0; i < array.length; i++) {
        id = i + 1
    }
    return id
}
// get number
const getNum = () => {

}
// delete items 
const deleteItem = (e) => {
    console.log(e.target.closest('.item').getAttribute('id'))
    let newArray = actors.filter((actor) => {
        return !(actor.id == e.target.closest('.item').getAttribute('id'))
    })
    let newTouchArray = touchpoints.filter((touchpoint)=>{
        return !(touchpoint.id==e.target.closest('.item').getAttribute('id'))
    })
    touchpoints = newTouchArray
    actors = newArray
    console.log(actors)
    renderForm()
}

// update the info of array
const updateActorNameOnInput = () => {
    const inputs = document.querySelectorAll('.inputActor')
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const index = e.target.closest('.item').getAttribute('id')
            const currentActor = actors.filter((actor) => {
                return actor.id == index
            })
            currentActor[0].name = e.target.value
            console.log(actors)
        })
    })
}
const updateActorRoleOnInput = () => {
    const inputs = document.querySelectorAll('.inputRole')
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            const index = e.target.closest('.item').getAttribute('id').replace(/[^0-9]/ig, "")
            const currentActor = actors.filter((actor) => {
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
const printActor = (actor, index) => {
    const actorText = `<div class="item" id="${actor.id}">
        <div class= "titleActor">

        <span class="fw-bold">Actor ${index + 1}:</span>
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

    actorContainer.innerHTML += actorText

    const delBtn = document.createElement('button')
    delBtn.className = 'btn btn-outline-danger btn-sm border delete'
    delBtn.innerHTML = deleteImg
    document.getElementById(actor.id).querySelector('.titleActor').append(delBtn)
}


const generateDeleteButtons = () => {
    let delButtons = document.querySelectorAll('.delete')
    delButtons.forEach(element => {
        element.addEventListener('click', element => {
            deleteItem(element)
        })
    });
}