const addBtn = document.querySelector('#add');
const delBtn = document.querySelector('#del');
const pageCount = document.querySelector('.pageCount');
const letterCount = document.querySelector('.letterCount');
const jokeZone = document.querySelector('#jokeZone');

const dataURL = 'https://api.chucknorris.io/jokes/random';

// Creates a card with all the content and style
const createCard = (dataObj) => {
    const newCard = document.createElement('div');
    const newImg = document.createElement('img');
    const jokeUpdated = document.createElement('p');
    const linktoJoke = document.createElement('a');
    const theJoke = document.createElement('p');
    const colorBtn = document.createElement('button');
    const closeBtn = document.createElement('button');

    colorBtn.textContent = 'RANDOM CARD COLOR';
    colorBtn.style.display = 'block';
    colorBtn.style.marginBottom = '5px';
    closeBtn.textContent = 'CLOSE';
    closeBtn.style.display = 'block';
    theJoke.textContent = dataObj.value;
    linktoJoke.href = dataObj.url;
    linktoJoke.textContent = 'Link to joke';
    newImg.src = dataObj.icon_url;
    jokeUpdated.textContent = `Updated @ ${dataObj.updated_at}`;
    linktoJoke.target = "_blank";

    theJoke.setAttribute('class', 'theJokeElement');
    colorBtn.setAttribute('class', 'colorBtn');
    closeBtn.setAttribute('class', 'closeBtn');
    newCard.setAttribute('class', 'jokeCard');

    newCard.append(newImg,jokeUpdated,linktoJoke,theJoke,colorBtn,closeBtn);
    jokeZone.append(newCard);
};

// Main event
addBtn.addEventListener('click', () => {    
    fetch(dataURL)
        .then((data) => data.json())
        .then(data => createCard(data))
        .then(() => countJokes())
        .then(() => colorCars())
        .then(() => closeCards())
        .catch(err => console.log(err));
});

// Calculates the amount of jokes and letters in those jokes
const countJokes = () => {
    const collectCards = document.querySelectorAll('.jokeCard');
    pageCount.textContent = collectCards.length;

    const allJokes = document.querySelectorAll('.theJokeElement');
    let totalLetterCount = null;
    allJokes.forEach(element => {
        totalLetterCount += element.textContent.length;
    });
    letterCount.textContent = totalLetterCount > 0? totalLetterCount : "0";
};

// Deletes cards one by one
const closeCards = () => {
    const closeBtns = document.querySelectorAll('.closeBtn');
    closeBtns.forEach(element => {
        element.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            countJokes();
        });
    });
};

// Deletes all cards at once
delBtn.addEventListener('click', () => {
    jokeZone.textContent = "";
    countJokes();
});

// Generate cards' background colors
const colorCars = () => {
    const colorBtns = document.querySelectorAll('.colorBtn');
    colorBtns.forEach(item => {
        item.addEventListener('click', (e) => {
            e.target.parentElement.style.background = `linear-gradient(
                ${generateAngle()}deg, 
                hsl(${generateAngle()}, ${generateAngle()}%, ${generate40To100()}%), 
                hsl(${generateAngle()}, ${generateAngle()}%, ${generate40To100()}%) ${generateUpTo100()}%, 
                hsl(${generateAngle()}, ${generateAngle()}%, ${generate40To100()}%) 90%, 
                hsl(${generateAngle()}, ${generateAngle()}%, ${generate40To100()}%) 90%)`;
        });
    });
};

const generateAngle = () => Math.floor(Math.random() * 360);
const generateUpTo100 = () => Math.floor(Math.random() * 100);
const generate40To100 = () => Math.floor(Math.random() * 60) + 40;