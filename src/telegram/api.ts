import { TelegramApi, type ApiOptions, type CallArgs } from '../client/api.ts';
import type { ChatAction, StickerFormat } from './enums.ts';
import type { BotCommand } from './types/bot.ts';
import type { ChatPermissions } from './types/chat.ts';
import type { ChatId } from './types/common.ts';
import type { AcceptedGiftTypes } from './types/gift.ts';
import type { InlineQueryResult } from './types/inline.ts';
import type { KeyboardButton } from './types/markup.ts';
import type {
	InputChecklist,
	InputMedia,
	InputMediaAudio,
	InputMediaDocument,
	InputMediaLivePhoto,
	InputMediaPhoto,
	InputMediaVideo,
	InputPaidMedia,
	InputPollOption,
	InputProfilePhoto,
} from './types/media.ts';
import type { PassportElementError } from './types/passport.ts';
import type { LabeledPrice } from './types/payment.ts';
import type { InputRichMessage } from './types/rich.ts';
import type { InputSticker } from './types/sticker.ts';
import type { InputStoryContent } from './types/story.ts';
import type { InputFile } from '../client/input-file.ts';
import type { ApiMethod, ParamsOf, ResultOf } from './index.ts';

type Options<M extends ApiMethod, K extends keyof ParamsOf<M> = never> = Omit<
	ParamsOf<M>,
	K
>;

/** Typed wrappers for every Bot API method: required parameters are positional, the rest go into `options`. */
export class BotApi {
	protected readonly api: TelegramApi;

	constructor(token: string, options: ApiOptions = {}) {
		this.api = new TelegramApi(token, options);
	}

	/** Calls any Bot API method with raw parameters. */
	call<M extends ApiMethod>(
		method: M,
		...args: CallArgs<M>
	): Promise<ResultOf<M>> {
		return this.api.call(method, ...args);
	}

	/** Use this method to receive incoming updates using long polling. Returns an Array of Update objects. Prefer `startPolling()`, which calls this method in a loop and dispatches updates to listeners. */
	getUpdates(options?: ParamsOf<'getUpdates'>) {
		return this.call('getUpdates', options);
	}

	/**
	 * Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request (a request with response HTTP status code different from `2XY`), we will repeat the request and give up after a reasonable amount of attempts. Returns True on success. If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secretToken. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
	 *
	 * @param url HTTPS URL to send updates to. Use an empty string to remove webhook integration.
	 */
	setWebhook(url: string, options?: Options<'setWebhook', 'url'>) {
		return this.call('setWebhook', { url, ...options });
	}

	/** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
	deleteWebhook(options?: ParamsOf<'deleteWebhook'>) {
		return this.call('deleteWebhook', options);
	}

	/** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
	getWebhookInfo() {
		return this.call('getWebhookInfo');
	}

	/** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
	getMe() {
		return this.call('getMe');
	}

	/** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
	logOut() {
		return this.call('logOut');
	}

	/** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
	close() {
		return this.call('close');
	}

	/**
	 * Use this method to send text messages. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param text Text of the message to be sent, 1-4096 characters after entities parsing
	 */
	sendMessage(
		chatId: ChatId,
		text: string,
		options?: Options<'sendMessage', 'chatId' | 'text'>,
	) {
		return this.call('sendMessage', { chatId, text, ...options });
	}

	/**
	 * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param fromChatId Unique identifier for the chat where the original message was sent (or username of the target bot, supergroup or channel in the format `@username`)
	 * @param messageId Message identifier in the chat specified in fromChatId
	 */
	forwardMessage(
		chatId: ChatId,
		fromChatId: ChatId,
		messageId: number,
		options?: Options<
			'forwardMessage',
			'chatId' | 'fromChatId' | 'messageId'
		>,
	) {
		return this.call('forwardMessage', {
			chatId,
			fromChatId,
			messageId,
			...options,
		});
	}

	/**
	 * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an Array of MessageId of the sent messages is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param fromChatId Unique identifier for the chat where the original messages were sent (or username of the target bot, supergroup or channel in the format `@username`)
	 * @param messageIds A JSON-serialized list of 1-100 identifiers of messages in the chat fromChatId to forward. The identifiers must be specified in a strictly increasing order.
	 */
	forwardMessages(
		chatId: ChatId,
		fromChatId: ChatId,
		messageIds: number[],
		options?: Options<
			'forwardMessages',
			'chatId' | 'fromChatId' | 'messageIds'
		>,
	) {
		return this.call('forwardMessages', {
			chatId,
			fromChatId,
			messageIds,
			...options,
		});
	}

	/**
	 * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correctOptionIds is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param fromChatId Unique identifier for the chat where the original message was sent (or username of the target bot, supergroup or channel in the format `@username`)
	 * @param messageId Message identifier in the chat specified in fromChatId
	 */
	copyMessage(
		chatId: ChatId,
		fromChatId: ChatId,
		messageId: number,
		options?: Options<'copyMessage', 'chatId' | 'fromChatId' | 'messageId'>,
	) {
		return this.call('copyMessage', {
			chatId,
			fromChatId,
			messageId,
			...options,
		});
	}

	/**
	 * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correctOptionIds is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an Array of MessageId of the sent messages is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param fromChatId Unique identifier for the chat where the original messages were sent (or username of the target bot, supergroup or channel in the format `@username`)
	 * @param messageIds A JSON-serialized list of 1-100 identifiers of messages in the chat fromChatId to copy. The identifiers must be specified in a strictly increasing order.
	 */
	copyMessages(
		chatId: ChatId,
		fromChatId: ChatId,
		messageIds: number[],
		options?: Options<
			'copyMessages',
			'chatId' | 'fromChatId' | 'messageIds'
		>,
	) {
		return this.call('copyMessages', {
			chatId,
			fromChatId,
			messageIds,
			...options,
		});
	}

	/**
	 * Use this method to send photos. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param photo Photo to send. Pass a fileId as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More information on Sending Files »
	 */
	sendPhoto(
		chatId: ChatId,
		photo: InputFile | string,
		options?: Options<'sendPhoto', 'chatId' | 'photo'>,
	) {
		return this.call('sendPhoto', { chatId, photo, ...options });
	}

	/**
	 * Use this method to send live photos. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
	 * @param livePhoto Live photo video to send. The video must be no longer than 10 seconds and must not exceed 10 MB in size. Pass a fileId as String to send a video that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending live photos by a URL is currently unsupported.
	 * @param photo The static photo to send. Pass a fileId as String to send a photo that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending live photos by a URL is currently unsupported.
	 */
	sendLivePhoto(
		chatId: ChatId,
		livePhoto: InputFile | string,
		photo: InputFile | string,
		options?: Options<'sendLivePhoto', 'chatId' | 'livePhoto' | 'photo'>,
	) {
		return this.call('sendLivePhoto', {
			chatId,
			livePhoto,
			photo,
			...options,
		});
	}

	/**
	 * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future. For sending voice messages, use the sendVoice method instead.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param audio Audio file to send. Pass a fileId as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files »
	 */
	sendAudio(
		chatId: ChatId,
		audio: InputFile | string,
		options?: Options<'sendAudio', 'chatId' | 'audio'>,
	) {
		return this.call('sendAudio', { chatId, audio, ...options });
	}

	/**
	 * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param document File to send. Pass a fileId as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files »
	 */
	sendDocument(
		chatId: ChatId,
		document: InputFile | string,
		options?: Options<'sendDocument', 'chatId' | 'document'>,
	) {
		return this.call('sendDocument', { chatId, document, ...options });
	}

	/**
	 * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param video Video to send. Pass a fileId as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. More information on Sending Files »
	 */
	sendVideo(
		chatId: ChatId,
		video: InputFile | string,
		options?: Options<'sendVideo', 'chatId' | 'video'>,
	) {
		return this.call('sendVideo', { chatId, video, ...options });
	}

	/**
	 * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param animation Animation to send. Pass a fileId as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. More information on Sending Files »
	 */
	sendAnimation(
		chatId: ChatId,
		animation: InputFile | string,
		options?: Options<'sendAnimation', 'chatId' | 'animation'>,
	) {
		return this.call('sendAnimation', { chatId, animation, ...options });
	}

	/**
	 * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param voice Audio file to send. Pass a fileId as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files »
	 */
	sendVoice(
		chatId: ChatId,
		voice: InputFile | string,
		options?: Options<'sendVoice', 'chatId' | 'voice'>,
	) {
		return this.call('sendVoice', { chatId, voice, ...options });
	}

