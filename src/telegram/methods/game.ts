import type { ChatId } from '../types/common.ts';
import type { GameHighScore } from '../types/game.ts';
import type { InlineKeyboardMarkup } from '../types/markup.ts';
import type { Message, ReplyParameters } from '../types/message.ts';
import type { Method } from './common.ts';

export interface SendGameParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot in the format `@username`. Games can't be sent to channel direct messages chats and channel chats. */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Short name of the game, serves as the unique identifier for the game. Set up your games via @BotFather. */
	game_short_name: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game. */
	reply_markup?: InlineKeyboardMarkup;
}

export interface SetGameScoreParams {
	/** User identifier */
	user_id: number;
	/** New score, must be non-negative */
	score: number;
	/** Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters. */
	force?: boolean;
	/** Pass True if the game message should not be automatically edited to include the current scoreboard */
	disable_edit_message?: boolean;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat. */
	chat_id?: number;
	/** Required if inline_message_id is not specified. Identifier of the sent message. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
}

export interface GetGameHighScoresParams {
	/** Target user id */
	user_id: number;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat. */
	chat_id?: number;
	/** Required if inline_message_id is not specified. Identifier of the sent message. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
}

export interface GameMethods {
	/** Use this method to send a game. On success, the sent Message is returned. */
	sendGame: Method<SendGameParams, Message>;
	/** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
	setGameScore: Method<SetGameScoreParams, Message | true>;
	/** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects. This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
	getGameHighScores: Method<GetGameHighScoresParams, GameHighScore[]>;
}
