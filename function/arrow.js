const connectBoxes = (touchpoint) => {
    const connectedBoxesID= touchpoint.id

    const startBox = document.querySelector(`div[senderBox-id='${connectedBoxesID}']`)
    const endBox = document.querySelector(`div[receiverBox-id='${connectedBoxesID}']`)
    const startBoxPoint = startBox.getBoundingClientRect();
    const endBoxPoint = endBox.getBoundingClientRect();
    const arrow = document.querySelector(`div[arrow-id='${connectedBoxesID}']`)

    let distance = startBoxPoint.top - endBoxPoint.top;
  
    let isPointingUp = distance > 0;
    if (distance < 0) {
      distance = (distance * -1)
    }
  
    console.log(startBoxPoint.top - endBoxPoint.top);
    console.log(isPointingUp)

    if (!isPointingUp) {
        arrow.classList.add('down')
      if (distance > 110) {
        arrow.style.height = `${(distance - 100) + 46}px`;
        arrow.style.marginBottom = `${distance * -1 - 3}px`;
      }
    } else if (isPointingUp) {
        arrow.classList.add('up')
      if (distance > 110) {
        arrow.style.height = `${(distance - 100) + 46}px`;
        arrow.style.marginBottom = `${distance * 1 + 3}px`;
      }
    }
  }
  