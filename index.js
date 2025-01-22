import * as cheerio from 'cheerio';
import fs from 'fs';

const HOST = 'https://auto.bazos.cz'
const INITIAL_URL = HOST + "/?hledat=twingo&hlokalita=60200&humkreis=999&cenaod=10000&cenado=45000&order=1";

let offers = [];

async function getOffersFromUrl(url) {
	console.log('Scraping offers from', url);

	const response = await fetch(url);
	const responseText = await response.text();

	const $ = cheerio.load(responseText);

	$('.inzeraty').each((index, offer) => {
		const id = $(offer).find('.inzeratynadpis .nadpis a').attr('href').split('/')[2];
		const link = HOST + $(offer).find('.inzeratynadpis .nadpis a').attr('href');
		const title = $(offer).find('.inzeratynadpis .nadpis a').text();
		const price = $(offer).find('.inzeratycena').text().trim();
		const location = $(offer).find('.inzeratylok').text().replace(/(\p{L})(?=\d)/gu, '$1 ');

		if (!title.toLowerCase().includes('twingo')) {
			return;
		}

		offers.push({
			id,
			link,
			title,
			price,
			location,
		});
	});

	const nextPage = $('.strankovani a').filter((index, element) => $(element).text() === 'Další');

	if (nextPage.length > 0) {
		const nextPageUrl = nextPage.first().attr('href');
		await getOffersFromUrl(HOST + nextPageUrl);
		return;
	}

	console.log('Successfully scraped ' + offers.length + ' offers');
}

await getOffersFromUrl(INITIAL_URL);

// get difference between offers and entries in offers.json file by "id"
const existingOffers = JSON.parse(fs.readFileSync('offers.json', 'utf8'));
const newOffers = offers.filter(offer => !existingOffers.some(o => o.id === offer.id));

console.log('Found new offers:', newOffers);

fs.writeFileSync('offers.json', JSON.stringify(offers, null, 2));