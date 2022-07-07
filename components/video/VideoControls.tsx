import React, { useEffect, useState } from 'react';
import { Box, IconButton, LinearProgress, Slider, Stack, Typography } from '@mui/material';
import { ArrowBack, PlayCircle, VolumeDown, VolumeUp } from '@mui/icons-material';
import { convertTime } from '../../utils/convertTime';
import { useRouter } from 'next/router';
import { Routes } from '../../router/Routes';

interface VideoControlsProps {
	handlePlay: () => void;
	videoRef: React.MutableRefObject<HTMLVideoElement | null>;
	showOverlay: boolean;
}

interface VideoDataProps {
	currentTime: string;
	duration: string;
	progress: number;
	volume: number;
}

export const VideoControls: React.FC<VideoControlsProps> = ({ handlePlay, videoRef, showOverlay }) => {
	const router = useRouter();
	const [videoData, setVideoData] = useState<VideoDataProps>({
		currentTime: '00:00',
		duration: '00:00',
		progress: 0,
		volume: 0
	});

	useEffect(() => {
		const videoInterval = setInterval(() => {
			if (videoRef !== undefined) {
				setVideoData({
					currentTime: convertTime(videoRef?.current?.currentTime),
					duration: convertTime(videoRef?.current?.duration),
					progress: videoRef?.current ? videoRef.current.currentTime / videoRef.current.duration * 100 : 0,
					volume: videoRef?.current?.volume! * 100 || 0
				});
			}
		}, 1000);

		return () => clearInterval(videoInterval);
	}, []);

	const handleBack = () => {
		router.push(Routes.HOME);
	};

	const handleLengthChange = (length: number) => {
		if (videoRef?.current) {
			videoRef.current.currentTime = videoRef.current.duration * length / 100;
		}
	};

	const handleVolumeChange = (volume: number) => {
		if (videoRef?.current) {
			videoRef.current.volume = volume / 100;
		}
	};

	return (
		<React.Fragment>
			{showOverlay &&
				<React.Fragment>
					<IconButton color="default" onClick={handlePlay} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
						<PlayCircle sx={{ width: 100, height: 100, color: '#FFF' }} />
					</IconButton>
					<IconButton color="default" onClick={handleBack} sx={{ position: 'absolute', top: '10%', left: '5%', transform: 'translate(-50%, -50%)' }}>
						<ArrowBack sx={{ width: 50, height: 50, color: '#FFF' }} />
					</IconButton>
				</React.Fragment>
			}
			<Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'absolute', bottom: '5%', left: '2%', width: '96%' }}>
				<Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%', mr: 5 }}>
					<Typography variant="body1" color="white" sx={{ mr: 2 }}>{videoData.currentTime}</Typography>
					<Slider value={videoData.progress} valueLabelDisplay="auto" valueLabelFormat={videoData.currentTime} onChange={(e, value) => handleLengthChange(value as number)} sx={{ width: '100%' }} />
					<Typography variant="body1" color="white" sx={{ ml: 2 }}>{videoData.duration}</Typography>
				</Stack>
				<Stack spacing={2} direction="column" alignItems="center">
					<IconButton sx={{ color: 'white' }} onClick={() => handleVolumeChange(100)}>
						<VolumeUp />
					</IconButton>
					<Slider orientation="vertical" value={videoData.volume} valueLabelDisplay="auto" onChange={(e, value) => handleVolumeChange(value as number)} sx={{ height: 50 }} />
					<IconButton sx={{ color: 'white' }} onClick={() => handleVolumeChange(0)}>
						<VolumeDown />
					</IconButton>
				</Stack>
			</Box>
		</React.Fragment>
	);
};