import type { InputFile } from '../../client/input-file.ts';
import type { Chat } from './chat.ts';
import type { ReactionType } from './message.ts';

/** This object represents a story. */
export interface Story {
	/** Chat that posted the story */
	chat: Chat;
	/** Unique identifier for the story in the chat */
	id: number;
}

/** Describes the position of a clickable area within a story. */
export interface StoryAreaPosition {
	/** The abscissa of the area's center, as a percentage of the media width */
	xPercentage: number;
	/** The ordinate of the area's center, as a percentage of the media height */
	yPercentage: number;
	/** The width of the area's rectangle, as a percentage of the media width */
	widthPercentage: number;
	/** The height of the area's rectangle, as a percentage of the media height */
	heightPercentage: number;
	/** The clockwise rotation angle of the rectangle, in degrees; 0-360 */
	rotationAngle: number;
	/** The radius of the rectangle corner rounding, as a percentage of the media width */
	cornerRadiusPercentage: number;
}

/** Describes the physical address of a location. */
export interface LocationAddress {
	/** The two-letter ISO 3166-1 alpha-2 country code of the country where the location is located */
	countryCode: string;
	/** State of the location */
	state?: string;
	/** City of the location */
	city?: string;
	/** Street address of the location */
	street?: string;
}

/** Describes the type of a clickable area on a story. Currently, it can be one of */
export type StoryAreaType =
	| StoryAreaTypeLocation
	| StoryAreaTypeSuggestedReaction
	| StoryAreaTypeLink
	| StoryAreaTypeWeather
	| StoryAreaTypeUniqueGift;

/** Describes a story area pointing to a location. Currently, a story can have up to 10 location areas. */
export interface StoryAreaTypeLocation {
	/** Type of the area, always “location” */
	type: 'location';
	/** Location latitude in degrees */
	latitude: number;
	/** Location longitude in degrees */
	longitude: number;
	/** Address of the location */
	address?: LocationAddress;
}

/** Describes a story area pointing to a suggested reaction. Currently, a story can have up to 5 suggested reaction areas. */
export interface StoryAreaTypeSuggestedReaction {
	/** Type of the area, always “suggested_reaction” */
	type: 'suggested_reaction';
	/** Type of the reaction */
	reactionType: ReactionType;
	/** Pass True if the reaction area has a dark background */
	isDark?: boolean;
	/** Pass True if reaction area corner is flipped */
	isFlipped?: boolean;
}

/** Describes a story area pointing to an HTTP or tg:// link. Currently, a story can have up to 3 link areas. */
export interface StoryAreaTypeLink {
	/** Type of the area, always “link” */
	type: 'link';
	/** HTTP or tg:// URL to be opened when the area is clicked */
	url: string;
}

/** Describes a story area containing weather information. Currently, a story can have up to 3 weather areas. */
export interface StoryAreaTypeWeather {
	/** Type of the area, always “weather” */
	type: 'weather';
	/** Temperature, in degree Celsius */
	temperature: number;
	/** Emoji representing the weather */
	emoji: string;
	/** A color of the area background in the ARGB format */
	backgroundColor: number;
}

/** Describes a story area pointing to a unique gift. Currently, a story can have at most 1 unique gift area. */
export interface StoryAreaTypeUniqueGift {
	/** Type of the area, always “unique_gift” */
	type: 'unique_gift';
	/** Unique name of the gift */
	name: string;
}

/** Describes a clickable area on a story media. */
export interface StoryArea {
	/** Position of the area */
	position: StoryAreaPosition;
	/** Type of the area */
	type: StoryAreaType;
}

/** This object describes the content of a story to post. Currently, it can be one of */
export type InputStoryContent = InputStoryContentPhoto | InputStoryContentVideo;

/** Describes a photo to post as a story. */
export interface InputStoryContentPhoto {
	/** Type of the content, must be photo */
	type: 'photo';
	/** The photo to post as a story. The photo must be of the size 1080x1920 and must not exceed 10 MB. The photo can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	photo: InputFile | string;
}

/** Describes a video to post as a story. */
export interface InputStoryContentVideo {
	/** Type of the content, must be video */
	type: 'video';
	/** The video to post as a story. The video must be of the size 720x1280, streamable, encoded with H.265 codec, with key frames added each second in the MPEG4 format, and must not exceed 30 MB. The video can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the video was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	video: InputFile | string;
	/** Precise duration of the video in seconds; 0-60 */
	duration?: number;
	/** Timestamp in seconds of the frame that will be used as the static cover for the story. Defaults to 0.0. */
	coverFrameTimestamp?: number;
	/** Pass True if the video has no sound */
	isAnimation?: boolean;
}
