import { ErrorType } from './ErrorType';

export interface ResultHandler<T> {
	onSuccess: (data?: T) => void;
	onError: (error: ErrorType | Error) => void;
}