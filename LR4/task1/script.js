let form = document.getElementById("setting-form");
let image = document.getElementById("image");

form.onsubmit = function (e) {
    e.preventDefault();
    let elements = form.elements;
    for (let i = 0; i < elements.length - 1; i++) {
        let elem = elements[i];
        if (elem.dataset.styleProperty === "height" || elem.dataset.styleProperty === "width") {
            image[elem.dataset.styleProperty] = elem.value;
        } else {
            let dimension = elem.dataset.styleDimension || "";
            image.style[elem.dataset.styleProperty] = elem.value  + dimension;  
        }
    }
}

