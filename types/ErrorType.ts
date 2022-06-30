export interface ErrorType {
	tryAgain: boolean;
	title: string;
	message: string;
	callback?: () => void;
};