let form = document.getElementById("setting-form");
let image = document.getElementById("image");
let elements = form.elements;
let imgProperties = [
    "width",
    "height"
];
let validateSettings = {
    "number": function(elem) {
        elem.onkeydown = function(e) {
            return e.key >= '0' && e.key <='9';
        };
    },
    "string": function(elem) {

    }
};
(function(){
    for (let i = 0; i < elements.length - 1; i++) {
        let elem = elements[i];
        setValidation(elem);
    }
})();


form.onsubmit = function (e) {
    e.preventDefault();
    for (let i = 0; i < elements.length - 1; i++) {
        let elem = elements[i];
        setStyle(elem);
    }
}

function setStyle(elem) {
    let styleProperty = elem.dataset.styleProperty;
    if (imgProperties.indexOf(styleProperty) !== -1) {
        image[styleProperty] = elem.value;
    } else {
        let dimension = elem.dataset.styleDimension || "";
        image.style[styleProperty] = elem.value + dimension;
    }
}

function setValidation(elem) {
    let validation = elem.dataset.validate;
    if (!validation) return;
    validateSettings[validation](elem);
}

