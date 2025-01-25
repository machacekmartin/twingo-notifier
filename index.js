import fs from 'fs';
import { scrape as scrapeBazos } from './scrapers/bazoscz.js'
import { scrape as scrapeSbazar } from './scrapers/sbazarcz.js'
import { scrape as scrapeSauto } from './scrapers/sautocz.js'

const bazosOffers = await scrapeBazos();
const sbazarOffers = await scrapeSbazar();
const sautoOffers = await scrapeSauto();

const allOffers = [
	...bazosOffers,
	...sbazarOffers,
	...sautoOffers,
]

const existingOffers = JSON.parse(fs.readFileSync('twingos.json', 'utf8'));
const newOffers = allOffers.filter(offer => !existingOffers.some(o => o.id === offer.id));

if (newOffers.length === 0) {
	// No new twingos for you.

	console.log('0');
}
else {
	// We found some new twingos yayy

	appendNewOffersToJsonFile();
	saveNewOffersToEmailFile();

	console.log('1');
}

function appendNewOffersToJsonFile() {
	fs.writeFileSync('twingos.json', JSON.stringify([...existingOffers, ...newOffers], null, 2));
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
						<td>
							<img src="${offer.image}" alt="${offer.title}" width="100" height="100" style="object-fit: contain; background-color: #f3f2f2;">
						</td>
						<td>
							<p>
								${offer.title.length > 30 ? offer.title.substring(0, 30) + '...' : offer.title}
								<br>
								<br>
								<strong>${offer.price}</strong>
							</p>
						</td>
						<td>${offer.location}</td>
						<td>
							<a href="${offer.link}" target="_blank">
								${offer.source}
							</a>
						</td>
					</tr>
				`).join('')}
			</table>
			<p>See ya</p>
		</body>
		</html>
	`;

	fs.writeFileSync('twingos-email.html', emailBody);
}