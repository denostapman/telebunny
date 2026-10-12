import type { UpdateType } from '../enums.ts';
import type {
	BusinessConnection,
	BusinessMessagesDeleted,
} from './business.ts';
import type {
	ChatBoostRemoved,
	ChatBoostUpdated,
	ChatJoinRequest,
	ChatMemberUpdated,
} from './chat.ts';
import type { ChosenInlineResult, InlineQuery } from './inline.ts';
import type { CallbackQuery } from './markup.ts';
import type { Poll, PollAnswer } from './media.ts';
import type {
	BotSubscriptionUpdated,
	ManagedBotUpdated,
	Message,
	MessageGenerationStopped,
	MessageReactionCountUpdated,
	MessageReactionUpdated,
} from './message.ts';
import type {
	PaidMediaPurchased,
	PreCheckoutQuery,
	ShippingQuery,
} from './payment.ts';

/** This object represents an incoming update. At most one of the optional fields can be present in any given update. */
export interface Update {
	/** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This identifier becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
	update_id: number;
	/** New incoming message of any kind - text, photo, sticker, etc. */
	message?: Message;
	/** New version of a message that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
	edited_message?: Message;
	/** New incoming channel post of any kind - text, photo, sticker, etc. */
	channel_post?: Message;
	/** New version of a channel post that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
	edited_channel_post?: Message;
	/** The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot */
	business_connection?: BusinessConnection;
	/** New message from a connected business account */
	business_message?: Message;
	/** New version of a message from a connected business account */
	edited_business_message?: Message;
	/** Messages were deleted from a connected business account */
	deleted_business_messages?: BusinessMessagesDeleted;
	/** New guest message. The bot can use the field Message.guest_query_id and the method answerGuestQuery to send a message in response. */
	guest_message?: Message;
	/** A reaction to a message was changed by a user. The bot must be an administrator in the chat and must explicitly specify `"message_reaction"` in the list of allowed_updates to receive these updates. The update isn't received for reactions set by bots. */
	message_reaction?: MessageReactionUpdated;
	/** Reactions to a message with anonymous reactions were changed. The bot must be an administrator in the chat and must explicitly specify `"message_reaction_count"` in the list of allowed_updates to receive these updates. The updates are grouped and can be sent with delay up to a few minutes. */
	message_reaction_count?: MessageReactionCountUpdated;
	/** New incoming inline query */
	inline_query?: InlineQuery;
	/** The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
	chosen_inline_result?: ChosenInlineResult;
	/** New incoming callback query */
	callback_query?: CallbackQuery;
	/** New incoming shipping query. Only for invoices with flexible price. */
	shipping_query?: ShippingQuery;
	/** New incoming pre-checkout query. Contains full information about checkout. */
	pre_checkout_query?: PreCheckoutQuery;
	/** A user purchased paid media with a non-empty payload sent by the bot in a non-channel chat */
	purchased_paid_media?: PaidMediaPurchased;
	/** New poll state. Bots receive only updates about manually stopped polls and polls, which are sent by the bot. */
	poll?: Poll;
	/** A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
	poll_answer?: PollAnswer;
	/** The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
	my_chat_member?: ChatMemberUpdated;
	/** A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify `"chat_member"` in the list of allowed_updates to receive these updates. */
	chat_member?: ChatMemberUpdated;
	/** A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates. */
	chat_join_request?: ChatJoinRequest;
	/** A chat boost was added or changed. The bot must be an administrator in the chat to receive these updates. */
	chat_boost?: ChatBoostUpdated;
	/** A boost was removed from a chat. The bot must be an administrator in the chat to receive these updates. */
	removed_chat_boost?: ChatBoostRemoved;
	/** A new bot was created to be managed by the bot, or token or owner of a managed bot was changed */
	managed_bot?: ManagedBotUpdated;
	/** User payment subscription has changed */
	subscription?: BotSubscriptionUpdated;
	/** A user asked the bot to stop the generation of a message */
	stopped_message_generation?: MessageGenerationStopped;
}

/** Describes the current status of a webhook. */
export interface WebhookInfo {
	/** Webhook URL, may be empty if webhook is not set up */
	url: string;
	/** True, if a custom certificate was provided for webhook certificate checks */
	has_custom_certificate: boolean;
	/** Number of updates awaiting delivery */
	pending_update_count: number;
	/** Currently used webhook IP address */
	ip_address?: string;
	/** Unix time for the most recent error that happened when trying to deliver an update via webhook */
	last_error_date?: number;
	/** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
	last_error_message?: string;
	/** Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
	last_synchronization_error_date?: number;
	/** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
	max_connections?: number;
	/** A list of update types the bot is subscribed to. Defaults to all update types except chat_member, message_reaction, and message_reaction_count. */
	allowed_updates?: UpdateType[];
}

export type UpdatePayloads = {
	[K in UpdateType]-?: NonNullable<Update[K]>;
};
