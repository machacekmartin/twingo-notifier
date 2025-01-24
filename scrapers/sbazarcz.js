export async function scrape()
{
    const offers = await retrieveOffers();

    return offers;
}

async function retrieveOffers()
{
    const response = await fetch('https://www.sbazar.cz/api/v1/items/search?price_from=10000&price_to=50000&category_id=156&phrase=Renault%20twingo&limit=999');
    const responseJson = await response.json();

    const results = responseJson.results;

    const offers = results.map(result => ({
        id: 'sbazar-' + result.id,
        link: 'https://www.sbazar.cz/sauto' + result.premise + '/detail/' + result.seo_name,
        title: result.name,
        price: result.price,
        location: result.locality.district,
        image: result.images[0]?.url !== null ? 
            ('https:' + result.images[0]?.url) + '?fl=exf|res,280,280,3|jpg,80,,1' :
            'https://placehold.co/100x100',
        source: 'sbazar'
    }));

    return offers;
}