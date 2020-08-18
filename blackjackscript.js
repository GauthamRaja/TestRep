// initializing card numbers and symbols
let cardnumbers = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let cardsymbols = ['spade','club','diamond','heart'];
let cardpoint = {
    'A': [1,11],
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10
};

gamers = {
    dealer: {
        wins: 0,
        score: 0,
    },

    player1: {
        wins: 0,
        score: 0
    },

    player2: {
        wins: 0,
        score: 0
    },
}

// Initializing variables
var allcards = [];
var randomcards = [];

newgame();



// Event listeners
document.querySelector("#player-1-hit").onclick = function() {addcards('player1','#player-1-cards','#player-1-points','#player-1-judgement')};
document.querySelector("#player-2-hit").onclick = function() {addcards('player2','#player-2-cards','#player-2-points', '#player-2-judgement')};

document.querySelector("#player-1-stop").onclick = function() {stopturn('player1')};
document.querySelector("#player-2-stop").onclick = function() {stopturn('player2')};




// Dealing cards
function dealcards(){

    createandshufflecards();

    // Dealing 2 cards per player
    for(i=0; i<2; i++){
        addcards('dealer','#dealer-cards','#dealer-points','#dealer-judgement');
        addcards('player1','#player-1-cards','#player-1-points','#player-1-judgement');
        addcards('player2','#player-2-cards','#player-2-points', '#player-2-judgement');
    }
    
    // Hide deal button
    document.getElementById("dealbutton").style.visibility = "hidden";

    // Reveal player 1 buttons
    document.getElementById("player-1-hit").style.visibility = "visible";
    document.getElementById("player-1-stop").style.visibility = "visible";
}

// Function to create and shuffle cards
function createandshufflecards(){
    
    // Re-initializing cards
    allcards = [];
    randomcards = [];

    // Creating cards 
    for(i=0;i<cardsymbols.length;i++){
        for(j=0;j<cardnumbers.length;j++){
            tempcard = [cardnumbers[j],cardsymbols[i]];
            allcards.push(tempcard);
        }
    }

    // Shuffling cards 
    randomcards = allcards;

    for(i=0; i<randomcards.length; i++){
        shufflepos = Math.floor(Math.random()*randomcards.length);
        tempcard = randomcards[i];
        randomcards[i]=randomcards[shufflepos];
        randomcards[shufflepos]=tempcard;
    }

}


// Function to add cards and calculate scores and status on click 
function addcards(gamer, cardsid, pointsid, judgement){

    // Picking a random card
    pickcard = randomcards.pop();

    // Add card div to gamer cards
    document.querySelector(cardsid).appendChild(getcard(pickcard));

    // Add score to gamer points
    tempscore = scorecalculate(pickcard, gamer);
    document.querySelector(pointsid).innerHTML = tempscore;

    // Bust status
    if(tempscore>21){
        checkstatus(gamer, judgement);
    }
   
}

// // // // // // // // // // // // // // // // // // 
// Function to generate card 
function getcard(pickedcard){

    // choosing font awesome icon and card color based on symbol 
    switch(pickedcard[1]){
        case 'spade':
            deck = 'spa';
            cardcolor = 'black';
            break;
        case 'club':
            deck = 'bread-slice';
            cardcolor = 'black';
            break;
        case 'heart':
            deck = 'heart';
            cardcolor = 'red';
            break;
        case 'diamond':
            deck = 'gem';
            cardcolor = 'red';
            break;
    }

    // Creating card div
    var newcarddiv = document.createElement("div");
    newcarddiv.setAttribute("class","cards "+cardcolor);

    // Generating div for card value
    var cardvaluediv = document.createElement("div");
    cardvaluediv.innerHTML = pickedcard[0];

    // generating div for card symbol 
    var cardsymboldiv = document.createElement("div");
    cardsymboldiv.setAttribute('class','fas fa-'+deck);

    // Add card value and symbol to card div
    newcarddiv.appendChild(cardvaluediv);
    newcarddiv.appendChild(cardsymboldiv);

    return newcarddiv;

}