	/**
	 * Use this method to send a rounded square MPEG4 video of up to 1 minute long. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param videoNote Video note to send. Pass a fileId as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending video notes by a URL is currently unsupported.
	 */
	sendVideoNote(
		chatId: ChatId,
		videoNote: InputFile | string,
		options?: Options<'sendVideoNote', 'chatId' | 'videoNote'>,
	) {
		return this.call('sendVideoNote', { chatId, videoNote, ...options });
	}

	/**
	 * Use this method to send paid media. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. If the chat is a channel, all Telegram Star proceeds from this media will be credited to the chat's balance. Otherwise, they will be credited to the bot's balance.
	 * @param starCount The number of Telegram Stars that must be paid to buy access to the media; 1-25000
	 * @param media A JSON-serialized Array describing the media to be sent; up to 10 items
	 */
	sendPaidMedia(
		chatId: ChatId,
		starCount: number,
		media: InputPaidMedia[],
		options?: Options<'sendPaidMedia', 'chatId' | 'starCount' | 'media'>,
	) {
		return this.call('sendPaidMedia', {
			chatId,
			starCount,
			media,
			...options,
		});
	}

	/**
	 * Use this method to send a group of photos, live photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an Array of Message objects that were sent is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param media A JSON-serialized Array describing messages to be sent, must include 2-10 items
	 */
	sendMediaGroup(
		chatId: ChatId,
		media: (
			| InputMediaAudio
			| InputMediaDocument
			| InputMediaLivePhoto
			| InputMediaPhoto
			| InputMediaVideo
		)[],
		options?: Options<'sendMediaGroup', 'chatId' | 'media'>,
	) {
		return this.call('sendMediaGroup', { chatId, media, ...options });
	}

	/**
	 * Use this method to send point on the map. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param latitude Latitude of the location
	 * @param longitude Longitude of the location
	 */
	sendLocation(
		chatId: ChatId,
		latitude: number,
		longitude: number,
		options?: Options<'sendLocation', 'chatId' | 'latitude' | 'longitude'>,
	) {
		return this.call('sendLocation', {
			chatId,
			latitude,
			longitude,
			...options,
		});
	}

	/**
	 * Use this method to send information about a venue. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param latitude Latitude of the venue
	 * @param longitude Longitude of the venue
	 * @param title Name of the venue
	 * @param address Address of the venue
	 */
	sendVenue(
		chatId: ChatId,
		latitude: number,
		longitude: number,
		title: string,
		address: string,
		options?: Options<
			'sendVenue',
			'chatId' | 'latitude' | 'longitude' | 'title' | 'address'
		>,
	) {
		return this.call('sendVenue', {
			chatId,
			latitude,
			longitude,
			title,
			address,
			...options,
		});
	}

	/**
	 * Use this method to send phone contacts. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param phoneNumber Contact's phone number
	 * @param firstName Contact's first name
	 */
	sendContact(
		chatId: ChatId,
		phoneNumber: string,
		firstName: string,
		options?: Options<
			'sendContact',
			'chatId' | 'phoneNumber' | 'firstName'
		>,
	) {
		return this.call('sendContact', {
			chatId,
			phoneNumber,
			firstName,
			...options,
		});
	}

	/**
	 * Use this method to send a native poll. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. Polls can't be sent to channel direct messages chats.
	 * @param question Poll question, 1-300 characters
	 * @param answers A JSON-serialized list of 1-12 answer options
	 */
	sendPoll(
		chatId: ChatId,
		question: string,
		answers: InputPollOption[],
		options?: Options<'sendPoll', 'chatId' | 'question' | 'options'>,
	) {
		return this.call('sendPoll', {
			chatId,
			question,
			options: answers,
			...options,
		});
	}

	/**
	 * Use this method to send a checklist on behalf of a connected business account. On success, the sent Message is returned.
	 *
	 * @param businessConnectionId Unique identifier of the business connection on behalf of which the message will be sent
	 * @param chatId Unique identifier for the target chat or username of the target bot in the format `@username`
	 * @param checklist A JSON-serialized object for the checklist to send
	 */
	sendChecklist(
		businessConnectionId: string,
		chatId: ChatId,
		checklist: InputChecklist,
		options?: Options<
			'sendChecklist',
			'businessConnectionId' | 'chatId' | 'checklist'
		>,
	) {
		return this.call('sendChecklist', {
			businessConnectionId,
			chatId,
			checklist,
			...options,
		});
	}

	/**
	 * Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 */
	sendDice(chatId: ChatId, options?: Options<'sendDice', 'chatId'>) {
		return this.call('sendDice', { chatId, ...options });
	}

	/**
	 * Use this method to stream a partial message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you must call sendMessage with the complete message to persist it in the user's chat. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target private chat
	 * @param draftId Unique identifier of the message draft; must be non-zero. Changes to drafts with the same identifier are animated. Otherwise, the draft is replaced without animation.
	 */
	sendMessageDraft(
		chatId: number,
		draftId: number,
		options?: Options<'sendMessageDraft', 'chatId' | 'draftId'>,
	) {
		return this.call('sendMessageDraft', { chatId, draftId, ...options });
	}

	/**
	 * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success. Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use sendChatAction with action = upload_photo. The user will see a “sending photo” status for the bot. We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot or supergroup in the format `@username`. Channel chats and channel direct messages chats aren't supported.
	 * @param action Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes.
	 */
	sendChatAction(
		chatId: ChatId,
		action: ChatAction,
		options?: Options<'sendChatAction', 'chatId' | 'action'>,
	) {
		return this.call('sendChatAction', { chatId, action, ...options });
	}

	/**
	 * Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. Bots can't use paid reactions. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param messageId Identifier of the target message. If the message belongs to a media group, the reaction is set to the first non-deleted message in the group instead.
	 */
	setMessageReaction(
		chatId: ChatId,
		messageId: number,
		options?: Options<'setMessageReaction', 'chatId' | 'messageId'>,
	) {
		return this.call('setMessageReaction', {
			chatId,
			messageId,
			...options,
		});
	}

	/**
	 * Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
	 *
	 * @param userId Unique identifier of the target user
	 */
	getUserProfilePhotos(
		userId: number,
		options?: Options<'getUserProfilePhotos', 'userId'>,
	) {
		return this.call('getUserProfilePhotos', { userId, ...options });
	}

	/**
	 * Use this method to get a list of profile audios for a user. Returns a UserProfileAudios object.
	 *
	 * @param userId Unique identifier of the target user
	 */
	getUserProfileAudios(
		userId: number,
		options?: Options<'getUserProfileAudios', 'userId'>,
	) {
		return this.call('getUserProfileAudios', { userId, ...options });
	}

	/**
	 * Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess. Returns True on success.
	 *
	 * @param userId Unique identifier of the target user
	 */
	setUserEmojiStatus(
		userId: number,
		options?: Options<'setUserEmojiStatus', 'userId'>,
	) {
		return this.call('setUserEmojiStatus', { userId, ...options });
	}

	/**
	 * Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`, where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
	 *
	 * @param fileId File identifier to get information about
	 */
	getFile(fileId: string) {
		return this.call('getFile', { fileId });
	}

	/**
	 * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target group or username of the target supergroup or channel in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	banChatMember(
		chatId: ChatId,
		userId: number,
		options?: Options<'banChatMember', 'chatId' | 'userId'>,
	) {
		return this.call('banChatMember', { chatId, userId, ...options });
	}

	/**
	 * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter onlyIfBanned. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target group or username of the target supergroup or channel in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	unbanChatMember(
		chatId: ChatId,
		userId: number,
		options?: Options<'unbanChatMember', 'chatId' | 'userId'>,
	) {
		return this.call('unbanChatMember', { chatId, userId, ...options });
	}

	/**
	 * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param userId Unique identifier of the target user
	 * @param permissions A JSON-serialized object for new user permissions
	 */
	restrictChatMember(
		chatId: ChatId,
		userId: number,
		permissions: ChatPermissions,
		options?: Options<
			'restrictChatMember',
			'chatId' | 'userId' | 'permissions'
		>,
	) {
		return this.call('restrictChatMember', {
			chatId,
			userId,
			permissions,
			...options,
		});
	}

	/**
	 * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	promoteChatMember(
		chatId: ChatId,
		userId: number,
		options?: Options<'promoteChatMember', 'chatId' | 'userId'>,
	) {
		return this.call('promoteChatMember', { chatId, userId, ...options });
	}

	/**
	 * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param userId Unique identifier of the target user
	 * @param customTitle New custom title for the administrator; 0-16 characters, emoji are not allowed
	 */
	setChatAdministratorCustomTitle(
		chatId: ChatId,
		userId: number,
		customTitle: string,
	) {
		return this.call('setChatAdministratorCustomTitle', {
			chatId,
			userId,
			customTitle,
		});
	}

