// People & Planets Fetch script from 
// https://github.com/erkage/tw-swapi-by-gn-webpack/blob/master/src/services.js


const swapiUrl = "https://swapi.dev/api";

export default {
	// fetch single page of people. Set to first page
	async getSwapiPeoplePage(page = 1) {
		try {
			const response = await fetch(`${swapiUrl}/people/?page=${page}`);
			return await response.json();
		} catch (error) {
			console.error("[getSwapiPeoplePage]", error.message);
			throw error;
		}
	},
	// foreach through every page of peoples calling getSwapiPeoplePage
	async getAllSwapiPeople() {
		let people;

		try {
			//get first page
			const response = await this.getSwapiPeoplePage();
			people = response;
			// counting people on page
			const { count, perPageCount } = {
				count: people.count,
				perPageCount: people.results.length
			};

			const numberOfPagesLeft = Math.ceil((count - 1) / perPageCount);
			const promises = [];
			for (let i = 2; i <= numberOfPagesLeft; i++) {
				promises.push(this.getSwapiPeoplePage(i));
			}
			const responses = await Promise.all(promises).then(responses => {
				return responses;
			}).catch(error => {
				console.error("[getAllSwapiPeople]", error.message);
				throw error;
			});
			people = responses.reduce((acc, data) => [...acc, ...data.results], people.results);
			return people;
		} catch (error) {
			console.error("[getAllSwapiPeople]", error.message);
			throw error;
		}
	},
};
