import type { Chat, User } from './chat.ts';
import type { MessageEntity } from './message.ts';
import type { Sticker } from './sticker.ts';

/** This object describes the background of a gift. */
export interface GiftBackground {
	/** Center color of the background in RGB format */
	centerColor: number;
	/** Edge color of the background in RGB format */
	edgeColor: number;
	/** Text color of the background in RGB format */
	textColor: number;
}

/** This object represents a gift that can be sent by the bot. */
export interface Gift {
	/** Unique identifier of the gift */
	id: string;
	/** The sticker that represents the gift */
	sticker: Sticker;
	/** The number of Telegram Stars that must be paid to send the sticker */
	starCount: number;
	/** The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
	upgradeStarCount?: number;
	/** True, if the gift can only be purchased by Telegram Premium subscribers */
	isPremium?: true;
	/** True, if the gift can be used (after being upgraded) to customize a user's appearance */
	hasColors?: true;
	/** The total number of gifts of this type that can be sent by all users; for limited gifts only */
	totalCount?: number;
	/** The number of remaining gifts of this type that can be sent by all users; for limited gifts only */
	remainingCount?: number;
	/** The total number of gifts of this type that can be sent by the bot; for limited gifts only */
	personalTotalCount?: number;
	/** The number of remaining gifts of this type that can be sent by the bot; for limited gifts only */
	personalRemainingCount?: number;
	/** Background of the gift */
	background?: GiftBackground;
	/** The total number of different unique gifts that can be obtained by upgrading the gift */
	uniqueGiftVariantCount?: number;
	/** Information about the chat that published the gift */
	publisherChat?: Chat;
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
	rarityPerMille: number;
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
	rarityPerMille: number;
}

/** This object describes the colors of the backdrop of a unique gift. */
export interface UniqueGiftBackdropColors {
	/** The color in the center of the backdrop in RGB format */
	centerColor: number;
	/** The color on the edges of the backdrop in RGB format */
	edgeColor: number;
	/** The color to be applied to the symbol in RGB format */
	symbolColor: number;
	/** The color for the text on the backdrop in RGB format */
	textColor: number;
}

/** This object describes the backdrop of a unique gift. */
export interface UniqueGiftBackdrop {
	/** Name of the backdrop */
	name: string;
	/** Colors of the backdrop */
	colors: UniqueGiftBackdropColors;
	/** The number of unique gifts that receive this backdrop for every 1000 gifts upgraded */
	rarityPerMille: number;
}

/** This object contains information about the color scheme for a user's name, message replies and link previews based on a unique gift. */
export interface UniqueGiftColors {
	/** Custom emoji identifier of the unique gift's model */
	modelCustomEmojiId: string;
	/** Custom emoji identifier of the unique gift's symbol */
	symbolCustomEmojiId: string;
	/** Main color used in light themes; RGB format */
	lightThemeMainColor: number;
	/** List of 1-3 additional colors used in light themes; RGB format */
	lightThemeOtherColors: number[];
	/** Main color used in dark themes; RGB format */
	darkThemeMainColor: number;
	/** List of 1-3 additional colors used in dark themes; RGB format */
	darkThemeOtherColors: number[];
}

/** This object describes a unique gift that was upgraded from a regular gift. */
export interface UniqueGift {
	/** Identifier of the regular gift from which the gift was upgraded */
	giftId: string;
	/** Human-readable name of the regular gift from which this unique gift was upgraded */
	baseName: string;
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
	isPremium?: true;
	/** True, if the gift was used to craft another gift and isn't available anymore */
	isBurned?: true;
	/** True, if the gift is assigned from the TON blockchain and can't be resold or transferred in Telegram */
	isFromBlockchain?: true;
	/** The color scheme that can be used by the gift's owner for the chat's name, replies to messages and link previews; for business account gifts and gifts that are currently on sale only */
	colors?: UniqueGiftColors;
	/** Information about the chat that published the gift */
	publisherChat?: Chat;
}

