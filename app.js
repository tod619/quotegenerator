// Variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get quote from api
async function getQuote() {
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
		// console.log(data);
	} catch (error) {
		getQuote();
		console.log(error);
	}
}

// On load
getQuote();
