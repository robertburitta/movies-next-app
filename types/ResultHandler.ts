import { ErrorType } from './ErrorType';

export interface ResultHandler {
	onSuccess: () => void;
	onError: (error: ErrorType) => void;
}