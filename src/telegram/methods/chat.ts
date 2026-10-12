import type { InputFile } from '../../client/input-file.ts';
import type { ForumTopicIconColor, ParseMode } from '../enums.ts';
import type {
	ChatFullInfo,
	ChatInviteLink,
	ChatMember,
	ChatPermissions,
	ForumTopic,
	UserChatBoosts,
} from '../types/chat.ts';
import type { ChatId, EmptyObject } from '../types/common.ts';
import type { UserProfileAudios, UserProfilePhotos } from '../types/media.ts';
import type { MessageEntity } from '../types/message.ts';
import type { Sticker } from '../types/sticker.ts';
import type { Method } from './common.ts';

export interface GetUserProfilePhotosParams {
	/** Unique identifier of the target user */
	user_id: number;
	/** Sequential number of the first photo to be returned. By default, all photos are returned. */
	offset?: number;
	/** Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
	limit?: number;
}

export interface GetUserProfileAudiosParams {
	/** Unique identifier of the target user */
	user_id: number;
	/** Sequential number of the first audio to be returned. By default, all audios are returned. */
	offset?: number;
	/** Limits the number of audios to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
	limit?: number;
}

export interface SetUserEmojiStatusParams {
	/** Unique identifier of the target user */
	user_id: number;
	/** Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status. */
	emoji_status_custom_emoji_id?: string;
	/** Expiration date of the emoji status, if any */
	emoji_status_expiration_date?: number;
}

export interface BanChatMemberParams {
	/** Unique identifier for the target group or username of the target supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
	/** Date when the user will be unbanned; Unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only. */
	until_date?: number;
	/** Pass True to delete all messages from the chat for the user that is being removed. If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels. */
	revoke_messages?: boolean;
}

export interface UnbanChatMemberParams {
	/** Unique identifier for the target group or username of the target supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
	/** Do nothing if the user is not banned */
	only_if_banned?: boolean;
}

export interface RestrictChatMemberParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
	/** A JSON-serialized object for new user permissions */
	permissions: ChatPermissions;
	/** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
	use_independent_chat_permissions?: boolean;
	/** Date when restrictions will be lifted for the user; Unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever. */
	until_date?: number;
}

export interface PromoteChatMemberParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
	/** Pass True if the administrator's presence in the chat is hidden */
	is_anonymous?: boolean;
	/** Pass True if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
	can_manage_chat?: boolean;
	/** Pass True if the administrator can delete messages of other users */
	can_delete_messages?: boolean;
	/** Pass True if the administrator can manage video chats */
	can_manage_video_chats?: boolean;
	/** Pass True if the administrator can restrict, ban or unban chat members, or access supergroup statistics. For backward compatibility, defaults to True for promotions of channel administrators. */
	can_restrict_members?: boolean;
	/** Pass True if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by him) */
	can_promote_members?: boolean;
	/** Pass True if the administrator can change chat title, photo and other settings */
	can_change_info?: boolean;
	/** Pass True if the administrator can invite new users to the chat */
	can_invite_users?: boolean;
	/** Pass True if the administrator can post stories to the chat */
	can_post_stories?: boolean;
	/** Pass True if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
	can_edit_stories?: boolean;
	/** Pass True if the administrator can delete stories posted by other users */
	can_delete_stories?: boolean;
	/** Pass True if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
	can_post_messages?: boolean;
	/** Pass True if the administrator can edit messages of other users and can pin messages; for channels only */
	can_edit_messages?: boolean;
	/** Pass True if the administrator can pin messages; for supergroups only */
	can_pin_messages?: boolean;
	/** Pass True if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
	can_manage_topics?: boolean;
	/** Pass True if the administrator can manage direct messages within the channel and decline suggested posts; for channels only */
	can_manage_direct_messages?: boolean;
	/** Pass True if the administrator can edit the tags of regular members; for groups and supergroups only */
	can_manage_tags?: boolean;
	/** Pass True if the administrator can manage chat welcome messages or directly send them in the case of bots */
	can_send_welcome_messages?: boolean;
}

export interface SetChatAdministratorCustomTitleParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
	/** New custom title for the administrator; 0-16 characters, emoji are not allowed */
	custom_title: string;
}

