import type { InlineQueryChatType } from '../enums.ts';
import type { Chat, User } from './chat.ts';
import type { TonWalletCard } from './ton.ts';

/** This object describes an HTML widget. */
export interface Widget {
	/** Unique identifier of the shared widget, which can be used to send the widget again using the method sendSharedWidget; omitted if the widget isn't shared */
	id?: string;
	/** Width of the widget in logical pixels; omitted if the widget must occupy the whole width of the message bubble */
	width?: number;
	/** Height of the widget in logical pixels; omitted if the height of the widget isn't fixed */
	height?: number;
	/** HTML code of the widget */
	html: string;
	/** Public data of the widget, which is available wherever the widget is shown. All messages with a shared widget have the same public data. */
	publicData?: string;
	/** Data of the widget, which is specific to the message */
	chatData?: string;
}

/** This object represents an incoming query from a widget in a message sent by the bot or via the bot. Use answerWidgetQuery to answer the query. Each user can send at most 5 queries per 5 seconds to the bot from all its widgets. */
export interface WidgetQuery {
	/** Unique identifier for this query */
	id: string;
	/** Sender */
	from: User;
	/** Chat with the message containing the widget; omitted if the widget is in an inline message */
	chat?: Chat;
	/** Identifier of the message containing the widget; omitted if the widget is in an inline message */
	messageId?: number;
	/** Identifier of the inline message containing the widget */
	inlineMessageId?: string;
	/** Global identifier, uniquely corresponding to the chat to which the message with the widget was sent */
	chatInstance: string;
	/** For widgets in inline messages, type of the chat to which the message was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. */
	chatType?: InlineQueryChatType;
	/** Type of the query */
	type: WidgetQueryType;
	/** Data of the query, 1-64 bytes */
	data: string;
	/** Unique identifier of the shared widget, which sent the query; omitted if the widget isn't shared */
	widgetId?: string;
}

/** This object represents an incoming query from a forwarded message with a shared widget created by the bot. Use answerWidgetQuery to answer the query. Each user can send at most 5 queries per 5 seconds to the bot from all its widgets. */
export interface SharedWidgetQuery {
	/** Unique identifier for this query */
	id: string;
	/** Sender */
	from: User;
	/** Type of the query */
	type: WidgetQueryType;
	/** Data of the query, 1-64 bytes */
	data: string;
	/** Unique identifier of the shared widget, which sent the query */
	widgetId: string;
}

/** This object describes the type of a query from a widget. Currently, it can be one of */
export type WidgetQueryType =
	| WidgetQueryTypeData
	| WidgetQueryTypeSignData
	| WidgetQueryTypeSentTransaction;

/** The query contains data for the bot. */
export interface WidgetQueryTypeData {
	/** Type of the query, always “data” */
	type: 'data';
	/** TON wallet card of the user who sent the query, if it was sent to the bot along with the query */
	walletCard?: TonWalletCard;
}

/** The query contains data signed by a TON wallet of the user who sent the query. The data is signed for the domain `bot<bot_id>`, where `<bot_id>` is the identifier of the bot. */
export interface WidgetQueryTypeSignData {
	/** Type of the query, always “sign_data” */
	type: 'sign_data';
	/** The wallet that signed the data */
	wallet: WidgetQueryWallet;
	/** JSON-serialized signed data */
	signData: string;
}

/** The query notifies the bot about a transaction sent from a TON wallet of the user who sent the query. */
export interface WidgetQueryTypeSentTransaction {
	/** Type of the query, always “sent_transaction” */
	type: 'sent_transaction';
	/** The wallet from which the transaction was sent */
	wallet: WidgetQueryWallet;
	/** Value of msg_hash of the transaction */
	msgHash: string;
}

/** This object describes a TON wallet of the user, which is used in a query from a widget. */
export interface WidgetQueryWallet {
	/** Address of the wallet */
	address: string;
	/** Balance of the wallet, in the smallest units of the cryptocurrency, as a decimal number */
	amount: string;
	/** Hex-encoded public key of the wallet; omitted if unknown */
	publicKey?: string;
	/** Base64-encoded serialized StateInit of the wallet contract; omitted if and only if publicKey is omitted */
	stateInit?: string;
}
