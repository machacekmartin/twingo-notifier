import * as cheerio from 'cheerio';
import fs from 'fs';

const HOST = 'https://auto.bazos.cz'
const INITIAL_URL = HOST + "/?hledat=twingo&hlokalita=60200&humkreis=999&cenaod=10000&cenado=45000&order=1";

let offers = [];

async function scrapeOffers(url) {
	// console.log('Scraping offers from', url);
	const response = await fetch(url);
	const responseText = await response.text();

	const $ = cheerio.load(responseText);

	$('.inzeraty').each((index, offer) => {
		const id = $(offer).find('.inzeratynadpis .nadpis a').attr('href').split('/')[2];
		const link = HOST + $(offer).find('.inzeratynadpis .nadpis a').attr('href');
		const title = $(offer).find('.inzeratynadpis .nadpis a').text();
		const price = $(offer).find('.inzeratycena').text().trim();
		const location = $(offer).find('.inzeratylok').text().replace(/(\p{L})(?=\d)/gu, '$1 ');
		const image = $(offer).find('.inzeratynadpis img').attr('src');

		if (!title.toLowerCase().includes('twingo')) {
			return;
		}

		offers.push({
			id,
			link,
			title,
			price,
			location,
			image
		});
	});

	const nextPage = $('.strankovani a').filter((index, element) => $(element).text() === 'Další');

	if (nextPage.length > 0) {
		const nextPageUrl = nextPage.first().attr('href');
		await scrapeOffers(HOST + nextPageUrl);
		return;
	}
	// console.log('Successfully scraped ' + offers.length + ' offers');
}

function saveOffersToJsonFile() {
	fs.writeFileSync('twingos.json', JSON.stringify(offers, null, 2));
}

function saveNewOffersToEmailFile() {
	let emailBody = `
	<html>
	<head>
		<style>
			body { font-family: Arial, sans-serif; }
			th, td { padding: 10px; }
		</style>
	</head>
	<body>
		<table style="width: 100%">	
			<tr>
				<td>Image</td>
				<td>Twingo</td>
				<td>Location</td>
				<td>Link</td>
			</tr>
			${newOffers.map(offer => `
				<tr>
					<td><img src="${offer.image}" alt="${offer.title}" width="100" height="100" style="object-fit: contain; background-color: #f3f2f2;"></td>
					<td>
						<p>
							${offer.title.length > 30 ? offer.title.substring(0, 30) + '...' : offer.title}
							<br>
							<br>
							<strong>${offer.price}</strong>
						</p>
					</td>
					<td>${offer.location}</td>
					<td><a href="${offer.link}" target="_blank">Odkaz</a></td>
				</tr>
			`).join('')}
		</table>
		<p>See ya</p>
	</body>
	</html>
	`;

	fs.writeFileSync('twingos-email.html', emailBody);
}

await scrapeOffers(INITIAL_URL);
const existingOffers = JSON.parse(fs.readFileSync('twingos.json', 'utf8'));
const newOffers = offers.filter(offer => !existingOffers.some(o => o.id === offer.id));

if (offers.length === 0) {
	// Do not save anything

	console.log('0');
}
else if (newOffers.length === 0) {
	saveOffersToJsonFile();

	console.log('0');
}
else {
	saveNewOffersToEmailFile();
	saveOffersToJsonFile();
	
	console.log('1');
}