export interface SetChatMemberTagParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
	/** New tag for the member; 0-16 characters, emoji are not allowed */
	tag?: string;
}

export interface BanChatSenderChatParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target sender chat */
	sender_chat_id: number;
}

export interface UnbanChatSenderChatParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target sender chat */
	sender_chat_id: number;
}

export interface SetChatPermissionsParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** A JSON-serialized object for new default chat permissions */
	permissions: ChatPermissions;
	/** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
	use_independent_chat_permissions?: boolean;
}

export interface ExportChatInviteLinkParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
}

export interface CreateChatInviteLinkParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Invite link name; 0-32 characters */
	name?: string;
	/** Point in time (Unix timestamp) when the link will expire */
	expire_date?: number;
	/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
	member_limit?: number;
	/** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified. */
	creates_join_request?: boolean;
}

export interface EditChatInviteLinkParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** The invite link to edit */
	invite_link: string;
	/** Invite link name; 0-32 characters */
	name?: string;
	/** Point in time (Unix timestamp) when the link will expire */
	expire_date?: number;
	/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
	member_limit?: number;
	/** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified. */
	creates_join_request?: boolean;
}

export interface CreateChatSubscriptionInviteLinkParams {
	/** Unique identifier for the target channel chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Invite link name; 0-32 characters */
	name?: string;
	/** The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days). */
	subscription_period: number;
	/** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-10000 */
	subscription_price: number;
}

export interface EditChatSubscriptionInviteLinkParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** The invite link to edit */
	invite_link: string;
	/** Invite link name; 0-32 characters */
	name?: string;
}

export interface RevokeChatInviteLinkParams {
	/** Unique identifier of the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** The invite link to revoke */
	invite_link: string;
}

export interface ApproveChatJoinRequestParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
}

export interface DeclineChatJoinRequestParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
}

export interface AnswerChatJoinRequestQueryParams {
	/** Unique identifier of the join request query */
	chat_join_request_query_id: string;
	/** Result of the query. Must be either “approve” to allow the user to join the chat, “decline” to disallow the user to join the chat, or “queue” to leave the decision to other administrators. */
	result: 'approve' | 'decline' | 'queue';
}

export interface SendChatJoinRequestWebAppParams {
	/** Unique identifier of the join request query */
	chat_join_request_query_id: string;
	/** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
	web_app_url: string;
}

export interface SetChatPhotoParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** New chat photo, uploaded using multipart/form-data */
	photo: InputFile;
}

export interface DeleteChatPhotoParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
}

export interface SetChatTitleParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** New chat title, 1-128 characters */
	title: string;
}

export interface SetChatDescriptionParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** New chat description, 0-255 characters */
	description?: string;
}

export interface PinChatMessageParams {
	/** Unique identifier of the business connection on behalf of which the message will be pinned */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Identifier of a message to pin */
	message_id: number;
	/** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats. */
	disable_notification?: boolean;
}

export interface UnpinChatMessageParams {
	/** Unique identifier of the business connection on behalf of which the message will be unpinned */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be unpinned. */
	message_id?: number;
}

export interface UnpinAllChatMessagesParams {
	/** Unique identifier for the target chat or username of the target channel in the format `@username` */
	chat_id: ChatId;
}

export interface LeaveChatParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel in the format `@username`. Channel direct messages chats aren't supported; leave the corresponding channel instead. */
	chat_id: ChatId;
}

export interface GetChatParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel in the format `@username` */
	chat_id: ChatId;
}

export interface GetChatAdministratorsParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Pass True to additionally receive all bots that are administrators of the chat. By default, bots other than the current bot are omitted. */
	return_bots?: boolean;
}

export interface GetChatMemberCountParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel in the format `@username` */
	chat_id: ChatId;
}

export interface GetChatMemberParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
}

export interface SetChatStickerSetParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Name of the sticker set to be set as the group sticker set */
	sticker_set_name: string;
}

export interface DeleteChatStickerSetParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
}

export interface CreateForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Topic name, 1-128 characters */
	name: string;
	/** Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F). */
	icon_color?: ForumTopicIconColor;
	/** Unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. */
	icon_custom_emoji_id?: string;
}

export interface EditForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
	/** New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept. */
	name?: string;
	/** New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept. */
	icon_custom_emoji_id?: string;
}

