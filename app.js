const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const check = '<img class="" src="/images/icon-check.svg" style="pointer-events: none;">'

document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
})

document.querySelector("#item").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const item = document.querySelector("#item")
        createItem(item)
    }
})
function displayItems() {
    let items = ""
    console.log(itemsArray)
    for (let i = 0; i < itemsArray.length; i++) {
        const circleDiv = document.createElement('div')
        circleDiv.classList.add('circle')

        items += `<div class="item">
                  <div class="input-controller">
                  <div class="circle">
                  ${itemsArray[i].completed ? check : ''}
                  </div>
                  <textarea disabled id="cancel">${itemsArray[i].value}</textarea>
                  </div>
                  <div class="edit-controller">
                  <img class="deleteBtn" src="/images/icon-cross.svg">
                  </div>
                </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    cicleclicked()
}
function cicleclicked() {
    let circlebtn = document.querySelectorAll(".circle")
    circlebtn.forEach((cB, i) => {
        cB.addEventListener("click", (e) => {
            if (cB.classList.contains('checked')) {
                cB.classList.remove('checked')
                document.getElementById("cancel").style.textDecoration = "none";
                document.getElementById("cancel").style.opacity = "1";
                e.target.children[0].remove()
                cB.style.background = "#fff";
            } else {
                cB.classList.add('checked')
                document.getElementById("cancel").style.textDecoration = "line-through";
                document.getElementById("cancel").style.opacity = "0.5";
                cB.innerHTML += check
                cB.style.background = "hsl(220, 98%, 61%)";
            }
        })
    })
}
function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => { deleteItem(i) })
    })
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
            updateItem(inputs[i].value, i)
        })
    })
}
function createItem(item) {
    let newData = {
        value: item.value,
        completed: false,
        id: new Date().getTime()
    }
    itemsArray.push(newData)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

function deleteItem(i) {
    itemsArray.splice(i, 1)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}
window.onload = function () {
    displayItems()
};
const toggle = document.getElementById('darkmode');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    if(toggle.style.backgroundImage =' url("/images/icon-moon.svg")'){
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '2s';
        toggle.style.backgroundImage =' url("/images/icon-sun.svg")';
        
    }else{
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
        toggle.style.backgroundImage =' url("/images/icon-moon.svg")';
    }
});