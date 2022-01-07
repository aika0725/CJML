// actors for rows
// touchpoints for boxes
const canvas = document.querySelector('.canvas')

const backup = `    
<div class="swimlane-row">
<div class="swimlane-actor">
    <div class="actor-img">22</div>
    <div class="actor-name">name</div>
</div>
<div class="swimlane-action">
    <div class="action-content">
    action
    </div>
</div>
<div class="swimlane-action">
    <div class="action-content">
    action
    </div>
</div>
<div class="swimlane-sender swimlane-item">
    <div class="channel-img">
        <img></img>img
    </div>
    <div class="communication-content">
        sender
    </div>
</div>
<div class="swimlane-receiver swimlane-item">
    <div class="channel-img">
        <img></img>img
    </div>
    <div class="communication-content">
        receiver
    </div>
</div>
</div>`

const createSwimlane= () => {
    canvas.innerHTML=''
    actors.forEach((actor)=>{
        canvas.innerHTML += createSwimlaneElement(actor)
    })
}
const createSwimlaneElement = (actor) =>{
    //image get from function. pass actor.role
    const swimlane = `
    <div class="swimlane-row" data-id = "${actor.id}">
        <div class="swimlane-actor">
            <div class="actor-img">???</div>
            <div class="actor-name">${actor.name}</div>
        </div>
        ${generateDefaultBoxes()}
    </div>`
    return swimlane
}
// set opactiy:0 to other box 

const createBoxes = (touchpoint) => {
    // create action box
    const actionBox = document.createElement('div').className='swimlane-action'
    const actionContent = document.createElement('div').className='action-content'
    actionContent.textContent=`${touchpoint.senderDescription}`
    actionBox.append(actionContent)
    // const actionBox = `<div class = "swimlane-action">
    //     <div class="action-content">${touchpoint.senderDescription}</div>
    // </div>`

    // create sender box 
    const senderBox = document.createElement('div').className='swimlane-receiver swimlane-item'
    const channelImg = document.createElement('div').className='channel-img'
    const communicationContent = document.createElement('div').className='communication-content'
    communicationContent.textContent=`${touchpoint.senderDescription}`
    senderBox.append(channelImg, communicationContent)
    // const senderBox = `<div class="swimlane-sender swimlane-item">
    //     <div class="channel-img">img</div>
    //     <div class="communication-content">
    //     ${touchpoint.senderDescription}
    //     </div>
    // </div>`

    // create receiver Box
    const receiverBox = document.createElement('div').className='swimlane-receiver swimlane-item'
    //const channelImg = document.createElement('div').className='channel-img'
    //const communicationContent = document.createElement('div').className='communication-content'
    communicationContent.textContent=`${touchpoint.senderDescription}`
    receiverBox.append(channelImg, communicationContent)
    // const receiverBox = `<div class="swimlane-receiver swimlane-item">
    //     <div class="channel-img">img</div>
    //     <div class="communication-content">
    //     ${touchpoint.receiverDecription}
    //     </div>
    // </div>`
}

const generateDefaultBoxes = () =>{
    let box = ''
    touchpoints.forEach((touchpoint)=>{
        console.log('box')
        box += `<div class="box" box-id="${touchpoint.id}">box</div>`
    })
    return box
}






































//generate diagram==============

function diagramGenerate() {
    //for actor
    var actors = document.getElementsByClassName("inputActor");
    var roles = document.getElementsByClassName("inputRole");
    var swimLaneRow = [];
    var swimLaneTouchpoints = [];

    //for touchpoint
    //var touchpointInfo = [];
    var touchpoints = get_touchpointInfo();

    var canvas = document.getElementById('canvas');
    var key = "touchpoint";
    for (var i = 0; i < actor.length; i++) {

        let actorInfo = {
            id: i,
            type: roles[i].value,
            name: actors[i].value
        };
        swimLaneRow.push(actorInfo);
        //?


    }
    swimLaneRow = createRows(swimLaneRow, touchpoints, key, swimLaneTouchpoints);
    canvas.innerHTML = draw(swimLaneRow, key);
    //dynamicLoadCss("diagram.css");
}

function createRows(swimLaneRow, touchpointInfo, key, swimLaneTouchpoints) {
    //for each row

    var touchpointNum = touchpoint.length;
    for (var n = 0; n < actor.length; n++) {
        swimLaneTouchpoints = [];
        for (var i = 0; i < touchpointNum; i++) {
            //var key = "row" + n + "touchpoint" + i;

            switch (touchpointInfo[i].type) {
                case 'action':
                    createActionTouchpoint(n, i, swimLaneRow, touchpointInfo, swimLaneTouchpoints);
                    break;
                case 'communication':
                    createCommunicationpont(n, i, swimLaneRow, touchpointInfo, swimLaneTouchpoints);
                    break;
            };

        }
        swimLaneRow[n][key] = swimLaneTouchpoints;
        console.log(swimLaneRow);
    }
    return swimLaneRow;
}

