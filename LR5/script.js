let isLoading = 0;
let imgSection;

window.onload = (e) => {
    imgSection = document.getElementById("picture-section");
    getImeges().then(loadUsersIcons, errHandler);
};
window.addEventListener('scroll', function () {
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom - 20 > document.documentElement.clientHeight || isLoading === 1) return;
    console.log("Start!");
    getImeges(25).then(loadUsersIcons, errHandler);
});

function setPlaceholderVisible(visible) {
    const elem = document.querySelector("#placeholder img");
    elem.hidden = !visible;
}

function errHandler(err) {
    alert(err.message);
    setPlaceholderVisible(false);
}

function loadUsersIcons(users) {
    setPlaceholderVisible(false);
    const usrs = JSON.parse(users).results;
    usrs.forEach(usr => {
        setImgToSection(imgSection, usr.picture && usr.picture.large);
        isLoading = 0;
    });
}

function setImgToSection(imgSection, imgUrl) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.srcset = imgUrl;
    img.width = 200;
    img.height = 200;
    li.appendChild(img);
    imgSection.appendChild(li);
}

function getImeges(number) {
    return new Promise(function (resolve, reject) {
        isLoading = 1;
        setPlaceholderVisible(true);
        const url = number ? `https://randomuser.me/api/?results=${number}` : "https://randomuser.me/api/?results=50"
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status == 200) {
                setTimeout(resolve.bind(this, this.response), 3000); // для тестового отображения placeholder
            } else {
                const error = new Error(this.statusText);
                error.code = this.code;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}