export interface CloseForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}

export interface ReopenForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}

export interface DeleteForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}

export interface UnpinAllForumTopicMessagesParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}

export interface EditGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** New topic name, 1-128 characters */
	name: string;
}

export interface CloseGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
}

export interface ReopenGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
}

export interface HideGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
}

export interface UnhideGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
}

export interface UnpinAllGeneralForumTopicMessagesParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
}

export interface GetUserChatBoostsParams {
	/** Unique identifier for the chat or username of the channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier of the target user */
	user_id: number;
}

export interface GiftPremiumSubscriptionParams {
	/** Unique identifier of the target user who will receive a Telegram Premium subscription */
	user_id: number;
	/** Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12 */
	month_count: number;
	/** Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months */
	star_count: number;
	/** Text that will be shown along with the service message about the subscription; 0-128 characters */
	text?: string;
	/** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
	text_parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
	text_entities?: MessageEntity[];
}

export interface VerifyUserParams {
	/** Unique identifier of the target user */
	user_id: number;
	/** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
	custom_description?: string;
}

export interface VerifyChatParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. Channel direct messages chats can't be verified. */
	chat_id: ChatId;
	/** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
	custom_description?: string;
}

export interface RemoveUserVerificationParams {
	/** Unique identifier of the target user */
	user_id: number;
}

export interface RemoveChatVerificationParams {
	/** Unique identifier for the target chat or username of the target bot or channel in the format `@username` */
	chat_id: ChatId;
}