	/**
	 * Use this method to set a tag for a regular member in a group or a supergroup. The bot must be an administrator in the chat for this to work and must have the canManageTags administrator right. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	setChatMemberTag(
		chatId: ChatId,
		userId: number,
		options?: Options<'setChatMemberTag', 'chatId' | 'userId'>,
	) {
		return this.call('setChatMemberTag', { chatId, userId, ...options });
	}

	/**
	 * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param senderChatId Unique identifier of the target sender chat
	 */
	banChatSenderChat(chatId: ChatId, senderChatId: number) {
		return this.call('banChatSenderChat', { chatId, senderChatId });
	}

	/**
	 * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param senderChatId Unique identifier of the target sender chat
	 */
	unbanChatSenderChat(chatId: ChatId, senderChatId: number) {
		return this.call('unbanChatSenderChat', { chatId, senderChatId });
	}

	/**
	 * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the canRestrictMembers administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param permissions A JSON-serialized object for new default chat permissions
	 */
	setChatPermissions(
		chatId: ChatId,
		permissions: ChatPermissions,
		options?: Options<'setChatPermissions', 'chatId' | 'permissions'>,
	) {
		return this.call('setChatPermissions', {
			chatId,
			permissions,
			...options,
		});
	}

	/**
	 * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 */
	exportChatInviteLink(chatId: ChatId) {
		return this.call('exportChatInviteLink', { chatId });
	}

	/**
	 * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 */
	createChatInviteLink(
		chatId: ChatId,
		options?: Options<'createChatInviteLink', 'chatId'>,
	) {
		return this.call('createChatInviteLink', { chatId, ...options });
	}

	/**
	 * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param inviteLink The invite link to edit
	 */
	editChatInviteLink(
		chatId: ChatId,
		inviteLink: string,
		options?: Options<'editChatInviteLink', 'chatId' | 'inviteLink'>,
	) {
		return this.call('editChatInviteLink', {
			chatId,
			inviteLink,
			...options,
		});
	}

	/**
	 * Use this method to create a subscription invite link for a channel chat. The bot must have the canInviteUsers administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink. Returns the new invite link as a ChatInviteLink object.
	 *
	 * @param chatId Unique identifier for the target channel chat or username of the target channel in the format `@username`
	 * @param subscriptionPeriod The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days).
	 * @param subscriptionPrice The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-10000
	 */
	createChatSubscriptionInviteLink(
		chatId: ChatId,
		subscriptionPeriod: number,
		subscriptionPrice: number,
		options?: Options<
			'createChatSubscriptionInviteLink',
			'chatId' | 'subscriptionPeriod' | 'subscriptionPrice'
		>,
	) {
		return this.call('createChatSubscriptionInviteLink', {
			chatId,
			subscriptionPeriod,
			subscriptionPrice,
			...options,
		});
	}

	/**
	 * Use this method to edit a subscription invite link created by the bot. The bot must have the canInviteUsers administrator rights. Returns the edited invite link as a ChatInviteLink object.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param inviteLink The invite link to edit
	 */
	editChatSubscriptionInviteLink(
		chatId: ChatId,
		inviteLink: string,
		options?: Options<
			'editChatSubscriptionInviteLink',
			'chatId' | 'inviteLink'
		>,
	) {
		return this.call('editChatSubscriptionInviteLink', {
			chatId,
			inviteLink,
			...options,
		});
	}

	/**
	 * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object.
	 *
	 * @param chatId Unique identifier of the target chat or username of the target channel in the format `@username`
	 * @param inviteLink The invite link to revoke
	 */
	revokeChatInviteLink(chatId: ChatId, inviteLink: string) {
		return this.call('revokeChatInviteLink', { chatId, inviteLink });
	}

	/**
	 * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the canInviteUsers administrator right. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	approveChatJoinRequest(chatId: ChatId, userId: number) {
		return this.call('approveChatJoinRequest', { chatId, userId });
	}

	/**
	 * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the canInviteUsers administrator right. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	declineChatJoinRequest(chatId: ChatId, userId: number) {
		return this.call('declineChatJoinRequest', { chatId, userId });
	}

	/**
	 * Use this method to process a received chat join request query. Returns True on success.
	 *
	 * @param chatJoinRequestQueryId Unique identifier of the join request query
	 * @param result Result of the query. Must be either “approve” to allow the user to join the chat, “decline” to disallow the user to join the chat, or “queue” to leave the decision to other administrators.
	 */
	answerChatJoinRequestQuery(
		chatJoinRequestQueryId: string,
		result: 'approve' | 'decline' | 'queue',
	) {
		return this.call('answerChatJoinRequestQuery', {
			chatJoinRequestQueryId,
			result,
		});
	}

	/**
	 * Use this method to process a received chat join request query by showing a Mini App to the user before deciding the outcome. Call answerChatJoinRequestQuery to resolve the join request query based on the user interaction with the Mini App. Returns True on success.
	 *
	 * @param chatJoinRequestQueryId Unique identifier of the join request query
	 * @param webAppUrl An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps
	 */
	sendChatJoinRequestWebApp(
		chatJoinRequestQueryId: string,
		webAppUrl: string,
	) {
		return this.call('sendChatJoinRequestWebApp', {
			chatJoinRequestQueryId,
			webAppUrl,
		});
	}

	/**
	 * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param photo New chat photo, uploaded using multipart/form-data
	 */
	setChatPhoto(chatId: ChatId, photo: InputFile) {
		return this.call('setChatPhoto', { chatId, photo });
	}

	/**
	 * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 */
	deleteChatPhoto(chatId: ChatId) {
		return this.call('deleteChatPhoto', { chatId });
	}

	/**
	 * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param title New chat title, 1-128 characters
	 */
	setChatTitle(chatId: ChatId, title: string) {
		return this.call('setChatTitle', { chatId, title });
	}

	/**
	 * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 */
	setChatDescription(
		chatId: ChatId,
		options?: Options<'setChatDescription', 'chatId'>,
	) {
		return this.call('setChatDescription', { chatId, ...options });
	}

	/**
	 * Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 * @param messageId Identifier of a message to pin
	 */
	pinChatMessage(
		chatId: ChatId,
		messageId: number,
		options?: Options<'pinChatMessage', 'chatId' | 'messageId'>,
	) {
		return this.call('pinChatMessage', { chatId, messageId, ...options });
	}

	/**
	 * Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 */
	unpinChatMessage(
		chatId: ChatId,
		options?: Options<'unpinChatMessage', 'chatId'>,
	) {
		return this.call('unpinChatMessage', { chatId, ...options });
	}

	/**
	 * Use this method to clear the list of pinned messages in a chat. In private chats and channel direct messages chats, no additional rights are required to unpin all pinned messages. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin all pinned messages in groups and channels respectively. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 */
	unpinAllChatMessages(chatId: ChatId) {
		return this.call('unpinAllChatMessages', { chatId });
	}

	/**
	 * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup or channel in the format `@username`. Channel direct messages chats aren't supported; leave the corresponding channel instead.
	 */
	leaveChat(chatId: ChatId) {
		return this.call('leaveChat', { chatId });
	}

	/**
	 * Use this method to get up-to-date information about the chat. Returns a ChatFullInfo object on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup or channel in the format `@username`
	 */
	getChat(chatId: ChatId) {
		return this.call('getChat', { chatId });
	}

	/**
	 * Use this method to get a list of administrators in a chat. Returns an Array of ChatMember objects.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup or channel in the format `@username`
	 */
	getChatAdministrators(
		chatId: ChatId,
		options?: Options<'getChatAdministrators', 'chatId'>,
	) {
		return this.call('getChatAdministrators', { chatId, ...options });
	}

	/**
	 * Use this method to get the number of members in a chat. Returns Integer on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup or channel in the format `@username`
	 */
	getChatMemberCount(chatId: ChatId) {
		return this.call('getChatMemberCount', { chatId });
	}

	/**
	 * Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup or channel in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	getChatMember(chatId: ChatId, userId: number) {
		return this.call('getChatMember', { chatId, userId });
	}

	/**
	 * Use this method to get the last messages from the personal chat (i.e., the chat currently added to their profile) of a given user. On success, an Array of Message objects is returned.
	 *
	 * @param userId Unique identifier for the target user
	 * @param limit The maximum number of messages to return; 1-20
	 */
	getUserPersonalChatMessages(userId: number, limit: number) {
		return this.call('getUserPersonalChatMessages', { userId, limit });
	}

