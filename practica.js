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

//USING TEMPLATES

function procesarJSON(jsondata){

for (let char of jsondata.data.results) {
  let newCard = rowCardsTemplate.cloneNode(true);
  let uniqueID = char.id;
  newCard.querySelector(".card-img-top").src = char.thumbnail.path + "." + char.thumbnail.extension;
  newCard.querySelector(".card-title").textContent = char.name;
  if(char.description){
    newCard.querySelector(".card-text").textContent = char.description;
  }else{
    let prueba = newCard.querySelector(".card-text");
    prueba.classList.add("no-info");
    prueba.textContent = "MARVEL API doesn't provide any info";
  }

  //To get to work a bs5 accordion you need to take the IDS

  let accordionComicsID = `comics-${uniqueID}`;
  let accordionSeriesID = `series-${uniqueID}`;
  let accordionEventsID = `events-${uniqueID}`;

  newCard.querySelector(".accordion-button[data-bs-target='#collapse-comics']").setAttribute("data-bs-target", `#${accordionComicsID}`); //Look for a selector that has the data-bs-target with that value
                                                                                                                                         //And then change it to the uniqueID of the character
  
  newCard.querySelector("#collapse-comics").setAttribute("id",accordionComicsID);                                                        

  newCard.querySelector(".accordion-button[data-bs-target='#collapse-series']").setAttribute("data-bs-target", `#${accordionSeriesID}`);
  newCard.querySelector("#collapse-series").setAttribute("id",accordionSeriesID)

  newCard.querySelector(".accordion-button[data-bs-target='#collapse-events']").setAttribute("data-bs-target", `#${accordionEventsID}`);
  newCard.querySelector("#collapse-events").setAttribute("id",accordionEventsID);

  let comicsList = newCard.querySelector(".comics-list");

  if(char.comics.items.length>0){
    for (let comic of char.comics.items) {
      let li = document.createElement("li");
      li.textContent = comic.name;
      comicsList.appendChild(li);
    }
  }else{
    let li = document.createElement("li");
    li.classList.add("no-info");
    li.textContent = "No comics available";
    comicsList.appendChild(li);
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

  let eventsList = newCard.querySelector(".events-list");

  if(char.events.items.length>0){

    for (let event of char.events.items) {
      let li = document.createElement("li");
      li.textContent = event.name;
      eventsList.appendChild(li);
    }

  }else{

    let li = document.createElement("li");
    li.classList.add("no-info");
    li.textContent = "No events available";
    eventsList.appendChild(li);

  }
  rowCards.append(newCard);
}

}
