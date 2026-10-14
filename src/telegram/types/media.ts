import type { InputFile } from '../../client/input-file.ts';
import type { DiceEmoji, ParseMode, PollType } from '../enums.ts';
import type { Chat, User } from './chat.ts';
import type { MessageEntity } from './message.ts';
import type { Sticker } from './sticker.ts';

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface PhotoSize {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Photo width */
	width: number;
	/** Photo height */
	height: number;
	/** File size in bytes */
	fileSize?: number;
}

/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export interface Animation {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Video width as defined by the sender */
	width: number;
	/** Video height as defined by the sender */
	height: number;
	/** Duration of the video in seconds as defined by the sender */
	duration: number;
	/** Animation thumbnail as defined by the sender */
	thumbnail?: PhotoSize;
	/** Original animation filename as defined by the sender */
	fileName?: string;
	/** MIME type of the file as defined by the sender */
	mimeType?: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
}

/** This object represents an audio file to be treated as music by the Telegram clients. */
export interface Audio {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Duration of the audio in seconds as defined by the sender */
	duration: number;
	/** Performer of the audio as defined by the sender or by audio tags */
	performer?: string;
	/** Title of the audio as defined by the sender or by audio tags */
	title?: string;
	/** Original filename as defined by the sender */
	fileName?: string;
	/** MIME type of the file as defined by the sender */
	mimeType?: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
	/** Thumbnail of the album cover to which the music file belongs */
	thumbnail?: PhotoSize;
}

/** This object represents a general file (as opposed to photos, voice messages and audio files). */
export interface Document {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Document thumbnail as defined by the sender */
	thumbnail?: PhotoSize;
	/** Original filename as defined by the sender */
	fileName?: string;
	/** MIME type of the file as defined by the sender */
	mimeType?: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
}

/** This object represents a live photo. */
export interface LivePhoto {
	/** Available sizes of the corresponding static photo */
	photo?: PhotoSize[];
	/** Identifier for the video file which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for the video file which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Video width as defined by the sender */
	width: number;
	/** Video height as defined by the sender */
	height: number;
	/** Duration of the video in seconds as defined by the sender */
	duration: number;
	/** MIME type of the file as defined by the sender */
	mimeType?: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
}

/** This object represents a video file of a specific quality. */
export interface VideoQuality {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Video width */
	width: number;
	/** Video height */
	height: number;
	/** Codec that was used to encode the video, for example, “h264”, “h265”, or “av01” */
	codec: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
}

/** This object represents a video file. */
export interface Video {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Video width as defined by the sender */
	width: number;
	/** Video height as defined by the sender */
	height: number;
	/** Duration of the video in seconds as defined by the sender */
	duration: number;
	/** Video thumbnail */
	thumbnail?: PhotoSize;
	/** Available sizes of the cover of the video in the message */
	cover?: PhotoSize[];
	/** Timestamp in seconds from which the video will play in the message */
	startTimestamp?: number;
	/** List of available qualities of the video */
	qualities?: VideoQuality[];
	/** Original filename as defined by the sender */
	fileName?: string;
	/** MIME type of the file as defined by the sender */
	mimeType?: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
}

/** This object represents a video message. */
export interface VideoNote {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Video width and height (diameter of the video message) as defined by the sender */
	length: number;
	/** Duration of the video in seconds as defined by the sender */
	duration: number;
	/** Video thumbnail */
	thumbnail?: PhotoSize;
	/** File size in bytes */
	fileSize?: number;
}

/** This object represents a voice note. */
export interface Voice {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** Duration of the audio in seconds as defined by the sender */
	duration: number;
	/** MIME type of the file as defined by the sender */
	mimeType?: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
}

/** Describes the paid media added to a message. */
export interface PaidMediaInfo {
	/** The number of Telegram Stars that must be paid to buy access to the media */
	starCount: number;
	/** Information about the paid media */
	paidMedia: PaidMedia[];
}

/** This object describes paid media. Currently, it can be one of */
export type PaidMedia =
	PaidMediaLivePhoto | PaidMediaPhoto | PaidMediaPreview | PaidMediaVideo;

