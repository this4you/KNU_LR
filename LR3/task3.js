function task3() {
    let amount = prompt("Скільки?", 50);
    do{
        console.log(`${amount}  пляшок стоїть на стіні, одна упала і залишилось ${--amount ? amount : "жодної"}` )
    } while(amount > 0)
}