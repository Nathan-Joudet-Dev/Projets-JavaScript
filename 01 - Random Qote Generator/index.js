const twitterButton = document.querySelector('#js-tweet');
const spinner = document.querySelector('#js-spinner');

// Select the quote button in our JavaScript code:
//document.querySelector('#js-new-quote')
const newQuoteButton = document.querySelector('#js-new-quote');

//détecter un clic sur le bouton de devis afin que nous puissions récupérer 
//un nouveau devis aléatoire et l’afficher à l’utilisateur. 

//Le premier, clic, est l’événement que nous voulons écouter et 
//le second, getQuote, est le nom de la fonction qui sera invoquée lorsque l’événement clic 
//est déclenché sur newQuoteButton.
newQuoteButton.addEventListener('click', getQuote);
// Utilisation de l'API "What Does Trump Think"
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

async function getQuote() {
  // remove the "hidden" class on the spinner
  spinner.classList.remove('hidden');
  // disable the quote button
  newQuoteButton.disabled = true;

  // The `try` block executes the statements within it as usual.
  // If an exception is thrown, the statements defined in
  // the `catch` block will be executed.
  // Learn more here: https://javascript.info/try-catch
  try {
    const response = await fetch(endpoint)
    // If the response is not 200 OK...
    if (!response.ok) {
      // ...throw an error. This causes control flow
      // to skip to the `catch` block below.
      throw Error(response.statusText)
    }
    const json = await response.json();
    displayQuote(json.message);
    setTweetButton(json.message); //Permet au bouton tweeté d'être redirigé vers Twitter
    } catch (err) {
    console.log(err)
    alert('Failed to fetch new quote');
  } finally {
    newQuoteButton.disabled = false;
    spinner.classList.add('hidden');
  }
}

// Affiche les tweets
function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
}

function setTweetButton(quote) {
  twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Donald Trump`);
}

getQuote();