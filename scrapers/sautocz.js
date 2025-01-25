export async function scrape()
{
    const offers = await retrieveOffers();

    return offers;
}

async function retrieveOffers()
{
    const response = await fetch("https://www.sauto.cz/api/v1/items/search?sort=price&limit=1000&offset=0&manufacturer_model_seo=renault%3Atwingo&price_from=10000&price_to=50000&category_id=838");
    const responseJson = await response.json();

    const results = responseJson.results;

    const offers = results.map(result => ({
        id: 'sauto-' + result.id,
        link: 'https://www.sauto.cz/' + 
            result.category.seo_name + '/' + 
            result.manufacturer_cb.seo_name + '/' + 
            result.model_cb.seo_name + '/' + result.id,
        title: result.name,
        price: result.price,
        location: result.locality.district,
        image: result.images[0]?.url !== null ? 
            ('https:' + result.images[0]?.url) + '?fl=exf|res,360,270,3|webp,75' :
            'https://placehold.co/100x100',
        source: 'sauto'
    }));

    return offers;
}