function createActionTouchpoint(n, i, swimLaneRow, touchpointInfo, swimLaneTouchpoints) {
    if (touchpointInfo[i].initiator == swimLaneRow[n].name) {
        //var value = touchpointInfo[i];
        //swimLaneRow[n][key] = value;
        swimLaneTouchpoints.push(touchpointInfo[i]);
    } else {
        createBlock(swimLaneTouchpoints);
        console.log("block");
    }
}
function createCommunicationpont(n, i, swimLaneRow, touchpointInfo, swimLaneTouchpoints) {
    var value = {}
    if (touchpointInfo[i].sender == swimLaneRow[n].name) {
        value = {
            type: "sender",
            sender: touchpointInfo[i].sender,
            channel: touchpointInfo[i].channel,
            sender_des: touchpointInfo[i].sender_des
        };
        swimLaneTouchpoints.push(value);
        //swimLaneRow[n][key] = value;
    } else if (touchpointInfo[i].receiver == swimLaneRow[n].name) {
        value = {
            type: "receiver",
            receiver: touchpointInfo[i].receiver,
            channel: touchpointInfo[i].channel,
            receiver_des: touchpointInfo[i].receiver_des
        };
        swimLaneTouchpoints.push(value);
        //swimLaneRow[n][key] = value;
    } else {
        createBlock(swimLaneTouchpoints);
        console.log("block");
    }
}
function createBlock(swimLaneTouchpoints) {
    var value = { type: "none" };
    swimLaneTouchpoints.push(value);
    //swimLaneRow[n][key] = value;
}

function get_touchpointInfo() {
    let touchpointInfo = [];
    let nodeActionNum = 0;
    let nodeCommunicationNum = 0;
    var communication_channel = document.getElementsByClassName('channel');
    var sender_action = document.getElementsByClassName('sender_des');
    var receiver_action = document.getElementsByClassName('receiver_des');
    let actionInfo = {};
    let communicationInfo = {};


    for (var i = 0; i < touchpoint.length; i++) {
        var nodeName = "t" + i;
        if (document.getElementById(nodeName).contains(document.getElementsByClassName("act_list")[nodeActionNum])) {
            //is action
            //console.log(checkedActionInitList);
            var action_init = checkedActionInitList[nodeActionNum];
            var action_des = document.getElementsByName("action_des")[nodeActionNum].value;
            actionInfo = {
                type: "action",
                id: "a" + nodeActionNum,
                initiator: action_init,
                description: action_des
            }
            touchpointInfo.push(actionInfo);
            nodeActionNum++;
        } else {
            //is communication
            var sender = checkedSenderList[nodeCommunicationNum];
            var receiver = checkedReceiverList[nodeCommunicationNum];
            var channel = communication_channel[nodeCommunicationNum].value;
            var sender_des = sender_action[nodeCommunicationNum].value;
            var receiver_des = receiver_action[nodeCommunicationNum].value;
            communicationInfo = {
                type: "communication",
                id: "c" + nodeCommunicationNum,
                sender: sender,
                receiver: receiver,
                channel: channel,
                sender_des: sender_des,
                receiver_des: receiver_des
            };
            touchpointInfo.push(communicationInfo);
            nodeCommunicationNum++;
        }
    }
    console.log(communicationInfo);
    console.log(touchpointInfo);
    return touchpointInfo;
}

function draw(swimLaneRow, key) {
    let swimlane;
    let touchpointInfo = get_touchpointInfo();
    console.log(touchpointInfo);
    for (var i = 0; i < actor.length; i++) {
        swimlane += `<div class="swimlane_row">
        <div class="swimlane_actor">
        <div class="actor_img">${actorImg(i)}</div>
        <div class="actor_name">${swimLaneRow[i].name}</div></div>`
        for (var j = 0; j < swimLaneRow[i][key].length; j++) {

            swimlane += `<div class="swimlane_item ${swimLaneRow[i].name}">
            ${touchpointContent(i, j, key, touchpointInfo)}
            </div>`
        }
        swimlane += `</div>`
    }
    return swimlane;
}
function touchpointContent(i, j, key, swimLaneRow) {
    //var type=swimLaneRow[i][key][j].type;
    var type = swimLaneRow[j].type;
    console.log(type);
    var content;
    switch (type) {
        case 'action':
            content = `${swimLaneRow[j].description}`
            break;
        case 'communication':
            content = `<div class="touchpoint_img">${communicationImg(swimLaneRow, j)}</div>${swimLaneRow[j].sender_des}`
            break;
        case 'receiver':
            content = `<div class="touchpoint_img">${communicationImg(swimLaneRow, j)}</div>${swimLaneRow[j].receiver_des}`
    }
    return content;
}
function actorImg(i) {
    var value = document.getElementsByName("inputRole")[i].value;
    console.log(value);
    var img;
    switch (value) {
        case 'user/customer':
            img = '<img src="symbols/user-1.svg">';
            break;
        case 'service provider':
            img = '<img src="symbols/service-provider-3.svg">';
            break;
        case 'employee':
            img = '<img src="symbols/employee-1.svg">';
            break;
        case 'attacker':
            img = '<img src="symbols/employee-1.svg">';
            break;
        case 'system':
            img = '<img src="symbols/datasystem.svg">';
    }
    console.log(img);
    return img;
}
/**
 * 
 * @param {all entered touchpoints} touchpointInfo 
 * @param {from looping to get the correct communication point} i 
 * @returns icon url
 */
function communicationImg(touchpointInfo, i) {
    var value = touchpointInfo[i].channel;
    console.log(value);
    var img;
    switch (value) {
        case 'SMS':
            img = '<img src="symbols/sms.svg">';
            break;
        case 'Email':
            img = '<img src="symbols/email-1.svg">';
            break;
        case 'Telephone conversation':
            img = '<img src="symbols/employee-1.svg">';
            break;
        case 'Face-to-Face':
            img = '<img src="symbols/face-to-face-conversation-1.svg">';
            break;
        case 'Website':
            img = '<img src="symbols/internet-globe.svg">';
            break;
        case 'Letter':
            img = '<img src="symbols/letter-1.svg">';
            break;
        case 'Payment':
            img = '<img src="symbols/payment-1.svg">';
            break;
        case 'Self-service machine':
            img = '<img src="symbols/self-service-machine-1.svg">';
            break;

    }
    console.log(img);
    return img;
}