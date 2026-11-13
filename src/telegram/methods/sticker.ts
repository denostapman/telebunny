import type { InputFile } from '../../client/input-file.ts';
import type { StickerFormat } from '../enums.ts';
import type { ChatId } from '../types/common.ts';
import type {
	ForceReply,
	InlineKeyboardMarkup,
	ReplyKeyboardMarkup,
	ReplyKeyboardRemove,
} from '../types/markup.ts';
import type { File } from '../types/media.ts';
import type {
	EphemeralMessageParameters,
	Message,
	ReplyParameters,
	SuggestedPostParameters,
} from '../types/message.ts';
import type {
	InputSticker,
	MaskPosition,
	Sticker,
	StickerSet,
} from '../types/sticker.ts';
import type { Method } from './common.ts';

export interface SendStickerParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup, or channel in the format `@username`; required unless the message is sent as an ephemeral reply to a callback query */
	chatId?: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	messageThreadId?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	directMessagesTopicId?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeralMessageParameters?: EphemeralMessageParameters;
	/** Sticker to send. Pass a fileId as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. More information on Sending Files ». Video and animated stickers can't be sent via an HTTP URL. */
	sticker: InputFile | string;
	/** Emoji associated with the sticker; only for just uploaded stickers */
	emoji?: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disableNotification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allowPaidBroadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	messageEffectId?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggestedPostParameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	replyParameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	replyMarkup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface GetStickerSetParams {
	/** Name of the sticker set */
	name: string;
}

export interface GetCustomEmojiStickersParams {
	/** A JSON-serialized list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified. */
	customEmojiIds: string[];
}

export interface UploadStickerFileParams {
	/** User identifier of sticker file owner */
	userId: number;
	/** A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format. See https://core.telegram.org/stickers for technical requirements. More information on Sending Files » */
	sticker: InputFile;
	/** Format of the sticker, must be one of “static”, “animated”, “video” */
	stickerFormat: StickerFormat;
}

export interface CreateNewStickerSetParams {
	/** User identifier of created sticker set owner */
	userId: number;
	/** Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., animals). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in `"_by_<bot_username>"`. `<bot_username>` is case insensitive. 1-64 characters. */
	name: string;
	/** Sticker set title, 1-64 characters */
	title: string;
	/** A JSON-serialized list of 1-50 initial stickers to be added to the sticker set */
	stickers: InputSticker[];
	/** Type of stickers in the set, pass “regular”, “mask”, or “custom_emoji”. By default, a regular sticker set is created. */
	stickerType?: string;
	/** Pass True if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only */
	needsRepainting?: boolean;
}

export interface AddStickerToSetParams {
	/** User identifier of sticker set owner */
	userId: number;
	/** Sticker set name */
	name: string;
	/** A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set isn't changed. */
	sticker: InputSticker;
}

export interface SetStickerPositionInSetParams {
	/** File identifier of the sticker */
	sticker: string;
	/** New sticker position in the set, zero-based */
	position: number;
}

export interface DeleteStickerFromSetParams {
	/** File identifier of the sticker */
	sticker: string;
}

export interface ReplaceStickerInSetParams {
	/** User identifier of the sticker set owner */
	userId: number;
	/** Sticker set name */
	name: string;
	/** File identifier of the replaced sticker */
	oldSticker: string;
	/** A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set remains unchanged. */
	sticker: InputSticker;
}

export interface SetStickerEmojiListParams {
	/** File identifier of the sticker */
	sticker: string;
	/** A JSON-serialized list of 1-20 emoji associated with the sticker */
	emojiList: string[];
}

export interface SetStickerKeywordsParams {
	/** File identifier of the sticker */
	sticker: string;
	/** A JSON-serialized list of 0-20 search keywords for the sticker with total length of up to 64 characters */
	keywords?: string[];
}

export interface SetStickerMaskPositionParams {
	/** File identifier of the sticker */
	sticker: string;
	/** A JSON-serialized object with the position where the mask should be placed on faces. Omit the parameter to remove the mask position. */
	maskPosition?: MaskPosition;
}

export interface SetStickerSetTitleParams {
	/** Sticker set name */
	name: string;
	/** Sticker set title, 1-64 characters */
	title: string;
}

export interface SetStickerSetThumbnailParams {
	/** Sticker set name */
	name: string;
	/** User identifier of the sticker set owner */
	userId: number;
	/** A .WEBP or .PNG image with the thumbnail, must be up to 128 kilobytes in size and have a width and height of exactly 100px, or a .TGS animation with a thumbnail up to 32 kilobytes in size (see https://core.telegram.org/stickers#animation-requirements for animated sticker technical requirements), or a .WEBM video with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#video-requirements for video sticker technical requirements. Pass a fileId as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files ». Animated and video sticker set thumbnails can't be uploaded via HTTP URL. If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail. */
	thumbnail?: InputFile | string;
	/** Format of the thumbnail, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, or “video” for a .WEBM video */
	format: StickerFormat;
}

export interface SetCustomEmojiStickerSetThumbnailParams {
	/** Sticker set name */
	name: string;
	/** Custom emoji identifier of a sticker from the sticker set; pass an empty string to drop the thumbnail and use the first sticker as the thumbnail */
	customEmojiId?: string;
}

export interface DeleteStickerSetParams {
	/** Sticker set name */
	name: string;
}

export interface StickerMethods {
	/** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
	sendSticker: Method<SendStickerParams, Message>;
	/** Use this method to get a sticker set. On success, a StickerSet object is returned. */
	getStickerSet: Method<GetStickerSetParams, StickerSet>;
	/** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
	getCustomEmojiStickers: Method<GetCustomEmojiStickersParams, Sticker[]>;
	/** Use this method to upload a file with a sticker for later use in the createNewStickerSet, addStickerToSet, or replaceStickerInSet methods (the file can be used multiple times). Returns the uploaded File on success. */
	uploadStickerFile: Method<UploadStickerFileParams, File>;
	/** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
	createNewStickerSet: Method<CreateNewStickerSetParams, true>;
	/** Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns True on success. */
	addStickerToSet: Method<AddStickerToSetParams, true>;
	/** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
	setStickerPositionInSet: Method<SetStickerPositionInSetParams, true>;
	/** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
	deleteStickerFromSet: Method<DeleteStickerFromSetParams, true>;
	/** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
	replaceStickerInSet: Method<ReplaceStickerInSetParams, true>;
	/** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
	setStickerEmojiList: Method<SetStickerEmojiListParams, true>;
	/** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
	setStickerKeywords: Method<SetStickerKeywordsParams, true>;
	/** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
	setStickerMaskPosition: Method<SetStickerMaskPositionParams, true>;
	/** Use this method to set the title of a created sticker set. Returns True on success. */
	setStickerSetTitle: Method<SetStickerSetTitleParams, true>;
	/** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
	setStickerSetThumbnail: Method<SetStickerSetThumbnailParams, true>;
	/** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
	setCustomEmojiStickerSetThumbnail: Method<
		SetCustomEmojiStickerSetThumbnailParams,
		true
	>;
	/** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
	deleteStickerSet: Method<DeleteStickerSetParams, true>;
}
