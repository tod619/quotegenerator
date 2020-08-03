// Variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// hide loading
function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get quote from api
async function getQuote() {
	loading();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();

		// If Author of quote is unknown
		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown Author';
		} else {
			authorText.innerText = data.quoteAuthor;
		}

		// Reduce fontsize for larger quotes
		if (data.quoteText.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}

		quoteText.innerText = data.quoteText;

		// Stop loading and show quote
		complete();
		// console.log(data);
	} catch (error) {
		getQuote();
		console.log(error);
	}
}

// Tweet quote
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

// add eventlistners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
//getQuote();
