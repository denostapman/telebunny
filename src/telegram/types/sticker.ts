import type { InputFile } from '../../client/input-file.ts';
import type {
	MaskPositionPoint,
	StickerFormat,
	StickerType,
} from '../enums.ts';
import type { File, PhotoSize } from './media.ts';

/** This object represents a sticker. */
export interface Sticker {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
	type: StickerType;
	/** Sticker width */
	width: number;
	/** Sticker height */
	height: number;
	/** True, if the sticker is animated */
	is_animated: boolean;
	/** True, if the sticker is a video sticker */
	is_video: boolean;
	/** Sticker thumbnail in the .WEBP or .JPG format */
	thumbnail?: PhotoSize;
	/** Emoji associated with the sticker */
	emoji?: string;
	/** Name of the sticker set to which the sticker belongs */
	set_name?: string;
	/** For premium regular stickers, premium animation for the sticker */
	premium_animation?: File;
	/** For mask stickers, the position where the mask should be placed */
	mask_position?: MaskPosition;
	/** For custom emoji stickers, unique identifier of the custom emoji */
	custom_emoji_id?: string;
	/** True, if the sticker must be repainted to a text color in messages, the color of the Telegram Premium badge in emoji status, white color on chat photos, or another appropriate color in other places */
	needs_repainting?: true;
	/** File size in bytes */
	file_size?: number;
}

/** This object represents a sticker set. */
export interface StickerSet {
	/** Sticker set name */
	name: string;
	/** Sticker set title */
	title: string;
	/** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
	sticker_type: StickerType;
	/** List of all set stickers */
	stickers: Sticker[];
	/** Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
	thumbnail?: PhotoSize;
}

/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
	/** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
	point: MaskPositionPoint;
	/** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
	x_shift: number;
	/** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
	y_shift: number;
	/** Mask scaling coefficient. For example, 2.0 means double size. */
	scale: number;
}

/** This object describes a sticker to be added to a sticker set. */
export interface InputSticker {
	/** The added sticker. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new file using multipart/form-data under <file_attach_name> name. Animated and video stickers can't be uploaded via HTTP URL. More information on Sending Files » */
	sticker: InputFile | string;
	/** Format of the added sticker, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, “video” for a .WEBM video */
	format: StickerFormat;
	/** List of 1-20 emoji associated with the sticker */
	emoji_list: string[];
	/** Position where the mask should be placed on faces. For “mask” stickers only. */
	mask_position?: MaskPosition;
	/** List of 0-20 search keywords for the sticker with total length of up to 64 characters. For “regular” and “custom_emoji” stickers only. */
	keywords?: string[];
}
