
let button = document.getElementById("addRecordButton");
let tableBody = document.getElementById("setting-table-body");
let diagramContainer = document.getElementById("diagram");

// tableBody.onclick = function (event) {
//     let target = event.target;
//     if (target.tagName == "BUTTON") {
//         var line = event.target.closest("tr");
//         line.remove();
//     }
// }
class Diagram {
    constructor(mainContainer) {
        this.colums = [];
        this.mainContainer = mainContainer;
    }
    _setColumnSize() {
        this.colums.sort(function (a, b) {
            a.value - b.value;
        });
        let columnWidth = 100 / this.colums.length - (100 / this.colums.length) * 0.2;
        this.colums.forEach(element => {
            element.width = columnWidth;
        });
    }
    addColumn(column) {
        this.colums.push(column);
        this._setColumnSize();
        column.renderTo(this.mainContainer);
    }
    removeColumn(column) {
        let index = this.colums.indexOf(column);
        this.colums.splice(index,1);
        this._setColumnSize();
    }
}
class Column {
    constructor(value) {
        this._createHtml();
        this.value;
    }
    set width(value) {
        this.htmlElem.style.width = value + "%";
    }
    _createHtml() {
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("column");
        let colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        let caption = document.createElement("h4");
        caption.textContent = "Test";
        mainDiv.appendChild(colorDiv);
        mainDiv.appendChild(caption);
        this.htmlElem = mainDiv;
    }

    renderTo(target) {
        target.appendChild(this.htmlElem);
    }
}
class Row {
    set value(value) {
        this.column.value = value;
        this.value = value;
    }
    constructor(diagram) {
        this._createHtml();
        this.diagram = diagram;
        this._createColumn();
    }
    renderTo(target) {
        target.appendChild(this.htmlElem);
    }
    _createColumn() {
        let column = new Column();
        this.column = column;
        this.diagram.addColumn(column);
    }
    _createHtml() {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.appendChild(this._createDeleteButton());
        th.scope = "row";
        tr.appendChild(th);
        tr.appendChild(this._createTd());
        tr.appendChild(this._createTd());
        this.htmlElem = tr;
    }

    _createTd(innerText) {
        let td = document.createElement("td");
        td.textContent = innerText;
        td.setAttribute("contenteditable", true)
        return td;
    }

    _createDeleteButton() {
        let button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn");
        button.classList.add("btn-link");
        button.textContent = "Видалити";
        button.onclick = this._removeRow.bind(this);
        return button;
    }

    _removeRow() {
        this.htmlElem.remove();
        this.column.htmlElem.remove();
        this.diagram.removeColumn(this.column);
    }
}

let diagram = new Diagram(diagramContainer);

button.onclick = function () {
    let row = new Row(diagram);
    row.renderTo(tableBody);
   
}