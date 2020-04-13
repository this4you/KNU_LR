let isLoading = 0;
let imgSection;

window.onload = (e) => {
    imgSection = document.getElementById("picture-section");
    getImeges().then(loadUsersIcons);
};
window.addEventListener('scroll', function () {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom - 20 > document.documentElement.clientHeight || isLoading === 1) return;
    console.log("Start!");
    getImeges(25).then(loadUsersIcons);
});

function setPlaceholderVisible(visible) {
    let elem = document.querySelector("#placeholder img");
    elem.hidden = !visible;
}

function loadUsersIcons(users) {
    setPlaceholderVisible(false);
    let usrs = JSON.parse(users).results;
    usrs.forEach(usr => {
        setImgToSection(imgSection, usr.picture && usr.picture.large);
        isLoading = 0;
    });
}

function setImgToSection(imgSection, imgUrl) {
    let li = document.createElement("li");
    let img = document.createElement("img");
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
        let url = number ? `https://randomuser.me/api/?results=${number}` : "https://randomuser.me/api/?results=50"
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status == 200) {
                setTimeout(resolve.bind(this, this.response), 3000); // для тестового отображения placeholder
            } else {
                let error = new Error(this.statusText);
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
