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
	isBot: boolean;
	/** User's or bot's first name */
	firstName: string;
	/** User's or bot's last name */
	lastName?: string;
	/** User's or bot's username */
	username?: string;
	/** IETF language tag of the user's language */
	languageCode?: string;
	/** True, if this user is a Telegram Premium user */
	isPremium?: true;
	/** True, if this user added the bot to the attachment menu */
	addedToAttachmentMenu?: true;
	/** True, if the bot can be invited to groups. Returned only in getMe. */
	canJoinGroups?: boolean;
	/** True, if privacy mode is disabled for the bot. Returned only in getMe. */
	canReadAllGroupMessages?: boolean;
	/** True, if the bot supports guest queries from chats it is not a member of. Returned only in getMe. */
	supportsGuestQueries?: boolean;
	/** True, if the bot supports inline queries. Returned only in getMe. */
	supportsInlineQueries?: boolean;
	/** True, if the bot can be connected to a user account to manage it. Returned only in getMe. */
	canConnectToBusiness?: boolean;
	/** True, if the bot has a main Web App. Returned only in getMe. */
	hasMainWebApp?: boolean;
	/** True, if the bot has forum topic mode enabled in private chats. Returned only in getMe. */
	hasTopicsEnabled?: boolean;
	/** True, if the bot allows users to create and delete topics in private chats. Returned only in getMe. */
	allowsUsersToCreateTopics?: boolean;
	/** True, if other bots can be created to be controlled by the bot. Returned only in getMe. */
	canManageBots?: boolean;
	/** True, if the bot supports join request queries and can be assigned to process them. Returned only in getMe. */
	supportsJoinRequestQueries?: boolean;
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
	firstName?: string;
	/** Last name of the other party in a private chat */
	lastName?: string;
	/** True, if the supergroup chat is a forum (has topics enabled) */
	isForum?: true;
	/** True, if the chat is the direct messages chat of a channel */
	isDirectMessages?: true;
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
	firstName?: string;
	/** Last name of the other party in a private chat */
	lastName?: string;
	/** True, if the supergroup chat is a forum (has topics enabled) */
	isForum?: true;
	/** True, if the chat is the direct messages chat of a channel */
	isDirectMessages?: true;
	/** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details. */
	accentColorId: number;
	/** The maximum number of reactions that can be set on a message in the chat */
	maxReactionCount: number;
	/** Chat photo */
	photo?: ChatPhoto;
	/** If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
	activeUsernames?: string[];
	/** For private chats, the date of birth of the user */
	birthdate?: Birthdate;
	/** For private chats with business accounts, the intro of the business */
	businessIntro?: BusinessIntro;
	/** For private chats with business accounts, the location of the business */
	businessLocation?: BusinessLocation;
	/** For private chats with business accounts, the opening hours of the business */
	businessOpeningHours?: BusinessOpeningHours;
	/** For private chats, the personal channel of the user */
	personalChat?: Chat;
	/** Information about the corresponding channel chat; for direct messages chats only */
	parentChat?: Chat;
	/** List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed. */
	availableReactions?: ReactionType[];
	/** Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background */
	backgroundCustomEmojiId?: string;
	/** Identifier of the accent color for the chat's profile background. See profile accent colors for more details. */
	profileAccentColorId?: number;
	/** Custom emoji identifier of the emoji chosen by the chat for its profile background */
	profileBackgroundCustomEmojiId?: string;
	/** Custom emoji identifier of the emoji status of the chat or the other party in a private chat */
	emojiStatusCustomEmojiId?: string;
	/** Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any */
	emojiStatusExpirationDate?: number;
	/** Bio of the other party in a private chat */
	bio?: string;
	/** True, if privacy settings of the other party in the private chat allows to use `tg://user?id=<user_id>` links only in chats with the user */
	hasPrivateForwards?: true;
	/** True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat */
	hasRestrictedVoiceAndVideoMessages?: true;
	/** True, if users need to join the supergroup before they can send messages */
	joinToSendMessages?: true;
	/** True, if all users directly joining the supergroup without using an invite link need to be approved by supergroup administrators */
	joinByRequest?: true;
	/** Description, for groups, supergroups and channel chats */
	description?: string;
	/** Primary invite link, for groups, supergroups and channel chats */
	inviteLink?: string;
	/** The most recent pinned message (by sending date) */
	pinnedMessage?: Message;
	/** Default chat member permissions, for groups and supergroups */
	permissions?: ChatPermissions;
	/** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
	acceptedGiftTypes: AcceptedGiftTypes;
	/** True, if paid media messages can be sent or forwarded to the channel chat. The field is available only for channel chats. */
	canSendPaidMedia?: true;
	/** For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user; in seconds */
	slowModeDelay?: number;
	/** For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions */
	unrestrictBoostCount?: number;
	/** The time after which all messages sent to the chat will be automatically deleted; in seconds */
	messageAutoDeleteTime?: number;
	/** True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators. */
	hasAggressiveAntiSpamEnabled?: true;
	/** True, if non-administrators can only get the list of bots and administrators in the chat */
	hasHiddenMembers?: true;
	/** True, if messages from the chat can't be forwarded to other chats */
	hasProtectedContent?: true;
	/** True, if new chat members will have access to old messages; available only to chat administrators */
	hasVisibleHistory?: true;
	/** For supergroups, name of the group sticker set */
	stickerSetName?: string;
	/** True, if the bot can change the group sticker set */
	canSetStickerSet?: true;
	/** For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group. */
	customEmojiStickerSetName?: string;
	/** Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
	linkedChatId?: number;
	/** For supergroups, the location to which the supergroup is connected */
	location?: ChatLocation;
	/** For private chats, the rating of the user if any */
	rating?: UserRating;
	/** For private chats, the first audio added to the profile of the user */
	firstProfileAudio?: Audio;
	/** The color scheme based on a unique gift that must be used for the chat's name, message replies and link previews */
	uniqueGiftColors?: UniqueGiftColors;
	/** The number of Telegram Stars a general user has to pay to send a message to the chat */
	paidMessageStarCount?: number;
	/** The bot that processes join request queries in the chat. The field is only available to chat administrators. */
	guardBot?: User;
	/** The Community to which the chat belongs */
	community?: Community;
}

