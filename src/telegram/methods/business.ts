import type { BusinessConnection } from '../types/business.ts';
import type { AcceptedGiftTypes, OwnedGifts } from '../types/gift.ts';
import type { InputProfilePhoto } from '../types/media.ts';
import type { StarAmount } from '../types/payment.ts';
import type { Method } from './common.ts';

export interface GetBusinessConnectionParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
}

export interface ReadBusinessMessageParams {
	/** Unique identifier of the business connection on behalf of which to read the message */
	business_connection_id: string;
	/** Unique identifier of the chat in which the message was received. The chat must have been active in the last 24 hours. */
	chat_id: number;
	/** Unique identifier of the message to mark as read */
	message_id: number;
}

export interface DeleteBusinessMessagesParams {
	/** Unique identifier of the business connection on behalf of which to delete the messages */
	business_connection_id: string;
	/** A JSON-serialized list of 1-100 identifiers of messages to delete. All messages must be from the same chat. See deleteMessage for limitations on which messages can be deleted. */
	message_ids: number[];
}

export interface SetBusinessAccountNameParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** The new value of the first name for the business account; 1-64 characters */
	first_name: string;
	/** The new value of the last name for the business account; 0-64 characters */
	last_name?: string;
}

export interface SetBusinessAccountUsernameParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** The new value of the username for the business account; 0-32 characters */
	username?: string;
}

export interface SetBusinessAccountBioParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** The new value of the bio for the business account; 0-140 characters */
	bio?: string;
}

export interface SetBusinessAccountProfilePhotoParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** The new profile photo to set */
	photo: InputProfilePhoto;
	/** Pass True to set the public photo, which will be visible even if the main photo is hidden by the business account's privacy settings. An account can have only one public photo. */
	is_public?: boolean;
}

export interface RemoveBusinessAccountProfilePhotoParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Pass True to remove the public photo, which is visible even if the main photo is hidden by the business account's privacy settings. After the main photo is removed, the previous profile photo (if present) becomes the main photo. */
	is_public?: boolean;
}

export interface SetBusinessAccountGiftSettingsParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Pass True if a button for sending a gift to the user or by the business account must always be shown in the input field */
	show_gift_button: boolean;
	/** Types of gifts accepted by the business account */
	accepted_gift_types: AcceptedGiftTypes;
}

export interface GetBusinessAccountStarBalanceParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
}

export interface TransferBusinessAccountStarsParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Number of Telegram Stars to transfer; 1-10000 */
	star_count: number;
}

export interface GetBusinessAccountGiftsParams {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Pass True to exclude gifts that aren't saved to the account's profile page */
	exclude_unsaved?: boolean;
	/** Pass True to exclude gifts that are saved to the account's profile page */
	exclude_saved?: boolean;
	/** Pass True to exclude gifts that can be purchased an unlimited number of times */
	exclude_unlimited?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
	exclude_limited_upgradable?: boolean;
	/** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
	exclude_limited_non_upgradable?: boolean;
	/** Pass True to exclude unique gifts */
	exclude_unique?: boolean;
	/** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
	exclude_from_blockchain?: boolean;
	/** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
	sort_by_price?: boolean;
	/** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
	offset?: string;
	/** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
	limit?: number;
}

export interface BusinessMethods {
	/** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
	getBusinessConnection: Method<
		GetBusinessConnectionParams,
		BusinessConnection
	>;
	/** Marks incoming message as read on behalf of a business account. Requires the can_read_messages business bot right. Returns True on success. */
	readBusinessMessage: Method<ReadBusinessMessageParams, true>;
	/** Delete messages on behalf of a business account. Requires the can_delete_sent_messages business bot right to delete messages sent by the bot itself, or the can_delete_all_messages business bot right to delete any message. Returns True on success. */
	deleteBusinessMessages: Method<DeleteBusinessMessagesParams, true>;
	/** Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success. */
	setBusinessAccountName: Method<SetBusinessAccountNameParams, true>;
	/** Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success. */
	setBusinessAccountUsername: Method<SetBusinessAccountUsernameParams, true>;
	/** Changes the bio of a managed business account. Requires the can_change_bio business bot right. Returns True on success. */
	setBusinessAccountBio: Method<SetBusinessAccountBioParams, true>;
	/** Changes the profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
	setBusinessAccountProfilePhoto: Method<
		SetBusinessAccountProfilePhotoParams,
		true
	>;
	/** Removes the current profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
	removeBusinessAccountProfilePhoto: Method<
		RemoveBusinessAccountProfilePhotoParams,
		true
	>;
	/** Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the can_change_gift_settings business bot right. Returns True on success. */
	setBusinessAccountGiftSettings: Method<
		SetBusinessAccountGiftSettingsParams,
		true
	>;
	/** Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns StarAmount on success. */
	getBusinessAccountStarBalance: Method<
		GetBusinessAccountStarBalanceParams,
		StarAmount
	>;
	/** Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right. Returns True on success. */
	transferBusinessAccountStars: Method<
		TransferBusinessAccountStarsParams,
		true
	>;
	/** Returns the gifts received and owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns OwnedGifts on success. */
	getBusinessAccountGifts: Method<GetBusinessAccountGiftsParams, OwnedGifts>;
}