/** The paid media is a live photo. */
export interface PaidMediaLivePhoto {
	/** Type of the paid media, always “live_photo” */
	type: 'live_photo';
	/** The photo */
	livePhoto: LivePhoto;
}

/** The paid media is a photo. */
export interface PaidMediaPhoto {
	/** Type of the paid media, always “photo” */
	type: 'photo';
	/** The photo */
	photo: PhotoSize[];
}

/** The paid media isn't available before the payment. */
export interface PaidMediaPreview {
	/** Type of the paid media, always “preview” */
	type: 'preview';
	/** Media width as defined by the sender */
	width?: number;
	/** Media height as defined by the sender */
	height?: number;
	/** Duration of the media in seconds as defined by the sender */
	duration?: number;
}

/** The paid media is a video. */
export interface PaidMediaVideo {
	/** Type of the paid media, always “video” */
	type: 'video';
	/** The video */
	video: Video;
}

/** This object represents a phone contact. */
export interface Contact {
	/** Contact's phone number */
	phoneNumber: string;
	/** Contact's first name */
	firstName: string;
	/** Contact's last name */
	lastName?: string;
	/** Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
	userId?: number;
	/** Additional data about the contact in the form of a vCard */
	vcard?: string;
}

/** This object represents an animated emoji that displays a random value. */
export interface Dice {
	/** Emoji on which the dice throw animation is based */
	emoji: DiceEmoji;
	/** Value of the dice, 1-6 for “🎲”, “🎯” and “🎳” base emoji, 1-5 for “🏀” and “⚽” base emoji, 1-64 for “🎰” base emoji */
	value: number;
}

/** Represents an HTTP link. */
export interface Link {
	/** URL of the link */
	url: string;
}

/** At most one of the optional fields can be present in any given object. */
export interface PollMedia {
	/** Media is an animation, information about the animation */
	animation?: Animation;
	/** Media is an audio file, information about the file; currently, can't be received in a poll option */
	audio?: Audio;
	/** Media is a general file, information about the file; currently, can't be received in a poll option */
	document?: Document;
	/** The HTTP link attached to the poll option */
	link?: Link;
	/** Media is a live photo, information about the live photo */
	livePhoto?: LivePhoto;
	/** Media is a shared location, information about the location */
	location?: Location;
	/** Media is a photo, available sizes of the photo */
	photo?: PhotoSize[];
	/** Media is a sticker, information about the sticker; currently, for poll options only */
	sticker?: Sticker;
	/** Media is a venue, information about the venue */
	venue?: Venue;
	/** Media is a video, information about the video */
	video?: Video;
}

/** This object represents the content of a poll description or a quiz explanation to be sent. It should be one of */
export type InputPollMedia =
	| InputMediaAnimation
	| InputMediaAudio
	| InputMediaDocument
	| InputMediaLivePhoto
	| InputMediaLocation
	| InputMediaPhoto
	| InputMediaVenue
	| InputMediaVideo;

/** This object represents the content of a poll option to be sent. It should be one of */
export type InputPollOptionMedia =
	| InputMediaAnimation
	| InputMediaLink
	| InputMediaLivePhoto
	| InputMediaLocation
	| InputMediaPhoto
	| InputMediaSticker
	| InputMediaVenue
	| InputMediaVideo;

/** This object contains information about one answer option in a poll. */
export interface PollOption {
	/** Unique identifier of the option, persistent on option addition and deletion */
	persistentId: string;
	/** Option text, 1-100 characters */
	text: string;
	/** Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts */
	textEntities?: MessageEntity[];
	/** Media added to the poll option */
	media?: PollMedia;
	/** Number of users who voted for this option; may be 0 if unknown */
	voterCount: number;
	/** User who added the option; omitted if the option wasn't added by a user after poll creation */
	addedByUser?: User;
	/** Chat that added the option; omitted if the option wasn't added by a chat after poll creation */
	addedByChat?: Chat;
	/** Point in time (Unix timestamp) when the option was added; omitted if the option existed in the original poll */
	additionDate?: number;
}

