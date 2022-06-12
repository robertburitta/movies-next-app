import React from 'react';
import { MediaList } from '../../pages/api/api';
import { Card, CardActions, CardContent, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';

interface MovieCardProps {
	movie: MediaList;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
	return (
		<Card sx={{ display: 'flex', height: 300 }}>
			{/* {movie.posterUrl && <CardMedia component='img' height='300' image={movie.posterUrl} sx={{ width: '200px !important' }} />} */}
			<CardContent>
				<Typography variant='h5'>{movie.title}</Typography>
				<Typography variant='body1'>
					Runtime: {movie.runtime}<br />
					Production year: {movie.year}<br />
					Director: {movie.director}<br />
					Actors: {movie.actors}<br />
				</Typography>
				<Divider />
				<Typography variant='body2'>
					Plot: {movie.plot}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton>
					<Favorite />
				</IconButton>
			</CardActions>
		</Card>
	);
};