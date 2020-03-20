function task2() {
    let rowNumber = 10; // prompt("Скільки?") || 10;
        mainArray = [];
        centerOfArray = rowNumber-1,
        resultString = "";

    mainArray[0] = [];
    mainArray[0][centerOfArray] = 1;
    addRowToResult(0);
    fillTable(0);
    
    for(let i = 1; i < rowNumber; i++) {
        mainArray[i] = [];
        for(let j = 0; j <= i; j++){
            if(mainArray[i-1][centerOfArray-j] != undefined) {
                continue;
            } else {
                mainArray[i][centerOfArray-j] = (mainArray[i-1][centerOfArray-j+1] || 0) + (mainArray[i-1][centerOfArray-j-1] || 0);
                mainArray[i][centerOfArray+j] = (mainArray[i-1][centerOfArray-j+1] || 0) + (mainArray[i-1][centerOfArray-j-1] || 0);
            }
        }
        addRowToResult(i);
        fillTable(i);
    }

    function addRowToResult(numberOfRow) {
        let showArray = mainArray[numberOfRow];
        for(let i = 0; i <showArray.length; i++) {
            resultString += showArray[i] || " "; //showArray[i] ? showArray[i] + "" : " "; 
        }
        resultString += "\n"
    }

    function fillTable(numberOfRow) {
        let showArray = mainArray[numberOfRow],
            table = document.getElementById("twoTaskResultTable"),
            tr = document.createElement("tr");
        
        for(let i = 0; i < rowNumber*2 - 1; i++){
            let td = document.createElement("td");
            td.innerHTML = showArray[i] || " ";
            showArray[i]? td.classList.add("tree"): "";
            tr.appendChild(td);
        }
        
        table.appendChild(tr);
    }
    console.log(resultString);
}