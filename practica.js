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

const rowCards = document.querySelector("main .row");
const rowCardsTemplate = document.querySelector("#card-template").content;

function procesarJSON(jsondata) {
  //Will use templates.

  for (let char of jsondata.data.results) {
    let newCard = rowCardsTemplate.cloneNode(true);
    console.log(char);
    newCard.querySelector(".card-img-top").src =
      char.thumbnail.path + "." + char.thumbnail.extension;
    newCard.querySelector(".card-title").textContent = char.name;
    if (char.description) {
      newCard.querySelector(".card-text").textContent = char.description;
    } else {
      newCard.querySelector(".card-text").style.color = "red";
      newCard.querySelector(".card-text").textContent =
        "MARVEL API doesn't provide any info.";
    }

    let comicList = newCard.querySelector(".comics-list");
    if(char.comics.items.length>0){

      for (let comic of char.comics.items) {
        let li = document.createElement("li");
        li.textContent = comic.name;
        comicList.appendChild(li);
      }

    }else{
      let li = document.createElement("li");
      li.classList.add("no-info");
      li.textContent = "No comics available";
      comicList.appendChild(li);
    }

    let seriesList = newCard.querySelector(".series-list");

    if(char.series.items.length>0){

      for (let serie of char.series.items) {
        let li = document.createElement("li");
        li.textContent = serie.name;
        seriesList.appendChild(li);
      }

    }else{
      let li = document.createElement("li");
      li.classList.add("no-info");
      li.textContent = "No series available";
      seriesList.appendChild(li);
    }

    let eventList = newCard.querySelector(".events-list");

    if(char.events.items.length>0){
      for (let events of char.events.items) {
        let li = document.createElement("li");
        li.textContent = events.name;
        eventList.appendChild(li);
      }
    }else{
      let li = document.createElement("li");
      li.classList.add("no-info");
      li.textContent = "No events available";
      eventList.appendChild(li);
    }

    //Continuar con comics,series y eventos en un acordeón.
    rowCards.append(newCard);
  }
}
