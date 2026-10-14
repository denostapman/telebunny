import type { CamelCase } from '../../client/case.ts';
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
	updateId: number;
	/** New incoming message of any kind - text, photo, sticker, etc. */
	message?: Message;
	/** New version of a message that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
	editedMessage?: Message;
	/** New incoming channel post of any kind - text, photo, sticker, etc. */
	channelPost?: Message;
	/** New version of a channel post that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
	editedChannelPost?: Message;
	/** The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot */
	businessConnection?: BusinessConnection;
	/** New message from a connected business account */
	businessMessage?: Message;
	/** New version of a message from a connected business account */
	editedBusinessMessage?: Message;
	/** Messages were deleted from a connected business account */
	deletedBusinessMessages?: BusinessMessagesDeleted;
	/** New guest message. The bot can use the field Message.guestQueryId and the method answerGuestQuery to send a message in response. */
	guestMessage?: Message;
	/** A reaction to a message was changed by a user. The bot must be an administrator in the chat and must explicitly specify `"message_reaction"` in the list of allowedUpdates to receive these updates. The update isn't received for reactions set by bots. */
	messageReaction?: MessageReactionUpdated;
	/** Reactions to a message with anonymous reactions were changed. The bot must be an administrator in the chat and must explicitly specify `"message_reaction_count"` in the list of allowedUpdates to receive these updates. The updates are grouped and can be sent with delay up to a few minutes. */
	messageReactionCount?: MessageReactionCountUpdated;
	/** New incoming inline query */
	inlineQuery?: InlineQuery;
	/** The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
	chosenInlineResult?: ChosenInlineResult;
	/** New incoming callback query */
	callbackQuery?: CallbackQuery;
	/** New incoming shipping query. Only for invoices with flexible price. */
	shippingQuery?: ShippingQuery;
	/** New incoming pre-checkout query. Contains full information about checkout. */
	preCheckoutQuery?: PreCheckoutQuery;
	/** A user purchased paid media with a non-empty payload sent by the bot in a non-channel chat */
	purchasedPaidMedia?: PaidMediaPurchased;
	/** New poll state. Bots receive only updates about manually stopped polls and polls, which are sent by the bot. */
	poll?: Poll;
	/** A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
	pollAnswer?: PollAnswer;
	/** The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
	myChatMember?: ChatMemberUpdated;
	/** A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify `"chat_member"` in the list of allowedUpdates to receive these updates. */
	chatMember?: ChatMemberUpdated;
	/** A request to join the chat has been sent. The bot must have the canInviteUsers administrator right in the chat to receive these updates. */
	chatJoinRequest?: ChatJoinRequest;
	/** A chat boost was added or changed. The bot must be an administrator in the chat to receive these updates. */
	chatBoost?: ChatBoostUpdated;
	/** A boost was removed from a chat. The bot must be an administrator in the chat to receive these updates. */
	removedChatBoost?: ChatBoostRemoved;
	/** A new bot was created to be managed by the bot, or token or owner of a managed bot was changed */
	managedBot?: ManagedBotUpdated;
	/** User payment subscription has changed */
	subscription?: BotSubscriptionUpdated;
	/** A user asked the bot to stop the generation of a message */
	stoppedMessageGeneration?: MessageGenerationStopped;
}

/** Describes the current status of a webhook. */
export interface WebhookInfo {
	/** Webhook URL, may be empty if webhook is not set up */
	url: string;
	/** True, if a custom certificate was provided for webhook certificate checks */
	hasCustomCertificate: boolean;
	/** Number of updates awaiting delivery */
	pendingUpdateCount: number;
	/** Currently used webhook IP address */
	ipAddress?: string;
	/** Unix time for the most recent error that happened when trying to deliver an update via webhook */
	lastErrorDate?: number;
	/** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
	lastErrorMessage?: string;
	/** Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
	lastSynchronizationErrorDate?: number;
	/** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
	maxConnections?: number;
	/** A list of update types the bot is subscribed to. Defaults to all update types except chat_member, message_reaction, and message_reaction_count. */
	allowedUpdates?: UpdateType[];
}

export type UpdatePayloads = {
	[K in UpdateType]-?: NonNullable<Update[CamelCase<K>]>;
};
