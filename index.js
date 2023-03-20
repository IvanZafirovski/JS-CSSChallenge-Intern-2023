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
      document.querySelectorAll(".like-btns").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          let heartEl = btn.querySelector(".like-btn");
          let likesEl = btn.parentNode.querySelector(".likes");
          let oldValue = parseInt(likesEl.innerHTML);

          if (heartEl.classList.contains("full")) {
            heartEl.classList.remove("full");
            let newValue = oldValue - 1;
            if (newValue <= 0) {
              newValue = 0;
            }
            likesEl.innerHTML = newValue;
          } else {
            heartEl.classList.add("full");
            let newValue = oldValue + 1;
            likesEl.innerHTML = newValue;
          }
        });
      });
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
  const newCard = document.createElement("div");
  const heading = document.createElement("div");
  const content = document.createElement("div");
  const headingRow = document.createElement("div");
  const logo = document.createElement("img");
  const profileImage = document.createElement("div");
  const profileImg = document.createElement("img");
  const nameDate = document.createElement("div");
  const name = document.createElement("div");
  const date = document.createElement("div");
  const img = document.createElement("img");
  const caption = document.createElement("p");
  const footer = document.createElement("div");
  const likes = document.createElement("p");
  const likeBtn = document.createElement("button");

  profileImg.setAttribute("src", card.profile_image);
  img.setAttribute("src", card.image);

  caption.innerHTML = card.caption;
  name.innerHTML = card.name;
  date.innerHTML = card.date;
  logo.setAttribute("src", `icons/${card.source_type}.svg`);
  likes.innerHTML = card.likes;

  likeBtn.innerHTML = `
  <svg
  class = "like-btn"
  width="17"
  height="17"
  viewBox="0 0 17 17"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  >
  <path
  d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z"
  stroke="black"
  stroke-linecap="round"
  stroke-linejoin="round"
  />
  </svg>
  `;

  newCard.classList.add("card-element");
  newCard.classList.add(`card-${index}`);
  heading.classList.add("heading");
  content.classList.add("content");
  headingRow.classList.add("heading-row");
  logo.classList.add("logo");
  nameDate.classList.add("name--date");
  name.classList.add("name");
  date.classList.add("date");
  profileImg.classList.add("profile_image");
  profileImage.classList.add("profile_image");
  caption.classList.add("capiton");
  footer.classList.add("footer");
  likes.classList.add("likes");
  likeBtn.classList.add("like-btns");

  newCard.append(heading, content, footer);
  heading.append(headingRow, logo);
  headingRow.append(profileImage, nameDate);
  profileImage.appendChild(profileImg);
  nameDate.append(name, date);
  content.append(img, caption);
  footer.append(likeBtn, likes);

  return newCard;
}

const darkTheme = document.querySelector("#darkTheme");
const lightTheme = document.querySelector("#lightTheme");
const body = document.querySelector("body");

darkTheme.addEventListener("click", function () {
  body.classList.add("dark");
});
lightTheme.addEventListener("click", function () {
  body.classList.remove("dark");
});

const numberOfColumns = document.querySelector("#numberOfColumns");

numberOfColumns.addEventListener("change", function (e) {
  let selectedVal = e.target.value;
  document.querySelector(
    ".layout-placeholder"
  ).className = `layout-placeholder col-${selectedVal}`;
});
