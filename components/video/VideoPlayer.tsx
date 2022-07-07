import React, { useState } from 'react';
import { useVideo } from '../../hooks/useVideo';
import { Box, CircularProgress } from '@mui/material';
import { VideoOverlay } from './VideoOverlay';
import { VideoControls } from './VideoControls';

import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
	id: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ id }) => {
	const [showOverlay, setShowOverlay] = useState(true);
	const { videoRef, videoData, isLoading, handlePlayPause } = useVideo({ id });

	const handlePlay = () => {
		setShowOverlay(!showOverlay);
		handlePlayPause();
	};

	const handleVideoClick = () => {
		if (!showOverlay) {
			handlePlay();
		}
	};

	return (
		<React.Fragment>
			{isLoading ?
				<CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
				:
				<React.Fragment>
					<Box data-vjs-player onClick={handleVideoClick}>
						<video ref={videoRef} className="video-js" style={{ width: '100%', height: '100vh' }} />
					</Box>
					{showOverlay && <VideoOverlay video={videoData} />}
					<VideoControls handlePlay={handlePlay} videoRef={videoRef} showOverlay={showOverlay} />
				</React.Fragment>
			}
		</React.Fragment >
	);
};