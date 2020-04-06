
let button = document.getElementById("addRecordButton");
let tableBody = document.getElementById("setting-table-body");
let diagramContainer = document.getElementById("diagram");
let alertDiv = document.createElement('div');

// alert region
alertDiv.classList.add('alert');
diagramContainer.appendChild(alertDiv);
diagramContainer.addEventListener('mousemove', function (e) {
    let target = event.target;
    if (Array.prototype.indexOf.call(target.classList, 'measure') != -1) {
        let top = e.pageY + 10 + 'px';
        let left = e.pageX + 10 + 'px';
        alertDiv.textContent = target.dataset.measure;
        alertDiv.style.top = top;
        alertDiv.style.left = left;
        alertDiv.style.display = 'block';
    }
});
diagramContainer.addEventListener('mouseout', function (e) {
    let target = event.target;
    if (Array.prototype.indexOf.call(target.classList, 'measure') != -1) {
        alertDiv.style.display = 'none';
    }
});
// end alert region
class Diagram {
    constructor(mainContainer) {
        this.colums = [];
        this.mainContainer = mainContainer;
    }
    changeMeasure(value) {
        if (!this.maxMeasure || (+this.maxMeasure < +value)) {
            this.maxMeasure = value;
            this._changeColumsMaxMeasure();
        }
    }
    findNewMaxMeasure() {
        var max = this.colums.reduce((prev, cur) => {
            if (+prev.measureValue > +cur.measureValue) {
                return prev;
            }
            return cur;
        })
        this.maxCol = max;
        this.maxMeasure = max.measureValue;
        this._changeColumsMaxMeasure();

    }
    _changeColumsMaxMeasure() {
        this.colums.forEach((item) => {
            item.maxMeasure = this.maxMeasure;
        });
    }
    _setColumnSize() {
        let columnWidth = 100 / this.colums.length - (100 / this.colums.length) * 0.2;
        this.colums.forEach(element => {
            element.width = columnWidth;
        });
    }
    addColumn(column) {
        if (this.maxMeasure) {
            column.maxMeasure = this.maxMeasure;
        }
        this.colums.push(column);
        this._setColumnSize();
        column.renderTo(this.mainContainer);
    }
    removeColumn(column) {
        let index = this.colums.indexOf(column);
        this.colums.splice(index, 1);
        if (column == this.maxCol && this.colums.length > 0) this.findNewMaxMeasure();
        this._setColumnSize();
        if (this.colums.length === 0) {
            this.maxMeasure = 0;
            this.maxCol = null;
        }
    }
}
class Column {
    constructor() {
        this._createHtml();
    }
    set maxMeasure(value) {
        this.maxMeasureValue = value;
        this._changeMesureDiv();
    }
    set width(value) {
        this.htmlElem.style.width = value + "%";
    }
    set name(value) {
        this.captionElem.textContent = value;
    }
    set measure(value) {
        if (!Number.isInteger(+value)) return;
        this.measureElem.dataset.measure = value;
        this.measureValue = value;
        if (this.maxMeasureValue && (+this.maxMeasureValue >= +this.measureValue)) {
            this._changeMesureDiv();
            if (this.row.diagram.maxCol == this)
                this.row.diagram.findNewMaxMeasure();
        } else {
            this.row.diagram.maxCol = this;
        }
        this.row.diagram.changeMeasure(value);
    }
    _changeMesureDiv(value) {
        this.measureElem.style.height = this.measureValue * 100 / this.maxMeasureValue + '%';

    }
    _createHtml() {
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("column");
        let colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        this.measureElem = document.createElement("div");
        this.measureElem.classList.add('measure');
        colorDiv.appendChild(this.measureElem);
        this.captionElem = document.createElement("h4");
        mainDiv.appendChild(colorDiv);
        mainDiv.appendChild(this.captionElem);
        this.htmlElem = mainDiv;
    }

    renderTo(target) {
        target.appendChild(this.htmlElem);
    }
}
class Row {
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
        column.row = this;
        this.column = column;
        this.diagram.addColumn(column);
    }
    _createHtml() {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.appendChild(this._createDeleteButton());
        th.scope = "row";
        tr.appendChild(th);
        tr.appendChild(this._createTd("name"));
        tr.appendChild(this._createTd("measure"));
        this.htmlElem = tr;
    }

    _createTd(property) {
        let td = document.createElement("td");
        td.dataset.property = property;
        td.setAttribute("contenteditable", true)
        td.addEventListener("input", (event) => {
            let target = event.target;
            this.column[property] = target.textContent;
        });
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