/** Describes a service message about a regular gift that was sent or received. */
export interface GiftInfo {
	/** Information about the gift */
	gift: Gift;
	/** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	ownedGiftId?: string;
	/** Number of Telegram Stars that can be claimed by the receiver by converting the gift; omitted if conversion to Telegram Stars is impossible */
	convertStarCount?: number;
	/** Number of Telegram Stars that were prepaid for the ability to upgrade the gift */
	prepaidUpgradeStarCount?: number;
	/** True, if the gift's upgrade was purchased after the gift was sent */
	isUpgradeSeparate?: true;
	/** True, if the gift can be upgraded to a unique gift */
	canBeUpgraded?: true;
	/** Text of the message that was added to the gift */
	text?: string;
	/** Special entities that appear in the text */
	entities?: MessageEntity[];
	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	isPrivate?: true;
	/** Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
	uniqueGiftNumber?: number;
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
	isPrivate?: true;
	/** For gifts bought from other users, the currency in which the payment for the gift was done. Currently, one of “XTR” for Telegram Stars or “TON” for TON grams. */
	lastResaleCurrency?: 'XTR' | 'TON';
	/** For gifts bought from other users, the price paid for the gift in either Telegram Stars or nanograms */
	lastResaleAmount?: number;
	/** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	ownedGiftId?: string;
	/** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
	transferStarCount?: number;
	/** Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
	nextTransferDate?: number;
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
	ownedGiftId?: string;
	/** Sender of the gift if it is a known user */
	senderUser?: User;
	/** Date the gift was sent in Unix time */
	sendDate: number;
	/** Text of the message that was added to the gift */
	text?: string;
	/** Special entities that appear in the text */
	entities?: MessageEntity[];
	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	isPrivate?: true;
	/** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
	isSaved?: true;
	/** True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
	canBeUpgraded?: true;
	/** True, if the gift was refunded and isn't available anymore */
	wasRefunded?: true;
	/** Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars; for gifts received on behalf of business accounts only */
	convertStarCount?: number;
	/** Number of Telegram Stars that were paid for the ability to upgrade the gift */
	prepaidUpgradeStarCount?: number;
	/** True, if the gift's upgrade was purchased after the gift was sent; for gifts received on behalf of business accounts only */
	isUpgradeSeparate?: true;
	/** Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
	uniqueGiftNumber?: number;
}

/** Describes a unique gift received and owned by a user or a chat. */
export interface OwnedGiftUnique {
	/** Type of the gift, always “unique” */
	type: 'unique';
	/** Information about the unique gift */
	gift: UniqueGift;
	/** Unique identifier of the received gift for the bot; for gifts received on behalf of business accounts only */
	ownedGiftId?: string;
	/** Sender of the gift if it is a known user */
	senderUser?: User;
	/** Date the gift was sent in Unix time */
	sendDate: number;
	/** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
	isSaved?: true;
	/** True, if the gift can be transferred to another owner; for gifts received on behalf of business accounts only */
	canBeTransferred?: true;
	/** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
	transferStarCount?: number;
	/** Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
	nextTransferDate?: number;
}

/** Contains the list of gifts received and owned by a user or a chat. */
export interface OwnedGifts {
	/** The total number of gifts owned by the user or the chat */
	totalCount: number;
	/** The list of gifts */
	gifts: OwnedGift[];
	/** Offset for the next request. If empty, then there are no more results. */
	nextOffset?: string;
}

/** This object describes the types of gifts that can be gifted to a user or a chat. */
export interface AcceptedGiftTypes {
	/** True, if unlimited regular gifts are accepted */
	unlimitedGifts: boolean;
	/** True, if limited regular gifts are accepted */
	limitedGifts: boolean;
	/** True, if unique gifts or gifts that can be upgraded to unique for free are accepted */
	uniqueGifts: boolean;
	/** True, if a Telegram Premium subscription is accepted */
	premiumSubscription: boolean;
	/** True, if transfers of unique gifts from channels are accepted */
	giftsFromChannels: boolean;
}
