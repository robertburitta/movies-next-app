import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { MediaList } from '../../pages/api/api';

interface VideoOverlayProps {
	video: MediaList | undefined;
}

export const VideoOverlay: React.FC<VideoOverlayProps> = ({ video }) => {
	return (
		<React.Fragment>
			<Box sx={{ position: 'absolute', top: 0, left: 0, height: "100vh", width: '100%', backgroundColor: '#000', opacity: 0.7 }}></Box>
			{video !== undefined &&
				<React.Fragment>
					<Box sx={{ position: 'absolute', top: '20%', left: '5%', width: 500, color: '#CCC' }}>
						<Typography variant='h4'>{video.title}</Typography>
						<Typography variant='body2' mt={2} mb={1} fontSize={16}>
							Runtime: {video.runtime} minutes<br />
							Production year: {video.year}<br />
							Director: {video.director}<br />
							Actors: {video.actors}<br />
						</Typography>
						<Divider sx={{ borderColor: '#CCC' }} />
						<Typography variant='body2' mt={1} fontSize={16}>
							{video.plot}
						</Typography>
					</Box>
					<Box>
						{video.posterUrl &&
							<Box sx={{ position: 'absolute', top: '15%', right: '10%', width: 400, color: '#CCC' }}>
								<Image loader={() => video.posterUrl!} width="400" height="600" src={video.posterUrl} alt={video.title} unoptimized />
							</Box>
						}
					</Box>
				</React.Fragment>
			}
		</React.Fragment>
	);
};