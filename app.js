

const track = document.getElementById("image-track")
window.onmousedown = e =>{
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e =>{
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta/maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100); 
   

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards"})
  

    for (const image of track.getElementsByClassName("image")){
        image.animate({
            objectPosition: `${nextPercentage + 100}% center`
        }, {duration:1200, fill: "forwards"})
    }
}

window.onmouseup= () =>{
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;    
}

const letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
let interval = null;

document.querySelector("h1").onmouseover = event =>{
    let iterations = 0;
    clearInterval(interval);

    interval = setInterval(()=>{
        event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
            if(index < iterations){
                return event.target.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];

        }).join("");

    if(iterations >= event.target.dataset.value.length) clearInterval(interval);
    iterations += 1/3;
    }, 30)
}