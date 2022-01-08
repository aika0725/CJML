const exportXML=()=>{
    var data = generateXML()
    downloadData("text/xml", data, "CJML_swimlane.xml");
}

const generateXML=()=>{
    const xml = `<cjml>
    ${generateActorXML()}
    ${generateTouchpointXML()}
    </cjml>
    `
    return xml
}

const generateActorXML = ()=>{
    let actorXML
    actors.forEach((actor)=>{
        actorXML += `<actor id='${actor.id}'>
        <actorName>${actor.name}</actorName>
        <actorRole>${actor.role}</actorRole>
        </actor>`
    })
    return actorXML
}

const generateTouchpointXML = ()=>{
    let touchpointXML 
    touchpoints.forEach((touchpoint)=>{
        touchpointXML+=`<touchpoint id='${touchpoint.id}' type="${touchpoint.type}">
        <time>${touchpoint.time}</time>
        <initiator>${touchpoint.sender}</initiator>
        <initiatorDescription>${touchpoint.senderDescription}</initiatorDescription>
        ${isCommunication(touchpoint)}
        </touchpoint>`
    })
    return touchpointXML
}

const isCommunication = (touchpoint)=>{
    if (touchpoint.type=='action'){
        return ''
    }else {
        return `<receiver>${touchpoint.receiver}</receiver>
        <receiverDescription>${touchpoint.receiverDescription}</receiverDescription>
        <channel>${touchpoint.channel}</channel>`
    }
}

const downloadData = (contentType, data, filename)=>{
    var link = document.createElement("A");
    link.setAttribute("href", encodeURI("data:" + contentType + "," + data));
    link.setAttribute("style", "display:none");
    link.setAttribute("download", filename);
    document.body.appendChild(link); //needed for firefox
    link.click();
    setTimeout(function () {
        document.body.removeChild(link);
    }, 1000);
}