/** This object contains information about one answer option in a poll to be sent. */
export interface InputPollOption {
	/** Option text, 1-100 characters */
	text: string;
	/** Mode for parsing entities in the text. See formatting options for more details. Currently, only custom emoji entities are allowed. */
	textParseMode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the poll option text. It can be specified instead of textParseMode. */
	textEntities?: MessageEntity[];
	/** Media added to the poll option */
	media?: InputPollOptionMedia;
}

/** This object represents an answer of a user in a non-anonymous poll. */
export interface PollAnswer {
	/** Unique poll identifier */
	pollId: string;
	/** The chat that changed the answer to the poll, if the voter is anonymous */
	voterChat?: Chat;
	/** The user that changed the answer to the poll, if the voter isn't anonymous */
	user?: User;
	/** 0-based identifiers of chosen answer options. May be empty if the vote was retracted. */
	optionIds: number[];
	/** Persistent identifiers of the chosen answer options. May be empty if the vote was retracted. */
	optionPersistentIds: string[];
}

/** This object contains information about a poll. */
export interface Poll {
	/** Unique poll identifier */
	id: string;
	/** Poll question, 1-300 characters */
	question: string;
	/** Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions */
	questionEntities?: MessageEntity[];
	/** List of poll options */
	options: PollOption[];
	/** Total number of users that voted in the poll */
	totalVoterCount: number;
	/** True, if the poll is closed */
	isClosed: boolean;
	/** True, if the poll is anonymous */
	isAnonymous: boolean;
	/** Poll type, currently can be “regular” or “quiz” */
	type: PollType;
	/** True, if the poll allows multiple answers */
	allowsMultipleAnswers: boolean;
	/** True, if the poll allows to change the chosen answer options */
	allowsRevoting: boolean;
	/** True if voting is limited to users who have been members of the chat where the poll was originally sent for more than 24 hours */
	membersOnly: boolean;
	/** A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which users can vote in the poll. The country code “FT” is used for users with anonymous numbers. If omitted, then users from any country can participate in the poll. */
	countryCodes?: string[];
	/** Array of 0-based identifiers of the correct answer options. Available only for polls in quiz mode which are closed or were sent (not forwarded) by the bot or to the private chat with the bot. */
	correctOptionIds?: number[];
	/** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
	explanation?: string;
	/** Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
	explanationEntities?: MessageEntity[];
	/** Media added to the quiz explanation */
	explanationMedia?: PollMedia;
	/** Amount of time in seconds the poll will be active after creation */
	openPeriod?: number;
	/** Point in time (Unix timestamp) when the poll will be automatically closed */
	closeDate?: number;
	/** Description of the poll; for polls inside the Message object only */
	description?: string;
	/** Special entities like usernames, URLs, bot commands, etc. that appear in the description */
	descriptionEntities?: MessageEntity[];
	/** Media added to the poll description; for polls inside the Message object only */
	media?: PollMedia;
}

/** Describes a task in a checklist. */
export interface ChecklistTask {
	/** Unique identifier of the task */
	id: number;
	/** Text of the task */
	text: string;
	/** Special entities that appear in the task text */
	textEntities?: MessageEntity[];
	/** User that completed the task; omitted if the task wasn't completed by a user */
	completedByUser?: User;
	/** Chat that completed the task; omitted if the task wasn't completed by a chat */
	completedByChat?: Chat;
	/** Point in time (Unix timestamp) when the task was completed; 0 if the task wasn't completed */
	completionDate?: number;
}

/** Describes a checklist. */
export interface Checklist {
	/** Title of the checklist */
	title: string;
	/** Special entities that appear in the checklist title */
	titleEntities?: MessageEntity[];
	/** List of tasks in the checklist */
	tasks: ChecklistTask[];
	/** True, if users other than the creator of the list can add tasks to the list */
	othersCanAddTasks?: true;
	/** True, if users other than the creator of the list can mark tasks as done or not done */
	othersCanMarkTasksAsDone?: true;
}

/** Describes a task to add to a checklist. */
export interface InputChecklistTask {
	/** Unique identifier of the task; must be positive and unique among all task identifiers currently present in the checklist */
	id: number;
	/** Text of the task; 1-100 characters after entities parsing */
	text: string;
	/** Mode for parsing entities in the text. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the text, which can be specified instead of parseMode. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are allowed. */
	textEntities?: MessageEntity[];
}

