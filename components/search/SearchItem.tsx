import React, { useState } from 'react';
import { MovieType } from '../../types/MovieType';
import { Card, CardActions, CardContent, CardMedia, Divider, Typography, useMediaQuery } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SearchItemProps {
	movie: MovieType;
}

export const SearchItem: React.FC<SearchItemProps> = ({ movie }) => {
	const matches = useMediaQuery('(min-width:600px)');
	const favourites: number[] = useSelector((state: RootState) => state.movies.favourites);
	const [errors, setErrors] = useState([] as number[]);

	return (
		<Card sx={{ display: 'flex', height: { xs: 'auto', sm: 300 }, maxWidth: '100%' }}>
			{matches && errors.indexOf(movie.id) === -1 && movie.posterUrl &&
				<CardMedia component='img' height='300' image={movie.posterUrl} sx={{ width: '200px !important' }} onError={() => setErrors((prev) => [...prev, movie.id])} />
			}
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant='h5'>{movie.title}</Typography>
				<Typography variant='body2' mt={2} mb={1}>
					Runtime: {movie.runtime} minutes<br />
					Production year: {movie.year}<br />
					Director: {movie.director}<br />
					Actors: {movie.actors}<br />
				</Typography>
				<Divider />
				<Typography variant='body2' mt={1}>
					Plot: {movie.plot}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<FavoriteIcon color={favourites.indexOf(movie.id) !== -1 ? 'error' : 'action'} />
			</CardActions>
		</Card>
	);
};