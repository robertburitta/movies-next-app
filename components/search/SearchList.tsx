import React from 'react';
import { Grid } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { MovieType } from '../../types/MovieType';
import { SearchItem } from './SearchItem';
import { MediaList } from '../../pages/api/api';
// import { searchActions } from '../../store/searchSlice';

interface SearchListProps {
	result: MediaList[] | undefined;
}

export const SearchList: React.FC<SearchListProps> = ({ result }) => {
	// const dispatch = useDispatch();
	// const result: MovieType[] = useSelector((state: RootState) => state.search.result);

	// useEffect(() => {
	// 	dispatch(searchActions.clearSearchResult());
	// }, []);

	return (
		<Grid container spacing={2} mt={2} mb={4}>
			{result?.map((movie) =>
				<Grid item xs={12} lg={6} key={movie.id}>
					<SearchItem movie={movie} />
				</Grid>
			)}
		</Grid>
	);
};