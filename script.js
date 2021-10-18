let card = document.getElementsByClassName("card");
let cards = [...card];
const deck = document.getElementById("card-deck");
let restartButton = document.getElementById("restart");
let moves = 0;
let counter = document.querySelector(".moves");
let matchedCard = document.getElementsByClassName("match");
let popup = document.getElementById("popup")
let openedCards = [];
let playAgainButton = document.getElementById("play-again");
let logo = document.getElementById("logo");

logo.addEventListener("click", () => {
    window.location.reload();
})

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

window.addEventListener('load', () => {
    startGame();
});

restartButton.addEventListener('click', () => {
    startGame();
});


function startGame() {
    openedCards = [];
    cards = shuffle(cards);
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    counter.innerHTML = moves;
}

let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardOpen() {
    openedCards.push(this);
    let length = openedCards.length;
    if(length === 2){
        moveCounter();
        if(openedCards[0].title === openedCards[1].title){
            matched();
        } else {
            unmatched();
        }
    }
}

function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1000);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if (moves === 1) {
    document.getElementById("moves").innerHTML = "1 move";
    } else {
        document.getElementById("moves").innerHTML = `${moves} moves`;
    }
}

function congratulations(){
    if (matchedCard.length === 16){
        popup.classList.add("show");
        document.getElementById("final-result").innerHTML = `It took you ${moves} moves.`;
        playAgainButton.addEventListener('click', () => {
            playAgain();
        })
    }
}

function playAgain(){
    document.getElementById("moves").innerHTML = "0 moves";
    popup.classList.remove("show");
    startGame();
}

for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const footer = entry.target.querySelector('.footer-div');
        if (entry.isIntersecting) {
            footer.classList.add('animate__fadeIn');
            return;
        }
        footer.classList.remove('animate__fadeIn');
    });
});

observer.observe(document.querySelector('.footer'));