// Deposit the money that you want to play
// Determine the number of lines you want to bet
// Collect a bet amount
// Spin the slot machine
// Check if the user wins
// Give the user their winnings
// Play Again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COL = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" :8
}

const SYMBOL_VALUES ={
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a deposit amount :$ ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again.");
    }
    else{
        return numberDepositAmount;
    }
}

};

const getNumberOfLines = () => {
    while(true){
    const lines = prompt("Enter number of lines to bet on (1 to 3) : ");
    const numberOfLines=parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines>3){
        console.log("Choose in between 1 t0 3 lines , try again!");
    }
    else{
        return numberOfLines;
    }
}

}


const getBet =(balance,lines) => {
    while(true){
        const bet = prompt("Enter the bet per lines :$ ");
        const numberBet=parseFloat(bet);
        if (isNaN(numberBet) || numberBet<=0 || numberBet>balance / lines){
            console.log("Invalid bet , try again!");
        }
        else{
            return numberBet;
        }
    }

}

const spin = () =>{
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [[],[],[]]; // Each of these nested arrays are columns 
    for (let i=0; i< COL; i++){
        const reelSymbols = [...symbols];
        for (let j=0;j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol =  reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex,1)

        }
    }
    return reels
}


const transpose = (reels) => {
    const rows=[]
    for (let i=0; i<ROWS ; i++){
        rows.push([])
        for (let j=0; j<COL ; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) => {
    for (const row of rows){
        let rowString =""
        for (const[i,symbol] of row.entries()){
            rowString+=symbol
            if(i!=row.length-1){
                rowString+= " | "
            }
        }
        console.log(rowString)

    }
}

const getWinnings =(rows,bet,lines) => {
    let winnings = 0
    for (let row =0; row<lines; row++){
        const symbols = rows[row];
        let allSame = true
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break
            }
        }
        if(allSame){
            winnings+= bet*SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
}

const game = () => {
    let balance= deposit();
    while(true){
        console.log("You have a balance of $" + balance)
        const numberOfLines=getNumberOfLines();
        const bet = getBet(balance,numberOfLines)
        balance-= bet *numberOfLines
        const reels = spin()
        const rows = transpose(reels)
        //console.log(reels)
        //console.log(rows)
        printRows(rows)
        const winnings = getWinnings(rows,bet,numberOfLines)
        balance+=winnings
        console.log("You won! = $" + winnings.toString())

        if(balance<=0){
            console.log("You run out of Money!")
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)?")
        if (playAgain != "y") 
            {
                console.log("Your balance is $" + balance)
                break
            }
    }

}

game()



