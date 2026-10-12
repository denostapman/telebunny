import type { Chat, User } from './chat.ts';
import type { MessageEntity } from './message.ts';
import type { Sticker } from './sticker.ts';

/** This object describes the background of a gift. */
export interface GiftBackground {
	/** Center color of the background in RGB format */
	center_color: number;
	/** Edge color of the background in RGB format */
	edge_color: number;
	/** Text color of the background in RGB format */
	text_color: number;
}

/** This object represents a gift that can be sent by the bot. */
export interface Gift {
	/** Unique identifier of the gift */
	id: string;
	/** The sticker that represents the gift */
	sticker: Sticker;
	/** The number of Telegram Stars that must be paid to send the sticker */
	star_count: number;
	/** The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
	upgrade_star_count?: number;
	/** True, if the gift can only be purchased by Telegram Premium subscribers */
	is_premium?: true;
	/** True, if the gift can be used (after being upgraded) to customize a user's appearance */
	has_colors?: true;
	/** The total number of gifts of this type that can be sent by all users; for limited gifts only */
	total_count?: number;
	/** The number of remaining gifts of this type that can be sent by all users; for limited gifts only */
	remaining_count?: number;
	/** The total number of gifts of this type that can be sent by the bot; for limited gifts only */
	personal_total_count?: number;
	/** The number of remaining gifts of this type that can be sent by the bot; for limited gifts only */
	personal_remaining_count?: number;
	/** Background of the gift */
	background?: GiftBackground;
	/** The total number of different unique gifts that can be obtained by upgrading the gift */
	unique_gift_variant_count?: number;
	/** Information about the chat that published the gift */
	publisher_chat?: Chat;
}

/** This object represent a list of gifts. */
export interface Gifts {
	/** The list of gifts */
	gifts: Gift[];
}

/** This object describes the model of a unique gift. */
export interface UniqueGiftModel {
	/** Name of the model */
	name: string;
	/** The sticker that represents the unique gift */
	sticker: Sticker;
	/** The number of unique gifts that receive this model for every 1000 gift upgrades. Always 0 for crafted gifts. */
	rarity_per_mille: number;
	/** Rarity of the model if it is a crafted model. Currently, can be “uncommon”, “rare”, “epic”, or “legendary”. */
	rarity?: 'uncommon' | 'rare' | 'epic' | 'legendary';
}

/** This object describes the symbol shown on the pattern of a unique gift. */
export interface UniqueGiftSymbol {
	/** Name of the symbol */
	name: string;
	/** The sticker that represents the unique gift */
	sticker: Sticker;
	/** The number of unique gifts that receive this model for every 1000 gifts upgraded */
	rarity_per_mille: number;
}

/** This object describes the colors of the backdrop of a unique gift. */
export interface UniqueGiftBackdropColors {
	/** The color in the center of the backdrop in RGB format */
	center_color: number;
	/** The color on the edges of the backdrop in RGB format */
	edge_color: number;
	/** The color to be applied to the symbol in RGB format */
	symbol_color: number;
	/** The color for the text on the backdrop in RGB format */
	text_color: number;
}

/** This object describes the backdrop of a unique gift. */
export interface UniqueGiftBackdrop {
	/** Name of the backdrop */
	name: string;
	/** Colors of the backdrop */
	colors: UniqueGiftBackdropColors;
	/** The number of unique gifts that receive this backdrop for every 1000 gifts upgraded */
	rarity_per_mille: number;
}

/** This object contains information about the color scheme for a user's name, message replies and link previews based on a unique gift. */
export interface UniqueGiftColors {
	/** Custom emoji identifier of the unique gift's model */
	model_custom_emoji_id: string;
	/** Custom emoji identifier of the unique gift's symbol */
	symbol_custom_emoji_id: string;
	/** Main color used in light themes; RGB format */
	light_theme_main_color: number;
	/** List of 1-3 additional colors used in light themes; RGB format */
	light_theme_other_colors: number[];
	/** Main color used in dark themes; RGB format */
	dark_theme_main_color: number;
	/** List of 1-3 additional colors used in dark themes; RGB format */
	dark_theme_other_colors: number[];
}

/** This object describes a unique gift that was upgraded from a regular gift. */
export interface UniqueGift {
	/** Identifier of the regular gift from which the gift was upgraded */
	gift_id: string;
	/** Human-readable name of the regular gift from which this unique gift was upgraded */
	base_name: string;
	/** Unique name of the gift. This name can be used in `https://t.me/nft/...` links and story areas. */
	name: string;
	/** Unique number of the upgraded gift among gifts upgraded from the same regular gift */
	number: number;
	/** Model of the gift */
	model: UniqueGiftModel;
	/** Symbol of the gift */
	symbol: UniqueGiftSymbol;
	/** Backdrop of the gift */
	backdrop: UniqueGiftBackdrop;
	/** True, if the original regular gift was exclusively purchaseable by Telegram Premium subscribers */
	is_premium?: true;
	/** True, if the gift was used to craft another gift and isn't available anymore */
	is_burned?: true;
	/** True, if the gift is assigned from the TON blockchain and can't be resold or transferred in Telegram */
	is_from_blockchain?: true;
	/** The color scheme that can be used by the gift's owner for the chat's name, replies to messages and link previews; for business account gifts and gifts that are currently on sale only */
	colors?: UniqueGiftColors;
	/** Information about the chat that published the gift */
	publisher_chat?: Chat;
}

