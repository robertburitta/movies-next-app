import React, { useEffect } from 'react';
import { PageWithLayout } from '../../types/PageWithLayout';
import { getVideoLayout } from '../../layout/VideoLayout';
import { VideoPlayer } from '../../components/video/VideoPlayer';
import { useRouter } from 'next/router';
import { LinearProgress } from '@mui/material';

const Video: PageWithLayout = () => {
	const router = useRouter();

	return (
		<React.Fragment>
			{router?.query?.id !== undefined ?
				<VideoPlayer id={router?.query?.id[0]} />
				:
				<LinearProgress />
			}
		</React.Fragment>
	);
};

Video.getLayout = getVideoLayout;

export default Video;