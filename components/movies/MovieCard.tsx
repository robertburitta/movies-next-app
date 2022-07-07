import React, { useState } from 'react';
import { MovieType } from '../../types/MovieType';
import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Divider, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { moviesActions } from '../../store/moviesSlice';
import { RootState } from '../../store';
import { Routes } from '../../router/Routes';
import { ErrorType } from '../../types/ErrorType';
import Link from 'next/link';

interface MovieCardProps {
	movie: MovieType;
	setError: React.Dispatch<React.SetStateAction<ErrorType>>;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, setError }) => {
	const dispatch = useDispatch();
	const matches = useMediaQuery('(min-width:600px)');
	const favourites: number[] = useSelector((state: RootState) => state.movies.favourites);
	const [errors, setErrors] = useState([] as number[]);
	const [videoLoading, setVideoLoading] = useState(false);

	const handleLinkClick = (e: React.MouseEvent<HTMLElement>) => {
		if (movie.url === undefined) {
			e.preventDefault();
			setError({
				tryAgain: false,
				title: 'No video',
				message: 'Sorry, this film has no video'
			});
		} else {
			setVideoLoading(true);
		}
	};

	return (
		<React.Fragment>
			<Link href={`${Routes.VIDEO(movie.id)}`}>
				<Tooltip title="Click to see video" arrow onClick={handleLinkClick}>
					<Card sx={{ display: 'flex', height: { xs: 'auto', sm: 300 }, maxWidth: '100%', cursor: 'pointer' }} >
						{matches && errors.indexOf(movie.id) === -1 && movie.posterUrl &&
							<CardMedia component='img' height='300' image={movie.posterUrl} sx={{ width: '200px !important', flexShrink: 0 }} onError={() => setErrors((prev) => [...prev, movie.id])} />
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
							<IconButton onClick={(e) => { e.preventDefault(); dispatch(moviesActions.updateFavourites(movie)); }}>
								<FavoriteIcon color={favourites.indexOf(movie.id) !== -1 ? 'error' : 'inherit'} />
							</IconButton>
						</CardActions>
					</Card>
				</Tooltip>
			</Link>
			{videoLoading &&
				<React.Fragment>
					<Box sx={{ position: 'absolute', top: 0, left: 0, height: "100%", width: '100%', backgroundColor: '#000', opacity: 0.7 }}></Box>
					<CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
				</React.Fragment>
			}
		</React.Fragment>
	);
};