/** Describes a service message about a regular gift that was sent or received. */
export interface GiftInfo {
	/** Information about the gift */
	gift: Gift;
	/** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	owned_gift_id?: string;
	/** Number of Telegram Stars that can be claimed by the receiver by converting the gift; omitted if conversion to Telegram Stars is impossible */
	convert_star_count?: number;
	/** Number of Telegram Stars that were prepaid for the ability to upgrade the gift */
	prepaid_upgrade_star_count?: number;
	/** True, if the gift's upgrade was purchased after the gift was sent */
	is_upgrade_separate?: true;
	/** True, if the gift can be upgraded to a unique gift */
	can_be_upgraded?: true;
	/** Text of the message that was added to the gift */
	text?: string;
	/** Special entities that appear in the text */
	entities?: MessageEntity[];
	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	is_private?: true;
	/** Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
	unique_gift_number?: number;
}

/** Describes a service message about a unique gift that was sent or received. */
export interface UniqueGiftInfo {
	/** Information about the gift */
	gift: UniqueGift;
	/** Origin of the gift. Currently, either “upgrade” for gifts upgraded from regular gifts, “transfer” for gifts transferred from other users or channels, “resale” for gifts bought from other users, “gifted_upgrade” for upgrades purchased after the gift was sent, or “offer” for gifts bought or sold through gift purchase offers. */
	origin: 'upgrade' | 'transfer' | 'resale' | 'gifted_upgrade' | 'offer';
	/** Text of the message that was added to the gift */
	text?: string;
	/** Special entities that appear in the text */
	entities?: MessageEntity[];
	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	is_private?: true;
	/** For gifts bought from other users, the currency in which the payment for the gift was done. Currently, one of “XTR” for Telegram Stars or “TON” for TON grams. */
	last_resale_currency?: 'XTR' | 'TON';
	/** For gifts bought from other users, the price paid for the gift in either Telegram Stars or nanograms */
	last_resale_amount?: number;
	/** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	owned_gift_id?: string;
	/** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
	transfer_star_count?: number;
	/** Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
	next_transfer_date?: number;
}

/** This object describes a gift received and owned by a user or a chat. Currently, it can be one of */
export type OwnedGift = OwnedGiftRegular | OwnedGiftUnique;

/** Describes a regular gift owned by a user or a chat. */
export interface OwnedGiftRegular {
	/** Type of the gift, always “regular” */
	type: 'regular';
	/** Information about the regular gift */
	gift: Gift;
	/** Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
	owned_gift_id?: string;
	/** Sender of the gift if it is a known user */
	sender_user?: User;
	/** Date the gift was sent in Unix time */
	send_date: number;
	/** Text of the message that was added to the gift */
	text?: string;
	/** Special entities that appear in the text */
	entities?: MessageEntity[];
	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	is_private?: true;
	/** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
	is_saved?: true;
	/** True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
	can_be_upgraded?: true;
	/** True, if the gift was refunded and isn't available anymore */
	was_refunded?: true;
	/** Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars; for gifts received on behalf of business accounts only */
	convert_star_count?: number;
	/** Number of Telegram Stars that were paid for the ability to upgrade the gift */
	prepaid_upgrade_star_count?: number;
	/** True, if the gift's upgrade was purchased after the gift was sent; for gifts received on behalf of business accounts only */
	is_upgrade_separate?: true;
	/** Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
	unique_gift_number?: number;
}

/** Describes a unique gift received and owned by a user or a chat. */
export interface OwnedGiftUnique {
	/** Type of the gift, always “unique” */
	type: 'unique';
	/** Information about the unique gift */
	gift: UniqueGift;
	/** Unique identifier of the received gift for the bot; for gifts received on behalf of business accounts only */
	owned_gift_id?: string;
	/** Sender of the gift if it is a known user */
	sender_user?: User;
	/** Date the gift was sent in Unix time */
	send_date: number;
	/** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
	is_saved?: true;
	/** True, if the gift can be transferred to another owner; for gifts received on behalf of business accounts only */
	can_be_transferred?: true;
	/** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
	transfer_star_count?: number;
	/** Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
	next_transfer_date?: number;
}

/** Contains the list of gifts received and owned by a user or a chat. */
export interface OwnedGifts {
	/** The total number of gifts owned by the user or the chat */
	total_count: number;
	/** The list of gifts */
	gifts: OwnedGift[];
	/** Offset for the next request. If empty, then there are no more results. */
	next_offset?: string;
}

/** This object describes the types of gifts that can be gifted to a user or a chat. */
export interface AcceptedGiftTypes {
	/** True, if unlimited regular gifts are accepted */
	unlimited_gifts: boolean;
	/** True, if limited regular gifts are accepted */
	limited_gifts: boolean;
	/** True, if unique gifts or gifts that can be upgraded to unique for free are accepted */
	unique_gifts: boolean;
	/** True, if a Telegram Premium subscription is accepted */
	premium_subscription: boolean;
	/** True, if transfers of unique gifts from channels are accepted */
	gifts_from_channels: boolean;
}
