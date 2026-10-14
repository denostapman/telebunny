import type { Chat, User } from './chat.ts';
import type { Location } from './media.ts';
import type { Sticker } from './sticker.ts';

/** Contains information about the start page settings of a Telegram Business account. */
export interface BusinessIntro {
	/** Title text of the business intro */
	title?: string;
	/** Message text of the business intro */
	message?: string;
	/** Sticker of the business intro */
	sticker?: Sticker;
}

/** Contains information about the location of a Telegram Business account. */
export interface BusinessLocation {
	/** Address of the business */
	address: string;
	/** Location of the business */
	location?: Location;
}

/** Describes an interval of time during which a business is open. */
export interface BusinessOpeningHoursInterval {
	/** The minute's sequence number in a week, starting on Monday, marking the start of the time interval during which the business is open; 0 - 7 * 24 * 60 */
	openingMinute: number;
	/** The minute's sequence number in a week, starting on Monday, marking the end of the time interval during which the business is open; 0 - 8 * 24 * 60 */
	closingMinute: number;
}

/** Describes the opening hours of a business. */
export interface BusinessOpeningHours {
	/** Unique name of the time zone for which the opening hours are defined */
	timeZoneName: string;
	/** List of time intervals describing business opening hours */
	openingHours: BusinessOpeningHoursInterval[];
}

/** Represents the rights of a business bot. */
export interface BusinessBotRights {
	/** True, if the bot can send and edit messages in the private chats that had incoming messages in the last 24 hours */
	canReply?: true;
	/** True, if the bot can mark incoming private messages as read */
	canReadMessages?: true;
	/** True, if the bot can delete messages sent by the bot */
	canDeleteSentMessages?: true;
	/** True, if the bot can delete all private messages in managed chats */
	canDeleteAllMessages?: true;
	/** True, if the bot can edit the first and last name of the business account */
	canEditName?: true;
	/** True, if the bot can edit the bio of the business account */
	canEditBio?: true;
	/** True, if the bot can edit the profile photo of the business account */
	canEditProfilePhoto?: true;
	/** True, if the bot can edit the username of the business account */
	canEditUsername?: true;
	/** True, if the bot can change the privacy settings pertaining to gifts for the business account */
	canChangeGiftSettings?: true;
	/** True, if the bot can view gifts and the amount of Telegram Stars owned by the business account */
	canViewGiftsAndStars?: true;
	/** True, if the bot can convert regular gifts owned by the business account to Telegram Stars */
	canConvertGiftsToStars?: true;
	/** True, if the bot can transfer and upgrade gifts owned by the business account */
	canTransferAndUpgradeGifts?: true;
	/** True, if the bot can transfer Telegram Stars received by the business account to its own account, or use them to upgrade and transfer gifts */
	canTransferStars?: true;
	/** True, if the bot can post, edit and delete stories on behalf of the business account */
	canManageStories?: true;
}

/** Describes the connection of the bot with a business account. */
export interface BusinessConnection {
	/** Unique identifier of the business connection */
	id: string;
	/** Business account user that created the business connection */
	user: User;
	/** Identifier of a private chat with the user who created the business connection. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
	userChatId: number;
	/** Date the connection was established in Unix time */
	date: number;
	/** Rights of the business bot */
	rights?: BusinessBotRights;
	/** True, if the connection is active */
	isEnabled: boolean;
}

/** This object is received when messages are deleted from a connected business account. */
export interface BusinessMessagesDeleted {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Information about a chat in the business account. The bot may not have access to the chat or the corresponding user. */
	chat: Chat;
	/** The list of identifiers of deleted messages in the chat of the business account */
	messageIds: number[];
}
