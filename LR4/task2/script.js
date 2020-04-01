let button = document.getElementById("addRecordButton");
let tableBody = document.getElementById("setting-table-body");

button.onclick = function() {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.appendChild(createDeleteButton());
    th.scope = "row";
    tr.appendChild(th);
    tr.appendChild(createTd());
    tr.appendChild(createTd());
    tableBody.appendChild(tr);
};
function createTd(innerText) {
    let td = document.createElement("td");
    td.textContent = innerText;
    return td;
};
function createDeleteButton() {
    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-link");
    button.textContent = "Видалити";
    return button;
};