"use strict";

// const getData = (callback) => {
//   const req = new XMLHttpRequest();

//   req.addEventListener("readystatechange", () => {
//     if (req.readyState === 4 && req.status === 200) {
//       const data = JSON.parse(req.responseText);
//       callback(undefined, data);
//     } else if (req.readyState === 4) {
//       callback("coud not fetch data", undefined);
//     }
//   });

//   req.open("GET", "data.json");
//   req.send();
// };
// getData((err, data) => {
//   console.log("fired");
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

/// FETCH
fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (cards) {
    let placeholder = document.querySelector(".preview");
    let out = "";

    for (let card of cards) {
      out += `
      <tr>
      <td><img src="${card.image}" alt="" /></td>
      <td>${card.caption}</td>
    </tr>       
        `;
    }
    placeholder.innerHTML = out;
  });

/// async & await

// const getData = async () => {
//   const response = await fetch("data.json");
//   const data = await response.json();
//   return data;
// };

// getData().then((data) => console.log("resolved: ", data));