	/**
	 * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field canSetStickerSet optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param stickerSetName Name of the sticker set to be set as the group sticker set
	 */
	setChatStickerSet(chatId: ChatId, stickerSetName: string) {
		return this.call('setChatStickerSet', { chatId, stickerSetName });
	}

	/**
	 * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field canSetStickerSet optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 */
	deleteChatStickerSet(chatId: ChatId) {
		return this.call('deleteChatStickerSet', { chatId });
	}

	/** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
	getForumTopicIconStickers() {
		return this.call('getForumTopicIconStickers');
	}

	/**
	 * Use this method to create a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the canManageTopics administrator right. Returns information about the created topic as a ForumTopic object.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param name Topic name, 1-128 characters
	 */
	createForumTopic(
		chatId: ChatId,
		name: string,
		options?: Options<'createForumTopic', 'chatId' | 'name'>,
	) {
		return this.call('createForumTopic', { chatId, name, ...options });
	}

	/**
	 * Use this method to edit name and icon of a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights, unless it is the creator of the topic. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param messageThreadId Unique identifier for the target message thread of the forum topic
	 */
	editForumTopic(
		chatId: ChatId,
		messageThreadId: number,
		options?: Options<'editForumTopic', 'chatId' | 'messageThreadId'>,
	) {
		return this.call('editForumTopic', {
			chatId,
			messageThreadId,
			...options,
		});
	}

	/**
	 * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights, unless it is the creator of the topic. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param messageThreadId Unique identifier for the target message thread of the forum topic
	 */
	closeForumTopic(chatId: ChatId, messageThreadId: number) {
		return this.call('closeForumTopic', { chatId, messageThreadId });
	}

	/**
	 * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights, unless it is the creator of the topic. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param messageThreadId Unique identifier for the target message thread of the forum topic
	 */
	reopenForumTopic(chatId: ChatId, messageThreadId: number) {
		return this.call('reopenForumTopic', { chatId, messageThreadId });
	}

	/**
	 * Use this method to delete a forum topic along with all its messages in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param messageThreadId Unique identifier for the target message thread of the forum topic
	 */
	deleteForumTopic(chatId: ChatId, messageThreadId: number) {
		return this.call('deleteForumTopic', { chatId, messageThreadId });
	}

	/**
	 * Use this method to clear the list of pinned messages in a forum topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param messageThreadId Unique identifier for the target message thread of the forum topic
	 */
	unpinAllForumTopicMessages(chatId: ChatId, messageThreadId: number) {
		return this.call('unpinAllForumTopicMessages', {
			chatId,
			messageThreadId,
		});
	}

	/**
	 * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param name New topic name, 1-128 characters
	 */
	editGeneralForumTopic(chatId: ChatId, name: string) {
		return this.call('editGeneralForumTopic', { chatId, name });
	}

	/**
	 * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 */
	closeGeneralForumTopic(chatId: ChatId) {
		return this.call('closeGeneralForumTopic', { chatId });
	}

	/**
	 * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 */
	reopenGeneralForumTopic(chatId: ChatId) {
		return this.call('reopenGeneralForumTopic', { chatId });
	}

	/**
	 * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights. The topic will be automatically closed if it was open. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 */
	hideGeneralForumTopic(chatId: ChatId) {
		return this.call('hideGeneralForumTopic', { chatId });
	}

	/**
	 * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the canManageTopics administrator rights. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 */
	unhideGeneralForumTopic(chatId: ChatId) {
		return this.call('unhideGeneralForumTopic', { chatId });
	}

	/**
	 * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 */
	unpinAllGeneralForumTopicMessages(chatId: ChatId) {
		return this.call('unpinAllGeneralForumTopicMessages', { chatId });
	}

	/**
	 * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned. Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
	 *
	 * @param callbackQueryId Unique identifier for the query to be answered
	 */
	answerCallbackQuery(
		callbackQueryId: string,
		options?: Options<'answerCallbackQuery', 'callbackQueryId'>,
	) {
		return this.call('answerCallbackQuery', {
			callbackQueryId,
			...options,
		});
	}

	/**
	 * Use this method to reply to a received guest message. On success, a SentGuestMessage object is returned.
	 *
	 * @param guestQueryId Unique identifier for the query to be answered
	 * @param result A JSON-serialized object describing the message to be sent
	 */
	answerGuestQuery(guestQueryId: string, result: InlineQueryResult) {
		return this.call('answerGuestQuery', { guestQueryId, result });
	}

	/**
	 * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object.
	 *
	 * @param chatId Unique identifier for the chat or username of the channel in the format `@username`
	 * @param userId Unique identifier of the target user
	 */
	getUserChatBoosts(chatId: ChatId, userId: number) {
		return this.call('getUserChatBoosts', { chatId, userId });
	}

	/**
	 * Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 */
	getBusinessConnection(businessConnectionId: string) {
		return this.call('getBusinessConnection', { businessConnectionId });
	}

	/**
	 * Use this method to get the token of a managed bot. Returns the token as String on success.
	 *
	 * @param userId User identifier of the managed bot whose token will be returned
	 */
	getManagedBotToken(userId: number) {
		return this.call('getManagedBotToken', { userId });
	}

	/**
	 * Use this method to revoke the current token of a managed bot and generate a new one. Returns the new token as String on success.
	 *
	 * @param userId User identifier of the managed bot whose token will be replaced
	 */
	replaceManagedBotToken(userId: number) {
		return this.call('replaceManagedBotToken', { userId });
	}

	/**
	 * Use this method to get the access settings of a managed bot. Returns a BotAccessSettings object on success.
	 *
	 * @param userId User identifier of the managed bot whose access settings will be returned
	 */
	getManagedBotAccessSettings(userId: number) {
		return this.call('getManagedBotAccessSettings', { userId });
	}

	/**
	 * Use this method to change the access settings of a managed bot. Returns True on success.
	 *
	 * @param userId User identifier of the managed bot whose access settings will be changed
	 * @param isAccessRestricted Pass True if only selected users can access the bot. The bot's owner can always access it.
	 */
	setManagedBotAccessSettings(
		userId: number,
		isAccessRestricted: boolean,
		options?: Options<
			'setManagedBotAccessSettings',
			'userId' | 'isAccessRestricted'
		>,
	) {
		return this.call('setManagedBotAccessSettings', {
			userId,
			isAccessRestricted,
			...options,
		});
	}

	/**
	 * Use this method to change the list of the bot's commands. See this manual for more details about bot commands. Returns True on success.
	 *
	 * @param commands A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
	 */
	setMyCommands(
		commands: BotCommand[],
		options?: Options<'setMyCommands', 'commands'>,
	) {
		return this.call('setMyCommands', { commands, ...options });
	}

	/** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
	deleteMyCommands(options?: ParamsOf<'deleteMyCommands'>) {
		return this.call('deleteMyCommands', options);
	}

	/** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
	getMyCommands(options?: ParamsOf<'getMyCommands'>) {
		return this.call('getMyCommands', options);
	}

	/** Use this method to change the bot's name. Returns True on success. */
	setMyName(options?: ParamsOf<'setMyName'>) {
		return this.call('setMyName', options);
	}

	/** Use this method to get the current bot name for the given user language. Returns BotName on success. */
	getMyName(options?: ParamsOf<'getMyName'>) {
		return this.call('getMyName', options);
	}

	/** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
	setMyDescription(options?: ParamsOf<'setMyDescription'>) {
		return this.call('setMyDescription', options);
	}

	/** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
	getMyDescription(options?: ParamsOf<'getMyDescription'>) {
		return this.call('getMyDescription', options);
	}

	/** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
	setMyShortDescription(options?: ParamsOf<'setMyShortDescription'>) {
		return this.call('setMyShortDescription', options);
	}

	/** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
	getMyShortDescription(options?: ParamsOf<'getMyShortDescription'>) {
		return this.call('getMyShortDescription', options);
	}

	/**
	 * Changes the profile photo of the bot. Returns True on success.
	 *
	 * @param photo The new profile photo to set
	 */
	setMyProfilePhoto(photo: InputProfilePhoto) {
		return this.call('setMyProfilePhoto', { photo });
	}

	/** Removes the profile photo of the bot. Requires no parameters. Returns True on success. */
	removeMyProfilePhoto() {
		return this.call('removeMyProfilePhoto');
	}

