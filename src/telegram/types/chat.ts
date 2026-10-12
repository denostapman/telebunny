import type { ChatType, ForumTopicIconColor } from '../enums.ts';
import type {
	BusinessIntro,
	BusinessLocation,
	BusinessOpeningHours,
} from './business.ts';
import type { AcceptedGiftTypes, UniqueGiftColors } from './gift.ts';
import type { Audio, Location } from './media.ts';
import type { Message, ReactionType } from './message.ts';

/** This object represents a Telegram user or bot. */
export interface User {
	/** Unique identifier for this user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
	id: number;
	/** True, if this user is a bot */
	is_bot: boolean;
	/** User's or bot's first name */
	first_name: string;
	/** User's or bot's last name */
	last_name?: string;
	/** User's or bot's username */
	username?: string;
	/** IETF language tag of the user's language */
	language_code?: string;
	/** True, if this user is a Telegram Premium user */
	is_premium?: true;
	/** True, if this user added the bot to the attachment menu */
	added_to_attachment_menu?: true;
	/** True, if the bot can be invited to groups. Returned only in getMe. */
	can_join_groups?: boolean;
	/** True, if privacy mode is disabled for the bot. Returned only in getMe. */
	can_read_all_group_messages?: boolean;
	/** True, if the bot supports guest queries from chats it is not a member of. Returned only in getMe. */
	supports_guest_queries?: boolean;
	/** True, if the bot supports inline queries. Returned only in getMe. */
	supports_inline_queries?: boolean;
	/** True, if the bot can be connected to a user account to manage it. Returned only in getMe. */
	can_connect_to_business?: boolean;
	/** True, if the bot has a main Web App. Returned only in getMe. */
	has_main_web_app?: boolean;
	/** True, if the bot has forum topic mode enabled in private chats. Returned only in getMe. */
	has_topics_enabled?: boolean;
	/** True, if the bot allows users to create and delete topics in private chats. Returned only in getMe. */
	allows_users_to_create_topics?: boolean;
	/** True, if other bots can be created to be controlled by the bot. Returned only in getMe. */
	can_manage_bots?: boolean;
	/** True, if the bot supports join request queries and can be assigned to process them. Returned only in getMe. */
	supports_join_request_queries?: boolean;
}

/** This object represents a chat. */
export interface Chat {
	/** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	id: number;
	/** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
	type: ChatType;
	/** Title, for supergroups, channels and group chats */
	title?: string;
	/** Username, for private chats, supergroups and channels if available */
	username?: string;
	/** First name of the other party in a private chat */
	first_name?: string;
	/** Last name of the other party in a private chat */
	last_name?: string;
	/** True, if the supergroup chat is a forum (has topics enabled) */
	is_forum?: true;
	/** True, if the chat is the direct messages chat of a channel */
	is_direct_messages?: true;
}

