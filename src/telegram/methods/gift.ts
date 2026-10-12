import type { ParseMode } from '../enums.ts';
import type { ChatId, EmptyObject } from '../types/common.ts';
import type { Gifts, OwnedGifts } from '../types/gift.ts';
import type { MessageEntity } from '../types/message.ts';
import type { Method } from './common.ts';

export interface SendGiftParams {
	/** Required if chat_id is not specified. Unique identifier of the target user who will receive the gift. */
	user_id?: number;
	/** Required if user_id is not specified. Unique identifier for the chat or username of the channel (in the format `@username`) that will receive the gift. */
	chat_id?: ChatId;
	/** Identifier of the gift; limited gifts can't be sent to channel chats */
	gift_id: string;
	/** Pass True to pay for the gift upgrade from the bot's balance, thereby making the upgrade free for the receiver */
	pay_for_upgrade?: boolean;
	/** Text that will be shown along with the gift; 0-128 characters */
	text?: string;
	/** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
	text_parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
	text_entities?: MessageEntity[];
}

export interface GetUserGiftsParams {
	/** Unique identifier of the user */
	user_id: number;
	/** Pass True to exclude gifts that can be purchased an unlimited number of times */
	exclude_unlimited?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
	exclude_limited_upgradable?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
	exclude_limited_non_upgradable?: boolean;
	/** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
	exclude_from_blockchain?: boolean;
	/** Pass True to exclude unique gifts */
	exclude_unique?: boolean;
	/** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
	sort_by_price?: boolean;
	/** Offset of the first entry to return as received from the previous request; use an empty string to get the first chunk of results */
	offset?: string;
	/** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
	limit?: number;
}

export interface GetChatGiftsParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Pass True to exclude gifts that aren't saved to the chat's profile page. Always True, unless the bot has the can_post_messages administrator right in the channel. */
	exclude_unsaved?: boolean;
	/** Pass True to exclude gifts that are saved to the chat's profile page. Always False, unless the bot has the can_post_messages administrator right in the channel. */
	exclude_saved?: boolean;
	/** Pass True to exclude gifts that can be purchased an unlimited number of times */
	exclude_unlimited?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
	exclude_limited_upgradable?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
	exclude_limited_non_upgradable?: boolean;
	/** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
	exclude_from_blockchain?: boolean;
	/** Pass True to exclude unique gifts */
	exclude_unique?: boolean;
	/** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
	sort_by_price?: boolean;
	/** Offset of the first entry to return as received from the previous request; use an empty string to get the first chunk of results */
	offset?: string;
	/** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
	limit?: number;
}

export interface ConvertGiftToStarsParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Unique identifier of the regular gift that should be converted to Telegram Stars */
	owned_gift_id: string;
}

export interface UpgradeGiftParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Unique identifier of the regular gift that should be upgraded to a unique one */
	owned_gift_id: string;
	/** Pass True to keep the original gift text, sender and receiver in the upgraded gift */
	keep_original_details?: boolean;
	/** The amount of Telegram Stars that will be paid for the upgrade from the business account balance. If `gift.prepaid_upgrade_star_count > 0`, then pass 0, otherwise, the can_transfer_stars business bot right is required and `gift.upgrade_star_count` must be passed. */
	star_count?: number;
}

export interface TransferGiftParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Unique identifier of the regular gift that should be transferred */
	owned_gift_id: string;
	/** Unique identifier of the chat which will own the gift. The chat must be active in the last 24 hours. */
	new_owner_chat_id: number;
	/** The amount of Telegram Stars that will be paid for the transfer from the business account balance. If positive, then the can_transfer_stars business bot right is required. */
	star_count?: number;
}

export interface GiftMethods {
	/** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
	getAvailableGifts: Method<EmptyObject, Gifts>;
	/** Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receiver. Returns True on success. */
	sendGift: Method<SendGiftParams, true>;
	/** Returns the gifts owned and hosted by a user. Returns OwnedGifts on success. */
	getUserGifts: Method<GetUserGiftsParams, OwnedGifts>;
	/** Returns the gifts owned by a chat. Returns OwnedGifts on success. */
	getChatGifts: Method<GetChatGiftsParams, OwnedGifts>;
	/** Converts a given regular gift to Telegram Stars. Requires the can_convert_gifts_to_stars business bot right. Returns True on success. */
	convertGiftToStars: Method<ConvertGiftToStarsParams, true>;
	/** Upgrades a given regular gift to a unique gift. Requires the can_transfer_and_upgrade_gifts business bot right. Additionally requires the can_transfer_stars business bot right if the upgrade is paid. Returns True on success. */
	upgradeGift: Method<UpgradeGiftParams, true>;
	/** Transfers an owned unique gift to another user. Requires the can_transfer_and_upgrade_gifts business bot right. Requires can_transfer_stars business bot right if the transfer is paid. Returns True on success. */
	transferGift: Method<TransferGiftParams, true>;
}
