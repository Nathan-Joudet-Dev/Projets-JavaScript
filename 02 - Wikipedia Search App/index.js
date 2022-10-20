// Consiste à saisir la requête de recherche lorsque le formulaire est soumis
const form = document.querySelector('.js-search-form');

// Prend 2 arguments ('submit', handleSubmit)
// submit => évent DOM que vous voulons écouter
// handleSubmit => fonction qui s'éxécutera lorsque l'évent sera déclenché
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  // prevent page from reloading when form is submitted
  event.preventDefault();
  // get the value of the input field
  // La valeur de ce qui est écrit dans la barre de recherche est stockée
  const inputValue = document.querySelector('.js-search-input').value;
  // remove whitespace from the input
  const searchQuery = inputValue.trim();
  
  //---Chargement lors de l'envoie d'une requête---
  const searchResults = document.querySelector('.js-search-results');
  // Clear the previous results
  searchResults.innerHTML = '';

  const spinner = document.querySelector('.js-spinner');
  spinner.classList.remove('hidden');
  //---Chargement lors de l'envoie d'une requête---

  try {
    const results = await searchWikipedia(searchQuery);
    //---Si aucun résultat---// //Totalhits => contient le nombre total de résultats disponibles pour une requête
    if (results.query.searchinfo.totalhits === 0) {
      alert('No results found. Try different keywords');
      return;
    }
        //---Si aucun résultat---//
    displayResults(results);
  } catch (err) {
    console.log(err);
    alert ('Failed to search Wikipedia');
  } finally {
    spinner.classList.add('hidden');
  } 
}

async function searchWikipedia (searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
} 

function displayResults(results) {
  // Get a reference to the `.js-search-results` element => référence à l'objet entre parenthèses.
  const searchResults = document.querySelector('.js-search-results');

  // Iterate over the `search` array. Each nested object in the array can be
  // accessed through the `result` parameter
  results.query.search.forEach(result => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

    // Append the search result to the DOM
    searchResults.insertAdjacentHTML(
      'beforeend', // La position pour ajouter l’élément (beforeend) et le HTML à insérer à cette position
      `<div class="result-item">
        <h3 class="result-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
        <span class="result-snippet">${result.snippet}</span><br>
      </div>`
    );
  });
}