/** This object contains full information about a chat. */
export interface ChatFullInfo {
	/** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	id: number;
	/** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
	type: ChatType;
	/** Title, for supergroups, channels and group chats */
	title?: string;
	/** Username, for private chats, supergroups and channels if available */
	username?: string;
	/** First name of the other party in a private chat */
	first_name?: string;
	/** Last name of the other party in a private chat */
	last_name?: string;
	/** True, if the supergroup chat is a forum (has topics enabled) */
	is_forum?: true;
	/** True, if the chat is the direct messages chat of a channel */
	is_direct_messages?: true;
	/** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details. */
	accent_color_id: number;
	/** The maximum number of reactions that can be set on a message in the chat */
	max_reaction_count: number;
	/** Chat photo */
	photo?: ChatPhoto;
	/** If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
	active_usernames?: string[];
	/** For private chats, the date of birth of the user */
	birthdate?: Birthdate;
	/** For private chats with business accounts, the intro of the business */
	business_intro?: BusinessIntro;
	/** For private chats with business accounts, the location of the business */
	business_location?: BusinessLocation;
	/** For private chats with business accounts, the opening hours of the business */
	business_opening_hours?: BusinessOpeningHours;
	/** For private chats, the personal channel of the user */
	personal_chat?: Chat;
	/** Information about the corresponding channel chat; for direct messages chats only */
	parent_chat?: Chat;
	/** List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed. */
	available_reactions?: ReactionType[];
	/** Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background */
	background_custom_emoji_id?: string;
	/** Identifier of the accent color for the chat's profile background. See profile accent colors for more details. */
	profile_accent_color_id?: number;
	/** Custom emoji identifier of the emoji chosen by the chat for its profile background */
	profile_background_custom_emoji_id?: string;
	/** Custom emoji identifier of the emoji status of the chat or the other party in a private chat */
	emoji_status_custom_emoji_id?: string;
	/** Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any */
	emoji_status_expiration_date?: number;
	/** Bio of the other party in a private chat */
	bio?: string;
	/** True, if privacy settings of the other party in the private chat allows to use `tg://user?id=<user_id>` links only in chats with the user */
	has_private_forwards?: true;
	/** True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat */
	has_restricted_voice_and_video_messages?: true;
	/** True, if users need to join the supergroup before they can send messages */
	join_to_send_messages?: true;
	/** True, if all users directly joining the supergroup without using an invite link need to be approved by supergroup administrators */
	join_by_request?: true;
	/** Description, for groups, supergroups and channel chats */
	description?: string;
	/** Primary invite link, for groups, supergroups and channel chats */
	invite_link?: string;
	/** The most recent pinned message (by sending date) */
	pinned_message?: Message;
	/** Default chat member permissions, for groups and supergroups */
	permissions?: ChatPermissions;
	/** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
	accepted_gift_types: AcceptedGiftTypes;
	/** True, if paid media messages can be sent or forwarded to the channel chat. The field is available only for channel chats. */
	can_send_paid_media?: true;
	/** For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user; in seconds */
	slow_mode_delay?: number;
	/** For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions */
	unrestrict_boost_count?: number;
	/** The time after which all messages sent to the chat will be automatically deleted; in seconds */
	message_auto_delete_time?: number;
	/** True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators. */
	has_aggressive_anti_spam_enabled?: true;
	/** True, if non-administrators can only get the list of bots and administrators in the chat */
	has_hidden_members?: true;
	/** True, if messages from the chat can't be forwarded to other chats */
	has_protected_content?: true;
	/** True, if new chat members will have access to old messages; available only to chat administrators */
	has_visible_history?: true;
	/** For supergroups, name of the group sticker set */
	sticker_set_name?: string;
	/** True, if the bot can change the group sticker set */
	can_set_sticker_set?: true;
	/** For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group. */
	custom_emoji_sticker_set_name?: string;
	/** Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
	linked_chat_id?: number;
	/** For supergroups, the location to which the supergroup is connected */
	location?: ChatLocation;
	/** For private chats, the rating of the user if any */
	rating?: UserRating;
	/** For private chats, the first audio added to the profile of the user */
	first_profile_audio?: Audio;
	/** The color scheme based on a unique gift that must be used for the chat's name, message replies and link previews */
	unique_gift_colors?: UniqueGiftColors;
	/** The number of Telegram Stars a general user has to pay to send a message to the chat */
	paid_message_star_count?: number;
	/** The bot that processes join request queries in the chat. The field is only available to chat administrators. */
	guard_bot?: User;
	/** The Community to which the chat belongs */
	community?: Community;
}

/** Describes a topic of a direct messages chat. */
export interface DirectMessagesTopic {
	/** Unique identifier of the topic. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
	topic_id: number;
	/** Information about the user that created the topic. Currently, it is always present. */
	user?: User;
}

/** Represents a community (a group of chats). */
export interface Community {
	/** Unique identifier for this community. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	id: number;
	/** Name of the community */
	name: string;
}