/** Describes a topic of a direct messages chat. */
export interface DirectMessagesTopic {
	/** Unique identifier of the topic. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
	topicId: number;
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
	/** File identifier of small (160x160) chat photo. This fileId can be used only for photo download and only for as long as the photo is not changed. */
	smallFileId: string;
	/** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	smallFileUniqueId: string;
	/** File identifier of big (640x640) chat photo. This fileId can be used only for photo download and only for as long as the photo is not changed. */
	bigFileId: string;
	/** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	bigFileUniqueId: string;
}

/** Represents an invite link for a chat. */
export interface ChatInviteLink {
	/** The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with “…”. */
	inviteLink: string;
	/** Creator of the link */
	creator: User;
	/** True, if users joining the chat via the link need to be approved by chat administrators */
	createsJoinRequest: boolean;
	/** True, if the link is primary */
	isPrimary: boolean;
	/** True, if the link is revoked */
	isRevoked: boolean;
	/** Invite link name */
	name?: string;
	/** Point in time (Unix timestamp) when the link will expire or has been expired */
	expireDate?: number;
	/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
	memberLimit?: number;
	/** Number of pending join requests created using this link */
	pendingJoinRequestCount?: number;
	/** The number of seconds the subscription will be active for before the next payment */
	subscriptionPeriod?: number;
	/** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat using the link */
	subscriptionPrice?: number;
}

/** Represents the rights of an administrator in a chat. */
export interface ChatAdministratorRights {
	/** True, if the user's presence in the chat is hidden */
	isAnonymous: boolean;
	/** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
	canManageChat: boolean;
	/** True, if the administrator can delete messages of other users */
	canDeleteMessages: boolean;
	/** True, if the administrator can manage video chats */
	canManageVideoChats: boolean;
	/** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
	canRestrictMembers: boolean;
	/** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
	canPromoteMembers: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	canChangeInfo: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	canInviteUsers: boolean;
	/** True, if the administrator can post stories to the chat */
	canPostStories: boolean;
	/** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
	canEditStories: boolean;
	/** True, if the administrator can delete stories posted by other users */
	canDeleteStories: boolean;
	/** True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
	canPostMessages?: boolean;
	/** True, if the administrator can edit messages of other users and can pin messages; for channels only */
	canEditMessages?: boolean;
	/** True, if the user is allowed to pin messages; for groups and supergroups only */
	canPinMessages?: boolean;
	/** True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
	canManageTopics?: boolean;
	/** True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
	canManageDirectMessages?: boolean;
	/** True, if the administrator can edit the tags of regular members; for groups and supergroups only */
	canManageTags?: boolean;
	/** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
	canSendWelcomeMessages: boolean;
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
	oldChatMember: ChatMember;
	/** New information about the chat member */
	newChatMember: ChatMember;
	/** Chat invite link, which was used by the user to join the chat; for joining by invite link events only */
	inviteLink?: ChatInviteLink;
	/** True, if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator */
	viaJoinRequest?: boolean;
	/** True, if the user joined the chat via a chat folder invite link */
	viaChatFolderInviteLink?: boolean;
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
	isAnonymous: boolean;
	/** Custom title for this user */
	customTitle?: string;
}

/** Represents a chat member that has some additional privileges. */
export interface ChatMemberAdministrator {
	/** The member's status in the chat, always “administrator” */
	status: 'administrator';
	/** Information about the user */
	user: User;
	/** True, if the bot is allowed to edit administrator privileges of that user */
	canBeEdited: boolean;
	/** True, if the user's presence in the chat is hidden */
	isAnonymous: boolean;
	/** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
	canManageChat: boolean;
	/** True, if the administrator can delete messages of other users */
	canDeleteMessages: boolean;
	/** True, if the administrator can manage video chats */
	canManageVideoChats: boolean;
	/** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
	canRestrictMembers: boolean;
	/** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
	canPromoteMembers: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	canChangeInfo: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	canInviteUsers: boolean;
	/** True, if the administrator can post stories to the chat */
	canPostStories: boolean;
	/** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
	canEditStories: boolean;
	/** True, if the administrator can delete stories posted by other users */
	canDeleteStories: boolean;
	/** True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
	canPostMessages?: boolean;
	/** True, if the administrator can edit messages of other users and can pin messages; for channels only */
	canEditMessages?: boolean;
	/** True, if the user is allowed to pin messages; for groups and supergroups only */
	canPinMessages?: boolean;
	/** True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
	canManageTopics?: boolean;
	/** True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
	canManageDirectMessages?: boolean;
	/** True, if the administrator can edit the tags of regular members; for groups and supergroups only */
	canManageTags?: boolean;
	/** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
	canSendWelcomeMessages: boolean;
	/** Custom title for this user */
	customTitle?: string;
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
	untilDate?: number;
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
	isMember: boolean;
	/** True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
	canSendMessages: boolean;
	/** True, if the user is allowed to send audios */
	canSendAudios: boolean;
	/** True, if the user is allowed to send documents */
	canSendDocuments: boolean;
	/** True, if the user is allowed to send photos */
	canSendPhotos: boolean;
	/** True, if the user is allowed to send videos */
	canSendVideos: boolean;
	/** True, if the user is allowed to send video notes */
	canSendVideoNotes: boolean;
	/** True, if the user is allowed to send voice notes */
	canSendVoiceNotes: boolean;
	/** True, if the user is allowed to send polls and checklists */
	canSendPolls: boolean;
	/** True, if the user is allowed to send animations, games, stickers and use inline bots */
	canSendOtherMessages: boolean;
	/** True, if the user is allowed to add web page previews to their messages */
	canAddWebPagePreviews: boolean;
	/** True, if the user is allowed to react to messages */
	canReactToMessages: boolean;
	/** True, if the user is allowed to edit their own tag */
	canEditTag: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	canChangeInfo: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	canInviteUsers: boolean;
	/** True, if the user is allowed to pin messages */
	canPinMessages: boolean;
	/** True, if the user is allowed to create forum topics */
	canManageTopics: boolean;
	/** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever. */
	untilDate: number;
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
	untilDate: number;
}

/** Represents a join request sent to a chat. */
export interface ChatJoinRequest {
	/** Chat to which the request was sent */
	chat: Chat;
	/** User that sent the join request */
	from: User;
	/** Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user. */
	userChatId: number;
	/** Date the request was sent in Unix time */
	date: number;
	/** Bio of the user */
	bio?: string;
	/** Chat invite link that was used by the user to send the join request */
	inviteLink?: ChatInviteLink;
	/** Identifier of the join request query; for bots assigned to process join requests only. If present, then the bot must call sendChatJoinRequestWebApp or directly call answerChatJoinRequestQuery within 10 seconds. */
	queryId?: string;
}

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface ChatPermissions {
	/** True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
	canSendMessages?: boolean;
	/** True, if the user is allowed to send audios */
	canSendAudios?: boolean;
	/** True, if the user is allowed to send documents */
	canSendDocuments?: boolean;
	/** True, if the user is allowed to send photos */
	canSendPhotos?: boolean;
	/** True, if the user is allowed to send videos */
	canSendVideos?: boolean;
	/** True, if the user is allowed to send video notes */
	canSendVideoNotes?: boolean;
	/** True, if the user is allowed to send voice notes */
	canSendVoiceNotes?: boolean;
	/** True, if the user is allowed to send polls and checklists */
	canSendPolls?: boolean;
	/** True, if the user is allowed to send animations, games, stickers and use inline bots */
	canSendOtherMessages?: boolean;
	/** True, if the user is allowed to add web page previews to their messages */
	canAddWebPagePreviews?: boolean;
	/** True, if the user is allowed to react to messages. If omitted, defaults to the value of canSendMessages. */
	canReactToMessages?: boolean;
	/** True, if the user is allowed to edit their own tag. If omitted, defaults to the value of can_pin_messages. */
	canEditTag?: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups. */
	canChangeInfo?: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	canInviteUsers?: boolean;
	/** True, if the user is allowed to pin messages. Ignored in public supergroups. */
	canPinMessages?: boolean;
	/** True, if the user is allowed to create forum topics. If omitted, defaults to the value of can_pin_messages. */
	canManageTopics?: boolean;
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
	currentLevelRating: number;
	/** The rating value required to get to the next level; omitted if the maximum level was reached */
	nextLevelRating?: number;
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
	messageThreadId: number;
	/** Name of the topic */
	name: string;
	/** Color of the topic icon in RGB format */
	iconColor: ForumTopicIconColor;
	/** Unique identifier of the custom emoji shown as the topic icon */
	iconCustomEmojiId?: string;
	/** True, if the name of the topic wasn't specified explicitly by its creator and likely needs to be changed by the bot */
	isNameImplicit?: true;
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

/** The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway. This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription for Telegram Premium giveaways and prizeStarCount / 500 times for one year for Telegram Star giveaways. */
export interface ChatBoostSourceGiveaway {
	/** Source of the boost, always “giveaway” */
	source: 'giveaway';
	/** Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet. */
	giveawayMessageId: number;
	/** User that won the prize in the giveaway if any; for Telegram Premium giveaways only */
	user?: User;
	/** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
	prizeStarCount?: number;
	/** True, if the giveaway was completed, but there was no user to win the prize */
	isUnclaimed?: true;
}

/** This object contains information about a chat boost. */
export interface ChatBoost {
	/** Unique identifier of the boost */
	boostId: string;
	/** Point in time (Unix timestamp) when the chat was boosted */
	addDate: number;
	/** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
	expirationDate: number;
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
	boostId: string;
	/** Point in time (Unix timestamp) when the boost was removed */
	removeDate: number;
	/** Source of the removed boost */
	source: ChatBoostSource;
}

/** This object represents a list of boosts added to a chat by a user. */
export interface UserChatBoosts {
	/** The list of boosts added to the chat by the user */
	boosts: ChatBoost[];
}
