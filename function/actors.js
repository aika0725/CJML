let actors = [];
const actorContainer = document.querySelector("#actor-container");

const updateActorTitles = () => {
    const actorTitles = document.querySelectorAll(".actor-title-span");
    let actorIndex = 1;
    actorTitles.forEach((title) => {
        title.innerText = "Actor " + actorIndex.toString();
        actorIndex++;
    });
};

const createActor = () => {
    // Create a new actor object
    const actor = {
        id: Math.floor(Math.random() * 10000),
        name: "",
        role: "",
    };

    actors.push(actor);
    // Appends new actor input form
    actorContainer.innerHTML += createActorElement(actor);
    updateActorTitles();
    updateActorNameOnInput();
    updateActorRoleOnInput();
};

const createActorElement = (actor) => {
    const actorText = `<div class="item" data-id="${actor.id}">
        <div class= "titleActor">
            <span class="fw-bold actor-title-span">Actor :</span>
            <button type="button" onclick='actorDelBtnHandler(this)' data-id="${actor.id}" class="btn btn-outline-danger btn-sm border delete">
            ${deleteImg}
            </button>
        </div>
        <div class="row">
            <div class="col-md-5">
                <label for="inputActor" class="form-label"><span class="question">Name</span></label>
                <input type="text" name="inputActor" class="form-control inputActor" value="${actor.name}">
            </div>
            <div class="col-md-4">
                <label for="inputRole" class="form-label"><span class="question">Role</span></label>
                <select id="" class="form-select inputRole" name="inputRole">
                    <option value="${actor.role}" selected>${actor.role}</option>
                    <option value="user/customer">user/customer</option>
                    <option value="service provider">service provider</option>
                    <option value="employee">employee</option>
                    <option value="attacker">attacker</option>
                    <option value="system">system</option>
                    <option value="bank">bank</option>
                    <option value="staff-IT">staff-IT</option>
                    <option value="store">store</option>
                </select>
            </div>
        </div>
    </div>`;
    return actorText;
};

const actorDelBtnHandler = (e) => {
    const filteredActors = actors.filter((actor) => {
        return !(actor.id == e.getAttribute("data-id"));
    });
    e.closest(".item").remove();
    actors = filteredActors;
    updateActorTitles();
};

const updateActorNameOnInput = () => {
    const inputs = document.querySelectorAll(".inputActor");

    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            const index = e.target.closest(".item").getAttribute("data-id");
            const currentActor = actors.filter((actor) => {
                return actor.id == index;
            });
            e.target.setAttribute("value", e.target.value);
            currentActor[0].name = e.target.value;
            if (e.target.value == "") {
                e.target.classList.add("in-valid");
            } else {
                e.target.classList.remove("in-valid");
            }
        });
    });
};

const updateActorRoleOnInput = () => {
    const inputs = document.querySelectorAll(".inputRole");
    inputs.forEach((input) => {
        input.addEventListener("change", (e) => {
            const index = e.target.closest(".item").getAttribute("data-id");
            const currentActor = actors.filter((actor) => {
                return actor.id == index;
            });
            e.target
                .querySelector("option")
                .setAttribute("value", e.target.value);
            e.target.querySelector("option").textContent = e.target.value;
            currentActor[0].role = e.target.value;
            if (e.target.value == "") {
                e.target.classList.add("in-valid");
            } else {
                e.target.classList.remove("in-valid");
            }
        });
    });
};
