import type { PreparedInlineMessage, SentWebAppMessage } from '../types/bot.ts';
import type {
	InlineQueryResult,
	InlineQueryResultsButton,
} from '../types/inline.ts';
import type { Method } from './common.ts';

export interface AnswerWebAppQueryParams {
	/** Unique identifier for the query to be answered */
	web_app_query_id: string;
	/** A JSON-serialized object describing the message to be sent */
	result: InlineQueryResult;
}

export interface SavePreparedInlineMessageParams {
	/** Unique identifier of the target user that can use the prepared message */
	user_id: number;
	/** A JSON-serialized object describing the message to be sent */
	result: InlineQueryResult;
	/** Pass True if the message can be sent to private chats with users */
	allow_user_chats?: boolean;
	/** Pass True if the message can be sent to private chats with bots */
	allow_bot_chats?: boolean;
	/** Pass True if the message can be sent to group and supergroup chats */
	allow_group_chats?: boolean;
	/** Pass True if the message can be sent to channel chats */
	allow_channel_chats?: boolean;
}

export interface AnswerInlineQueryParams {
	/** Unique identifier for the answered query */
	inline_query_id: string;
	/** A JSON-serialized Array of results for the inline query */
	results: InlineQueryResult[];
	/** The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300. */
	cache_time?: number;
	/** Pass True if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query. */
	is_personal?: boolean;
	/** Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes. */
	next_offset?: string;
	/** A JSON-serialized object describing a button to be shown above inline query results */
	button?: InlineQueryResultsButton;
}

export interface InlineMethods {
	/** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
	answerWebAppQuery: Method<AnswerWebAppQueryParams, SentWebAppMessage>;
	/** Stores a message that can be sent by a user of a Mini App. Returns a PreparedInlineMessage object. */
	savePreparedInlineMessage: Method<
		SavePreparedInlineMessageParams,
		PreparedInlineMessage
	>;
	/** Use this method to send answers to an inline query. On success, True is returned. No more than 50 results per query are allowed. */
	answerInlineQuery: Method<AnswerInlineQueryParams, true>;
}