	/** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
	setChatMenuButton(options?: ParamsOf<'setChatMenuButton'>) {
		return this.call('setChatMenuButton', options);
	}

	/** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
	getChatMenuButton(options?: ParamsOf<'getChatMenuButton'>) {
		return this.call('getChatMenuButton', options);
	}

	/** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
	setMyDefaultAdministratorRights(
		options?: ParamsOf<'setMyDefaultAdministratorRights'>,
	) {
		return this.call('setMyDefaultAdministratorRights', options);
	}

	/** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
	getMyDefaultAdministratorRights(
		options?: ParamsOf<'getMyDefaultAdministratorRights'>,
	) {
		return this.call('getMyDefaultAdministratorRights', options);
	}

	/** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
	getAvailableGifts() {
		return this.call('getAvailableGifts');
	}

	/**
	 * Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receiver. Returns True on success.
	 *
	 * @param giftId Identifier of the gift; limited gifts can't be sent to channel chats
	 */
	sendGift(giftId: string, options?: Options<'sendGift', 'giftId'>) {
		return this.call('sendGift', { giftId, ...options });
	}

	/**
	 * Gifts a Telegram Premium subscription to the given user. Returns True on success.
	 *
	 * @param userId Unique identifier of the target user who will receive a Telegram Premium subscription
	 * @param monthCount Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12
	 * @param starCount Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months
	 */
	giftPremiumSubscription(
		userId: number,
		monthCount: number,
		starCount: number,
		options?: Options<
			'giftPremiumSubscription',
			'userId' | 'monthCount' | 'starCount'
		>,
	) {
		return this.call('giftPremiumSubscription', {
			userId,
			monthCount,
			starCount,
			...options,
		});
	}

	/**
	 * Verifies a user on behalf of the organization which is represented by the bot. Returns True on success.
	 *
	 * @param userId Unique identifier of the target user
	 */
	verifyUser(userId: number, options?: Options<'verifyUser', 'userId'>) {
		return this.call('verifyUser', { userId, ...options });
	}

	/**
	 * Verifies a chat on behalf of the organization which is represented by the bot. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. Channel direct messages chats can't be verified.
	 */
	verifyChat(chatId: ChatId, options?: Options<'verifyChat', 'chatId'>) {
		return this.call('verifyChat', { chatId, ...options });
	}

	/**
	 * Removes verification from a user who is currently verified on behalf of the organization represented by the bot. Returns True on success.
	 *
	 * @param userId Unique identifier of the target user
	 */
	removeUserVerification(userId: number) {
		return this.call('removeUserVerification', { userId });
	}

	/**
	 * Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot or channel in the format `@username`
	 */
	removeChatVerification(chatId: ChatId) {
		return this.call('removeChatVerification', { chatId });
	}

	/**
	 * Marks incoming message as read on behalf of a business account. Requires the canReadMessages business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection on behalf of which to read the message
	 * @param chatId Unique identifier of the chat in which the message was received. The chat must have been active in the last 24 hours.
	 * @param messageId Unique identifier of the message to mark as read
	 */
	readBusinessMessage(
		businessConnectionId: string,
		chatId: number,
		messageId: number,
	) {
		return this.call('readBusinessMessage', {
			businessConnectionId,
			chatId,
			messageId,
		});
	}

	/**
	 * Delete messages on behalf of a business account. Requires the canDeleteSentMessages business bot right to delete messages sent by the bot itself, or the canDeleteAllMessages business bot right to delete any message. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection on behalf of which to delete the messages
	 * @param messageIds A JSON-serialized list of 1-100 identifiers of messages to delete. All messages must be from the same chat. See deleteMessage for limitations on which messages can be deleted.
	 */
	deleteBusinessMessages(businessConnectionId: string, messageIds: number[]) {
		return this.call('deleteBusinessMessages', {
			businessConnectionId,
			messageIds,
		});
	}

	/**
	 * Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param firstName The new value of the first name for the business account; 1-64 characters
	 */
	setBusinessAccountName(
		businessConnectionId: string,
		firstName: string,
		options?: Options<
			'setBusinessAccountName',
			'businessConnectionId' | 'firstName'
		>,
	) {
		return this.call('setBusinessAccountName', {
			businessConnectionId,
			firstName,
			...options,
		});
	}

	/**
	 * Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 */
	setBusinessAccountUsername(
		businessConnectionId: string,
		options?: Options<'setBusinessAccountUsername', 'businessConnectionId'>,
	) {
		return this.call('setBusinessAccountUsername', {
			businessConnectionId,
			...options,
		});
	}

	/**
	 * Changes the bio of a managed business account. Requires the can_change_bio business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 */
	setBusinessAccountBio(
		businessConnectionId: string,
		options?: Options<'setBusinessAccountBio', 'businessConnectionId'>,
	) {
		return this.call('setBusinessAccountBio', {
			businessConnectionId,
			...options,
		});
	}

	/**
	 * Changes the profile photo of a managed business account. Requires the canEditProfilePhoto business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param photo The new profile photo to set
	 */
	setBusinessAccountProfilePhoto(
		businessConnectionId: string,
		photo: InputProfilePhoto,
		options?: Options<
			'setBusinessAccountProfilePhoto',
			'businessConnectionId' | 'photo'
		>,
	) {
		return this.call('setBusinessAccountProfilePhoto', {
			businessConnectionId,
			photo,
			...options,
		});
	}

	/**
	 * Removes the current profile photo of a managed business account. Requires the canEditProfilePhoto business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 */
	removeBusinessAccountProfilePhoto(
		businessConnectionId: string,
		options?: Options<
			'removeBusinessAccountProfilePhoto',
			'businessConnectionId'
		>,
	) {
		return this.call('removeBusinessAccountProfilePhoto', {
			businessConnectionId,
			...options,
		});
	}

	/**
	 * Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the canChangeGiftSettings business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param showGiftButton Pass True if a button for sending a gift to the user or by the business account must always be shown in the input field
	 * @param acceptedGiftTypes Types of gifts accepted by the business account
	 */
	setBusinessAccountGiftSettings(
		businessConnectionId: string,
		showGiftButton: boolean,
		acceptedGiftTypes: AcceptedGiftTypes,
	) {
		return this.call('setBusinessAccountGiftSettings', {
			businessConnectionId,
			showGiftButton,
			acceptedGiftTypes,
		});
	}

	/**
	 * Returns the amount of Telegram Stars owned by a managed business account. Requires the canViewGiftsAndStars business bot right. Returns StarAmount on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 */
	getBusinessAccountStarBalance(businessConnectionId: string) {
		return this.call('getBusinessAccountStarBalance', {
			businessConnectionId,
		});
	}

	/**
	 * Transfers Telegram Stars from the business account balance to the bot's balance. Requires the canTransferStars business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param starCount Number of Telegram Stars to transfer; 1-10000
	 */
	transferBusinessAccountStars(
		businessConnectionId: string,
		starCount: number,
	) {
		return this.call('transferBusinessAccountStars', {
			businessConnectionId,
			starCount,
		});
	}

	/**
	 * Returns the gifts received and owned by a managed business account. Requires the canViewGiftsAndStars business bot right. Returns OwnedGifts on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 */
	getBusinessAccountGifts(
		businessConnectionId: string,
		options?: Options<'getBusinessAccountGifts', 'businessConnectionId'>,
	) {
		return this.call('getBusinessAccountGifts', {
			businessConnectionId,
			...options,
		});
	}

	/**
	 * Returns the gifts owned and hosted by a user. Returns OwnedGifts on success.
	 *
	 * @param userId Unique identifier of the user
	 */
	getUserGifts(userId: number, options?: Options<'getUserGifts', 'userId'>) {
		return this.call('getUserGifts', { userId, ...options });
	}

	/**
	 * Returns the gifts owned by a chat. Returns OwnedGifts on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target channel in the format `@username`
	 */
	getChatGifts(chatId: ChatId, options?: Options<'getChatGifts', 'chatId'>) {
		return this.call('getChatGifts', { chatId, ...options });
	}

	/**
	 * Converts a given regular gift to Telegram Stars. Requires the canConvertGiftsToStars business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param ownedGiftId Unique identifier of the regular gift that should be converted to Telegram Stars
	 */
	convertGiftToStars(businessConnectionId: string, ownedGiftId: string) {
		return this.call('convertGiftToStars', {
			businessConnectionId,
			ownedGiftId,
		});
	}

	/**
	 * Upgrades a given regular gift to a unique gift. Requires the canTransferAndUpgradeGifts business bot right. Additionally requires the canTransferStars business bot right if the upgrade is paid. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param ownedGiftId Unique identifier of the regular gift that should be upgraded to a unique one
	 */
	upgradeGift(
		businessConnectionId: string,
		ownedGiftId: string,
		options?: Options<
			'upgradeGift',
			'businessConnectionId' | 'ownedGiftId'
		>,
	) {
		return this.call('upgradeGift', {
			businessConnectionId,
			ownedGiftId,
			...options,
		});
	}

