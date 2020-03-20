function task4() {
    let arr = [
        { value: 100, type: "USD" },
        { value: 215, type: "EUR" },
        { value: 7, type: "EUR" },
        { value: 99, type: "USD" },
        { value: 354, type: "USD" },
        { value: 12, type: "EUR" },
        { value: 77, type: "USD" }
    ],
    usdSum = 0,
    eurArr;
    arr.forEach(element => {
        if(element.type === 'USD' && element.value < 100) {
            usdSum += element.value
        }
    });

    eurArr = arr.filter(el => {
        return el.type === "EUR";
    }).map(item => item.value**2);

    console.log("UsdSum: " + usdSum);
    console.log(eurArr);
}
