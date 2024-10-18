/**
 * This code is just to read the json file. Don't worry about it. We will see it in detail in next sectioins
 * Write your own code in the procesarJSON function
 */

fetch("./data/heroes.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => procesarJSON(jsondata))
  .catch((e) => {
    console.log(e);
  });



const rowCards = document.querySelector("main .row")
const rowCardsTemplate = document.querySelector("#card-template").content;

function procesarJSON(jsondata) {
    //Will use templates.

    for (let char of jsondata.data.results) {
        let newCard = rowCardsTemplate.cloneNode(true);
        console.log(char);
        newCard.querySelector(".card-img-top").src = char.thumbnail.path + "." + char.thumbnail.extension;
        rowCards.append(newCard);
    }

}
