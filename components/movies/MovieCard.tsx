import React from 'react';
import { MovieType } from '../../types/MovieType';
import { Card, CardActions, CardContent, CardMedia, Divider, IconButton, Typography, useMediaQuery } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { moviesActions } from '../../store/moviesSlice';

interface MovieCardProps {
	movie: MovieType;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
	const dispatch = useDispatch();
	const matches = useMediaQuery('(min-width:600px)');

	return (
		<Card sx={{ display: 'flex', height: 300, maxWidth: '100%' }}>
			{matches && movie.posterUrl && <CardMedia component='img' height='300' image={movie.posterUrl} sx={{ width: '200px !important' }} />}
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
				<IconButton onClick={() => dispatch(moviesActions.setFavourite(movie))}>
					<FavoriteIcon color={movie.favourite ? 'error' : 'inherit'} />
				</IconButton>
			</CardActions>
		</Card>
	);
};