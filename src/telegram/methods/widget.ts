import type { ParseMode } from '../enums.ts';
import type { ChatId } from '../types/common.ts';
import type {
	ForceReply,
	InlineKeyboardMarkup,
	ReplyKeyboardMarkup,
	ReplyKeyboardRemove,
} from '../types/markup.ts';
import type {
	Message,
	MessageEntity,
	ReplyParameters,
} from '../types/message.ts';
import type { Method } from './common.ts';

export interface SendWidgetParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chatId: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	messageThreadId?: number;
	/** HTML code of the widget, 1-32768 bytes. The code must not exceed 4096 bytes when compressed by zlib with the maximum compression level. */
	html: string;
	/** Width of the widget in logical pixels; omit if the widget must occupy the whole width of the message bubble. The width is clamped by the app to the range from 200 to the maximum width of the message bubble. */
	width?: number;
	/** Height of the widget in logical pixels; omit if the height of the widget isn't fixed. The height is clamped by the app to the range 50-600. */
	height?: number;
	/** Public data of the widget, 0-1024 bytes, which will be available wherever the widget is shown. If the widget is shared, then all messages with it will have the same public data. */
	publicData?: string;
	/** Data of the widget, which is specific to the message, 0-1024 bytes */
	chatData?: string;
	/** Widget caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the widget caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Pass True if the caption must be shown above the widget */
	showCaptionAboveMedia?: boolean;
	/** Pass True to allow the widget to send queries to the bot */
	allowQueries?: boolean;
	/** Pass True to create a shared widget, which can be sent again using the method sendSharedWidget */
	isShared?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disableNotification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allowPaidBroadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	messageEffectId?: string;
	/** Description of the message to reply to */
	replyParameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	replyMarkup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendSharedWidgetParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chatId: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	messageThreadId?: number;
	/** Unique identifier of the shared widget */
	widgetId: string;
	/** Data of the widget, which is specific to the message, 0-1024 bytes */
	chatData?: string;
	/** Widget caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the widget caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** Pass True if the caption must be shown above the widget */
	showCaptionAboveMedia?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disableNotification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allowPaidBroadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	messageEffectId?: string;
	/** Description of the message to reply to */
	replyParameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	replyMarkup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface AnswerWidgetQueryParams {
	/** Unique identifier for the query to be answered */
	widgetQueryId: string;
	/** Data to be returned to the widget, 0-1024 bytes */
	data?: string;
}

export interface EditMessageWidgetDataParams {
	/** Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target supergroup in the format `@username`. */
	chatId?: ChatId;
	/** Required if inlineMessageId is not specified. Identifier of the message with the widget. */
	messageId?: number;
	/** Required if chatId and messageId are not specified. Identifier of the inline message. */
	inlineMessageId?: string;
	/** New public data of the widget, 0-1024 bytes; pass an empty string to remove the public data. If omitted, then the public data isn't changed. */
	publicData?: string;
	/** New data of the widget, which is specific to the message, 0-1024 bytes; pass an empty string to remove the data. If omitted, then the data isn't changed. */
	chatData?: string;
}

export interface EditSharedWidgetDataParams {
	/** Unique identifier of the shared widget */
	widgetId: string;
	/** New public data of the widget, 0-1024 bytes; pass an empty string to remove the public data */
	publicData: string;
	/** The maximum amount of time in seconds that the public data of the widget may be cached client-side; 5-3600. If omitted, then the current value is kept, which is 30 by default. */
	cacheTime?: number;
}

export interface WidgetMethods {
	/** Use this method to send a message with an HTML widget. Currently, in the production environment, widgets can be sent only to private chats, and sent widgets automatically have protected content and therefore can't be forwarded. On success, the sent Message is returned. */
	sendWidget: Method<SendWidgetParams, Message>;
	/** Use this method to send again a shared widget created by the bot. Currently, in the production environment, widgets can be sent only to private chats, and sent widgets automatically have protected content and therefore can't be forwarded. On success, the sent Message is returned. */
	sendSharedWidget: Method<SendSharedWidgetParams, Message>;
	/** Use this method to send an answer to a query from a widget. The query must be answered within 15 seconds. The answer is received only by the widget that sent the query and doesn't change data of the widget; use editMessageWidgetData or editSharedWidgetData to change it. On success, True is returned. */
	answerWidgetQuery: Method<AnswerWidgetQueryParams, true>;
	/** Use this method to edit data of a widget in a message sent by the bot or via the bot (for inline bots). Public data of a shared widget can be changed at most once per second. On success, True is returned. */
	editMessageWidgetData: Method<EditMessageWidgetDataParams, true>;
	/** Use this method to edit public data of a shared widget created by the bot. A shared widget can be edited at most once per second. On success, True is returned. */
	editSharedWidgetData: Method<EditSharedWidgetDataParams, true>;
}