// // // // // // // // // // // // // // // // // // 
// Function to calculate score
function scorecalculate(pickedcard, gamername){
   
    if(pickedcard[0]=='A'){
        if((gamers[gamername].score+11)<21){
            gamers[gamername].score+=11;
        }
        else{
            gamers[gamername].score++;
        }
    }
    else{
        gamers[gamername].score += cardpoint[pickedcard[0]];
    }

    return gamers[gamername].score;
}

function checkstatus(gamername, judgementid){
    
    if(gamername=='player1'){
        document.querySelector(judgementid).innerHTML = "BUST!";
        stopturn(gamername);
    }
   
    if(gamername=='player2'){
        document.querySelector(judgementid).innerHTML = "BUST!";
        stopturn(gamername);
    }    
    
    if(gamername=='dealer'){
        document.querySelector(judgementid).innerHTML = "BUST!";
        decidewinner();
    }

}

function stopturn(gamername){
    
    if(gamername=='player1'){
        
        document.getElementById("player-1-hit").style.visibility = "hidden";
        document.getElementById("player-1-stop").style.visibility = "hidden";
        document.getElementById("player-2-hit").style.visibility = "visible";
        document.getElementById("player-2-stop").style.visibility = "visible";
       
    }
   
    if(gamername=='player2'){
        
        document.getElementById("player-2-hit").style.visibility = "hidden";
        document.getElementById("player-2-stop").style.visibility = "hidden";
        dealerturn();
        
    }    
    

}

// Automating dealer's turn
function dealerturn(){
    while(gamers.dealer.score<21){
        if(gamers.dealer.score<15){
            addcards('dealer','#dealer-cards','#dealer-points','#dealer-judgement');
        }
    }
    decidewinner();
}

// Finalizing winners
function decidewinner(){
    if(gamers.dealer.score>21 && gamers.player1.score>21 && gamers.player2.score>21){
        //no one wins
        winnermessage('No one');
    } 
    else if(gamers.dealer.score>gamers.player1.score && gamers.dealer.score>gamers.player2.score && gamers.dealer.score<21){
        //dealer wins
        winnermessage('Dealer');
        gamers.dealer.wins++;
        document.querySelector("#dealer-wins").innerHTML = "Wins: " + gamers.dealer.wins;
    }
    else if(gamers.player1.score>gamers.player2.score && gamers.player1.score>gamers.dealer.score && gamers.player1.score<21){
        //player 1 wins
        winnermessage('Player 1');
        gamers.player1.wins++;
        document.querySelector("#player-1-wins").innerHTML = "Wins: " + gamers.player1.wins;
    }
    else{
        //player 2 wins
        winnermessage('Player 2');
        gamers.player2.wins++;
        document.querySelector("#player-2-wins").innerHTML = "Wins: " + gamers.player2.wins;
    }
}

function winnermessage(whowins){
    alert(whowins + " wins");
    alert("Would you like to play another game?");
    newgame();
}

function newgame(){

    // // Initializing variables
    // var allcards = [];
    // var randomcards = [];
    
    // Showing deal button
    document.getElementById("dealbutton").style.visibility = "visible";
    
    // Hiding player 1 and 2 buttons
    document.getElementById("player-1-hit").style.visibility = "hidden";
    document.getElementById("player-1-stop").style.visibility = "hidden";
    document.getElementById("player-2-hit").style.visibility = "hidden";
    document.getElementById("player-2-stop").style.visibility = "hidden";

    // Resetting scores
    gamers.dealer.score = 0;
    gamers.player1.score = 0;
    gamers.player2.score = 0;
    document.querySelector("#dealer-points").innerHTML="";
    document.querySelector("#player-1-points").innerHTML="";
    document.querySelector("#player-2-points").innerHTML="";

    // Resetting status
    document.querySelector("#dealer-judgement").innerHTML="";
    document.querySelector("#player-1-judgement").innerHTML="";
    document.querySelector("#player-2-judgement").innerHTML="";

    // Removing cards
    document.querySelector("#dealer-cards").innerHTML = "";
    document.querySelector("#player-1-cards").innerHTML = "";
    document.querySelector("#player-2-cards").innerHTML = "";

    
}

