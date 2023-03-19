"use strict";

let cardsToLoad = 4;
let numOfLoads = 0;
let allCardsElements = [];
let filteredCards = [];
document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (cards) {
      allCardsElements = filteredCards = cards;
      loadCards(filteredCards);
    });
});

document.querySelector("#load-more").addEventListener("click", function () {
  loadCards(filteredCards);
});

document
  .querySelectorAll("input[name='filterBySource']")
  .forEach(function (input) {
    input.addEventListener("click", function (e) {
      let selectedFilter = e.target.value;
      document.querySelector(".layout-placeholder").innerHTML = "";
      numOfLoads = 0;
      if (selectedFilter !== "all") {
        filteredCards = allCardsElements.filter(
          (card) => card.source_type === selectedFilter
        );
        loadCards(filteredCards);
      } else {
        filteredCards = allCardsElements;
        loadCards(filteredCards);
      }
    });
  });

function loadCards(cards) {
  let startIndex = numOfLoads * cardsToLoad;
  let endIndex = startIndex + cardsToLoad;
  for (let i = startIndex; i < endIndex; i++) {
    let cardElement = createCardElement(cards[i], i);
    document.querySelector(".layout-placeholder").appendChild(cardElement);

    if (i >= cards.length - 1) {
      document.querySelector("#load-more").style.display = "none";
      break;
    } else {
      document.querySelector("#load-more").style.display = "block";
    }
  }
  numOfLoads++;
}

function createCardElement(card, index) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const caption = document.createElement("p");
  img.setAttribute("src", card.image);
  caption.innerHTML = card.caption;
  div.classList.add("card-element");
  div.classList.add(`card-${index}`);
  div.appendChild(img);
  div.appendChild(caption);

  return div;
}

/// async & await

// const getData = async () => {
//   const response = await fetch("data.json");
//   const data = await response.json();
//   return data;
// };

// getData().then((data) => console.log("resolved: ", data));
// const darkTheme = document.querySelector(".container");

// darkTheme.addEventListener("click", function () {
//   container.classList.add("dark");
// });

// let radios = document.querySelectorAll[".radio-group"];
// for (radio in radios) {
//   radio.onclick = function () {
//     alert(radio.value);
//     console.log("tntntnnt");
//   };
// }

const darkTheme = document.querySelector("#darkTheme");
const lightTheme = document.querySelector("#lightTheme");
const container = document.querySelector(".layout-placeholder");
const sidebar = document.querySelector(".sidebar");
const preview = document.querySelector(".preview");
const formControls = document.querySelectorAll(".form-control");
const radioGroups = document.querySelectorAll(".radio-group");

// formControls.forEach((el) => {
//   el.addEventListener("click", (event) => {
//     radioGroups.classList.add("radio-group-dark");
//     formControls.classList.add(".form-control-dark");
//     // Something happens on click
//   });
// });

darkTheme.addEventListener("click", function () {
  document.querySelector("body").classList.add("dark");
});
lightTheme.addEventListener("click", function () {
  document.querySelector("body").classList.remove("dark");
});

document
  .querySelector("#numberOfColumns")
  .addEventListener("change", function (e) {
    let selectedVal = e.target.value;
    document.querySelector(
      ".layout-placeholder"
    ).className = `layout-placeholder col-${selectedVal}`;
  });
