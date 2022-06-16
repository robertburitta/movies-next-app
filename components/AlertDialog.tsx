import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ErrorType } from '../types/ErrorType';

interface AlertDialogProps {
	error: ErrorType;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ error }) => {
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	const handleTryAgain = () => {
		handleClose();
		error.callback?.();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{error.title}</DialogTitle>
			<DialogContent>{error.message}</DialogContent>
			<DialogActions>
				{error.tryAgain && <Button onClick={handleTryAgain}>Try again</Button>}
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};