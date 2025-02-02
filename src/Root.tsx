import { Composition, staticFile } from 'remotion';
import { AudioGramSchema, AudiogramComposition } from './Composition';
import './style.css';
import { getAudioDurationInSeconds } from '@remotion/media-utils';

const fps = 30;
const durationInFrames = 29.5 * fps;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Audiogram"
				component={AudiogramComposition}
				durationInFrames={durationInFrames}
				fps={fps}
				width={1080}
				height={1080}
				schema={AudioGramSchema}
				defaultProps={{
					// Audio settings
					audioOffsetInFrames: 207,

					// Title settings
					audioFileName: staticFile('audio.mp3'),
					coverImgFileName: staticFile('cover.jpg'),
					titleText:
						'#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm',
					titleColor: 'rgba(186, 186, 186, 0.93)',

					// Subtitles settings
					subtitlesFileName: staticFile('subtitles.srt'),
					onlyDisplayCurrentSentence: true,
					subtitlesTextColor: 'rgba(255, 255, 255, 0.93)',
					subtitlesLinePerPage: 4,
					subtitlesZoomMeasurerSize: 10,
					subtitlesLineHeight: 98,

					// Wave settings
					waveColor: '#a3a5ae',
					waveFreqRangeStartIndex: 7,
					waveLinesToDisplay: 29,
					waveNumberOfSamples: '256', // This is string for Remotion controls and will be converted to a number
					mirrorWave: true,
				}}
				// Determine the lengt of the video based on the duration of the audio file
				calculateMetadata={async ({ props }) => {
					const audioDurationInSec = Math.ceil(
						await getAudioDurationInSeconds(props.audioFileName)
					);

					return {
						durationInFrames: audioDurationInSec * fps,
						props,
					};
				}}
			/>
		</>
	);
};
