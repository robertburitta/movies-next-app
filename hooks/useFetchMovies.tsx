import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { fetchMediaList, MediaList } from "../pages/api/api";
import { ResultHandler } from "../types/ResultHandler";
import { ErrorType } from "../types/ErrorType";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { sort } from "../utils/sort";

interface UseFetchMoviesProps extends ResultHandler {
	items?: number;
}

export const useFetchMovies = ({ onSuccess, onError, items = 10 }: UseFetchMoviesProps) => {
	const [page, setPage] = useState(1);
	const [movies, setMovies] = useState<MediaList[]>([]);
	const favourites = useSelector((state: RootState) => state.movies.favourites);


	const { data, isError, isSuccess, ...restQuery } = useQuery(["movies", page, items], () => fetchMediaList(items, page), {
		onSuccess: (data) => {
			onSuccess();
			setMovies(prev => prev ? sort([...prev, ...data], favourites) : sort([...data], favourites));
		},
		onError: (err) => {
			onError(err as ErrorType);
		}
	});

	const loadMore = () => {
		setPage(prev => prev + 1);
	};

	useEffect(() => {

		setMovies((prev) => sort(prev, favourites));

	}, [favourites]);

	return { movies, loadMore };
};
