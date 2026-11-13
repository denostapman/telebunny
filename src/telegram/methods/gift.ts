import type { ParseMode } from '../enums.ts';
import type { ChatId, EmptyObject } from '../types/common.ts';
import type { Gifts, OwnedGifts, UniqueGift } from '../types/gift.ts';
import type { MessageEntity } from '../types/message.ts';
import type { Method } from './common.ts';

export interface SendGiftParams {
	/** Required if chatId is not specified. Unique identifier of the target user who will receive the gift. */
	userId?: number;
	/** Required if userId is not specified. Unique identifier for the chat that will receive the gift or username of the channel in the format `@username`. */
	chatId?: ChatId;
	/** Identifier of the gift; limited gifts can't be sent to channel chats */
	giftId: string;
	/** Pass True to pay for the gift upgrade from the bot's balance, thereby making the upgrade free for the receiver */
	payForUpgrade?: boolean;
	/** Text that will be shown along with the gift; 0-128 characters */
	text?: string;
	/** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
	textParseMode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the gift text. It can be specified instead of textParseMode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
	textEntities?: MessageEntity[];
}

export interface GetUserGiftsParams {
	/** Unique identifier of the user */
	userId: number;
	/** Pass True to exclude gifts that can be purchased an unlimited number of times */
	excludeUnlimited?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
	excludeLimitedUpgradable?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
	excludeLimitedNonUpgradable?: boolean;
	/** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
	excludeFromBlockchain?: boolean;
	/** Pass True to exclude unique gifts */
	excludeUnique?: boolean;
	/** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
	sortByPrice?: boolean;
	/** Offset of the first entry to return as received from the previous request; use an empty string to get the first chunk of results */
	offset?: string;
	/** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
	limit?: number;
}

export interface GetChatGiftsParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chatId: ChatId;
	/** Pass True to exclude gifts that aren't saved to the chat's profile page. Always True, unless the bot has the can_post_messages administrator right in the channel. */
	excludeUnsaved?: boolean;
	/** Pass True to exclude gifts that are saved to the chat's profile page. Always False, unless the bot has the can_post_messages administrator right in the channel. */
	excludeSaved?: boolean;
	/** Pass True to exclude gifts that can be purchased an unlimited number of times */
	excludeUnlimited?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
	excludeLimitedUpgradable?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
	excludeLimitedNonUpgradable?: boolean;
	/** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
	excludeFromBlockchain?: boolean;
	/** Pass True to exclude unique gifts */
	excludeUnique?: boolean;
	/** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
	sortByPrice?: boolean;
	/** Offset of the first entry to return as received from the previous request; use an empty string to get the first chunk of results */
	offset?: string;
	/** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
	limit?: number;
}

export interface ConvertGiftToStarsParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Unique identifier of the regular gift that should be converted to Telegram Stars */
	ownedGiftId: string;
}

export interface DeleteBusinessAccountGiftParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Unique identifier of the regular gift that should be deleted */
	ownedGiftId: string;
}

export interface GetUniqueGiftParams {
	/** Unique name of the gift */
	name: string;
}

export interface UpgradeGiftParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Unique identifier of the regular gift that should be upgraded to a unique one */
	ownedGiftId: string;
	/** Pass True to keep the original gift text, sender and receiver in the upgraded gift */
	keepOriginalDetails?: boolean;
	/** The amount of Telegram Stars that will be paid for the upgrade from the business account balance. If `gift.prepaid_upgrade_star_count > 0`, then pass 0, otherwise, the canTransferStars business bot right is required and `gift.upgrade_star_count` must be passed. */
	starCount?: number;
}

export interface TransferGiftParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Unique identifier of the regular gift that should be transferred */
	ownedGiftId: string;
	/** Unique identifier of the chat which will own the gift. The chat must be active in the last 24 hours. */
	newOwnerChatId: number;
	/** The amount of Telegram Stars that will be paid for the transfer from the business account balance. If positive, then the canTransferStars business bot right is required. */
	starCount?: number;
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
	/** Use this method to get information about a unique gift by its name. Returns a UniqueGift object on success. */
	getUniqueGift: Method<GetUniqueGiftParams, UniqueGift>;
	/** Converts a given regular gift to Telegram Stars. Requires the canConvertGiftsToStars business bot right. Returns True on success. */
	convertGiftToStars: Method<ConvertGiftToStarsParams, true>;
	/** Deletes a regular gift owned by a managed business account without receiving Telegram Stars for it. Requires the canConvertGiftsToStars business bot right. The gift can be deleted only if it isn't limited (the field totalCount of the Gift is omitted) and wasn't refunded. Returns True on success. */
	deleteBusinessAccountGift: Method<DeleteBusinessAccountGiftParams, true>;
	/** Upgrades a given regular gift to a unique gift. Requires the canTransferAndUpgradeGifts business bot right. Additionally requires the canTransferStars business bot right if the upgrade is paid. Returns True on success. */
	upgradeGift: Method<UpgradeGiftParams, true>;
	/** Transfers an owned unique gift to another user. Requires the canTransferAndUpgradeGifts business bot right. Requires canTransferStars business bot right if the transfer is paid. Returns True on success. */
	transferGift: Method<TransferGiftParams, true>;
}
