import * as cheerio from 'cheerio';

const HOST = 'https://auto.bazos.cz'
const INITIAL_URL = HOST + "/?hledat=twingo&hlokalita=60200&humkreis=999&cenaod=10000&cenado=45000&order=1";

let offers = [];

async function getOffersFromUrl(url) {
	console.log('Fetching offers from', url);

	const response = await fetch(url);
	const responseText = await response.text();

	const $ = cheerio.load(responseText);

	$('.inzeraty').each((index, offer) => {
		const link = HOST + $(offer).find('.inzeratynadpis .nadpis a').attr('href');
		const title = $(offer).find('.inzeratynadpis .nadpis a').text();
		const price = $(offer).find('.inzeratycena').text();
		const location = $(offer).find('.inzeratylok').text();
		const description = $(offer).find('.inzeratynadpis .popis').text();

		if (!title.toLowerCase().includes('twingo')) {
			return;
		}

		offers.push({
			link,
			title,
			price,
			location,
			description
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





