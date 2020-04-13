let form = document.getElementById("setting-form");
let image = document.getElementById("image");
let elements = form.elements;

let validateSettings = {
    "number": function (e) {
        return (e.key >= '0' && e.key <= '9') || e.which === 8
    },
    "char": function (e) {
        return /^[0-9a-zA-Z]+$/.test(e.key) && /[^\d]/g.test(e.key);
    }
};

(function () {
    for (let i = 0; i < elements.length - 1; i++) {
        let elem = elements[i];
        setValidation(elem);
    }
})();


form.onsubmit = function (e) {
    e.preventDefault();
    for (let i = 0; i < elements.length - 1; i++) {
        let elem = elements[i];
        if (isEmptyValue(elem)) continue;
        setStyle(elem);
    }
}

function setStyle(elem) {
    let styleProperty = elem.dataset.styleProperty;
    if (styleProperty in image) {
        image[styleProperty] = elem.value;
    } else {
        let dimension = elem.dataset.styleDimension || "";
        image.style[styleProperty] = elem.value + dimension;
    }
}

function setValidation(elem) {
    let validation = elem.dataset.validate;
    if (!validation) return; // check consist in array
    elem.onkeydown = validateSettings[validation];
}

function isEmptyValue(elem) {
    if (elem.value == "") {
        elem.classList.add("not-valid");
        return true;
    } else {
        elem.classList.remove("not-valid");
        return false;
    }
}