export interface ChatMethods {
	/** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
	getUserProfilePhotos: Method<GetUserProfilePhotosParams, UserProfilePhotos>;
	/** Use this method to get a list of profile audios for a user. Returns a UserProfileAudios object. */
	getUserProfileAudios: Method<GetUserProfileAudiosParams, UserProfileAudios>;
	/** Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess. Returns True on success. */
	setUserEmojiStatus: Method<SetUserEmojiStatusParams, true>;
	/** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	banChatMember: Method<BanChatMemberParams, true>;
	/** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
	unbanChatMember: Method<UnbanChatMemberParams, true>;
	/** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
	restrictChatMember: Method<RestrictChatMemberParams, true>;
	/** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
	promoteChatMember: Method<PromoteChatMemberParams, true>;
	/** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
	setChatAdministratorCustomTitle: Method<
		SetChatAdministratorCustomTitleParams,
		true
	>;
	/** Use this method to set a tag for a regular member in a group or a supergroup. The bot must be an administrator in the chat for this to work and must have the can_manage_tags administrator right. Returns True on success. */
	setChatMemberTag: Method<SetChatMemberTagParams, true>;
	/** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
	banChatSenderChat: Method<BanChatSenderChatParams, true>;
	/** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
	unbanChatSenderChat: Method<UnbanChatSenderChatParams, true>;
	/** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
	setChatPermissions: Method<SetChatPermissionsParams, true>;
	/** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success. */
	exportChatInviteLink: Method<ExportChatInviteLinkParams, string>;
	/** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
	createChatInviteLink: Method<CreateChatInviteLinkParams, ChatInviteLink>;
	/** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
	editChatInviteLink: Method<EditChatInviteLinkParams, ChatInviteLink>;
	/** Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink. Returns the new invite link as a ChatInviteLink object. */
	createChatSubscriptionInviteLink: Method<
		CreateChatSubscriptionInviteLinkParams,
		ChatInviteLink
	>;
	/** Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights. Returns the edited invite link as a ChatInviteLink object. */
	editChatSubscriptionInviteLink: Method<
		EditChatSubscriptionInviteLinkParams,
		ChatInviteLink
	>;
	/** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
	revokeChatInviteLink: Method<RevokeChatInviteLinkParams, ChatInviteLink>;
	/** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
	approveChatJoinRequest: Method<ApproveChatJoinRequestParams, true>;
	/** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
	declineChatJoinRequest: Method<DeclineChatJoinRequestParams, true>;
	/** Use this method to process a received chat join request query. Returns True on success. */
	answerChatJoinRequestQuery: Method<AnswerChatJoinRequestQueryParams, true>;
	/** Use this method to process a received chat join request query by showing a Mini App to the user before deciding the outcome. Call answerChatJoinRequestQuery to resolve the join request query based on the user interaction with the Mini App. Returns True on success. */
	sendChatJoinRequestWebApp: Method<SendChatJoinRequestWebAppParams, true>;
	/** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	setChatPhoto: Method<SetChatPhotoParams, true>;
	/** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	deleteChatPhoto: Method<DeleteChatPhotoParams, true>;
	/** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	setChatTitle: Method<SetChatTitleParams, true>;
	/** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	setChatDescription: Method<SetChatDescriptionParams, true>;
	/** Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively. Returns True on success. */
	pinChatMessage: Method<PinChatMessageParams, true>;
	/** Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively. Returns True on success. */
	unpinChatMessage: Method<UnpinChatMessageParams, true>;
	/** Use this method to clear the list of pinned messages in a chat. In private chats and channel direct messages chats, no additional rights are required to unpin all pinned messages. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin all pinned messages in groups and channels respectively. Returns True on success. */
	unpinAllChatMessages: Method<UnpinAllChatMessagesParams, true>;
	/** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
	leaveChat: Method<LeaveChatParams, true>;
	/** Use this method to get up-to-date information about the chat. Returns a ChatFullInfo object on success. */
	getChat: Method<GetChatParams, ChatFullInfo>;
	/** Use this method to get a list of administrators in a chat. Returns an Array of ChatMember objects. */
	getChatAdministrators: Method<GetChatAdministratorsParams, ChatMember[]>;
	/** Use this method to get the number of members in a chat. Returns Integer on success. */
	getChatMemberCount: Method<GetChatMemberCountParams, number>;
	/** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
	getChatMember: Method<GetChatMemberParams, ChatMember>;
	/** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success. */
	setChatStickerSet: Method<SetChatStickerSetParams, true>;
	/** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success. */
	deleteChatStickerSet: Method<DeleteChatStickerSetParams, true>;
	/** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
	getForumTopicIconStickers: Method<EmptyObject, Sticker[]>;
	/** Use this method to create a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator right. Returns information about the created topic as a ForumTopic object. */
	createForumTopic: Method<CreateForumTopicParams, ForumTopic>;
	/** Use this method to edit name and icon of a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
	editForumTopic: Method<EditForumTopicParams, true>;
	/** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
	closeForumTopic: Method<CloseForumTopicParams, true>;
	/** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
	reopenForumTopic: Method<ReopenForumTopicParams, true>;
	/** Use this method to delete a forum topic along with all its messages in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
	deleteForumTopic: Method<DeleteForumTopicParams, true>;
	/** Use this method to clear the list of pinned messages in a forum topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
	unpinAllForumTopicMessages: Method<UnpinAllForumTopicMessagesParams, true>;
	/** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
	editGeneralForumTopic: Method<EditGeneralForumTopicParams, true>;
	/** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
	closeGeneralForumTopic: Method<CloseGeneralForumTopicParams, true>;
	/** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
	reopenGeneralForumTopic: Method<ReopenGeneralForumTopicParams, true>;
	/** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
	hideGeneralForumTopic: Method<HideGeneralForumTopicParams, true>;
	/** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
	unhideGeneralForumTopic: Method<UnhideGeneralForumTopicParams, true>;
	/** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
	unpinAllGeneralForumTopicMessages: Method<
		UnpinAllGeneralForumTopicMessagesParams,
		true
	>;
	/** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
	getUserChatBoosts: Method<GetUserChatBoostsParams, UserChatBoosts>;
	/** Gifts a Telegram Premium subscription to the given user. Returns True on success. */
	giftPremiumSubscription: Method<GiftPremiumSubscriptionParams, true>;
	/** Verifies a user on behalf of the organization which is represented by the bot. Returns True on success. */
	verifyUser: Method<VerifyUserParams, true>;
	/** Verifies a chat on behalf of the organization which is represented by the bot. Returns True on success. */
	verifyChat: Method<VerifyChatParams, true>;
	/** Removes verification from a user who is currently verified on behalf of the organization represented by the bot. Returns True on success. */
	removeUserVerification: Method<RemoveUserVerificationParams, true>;
	/** Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success. */
	removeChatVerification: Method<RemoveChatVerificationParams, true>;
}
