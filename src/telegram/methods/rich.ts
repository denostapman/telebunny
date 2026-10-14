import type { ChatId } from '../types/common.ts';
import type {
	ForceReply,
	InlineKeyboardMarkup,
	ReplyKeyboardMarkup,
	ReplyKeyboardRemove,
} from '../types/markup.ts';
import type {
	EphemeralMessageParameters,
	Message,
	ReplyParameters,
	SuggestedPostParameters,
} from '../types/message.ts';
import type { InputRichMessage } from '../types/rich.ts';
import type { Method } from './common.ts';

export interface SendRichMessageParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent. Bot can send rich messages on behalf of a business account only if the corresponding user can send rich messages. */
	businessConnectionId?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chatId: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	messageThreadId?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	directMessagesTopicId?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeralMessageParameters?: EphemeralMessageParameters;
	/** The message to be sent */
	richMessage: InputRichMessage;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disableNotification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allowPaidBroadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	messageEffectId?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggestedPostParameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	replyParameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	replyMarkup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendRichMessageDraftParams {
	/** Unique identifier for the target private chat */
	chatId: number;
	/** Unique identifier for the target message thread */
	messageThreadId?: number;
	/** Unique identifier of the message draft; must be non-zero. Changes to drafts with the same identifier are animated. Otherwise, the draft is replaced without animation. */
	draftId: number;
	/** The partial message to be streamed. Direct upload of new files and explicit upload of files by a URL isn't supported. */
	richMessage: InputRichMessage;
	/** Pass True to show the user a button to stop further drafts. The bot will receive an Update “stopped_message_generation” if the user presses the button. */
	canStop?: boolean;
	/** Pass True to keep the draft in the chat when the button is pressed. The draft will still disappear after a short time or if the bot sends a message. To fully preserve the partial draft, the bot should send it as a new message. */
	keepOnStop?: boolean;
}

export interface RichMethods {
	/** Use this method to send rich messages. If the message contains a block with a media element, then the bot must have the right to send the media to the chat. On success, the sent Message is returned. */
	sendRichMessage: Method<SendRichMessageParams, Message>;
	/** Use this method to stream a partial rich message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you must call sendRichMessage with the complete message to persist it in the user's chat. Returns True on success. */
	sendRichMessageDraft: Method<SendRichMessageDraftParams, true>;
}
