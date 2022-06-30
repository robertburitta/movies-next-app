import React, { useRef, useEffect } from 'react';
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const playerRef = useRef<VideoJsPlayer | null>(null);
	// const { options, onReady } = props;

	useEffect(() => {

		// Make sure Video.js player is only initialized once
		if (!playerRef.current) {
			const videoElement = videoRef.current;

			if (!videoElement) return;


			const player = playerRef.current = videojs(videoElement, {
				autoplay: true,
				controls: false,
				responsive: true,
				fluid: true,
				sources: [{
					src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					// type: 'video/mp4'
				}]
			}, () => {
				videojs.log('player is ready');
				// onReady && onReady(player);
			});

			// You could update an existing player in the `else` block here
			// on prop change, for example:
		} else {
			// const player = playerRef.current;

			// player.autoplay(options.autoplay);
			// player.src(options.sources);
		}
	}, [videoRef]);


	const handlePlay = () => {
		playerRef?.current?.play();
	};

	// Dispose the Video.js player when the functional component unmounts
	useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	return (
		<div data-vjs-player>
			<video ref={videoRef} className='video-js vjs-big-play-centered' />
		</div>
	);
};

export default VideoJS;