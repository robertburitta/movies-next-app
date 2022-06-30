import { MediaList } from '../pages/api/api';

interface MovieType extends MediaList {
	favourite?: boolean;
}

export type { MovieType };