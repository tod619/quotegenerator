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
		console.log(data);
	} catch (error) {
		getQuote();
		console.log('No quote', error);
	}
}

// On load
getQuote();