	/**
	 * Transfers an owned unique gift to another user. Requires the canTransferAndUpgradeGifts business bot right. Requires canTransferStars business bot right if the transfer is paid. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param ownedGiftId Unique identifier of the regular gift that should be transferred
	 * @param newOwnerChatId Unique identifier of the chat which will own the gift. The chat must be active in the last 24 hours.
	 */
	transferGift(
		businessConnectionId: string,
		ownedGiftId: string,
		newOwnerChatId: number,
		options?: Options<
			'transferGift',
			'businessConnectionId' | 'ownedGiftId' | 'newOwnerChatId'
		>,
	) {
		return this.call('transferGift', {
			businessConnectionId,
			ownedGiftId,
			newOwnerChatId,
			...options,
		});
	}

	/**
	 * Posts a story on behalf of a managed business account. Requires the canManageStories business bot right. Returns Story on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param content Content of the story
	 * @param activePeriod Period after which the story is moved to the archive, in seconds; must be one of `6 * 3600`, `12 * 3600`, `86400`, or `2 * 86400`
	 */
	postStory(
		businessConnectionId: string,
		content: InputStoryContent,
		activePeriod: number,
		options?: Options<
			'postStory',
			'businessConnectionId' | 'content' | 'activePeriod'
		>,
	) {
		return this.call('postStory', {
			businessConnectionId,
			content,
			activePeriod,
			...options,
		});
	}

	/**
	 * Reposts a story on behalf of a business account from another business account. Both business accounts must be managed by the same bot, and the story on the source account must have been posted (or reposted) by the bot. Requires the canManageStories business bot right for both business accounts. Returns Story on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param fromChatId Unique identifier of the chat which posted the story that should be reposted
	 * @param fromStoryId Unique identifier of the story that should be reposted
	 * @param activePeriod Period after which the story is moved to the archive, in seconds; must be one of `6 * 3600`, `12 * 3600`, `86400`, or `2 * 86400`
	 */
	repostStory(
		businessConnectionId: string,
		fromChatId: number,
		fromStoryId: number,
		activePeriod: number,
		options?: Options<
			'repostStory',
			| 'businessConnectionId'
			| 'fromChatId'
			| 'fromStoryId'
			| 'activePeriod'
		>,
	) {
		return this.call('repostStory', {
			businessConnectionId,
			fromChatId,
			fromStoryId,
			activePeriod,
			...options,
		});
	}

	/**
	 * Edits a story previously posted by the bot on behalf of a managed business account. Requires the canManageStories business bot right. Returns Story on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param storyId Unique identifier of the story to edit
	 * @param content Content of the story
	 */
	editStory(
		businessConnectionId: string,
		storyId: number,
		content: InputStoryContent,
		options?: Options<
			'editStory',
			'businessConnectionId' | 'storyId' | 'content'
		>,
	) {
		return this.call('editStory', {
			businessConnectionId,
			storyId,
			content,
			...options,
		});
	}

	/**
	 * Deletes a story previously posted by the bot on behalf of a managed business account. Requires the canManageStories business bot right. Returns True on success.
	 *
	 * @param businessConnectionId Unique identifier of the business connection
	 * @param storyId Unique identifier of the story to delete
	 */
	deleteStory(businessConnectionId: string, storyId: number) {
		return this.call('deleteStory', { businessConnectionId, storyId });
	}

	/**
	 * Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned.
	 *
	 * @param webAppQueryId Unique identifier for the query to be answered
	 * @param result A JSON-serialized object describing the message to be sent
	 */
	answerWebAppQuery(webAppQueryId: string, result: InlineQueryResult) {
		return this.call('answerWebAppQuery', { webAppQueryId, result });
	}

	/**
	 * Stores a message that can be sent by a user of a Mini App. Returns a PreparedInlineMessage object.
	 *
	 * @param userId Unique identifier of the target user that can use the prepared message
	 * @param result A JSON-serialized object describing the message to be sent
	 */
	savePreparedInlineMessage(
		userId: number,
		result: InlineQueryResult,
		options?: Options<'savePreparedInlineMessage', 'userId' | 'result'>,
	) {
		return this.call('savePreparedInlineMessage', {
			userId,
			result,
			...options,
		});
	}

	/**
	 * Stores a keyboard button that can be used by a user within a Mini App. Returns a PreparedKeyboardButton object.
	 *
	 * @param userId Unique identifier of the target user that can use the button
	 * @param button A JSON-serialized object describing the button to be saved. The button must be of the type requestUsers, requestChat, or requestManagedBot.
	 */
	savePreparedKeyboardButton(userId: number, button: KeyboardButton) {
		return this.call('savePreparedKeyboardButton', { userId, button });
	}

	/** Use this method to edit text, rich and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageText(options?: ParamsOf<'editMessageText'>) {
		return this.call('editMessageText', options);
	}

	/** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageCaption(options?: ParamsOf<'editMessageCaption'>) {
		return this.call('editMessageCaption', options);
	}

	/**
	 * Use this method to edit animation, audio, document, live photo, photo, or video messages, or to replace a text or a rich message with a media. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo, a live photo, or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its fileId or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent.
	 *
	 * @param media A JSON-serialized object for the new media content of the message
	 */
	editMessageMedia(
		media: InputMedia,
		options?: Options<'editMessageMedia', 'media'>,
	) {
		return this.call('editMessageMedia', { media, ...options });
	}

	/**
	 * Use this method to edit live location messages. A location can be edited until its livePeriod expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
	 *
	 * @param latitude Latitude of new location
	 * @param longitude Longitude of new location
	 */
	editMessageLiveLocation(
		latitude: number,
		longitude: number,
		options?: Options<'editMessageLiveLocation', 'latitude' | 'longitude'>,
	) {
		return this.call('editMessageLiveLocation', {
			latitude,
			longitude,
			...options,
		});
	}

	/** Use this method to stop updating a live location message before livePeriod expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
	stopMessageLiveLocation(options?: ParamsOf<'stopMessageLiveLocation'>) {
		return this.call('stopMessageLiveLocation', options);
	}

	/**
	 * Use this method to edit a checklist on behalf of a connected business account. On success, the edited Message is returned.
	 *
	 * @param businessConnectionId Unique identifier of the business connection on behalf of which the message will be sent
	 * @param chatId Unique identifier for the target chat or username of the target bot in the format `@username`
	 * @param messageId Unique identifier for the target message
	 * @param checklist A JSON-serialized object for the new checklist
	 */
	editMessageChecklist(
		businessConnectionId: string,
		chatId: ChatId,
		messageId: number,
		checklist: InputChecklist,
		options?: Options<
			'editMessageChecklist',
			'businessConnectionId' | 'chatId' | 'messageId' | 'checklist'
		>,
	) {
		return this.call('editMessageChecklist', {
			businessConnectionId,
			chatId,
			messageId,
			checklist,
			...options,
		});
	}

	/** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageReplyMarkup(options?: ParamsOf<'editMessageReplyMarkup'>) {
		return this.call('editMessageReplyMarkup', options);
	}

	/**
	 * Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param messageId Identifier of the original message with the poll
	 */
	stopPoll(
		chatId: ChatId,
		messageId: number,
		options?: Options<'stopPoll', 'chatId' | 'messageId'>,
	) {
		return this.call('stopPoll', { chatId, messageId, ...options });
	}

	/**
	 * Use this method to edit an ephemeral text or rich message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param receiverUserId Identifier of the user who received the message
	 * @param ephemeralMessageId Identifier of the ephemeral message to edit
	 */
	editEphemeralMessageText(
		chatId: ChatId,
		receiverUserId: number,
		ephemeralMessageId: number,
		options?: Options<
			'editEphemeralMessageText',
			'chatId' | 'receiverUserId' | 'ephemeralMessageId'
		>,
	) {
		return this.call('editEphemeralMessageText', {
			chatId,
			receiverUserId,
			ephemeralMessageId,
			...options,
		});
	}

	/**
	 * Use this method to edit the media of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param receiverUserId Identifier of the user who received the message
	 * @param ephemeralMessageId Identifier of the ephemeral message to edit
	 * @param media A JSON-serialized object for the new media content of the message
	 */
	editEphemeralMessageMedia(
		chatId: ChatId,
		receiverUserId: number,
		ephemeralMessageId: number,
		media: InputMedia,
		options?: Options<
			'editEphemeralMessageMedia',
			'chatId' | 'receiverUserId' | 'ephemeralMessageId' | 'media'
		>,
	) {
		return this.call('editEphemeralMessageMedia', {
			chatId,
			receiverUserId,
			ephemeralMessageId,
			media,
			...options,
		});
	}

