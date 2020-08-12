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
        score: 0
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

// Creating cards 
var allcards = [];

for(i=0;i<cardsymbols.length;i++){
    for(j=0;j<cardnumbers.length;j++){
        tempcard = [cardnumbers[j],cardsymbols[i]];
        allcards.push(tempcard);
    }
}

// Shuffling cards 
var randomcards = allcards;

for(i=0; i<randomcards.length; i++){
    shufflepos = Math.floor(Math.random()*randomcards.length);
    tempcard = randomcards[i];
    randomcards[i]=randomcards[shufflepos];
    randomcards[shufflepos]=tempcard;
}

// Event listeners

document.querySelector("#player-1-title").onclick = function() {addcards('player1','#player-1-cards','#player-1-points')};
document.querySelector("#player-2-title").onclick = function() {addcards('player2','#player-2-cards','#player-2-points')};
document.querySelector("#dealer-title").onclick = function() {addcards('dealer','#dealer-cards','#dealer-points')};


// Function to add cards on click 
function addcards(gamer, cardsid, pointsid){

    // Picking a random card
    pickcard = randomcards.pop();

    // Add card div to gamer cards
    document.querySelector(cardsid).appendChild(getcard(pickcard));

    // Add score to gamer points
    document.querySelector(pointsid).innerHTML = scorecalculate(pickcard, gamer);


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