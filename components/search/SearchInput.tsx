import React from 'react';
import { CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
// import { useSearch } from '../../hooks/useSearch';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../store/searchSlice';
import { ErrorType } from '../../types/ErrorType';
import { AlertDialog } from '../AlertDialog';

interface SearchInputProps {
	setQuery: (query: string) => void;
	isLoading: boolean;
	error: ErrorType;
}

export const SearchInput: React.FC<SearchInputProps> = ({ setQuery, isLoading, error }) => {
	const dispatch = useDispatch();
	// const [error, setError] = useState({} as ErrorType);

	// const { isPending, handleSearch } = useSearch({
	// 	onSuccess: () => {
	// 		setError({} as ErrorType);
	// 	},
	// 	onError: (error) => {
	// 		setError({} as ErrorType);
	// 		setError(error);
	// 	}
	// });

	const handleChange = (query: string) => {
		if (query.length >= 3) {
			setQuery(query);
		} else {
			dispatch(searchActions.clearSearchResult());
		}
	};

	return (
		<React.Fragment>
			<FormControl sx={{ mt: '20px' }}>
				<InputLabel htmlFor='searchInput'>Search movie</InputLabel>
				<OutlinedInput id='searchInput' label='Search movie' sx={{ width: 287 }} onChange={(e) => handleChange(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							{isLoading && <CircularProgress size={30} />}
						</InputAdornment>
					}
				/>
			</FormControl>
			{Object.keys(error).length !== 0 && <AlertDialog error={error} />}
		</React.Fragment>
	);
};