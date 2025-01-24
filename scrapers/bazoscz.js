import * as cheerio from 'cheerio';

const HOST = 'https://auto.bazos.cz'

export async function scrape() {
    const offers = await retrieveOffersFrom(
        HOST + "/?hledat=twingo&rubriky=auto&cenaod=10000&cenado=50000"
    );

    return offers;
}

async function retrieveOffersFrom(url, offers = []) {
    const response = await fetch(url);
    const responseText = await response.text();
    const $ = cheerio.load(responseText);

    $('.inzeraty').each((index, offer) => {
        const id = 'bazos-' + $(offer).find('.inzeratynadpis .nadpis a').attr('href').split('/')[2];
        const link = HOST + $(offer).find('.inzeratynadpis .nadpis a').attr('href');
        const title = $(offer).find('.inzeratynadpis .nadpis a').text();
        const price = $(offer).find('.inzeratycena').text().trim();
        const location = $(offer).find('.inzeratylok').text().replace(/(\p{L})(?=\d)/gu, '$1 ');
        const image = $(offer).find('.inzeratynadpis img').attr('src');
        const source = 'bazos';

        if (title.toLowerCase().includes('twingo')) {
            offers.push({
                id,
                link,
                title,
                price,
                location,
                image,
                source,
            });
        }
    });

    const nextPage = $('.strankovani a').filter((index, element) => $(element).text() === 'Další');

    if (nextPage.length > 0) {
        const nextPageUrl = nextPage.first().attr('href');
        return retrieveOffersFrom(HOST + nextPageUrl, offers);
    }

    return offers;
}