	/**
	 * Use this method to edit the caption of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param receiverUserId Identifier of the user who received the message
	 * @param ephemeralMessageId Identifier of the ephemeral message to edit
	 */
	editEphemeralMessageCaption(
		chatId: ChatId,
		receiverUserId: number,
		ephemeralMessageId: number,
		options?: Options<
			'editEphemeralMessageCaption',
			'chatId' | 'receiverUserId' | 'ephemeralMessageId'
		>,
	) {
		return this.call('editEphemeralMessageCaption', {
			chatId,
			receiverUserId,
			ephemeralMessageId,
			...options,
		});
	}

	/**
	 * Use this method to edit only the reply markup of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param receiverUserId Identifier of the user who received the message
	 * @param ephemeralMessageId Identifier of the ephemeral message to edit
	 */
	editEphemeralMessageReplyMarkup(
		chatId: ChatId,
		receiverUserId: number,
		ephemeralMessageId: number,
		options?: Options<
			'editEphemeralMessageReplyMarkup',
			'chatId' | 'receiverUserId' | 'ephemeralMessageId'
		>,
	) {
		return this.call('editEphemeralMessageReplyMarkup', {
			chatId,
			receiverUserId,
			ephemeralMessageId,
			...options,
		});
	}

	/**
	 * Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can_post_messages' administrator right in the corresponding channel chat. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target direct messages chat
	 * @param messageId Identifier of a suggested post message to approve
	 */
	approveSuggestedPost(
		chatId: number,
		messageId: number,
		options?: Options<'approveSuggestedPost', 'chatId' | 'messageId'>,
	) {
		return this.call('approveSuggestedPost', {
			chatId,
			messageId,
			...options,
		});
	}

	/**
	 * Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can_manage_direct_messages' administrator right in the corresponding channel chat. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target direct messages chat
	 * @param messageId Identifier of a suggested post message to decline
	 */
	declineSuggestedPost(
		chatId: number,
		messageId: number,
		options?: Options<'declineSuggestedPost', 'chatId' | 'messageId'>,
	) {
		return this.call('declineSuggestedPost', {
			chatId,
			messageId,
			...options,
		});
	}

	/**
	 * Use this method to delete a message, including service messages, with the following limitations: - A message can only be deleted if it was sent less than 48 hours ago. - Service messages about a supergroup, channel, or forum topic creation can't be deleted. - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago. - Bots can delete outgoing messages in private chats, groups, and supergroups. - Bots can delete incoming messages in private chats. - Bots granted can_post_messages permissions can delete outgoing messages in channels. - If the bot is an administrator of a group, it can delete any message there. - If the bot has can_delete_messages administrator right in a supergroup or a channel, it can delete any message there. - If the bot has can_manage_direct_messages administrator right in a channel, it can delete any message in the corresponding direct messages chat. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param messageId Identifier of the message to delete
	 */
	deleteMessage(chatId: ChatId, messageId: number) {
		return this.call('deleteMessage', { chatId, messageId });
	}

	/**
	 * Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param messageIds A JSON-serialized list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted.
	 */
	deleteMessages(chatId: ChatId, messageIds: number[]) {
		return this.call('deleteMessages', { chatId, messageIds });
	}

	/**
	 * Use this method to delete an ephemeral message. Note that it is not guaranteed that the user will receive the message deletion event, especially if they are offline. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param receiverUserId Identifier of the user who received the message
	 * @param ephemeralMessageId Identifier of the ephemeral message to delete
	 */
	deleteEphemeralMessage(
		chatId: ChatId,
		receiverUserId: number,
		ephemeralMessageId: number,
	) {
		return this.call('deleteEphemeralMessage', {
			chatId,
			receiverUserId,
			ephemeralMessageId,
		});
	}

	/**
	 * Use this method to remove a reaction from a message in a group or a supergroup chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 * @param messageId Identifier of the target message
	 */
	deleteMessageReaction(
		chatId: ChatId,
		messageId: number,
		options?: Options<'deleteMessageReaction', 'chatId' | 'messageId'>,
	) {
		return this.call('deleteMessageReaction', {
			chatId,
			messageId,
			...options,
		});
	}

	/**
	 * Use this method to remove up to 10000 recent reactions in a group or a supergroup chat added by a given user or chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target supergroup in the format `@username`
	 */
	deleteAllMessageReactions(
		chatId: ChatId,
		options?: Options<'deleteAllMessageReactions', 'chatId'>,
	) {
		return this.call('deleteAllMessageReactions', { chatId, ...options });
	}

	/**
	 * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param sticker Sticker to send. Pass a fileId as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. More information on Sending Files ». Video and animated stickers can't be sent via an HTTP URL.
	 */
	sendSticker(
		chatId: ChatId,
		sticker: InputFile | string,
		options?: Options<'sendSticker', 'chatId' | 'sticker'>,
	) {
		return this.call('sendSticker', { chatId, sticker, ...options });
	}

	/**
	 * Use this method to get a sticker set. On success, a StickerSet object is returned.
	 *
	 * @param name Name of the sticker set
	 */
	getStickerSet(name: string) {
		return this.call('getStickerSet', { name });
	}

	/**
	 * Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects.
	 *
	 * @param customEmojiIds A JSON-serialized list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified.
	 */
	getCustomEmojiStickers(customEmojiIds: string[]) {
		return this.call('getCustomEmojiStickers', { customEmojiIds });
	}

	/**
	 * Use this method to upload a file with a sticker for later use in the createNewStickerSet, addStickerToSet, or replaceStickerInSet methods (the file can be used multiple times). Returns the uploaded File on success.
	 *
	 * @param userId User identifier of sticker file owner
	 * @param sticker A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format. See https://core.telegram.org/stickers for technical requirements. More information on Sending Files »
	 * @param stickerFormat Format of the sticker, must be one of “static”, “animated”, “video”
	 */
	uploadStickerFile(
		userId: number,
		sticker: InputFile,
		stickerFormat: StickerFormat,
	) {
		return this.call('uploadStickerFile', {
			userId,
			sticker,
			stickerFormat,
		});
	}

	/**
	 * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success.
	 *
	 * @param userId User identifier of created sticker set owner
	 * @param name Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., animals). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in `"_by_<bot_username>"`. `<bot_username>` is case insensitive. 1-64 characters.
	 * @param title Sticker set title, 1-64 characters
	 * @param stickers A JSON-serialized list of 1-50 initial stickers to be added to the sticker set
	 */
	createNewStickerSet(
		userId: number,
		name: string,
		title: string,
		stickers: InputSticker[],
		options?: Options<
			'createNewStickerSet',
			'userId' | 'name' | 'title' | 'stickers'
		>,
	) {
		return this.call('createNewStickerSet', {
			userId,
			name,
			title,
			stickers,
			...options,
		});
	}

	/**
	 * Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns True on success.
	 *
	 * @param userId User identifier of sticker set owner
	 * @param name Sticker set name
	 * @param sticker A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set isn't changed.
	 */
	addStickerToSet(userId: number, name: string, sticker: InputSticker) {
		return this.call('addStickerToSet', { userId, name, sticker });
	}

	/**
	 * Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success.
	 *
	 * @param sticker File identifier of the sticker
	 * @param position New sticker position in the set, zero-based
	 */
	setStickerPositionInSet(sticker: string, position: number) {
		return this.call('setStickerPositionInSet', { sticker, position });
	}

	/**
	 * Use this method to delete a sticker from a set created by the bot. Returns True on success.
	 *
	 * @param sticker File identifier of the sticker
	 */
	deleteStickerFromSet(sticker: string) {
		return this.call('deleteStickerFromSet', { sticker });
	}

	/**
	 * Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success.
	 *
	 * @param userId User identifier of the sticker set owner
	 * @param name Sticker set name
	 * @param oldSticker File identifier of the replaced sticker
	 * @param sticker A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set remains unchanged.
	 */
	replaceStickerInSet(
		userId: number,
		name: string,
		oldSticker: string,
		sticker: InputSticker,
	) {
		return this.call('replaceStickerInSet', {
			userId,
			name,
			oldSticker,
			sticker,
		});
	}

	/**
	 * Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success.
	 *
	 * @param sticker File identifier of the sticker
	 * @param emojiList A JSON-serialized list of 1-20 emoji associated with the sticker
	 */
	setStickerEmojiList(sticker: string, emojiList: string[]) {
		return this.call('setStickerEmojiList', { sticker, emojiList });
	}

	/**
	 * Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success.
	 *
	 * @param sticker File identifier of the sticker
	 */
	setStickerKeywords(
		sticker: string,
		options?: Options<'setStickerKeywords', 'sticker'>,
	) {
		return this.call('setStickerKeywords', { sticker, ...options });
	}