/** This object represents a chat photo. */
export interface ChatPhoto {
	/** File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
	small_file_id: string;
	/** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	small_file_unique_id: string;
	/** File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
	big_file_id: string;
	/** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	big_file_unique_id: string;
}

/** Represents an invite link for a chat. */
export interface ChatInviteLink {
	/** The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with “…”. */
	invite_link: string;
	/** Creator of the link */
	creator: User;
	/** True, if users joining the chat via the link need to be approved by chat administrators */
	creates_join_request: boolean;
	/** True, if the link is primary */
	is_primary: boolean;
	/** True, if the link is revoked */
	is_revoked: boolean;
	/** Invite link name */
	name?: string;
	/** Point in time (Unix timestamp) when the link will expire or has been expired */
	expire_date?: number;
	/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
	member_limit?: number;
	/** Number of pending join requests created using this link */
	pending_join_request_count?: number;
	/** The number of seconds the subscription will be active for before the next payment */
	subscription_period?: number;
	/** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat using the link */
	subscription_price?: number;
}

/** Represents the rights of an administrator in a chat. */
export interface ChatAdministratorRights {
	/** True, if the user's presence in the chat is hidden */
	is_anonymous: boolean;
	/** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
	can_manage_chat: boolean;
	/** True, if the administrator can delete messages of other users */
	can_delete_messages: boolean;
	/** True, if the administrator can manage video chats */
	can_manage_video_chats: boolean;
	/** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
	can_restrict_members: boolean;
	/** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
	can_promote_members: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	can_change_info: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	can_invite_users: boolean;
	/** True, if the administrator can post stories to the chat */
	can_post_stories: boolean;
	/** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
	can_edit_stories: boolean;
	/** True, if the administrator can delete stories posted by other users */
	can_delete_stories: boolean;
	/** True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
	can_post_messages?: boolean;
	/** True, if the administrator can edit messages of other users and can pin messages; for channels only */
	can_edit_messages?: boolean;
	/** True, if the user is allowed to pin messages; for groups and supergroups only */
	can_pin_messages?: boolean;
	/** True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
	can_manage_topics?: boolean;
	/** True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
	can_manage_direct_messages?: boolean;
	/** True, if the administrator can edit the tags of regular members; for groups and supergroups only */
	can_manage_tags?: boolean;
	/** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
	can_send_welcome_messages: boolean;
}

/** This object represents changes in the status of a chat member. */
export interface ChatMemberUpdated {
	/** Chat the user belongs to */
	chat: Chat;
	/** Performer of the action, which resulted in the change */
	from: User;
	/** Date the change was done in Unix time */
	date: number;
	/** Previous information about the chat member */
	old_chat_member: ChatMember;
	/** New information about the chat member */
	new_chat_member: ChatMember;
	/** Chat invite link, which was used by the user to join the chat; for joining by invite link events only */
	invite_link?: ChatInviteLink;
	/** True, if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator */
	via_join_request?: boolean;
	/** True, if the user joined the chat via a chat folder invite link */
	via_chat_folder_invite_link?: boolean;
}

/** This object contains information about one member of a chat. Currently, the following 6 types of chat members are supported: */
export type ChatMember =
	| ChatMemberOwner
	| ChatMemberAdministrator
	| ChatMemberMember
	| ChatMemberRestricted
	| ChatMemberLeft
	| ChatMemberBanned;

/** Represents a chat member that owns the chat and has all administrator privileges. */
export interface ChatMemberOwner {
	/** The member's status in the chat, always “creator” */
	status: 'creator';
	/** Information about the user */
	user: User;
	/** True, if the user's presence in the chat is hidden */
	is_anonymous: boolean;
	/** Custom title for this user */
	custom_title?: string;
}

/** Represents a chat member that has some additional privileges. */
export interface ChatMemberAdministrator {
	/** The member's status in the chat, always “administrator” */
	status: 'administrator';
	/** Information about the user */
	user: User;
	/** True, if the bot is allowed to edit administrator privileges of that user */
	can_be_edited: boolean;
	/** True, if the user's presence in the chat is hidden */
	is_anonymous: boolean;
	/** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
	can_manage_chat: boolean;
	/** True, if the administrator can delete messages of other users */
	can_delete_messages: boolean;
	/** True, if the administrator can manage video chats */
	can_manage_video_chats: boolean;
	/** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
	can_restrict_members: boolean;
	/** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
	can_promote_members: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	can_change_info: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	can_invite_users: boolean;
	/** True, if the administrator can post stories to the chat */
	can_post_stories: boolean;
	/** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
	can_edit_stories: boolean;
	/** True, if the administrator can delete stories posted by other users */
	can_delete_stories: boolean;
	/** True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
	can_post_messages?: boolean;
	/** True, if the administrator can edit messages of other users and can pin messages; for channels only */
	can_edit_messages?: boolean;
	/** True, if the user is allowed to pin messages; for groups and supergroups only */
	can_pin_messages?: boolean;
	/** True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
	can_manage_topics?: boolean;
	/** True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
	can_manage_direct_messages?: boolean;
	/** True, if the administrator can edit the tags of regular members; for groups and supergroups only */
	can_manage_tags?: boolean;
	/** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
	can_send_welcome_messages: boolean;
	/** Custom title for this user */
	custom_title?: string;
}

/** Represents a chat member that has no additional privileges or restrictions. */
export interface ChatMemberMember {
	/** The member's status in the chat, always “member” */
	status: 'member';
	/** Tag of the member */
	tag?: string;
	/** Information about the user */
	user: User;
	/** Date when the user's subscription will expire; Unix time */
	until_date?: number;
}

/** Represents a chat member that is under certain restrictions in the chat. Supergroups only. */
export interface ChatMemberRestricted {
	/** The member's status in the chat, always “restricted” */
	status: 'restricted';
	/** Tag of the member */
	tag?: string;
	/** Information about the user */
	user: User;
	/** True, if the user is a member of the chat at the moment of the request */
	is_member: boolean;
	/** True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
	can_send_messages: boolean;
	/** True, if the user is allowed to send audios */
	can_send_audios: boolean;
	/** True, if the user is allowed to send documents */
	can_send_documents: boolean;
	/** True, if the user is allowed to send photos */
	can_send_photos: boolean;
	/** True, if the user is allowed to send videos */
	can_send_videos: boolean;
	/** True, if the user is allowed to send video notes */
	can_send_video_notes: boolean;
	/** True, if the user is allowed to send voice notes */
	can_send_voice_notes: boolean;
	/** True, if the user is allowed to send polls and checklists */
	can_send_polls: boolean;
	/** True, if the user is allowed to send animations, games, stickers and use inline bots */
	can_send_other_messages: boolean;
	/** True, if the user is allowed to add web page previews to their messages */
	can_add_web_page_previews: boolean;
	/** True, if the user is allowed to react to messages */
	can_react_to_messages: boolean;
	/** True, if the user is allowed to edit their own tag */
	can_edit_tag: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	can_change_info: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	can_invite_users: boolean;
	/** True, if the user is allowed to pin messages */
	can_pin_messages: boolean;
	/** True, if the user is allowed to create forum topics */
	can_manage_topics: boolean;
	/** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever. */
	until_date: number;
}

/** Represents a chat member that isn't currently a member of the chat, but may join it themselves. */
export interface ChatMemberLeft {
	/** The member's status in the chat, always “left” */
	status: 'left';
	/** Information about the user */
	user: User;
}

/** Represents a chat member that was banned in the chat and can't return to the chat or view chat messages. */
export interface ChatMemberBanned {
	/** The member's status in the chat, always “kicked” */
	status: 'kicked';
	/** Information about the user */
	user: User;
	/** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is banned forever. */
	until_date: number;
}

/** Represents a join request sent to a chat. */
export interface ChatJoinRequest {
	/** Chat to which the request was sent */
	chat: Chat;
	/** User that sent the join request */
	from: User;
	/** Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user. */
	user_chat_id: number;
	/** Date the request was sent in Unix time */
	date: number;
	/** Bio of the user */
	bio?: string;
	/** Chat invite link that was used by the user to send the join request */
	invite_link?: ChatInviteLink;
	/** Identifier of the join request query; for bots assigned to process join requests only. If present, then the bot must call sendChatJoinRequestWebApp or directly call answerChatJoinRequestQuery within 10 seconds. */
	query_id?: string;
}

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface ChatPermissions {
	/** True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
	can_send_messages?: boolean;
	/** True, if the user is allowed to send audios */
	can_send_audios?: boolean;
	/** True, if the user is allowed to send documents */
	can_send_documents?: boolean;
	/** True, if the user is allowed to send photos */
	can_send_photos?: boolean;
	/** True, if the user is allowed to send videos */
	can_send_videos?: boolean;
	/** True, if the user is allowed to send video notes */
	can_send_video_notes?: boolean;
	/** True, if the user is allowed to send voice notes */
	can_send_voice_notes?: boolean;
	/** True, if the user is allowed to send polls and checklists */
	can_send_polls?: boolean;
	/** True, if the user is allowed to send animations, games, stickers and use inline bots */
	can_send_other_messages?: boolean;
	/** True, if the user is allowed to add web page previews to their messages */
	can_add_web_page_previews?: boolean;
	/** True, if the user is allowed to react to messages. If omitted, defaults to the value of can_send_messages. */
	can_react_to_messages?: boolean;
	/** True, if the user is allowed to edit their own tag. If omitted, defaults to the value of can_pin_messages. */
	can_edit_tag?: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups. */
	can_change_info?: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	can_invite_users?: boolean;
	/** True, if the user is allowed to pin messages. Ignored in public supergroups. */
	can_pin_messages?: boolean;
	/** True, if the user is allowed to create forum topics. If omitted, defaults to the value of can_pin_messages. */
	can_manage_topics?: boolean;
}

/** Describes the birthdate of a user. */
export interface Birthdate {
	/** Day of the user's birth; 1-31 */
	day: number;
	/** Month of the user's birth; 1-12 */
	month: number;
	/** Year of the user's birth */
	year?: number;
}

/** This object describes the rating of a user based on their Telegram Star spendings. */
export interface UserRating {
	/** Current level of the user, indicating their reliability when purchasing digital goods and services. A higher level suggests a more trustworthy customer; a negative level is likely reason for concern. */
	level: number;
	/** Numerical value of the user's rating; the higher the rating, the better */
	rating: number;
	/** The rating value required to get the current level */
	current_level_rating: number;
	/** The rating value required to get to the next level; omitted if the maximum level was reached */
	next_level_rating?: number;
}

/** Represents a location to which a chat is connected. */
export interface ChatLocation {
	/** The location to which the supergroup is connected. Can't be a live location. */
	location: Location;
	/** Location address; 1-64 characters, as defined by the chat owner */
	address: string;
}

/** This object represents a forum topic. */
export interface ForumTopic {
	/** Unique identifier of the forum topic */
	message_thread_id: number;
	/** Name of the topic */
	name: string;
	/** Color of the topic icon in RGB format */
	icon_color: ForumTopicIconColor;
	/** Unique identifier of the custom emoji shown as the topic icon */
	icon_custom_emoji_id?: string;
	/** True, if the name of the topic wasn't specified explicitly by its creator and likely needs to be changed by the bot */
	is_name_implicit?: true;
}

/** This object describes the source of a chat boost. It can be one of */
export type ChatBoostSource =
	ChatBoostSourcePremium | ChatBoostSourceGiftCode | ChatBoostSourceGiveaway;

/** The boost was obtained by subscribing to Telegram Premium or by gifting a Telegram Premium subscription to another user. */
export interface ChatBoostSourcePremium {
	/** Source of the boost, always “premium” */
	source: 'premium';
	/** User that boosted the chat */
	user: User;
}

/** The boost was obtained by the creation of Telegram Premium gift codes to boost a chat. Each such code boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription. */
export interface ChatBoostSourceGiftCode {
	/** Source of the boost, always “gift_code” */
	source: 'gift_code';
	/** User for which the gift code was created */
	user: User;
}

/** The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway. This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription for Telegram Premium giveaways and prize_star_count / 500 times for one year for Telegram Star giveaways. */
export interface ChatBoostSourceGiveaway {
	/** Source of the boost, always “giveaway” */
	source: 'giveaway';
	/** Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet. */
	giveaway_message_id: number;
	/** User that won the prize in the giveaway if any; for Telegram Premium giveaways only */
	user?: User;
	/** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
	prize_star_count?: number;
	/** True, if the giveaway was completed, but there was no user to win the prize */
	is_unclaimed?: true;
}

/** This object contains information about a chat boost. */
export interface ChatBoost {
	/** Unique identifier of the boost */
	boost_id: string;
	/** Point in time (Unix timestamp) when the chat was boosted */
	add_date: number;
	/** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
	expiration_date: number;
	/** Source of the added boost */
	source: ChatBoostSource;
}

/** This object represents a boost added to a chat or changed. */
export interface ChatBoostUpdated {
	/** Chat which was boosted */
	chat: Chat;
	/** Information about the chat boost */
	boost: ChatBoost;
}

/** This object represents a boost removed from a chat. */
export interface ChatBoostRemoved {
	/** Chat which was boosted */
	chat: Chat;
	/** Unique identifier of the boost */
	boost_id: string;
	/** Point in time (Unix timestamp) when the boost was removed */
	remove_date: number;
	/** Source of the removed boost */
	source: ChatBoostSource;
}

/** This object represents a list of boosts added to a chat by a user. */
export interface UserChatBoosts {
	/** The list of boosts added to the chat by the user */
	boosts: ChatBoost[];
}
