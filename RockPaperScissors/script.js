function getComputerChoice(){
    let randomChoice = Math.floor(Math.random() * 3);

    if(randomChoice == 0){
        return "rock";
    } else if(randomChoice == 1){
        return "paper";
    } else if(randomChoice == 2){
        return "scissors";
    }
}
console.log(getComputerChoice());

function getHumanChoice(){
    let choice = prompt("What do you choose? Rock, paper or scissors?");
    return choice;
}

function playRound(humanChoice, computerChoice){

    if(humanChoice.toLowerCase() == "rock" && computerChoice == "paper"){
        console.log("Computer won! Paper beats Rock!");
        computerScore++;
    } else if(humanChoice.toLowerCase() == "rock" && computerChoice == "scissors"){
        console.log("You won! Rock beats Scissors!");
        humanScore++;
    } else if(humanChoice.toLowerCase() == "paper" && computerChoice == "rock"){
        console.log("You won! Paper beats Rock!");
        humanScore++;
    } else if(humanChoice.toLowerCase() == "paper" && computerChoice == "scissors"){
        console.log("Computer won! Scissors beats Paper!");
        computerScore++;
    } else if(humanChoice.toLowerCase() == "scissors" && computerChoice == "rock"){
        console.log("Computer won! Rock beats Scissors!");
        computerScore++;
    } else if(humanChoice.toLowerCase() == "scissors" && computerChoice == "paper"){
        console.log("You won! Scissors beats Paper!");
        humanScore++;
    } else if(humanChoice.toLowerCase() == computerChoice){
        console.log("Draw! try again!");
    }
}

function playGame(){
    for(let i = 0; i < 5; i++){
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
    }
    if(humanScore == computerScore){
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
    }
    console.log(`Your score: ${humanScore} - Computer score: ${computerScore}`);
}

let humanScore = 0;
let computerScore = 0;

playGame();