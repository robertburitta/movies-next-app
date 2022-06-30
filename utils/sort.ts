import { MediaList } from '../pages/api/api';

export const sort = (films: MediaList[], favs: number[]) => {

	const favFilms = films.filter(film => favs.includes(film.id)).sort((a, b) => a.title > b.title ? 1 : -1);
	const nonFavs = films.filter(film => !favs.includes(film.id)).sort((a, b) => a.title > b.title ? 1 : -1);
	return [...favFilms, ...nonFavs];
};