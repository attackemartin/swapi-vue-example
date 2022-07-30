// People & Planets Fetch script from 
// https://github.com/erkage/tw-swapi-by-gn-webpack/blob/master/src/services.js


const swapiUrl = "https://swapi.dev/api";

export default {
	async getSwapiPlanet(planetId) {
		try {
			const response = await fetch(`${swapiUrl}/planets/${planetId}`);
			return await response.json();
		} catch (error) {
			return console.error(error);
		}
	},
};
