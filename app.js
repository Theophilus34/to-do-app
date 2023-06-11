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
window.onload = function () {
    displayItems()
};