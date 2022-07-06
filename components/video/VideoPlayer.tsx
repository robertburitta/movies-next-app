import React, { useEffect, useState } from 'react';
import { useVideo } from '../../hooks/useVideo';

import 'video.js/dist/video-js.css';
import { Box, CircularProgress, Container, Divider, IconButton, Typography } from '@mui/material';
import PlayCircle from '@mui/icons-material/PlayCircle';
import Image from 'next/image';

interface VideoPlayerProps {
	id: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ id }) => {
	const [showOverlay, setShowOverlay] = useState(true);
	const { videoRef, videoData, isLoading, isError, handlePlayPause } = useVideo({ id });

	const handlePlay = () => {
		setShowOverlay(!showOverlay);
		handlePlayPause();
	};

	const handleVideoClick = () => {
		if (!showOverlay) {
			handlePlay();
		}
	};

	useEffect(() => {
		console.log('ERROR', isError);
	}, [isError]);

	return (
		<React.Fragment>
			{isLoading ?
				<CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
				:
				<Box>
					<Box data-vjs-player onClick={handleVideoClick}>
						<video ref={videoRef} className='video-js vjs-big-play-centered' style={{ width: '100%', height: '100vh' }} />
					</Box>
					{showOverlay &&
						<React.Fragment>
							<Box sx={{ position: 'absolute', top: 0, left: 0, height: "100vh", width: '100%', backgroundColor: '#000', opacity: 0.7 }}></Box>
							<Box>
								<IconButton color="default" onClick={handlePlay} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
									<PlayCircle sx={{ width: 100, height: 100, color: '#FFF' }} />
								</IconButton>
								{videoData &&
									<React.Fragment>
										<Box sx={{ position: 'absolute', top: '20%', left: '5%', width: 500, color: '#CCC' }}>
											<Typography variant='h4'>{videoData.title}</Typography>
											<Typography variant='body2' mt={2} mb={1} fontSize={16}>
												Runtime: {videoData.runtime} minutes<br />
												Production year: {videoData.year}<br />
												Director: {videoData.director}<br />
												Actors: {videoData.actors}<br />
											</Typography>
											<Divider sx={{ borderColor: '#CCC' }} />
											<Typography variant='body2' mt={1} fontSize={16}>
												{videoData.plot}
											</Typography>
										</Box>
										{videoData.posterUrl &&
											<Box sx={{ position: 'absolute', top: '15%', right: '10%', width: 400, color: '#CCC' }}>
												<Image loader={() => videoData.posterUrl!} width="400" height="600" src={videoData.posterUrl} alt={videoData.title} />
											</Box>
										}
									</React.Fragment>
								}
							</Box>
						</React.Fragment>
					}
				</Box>
			}
		</React.Fragment >
	);
};