/** Describes a checklist to create. */
export interface InputChecklist {
	/** Title of the checklist; 1-255 characters after entities parsing */
	title: string;
	/** Mode for parsing entities in the title. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the title, which can be specified instead of parseMode. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are allowed. */
	titleEntities?: MessageEntity[];
	/** List of 1-30 tasks in the checklist */
	tasks: InputChecklistTask[];
	/** Pass True if other users can add tasks to the checklist */
	othersCanAddTasks?: boolean;
	/** Pass True if other users can mark tasks as done or not done in the checklist */
	othersCanMarkTasksAsDone?: boolean;
}

/** This object represents a point on the map. */
export interface Location {
	/** Latitude as defined by the sender */
	latitude: number;
	/** Longitude as defined by the sender */
	longitude: number;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontalAccuracy?: number;
	/** Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only. */
	livePeriod?: number;
	/** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
	heading?: number;
	/** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
	proximityAlertRadius?: number;
}

/** This object represents a venue. */
export interface Venue {
	/** Venue location. Can't be a live location. */
	location: Location;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Foursquare identifier of the venue */
	foursquareId?: string;
	/** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquareType?: string;
	/** Google Places identifier of the venue */
	googlePlaceId?: string;
	/** Google Places type of the venue. (See supported types.) */
	googlePlaceType?: string;
}

/** This object represent a user's profile pictures. */
export interface UserProfilePhotos {
	/** Total number of profile pictures the target user has */
	totalCount: number;
	/** Requested profile pictures (in up to 4 sizes each) */
	photos: PhotoSize[][];
}

/** This object represents the audios displayed on a user's profile. */
export interface UserProfileAudios {
	/** Total number of profile audios for the target user */
	totalCount: number;
	/** Requested profile audios */
	audios: Audio[];
}

/** This object represents a file ready to be downloaded. The file can be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile. The maximum file size to download is 20 MB */
export interface File {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	fileUniqueId: string;
	/** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	fileSize?: number;
	/** File path. Use `https://api.telegram.org/file/bot<token>/<file_path>` to get the file. */
	filePath?: string;
}

/** This object represents the content of a media message to be sent. It should be one of */
export type InputMedia =
	| InputMediaAnimation
	| InputMediaAudio
	| InputMediaDocument
	| InputMediaLivePhoto
	| InputMediaPhoto
	| InputMediaVideo;

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export interface InputMediaAnimation {
	/** Type of the media, must be animation */
	type: 'animation';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Caption of the animation to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the animation caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	showCaptionAboveMedia?: boolean;
	/** Animation width */
	width?: number;
	/** Animation height */
	height?: number;
	/** Animation duration in seconds */
	duration?: number;
	/** Pass True if the animation needs to be covered with a spoiler animation */
	hasSpoiler?: boolean;
}

/** Represents an audio file to be treated as music to be sent. */
export interface InputMediaAudio {
	/** Type of the media, must be audio */
	type: 'audio';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Caption of the audio to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the audio caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Duration of the audio in seconds */
	duration?: number;
	/** Performer of the audio */
	performer?: string;
	/** Title of the audio */
	title?: string;
}

/** Represents a general file to be sent. */
export interface InputMediaDocument {
	/** Type of the media, must be document */
	type: 'document';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the document caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always True, if the document is sent as part of an album. */
	disableContentTypeDetection?: boolean;
}

/** Represents an HTTP link to be sent. */
export interface InputMediaLink {
	/** Type of the media, must be link */
	type: 'link';
	/** HTTP URL of the link */
	url: string;
}

/** Represents a live photo to be sent. */
export interface InputMediaLivePhoto {
	/** Type of the media, must be live_photo */
	type: 'live_photo';
	/** Video of the live photo to send. Pass a fileId to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
	media: InputFile | string;
	/** The static photo to send. Pass a fileId to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
	photo: InputFile | string;
	/** Caption of the live photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the live photo caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	showCaptionAboveMedia?: boolean;
	/** Pass True if the live photo needs to be covered with a spoiler animation */
	hasSpoiler?: boolean;
}

/** Represents a location to be sent. */
export interface InputMediaLocation {
	/** Type of the media, must be location */
	type: 'location';
	/** Latitude of the location */
	latitude: number;
	/** Longitude of the location */
	longitude: number;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontalAccuracy?: number;
}

/** Represents a photo to be sent. */
export interface InputMediaPhoto {
	/** Type of the media, must be photo */
	type: 'photo';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the photo caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	showCaptionAboveMedia?: boolean;
	/** Pass True if the photo needs to be covered with a spoiler animation */
	hasSpoiler?: boolean;
}

/** Represents a sticker file to be sent. */
export interface InputMediaSticker {
	/** Type of the media, must be sticker */
	type: 'sticker';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a .WEBP sticker from the Internet, or pass “attach://<file_attach_name>” to upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Emoji associated with the sticker; only for just uploaded stickers */
	emoji?: string;
}

/** Represents a venue to be sent. */
export interface InputMediaVenue {
	/** Type of the media, must be venue */
	type: 'venue';
	/** Latitude of the location */
	latitude: number;
	/** Longitude of the location */
	longitude: number;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Foursquare identifier of the venue */
	foursquareId?: string;
	/** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquareType?: string;
	/** Google Places identifier of the venue */
	googlePlaceId?: string;
	/** Google Places type of the venue. (See supported types.) */
	googlePlaceType?: string;
}

/** Represents a video to be sent. */
export interface InputMediaVideo {
	/** Type of the media, must be video */
	type: 'video';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Cover for the video in the message. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	cover?: InputFile | string;
	/** Start timestamp for the video in the message */
	startTimestamp?: number;
	/** Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the video caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	showCaptionAboveMedia?: boolean;
	/** Video width */
	width?: number;
	/** Video height */
	height?: number;
	/** Video duration in seconds */
	duration?: number;
	/** Pass True if the uploaded video is suitable for streaming */
	supportsStreaming?: boolean;
	/** Pass True if the video needs to be covered with a spoiler animation */
	hasSpoiler?: boolean;
}

/** Represents a voice message file to be sent. */
export interface InputMediaVoiceNote {
	/** Type of the media, must be voice_note */
	type: 'voice_note';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Caption of the voice message to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the voice message caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Duration of the voice message in seconds */
	duration?: number;
}

/** This object describes the paid media to be sent. Currently, it can be one of */
export type InputPaidMedia =
	InputPaidMediaLivePhoto | InputPaidMediaPhoto | InputPaidMediaVideo;

/** The paid media to send is a live photo. */
export interface InputPaidMediaLivePhoto {
	/** Type of the media, must be live_photo */
	type: 'live_photo';
	/** Video of the live photo to send. Pass a fileId to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
	media: InputFile | string;
	/** The static photo to send. Pass a fileId to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
	photo: InputFile | string;
}

/** The paid media to send is a photo. */
export interface InputPaidMediaPhoto {
	/** Type of the media, must be photo */
	type: 'photo';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
}

/** The paid media to send is a video. */
export interface InputPaidMediaVideo {
	/** Type of the media, must be video */
	type: 'video';
	/** File to send. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	media: InputFile | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Cover for the video in the message. Pass a fileId to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	cover?: InputFile | string;
	/** Start timestamp for the video in the message */
	startTimestamp?: number;
	/** Video width */
	width?: number;
	/** Video height */
	height?: number;
	/** Video duration in seconds */
	duration?: number;
	/** Pass True if the uploaded video is suitable for streaming */
	supportsStreaming?: boolean;
}

/** This object describes a profile photo to set. Currently, it can be one of */
export type InputProfilePhoto =
	InputProfilePhotoStatic | InputProfilePhotoAnimated;

/** A static profile photo in the .JPG format. */
export interface InputProfilePhotoStatic {
	/** Type of the profile photo, must be static */
	type: 'static';
	/** The static profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	photo: InputFile | string;
}

/** An animated profile photo in the MPEG4 format. */
export interface InputProfilePhotoAnimated {
	/** Type of the profile photo, must be animated */
	type: 'animated';
	/** The animated profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	animation: InputFile | string;
	/** Timestamp in seconds of the frame that will be used as the static profile photo. Defaults to 0.0. */
	mainFrameTimestamp?: number;
}