	/**
	 * Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success.
	 *
	 * @param sticker File identifier of the sticker
	 */
	setStickerMaskPosition(
		sticker: string,
		options?: Options<'setStickerMaskPosition', 'sticker'>,
	) {
		return this.call('setStickerMaskPosition', { sticker, ...options });
	}

	/**
	 * Use this method to set the title of a created sticker set. Returns True on success.
	 *
	 * @param name Sticker set name
	 * @param title Sticker set title, 1-64 characters
	 */
	setStickerSetTitle(name: string, title: string) {
		return this.call('setStickerSetTitle', { name, title });
	}

	/**
	 * Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success.
	 *
	 * @param name Sticker set name
	 * @param userId User identifier of the sticker set owner
	 * @param format Format of the thumbnail, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, or “video” for a .WEBM video
	 */
	setStickerSetThumbnail(
		name: string,
		userId: number,
		format: StickerFormat,
		options?: Options<
			'setStickerSetThumbnail',
			'name' | 'userId' | 'format'
		>,
	) {
		return this.call('setStickerSetThumbnail', {
			name,
			userId,
			format,
			...options,
		});
	}

	/**
	 * Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success.
	 *
	 * @param name Sticker set name
	 */
	setCustomEmojiStickerSetThumbnail(
		name: string,
		options?: Options<'setCustomEmojiStickerSetThumbnail', 'name'>,
	) {
		return this.call('setCustomEmojiStickerSetThumbnail', {
			name,
			...options,
		});
	}

	/**
	 * Use this method to delete a sticker set that was created by the bot. Returns True on success.
	 *
	 * @param name Sticker set name
	 */
	deleteStickerSet(name: string) {
		return this.call('deleteStickerSet', { name });
	}

	/**
	 * Use this method to send rich messages. If the message contains a block with a media element, then the bot must have the right to send the media to the chat. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param richMessage The message to be sent
	 */
	sendRichMessage(
		chatId: ChatId,
		richMessage: InputRichMessage,
		options?: Options<'sendRichMessage', 'chatId' | 'richMessage'>,
	) {
		return this.call('sendRichMessage', {
			chatId,
			richMessage,
			...options,
		});
	}

	/**
	 * Use this method to stream a partial rich message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you must call sendRichMessage with the complete message to persist it in the user's chat. Returns True on success.
	 *
	 * @param chatId Unique identifier for the target private chat
	 * @param draftId Unique identifier of the message draft; must be non-zero. Changes to drafts with the same identifier are animated. Otherwise, the draft is replaced without animation.
	 * @param richMessage The partial message to be streamed. Direct upload of new files and explicit upload of files by a URL isn't supported.
	 */
	sendRichMessageDraft(
		chatId: number,
		draftId: number,
		richMessage: InputRichMessage,
		options?: Options<
			'sendRichMessageDraft',
			'chatId' | 'draftId' | 'richMessage'
		>,
	) {
		return this.call('sendRichMessageDraft', {
			chatId,
			draftId,
			richMessage,
			...options,
		});
	}

	/**
	 * Use this method to send answers to an inline query. On success, True is returned. No more than 50 results per query are allowed.
	 *
	 * @param inlineQueryId Unique identifier for the answered query
	 * @param results A JSON-serialized Array of results for the inline query
	 */
	answerInlineQuery(
		inlineQueryId: string,
		results: InlineQueryResult[],
		options?: Options<'answerInlineQuery', 'inlineQueryId' | 'results'>,
	) {
		return this.call('answerInlineQuery', {
			inlineQueryId,
			results,
			...options,
		});
	}

	/**
	 * Use this method to send invoices. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`
	 * @param title Product name, 1-32 characters
	 * @param description Product description, 1-255 characters
	 * @param payload Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes.
	 * @param currency Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars.
	 * @param prices Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars.
	 */
	sendInvoice(
		chatId: ChatId,
		title: string,
		description: string,
		payload: string,
		currency: string,
		prices: LabeledPrice[],
		options?: Options<
			'sendInvoice',
			| 'chatId'
			| 'title'
			| 'description'
			| 'payload'
			| 'currency'
			| 'prices'
		>,
	) {
		return this.call('sendInvoice', {
			chatId,
			title,
			description,
			payload,
			currency,
			prices,
			...options,
		});
	}

	/**
	 * Use this method to create a link for an invoice. Returns the created invoice link as String on success.
	 *
	 * @param title Product name, 1-32 characters
	 * @param description Product description, 1-255 characters
	 * @param payload Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes.
	 * @param currency Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars.
	 * @param prices Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars.
	 */
	createInvoiceLink(
		title: string,
		description: string,
		payload: string,
		currency: string,
		prices: LabeledPrice[],
		options?: Options<
			'createInvoiceLink',
			'title' | 'description' | 'payload' | 'currency' | 'prices'
		>,
	) {
		return this.call('createInvoiceLink', {
			title,
			description,
			payload,
			currency,
			prices,
			...options,
		});
	}

	/**
	 * If you sent an invoice requesting a shipping address and the parameter isFlexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned.
	 *
	 * @param shippingQueryId Unique identifier for the query to be answered
	 * @param ok Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
	 */
	answerShippingQuery(
		shippingQueryId: string,
		ok: boolean,
		options?: Options<'answerShippingQuery', 'shippingQueryId' | 'ok'>,
	) {
		return this.call('answerShippingQuery', {
			shippingQueryId,
			ok,
			...options,
		});
	}

	/**
	 * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
	 *
	 * @param preCheckoutQueryId Unique identifier for the query to be answered
	 * @param ok Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
	 */
	answerPreCheckoutQuery(
		preCheckoutQueryId: string,
		ok: boolean,
		options?: Options<
			'answerPreCheckoutQuery',
			'preCheckoutQueryId' | 'ok'
		>,
	) {
		return this.call('answerPreCheckoutQuery', {
			preCheckoutQueryId,
			ok,
			...options,
		});
	}

	/** A method to get the current Telegram Stars balance of the bot. Requires no parameters. On success, returns a StarAmount object. */
	getMyStarBalance() {
		return this.call('getMyStarBalance');
	}

	/** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
	getStarTransactions(options?: ParamsOf<'getStarTransactions'>) {
		return this.call('getStarTransactions', options);
	}

	/**
	 * Refunds a successful payment in Telegram Stars. Returns True on success.
	 *
	 * @param userId Identifier of the user whose payment will be refunded
	 * @param telegramPaymentChargeId Telegram payment identifier
	 */
	refundStarPayment(userId: number, telegramPaymentChargeId: string) {
		return this.call('refundStarPayment', {
			userId,
			telegramPaymentChargeId,
		});
	}

	/**
	 * Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns True on success.
	 *
	 * @param userId Identifier of the user whose subscription will be edited
	 * @param telegramPaymentChargeId Telegram payment identifier for the subscription
	 * @param isCanceled Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot.
	 */
	editUserStarSubscription(
		userId: number,
		telegramPaymentChargeId: string,
		isCanceled: boolean,
	) {
		return this.call('editUserStarSubscription', {
			userId,
			telegramPaymentChargeId,
			isCanceled,
		});
	}

	/**
	 * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success. Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
	 *
	 * @param userId User identifier
	 * @param errors A JSON-serialized Array describing the errors
	 */
	setPassportDataErrors(userId: number, errors: PassportElementError[]) {
		return this.call('setPassportDataErrors', { userId, errors });
	}

	/**
	 * Use this method to send a game. On success, the sent Message is returned.
	 *
	 * @param chatId Unique identifier for the target chat or username of the target bot in the format `@username`. Games can't be sent to channel direct messages chats and channel chats.
	 * @param gameShortName Short name of the game, serves as the unique identifier for the game. Set up your games via @BotFather.
	 */
	sendGame(
		chatId: ChatId,
		gameShortName: string,
		options?: Options<'sendGame', 'chatId' | 'gameShortName'>,
	) {
		return this.call('sendGame', { chatId, gameShortName, ...options });
	}

	/**
	 * Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
	 *
	 * @param userId User identifier
	 * @param score New score, must be non-negative
	 */
	setGameScore(
		userId: number,
		score: number,
		options?: Options<'setGameScore', 'userId' | 'score'>,
	) {
		return this.call('setGameScore', { userId, score, ...options });
	}

	/**
	 * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects. This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change.
	 *
	 * @param userId Target user id
	 */
	getGameHighScores(
		userId: number,
		options?: Options<'getGameHighScores', 'userId'>,
	) {
		return this.call('getGameHighScores', { userId, ...options });
	}
}
