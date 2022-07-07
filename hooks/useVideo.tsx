import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import videojs, { VideoJsPlayer } from 'video.js';
import { getVideoById, MediaList } from '../pages/api/api';

interface UseVideoProps {
	id: string;
}

export const useVideo = ({ id }: UseVideoProps) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const playerRef = useRef<VideoJsPlayer | null>(null);
	const [videoData, setVideoData] = useState<MediaList>();

	const { isLoading, isError } = useQuery(['videoData', id], () => getVideoById(parseInt(id)), {
		onSuccess: (data) => {
			setVideoData(data);
		},
		onError: (err) => {
			console.error(err);
		}
	});

	useEffect(() => {
		if (!playerRef.current) {
			const videoElement = videoRef.current;

			if (!videoElement) return;

			if (videoData?.url) {
				playerRef.current = videojs(videoElement, {
					sources: [{ src: videoData?.url }],
					autoplay: false,
					controls: false,
					responsive: true,
					fluid: true
				});
			} else {
				alert('Sorry, there is no video');
			}
		}
	}, [videoRef, videoData]);

	useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	const handlePlayPause = () => {
		const player = playerRef?.current;

		if (player?.paused()) {
			player?.play();
		} else {
			player?.pause();
		}
	};

	return {
		videoRef,
		playerRef,
		videoData,
		isLoading,
		isError,
		handlePlayPause
	};
};