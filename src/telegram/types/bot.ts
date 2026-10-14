import type { User } from './chat.ts';
import type { ChatId } from './common.ts';
import type { WebAppInfo } from './markup.ts';

/** This object describes the access settings of a bot. */
export interface BotAccessSettings {
	/** True, if only selected users can access the bot. The bot's owner can always access it. */
	isAccessRestricted: boolean;
	/** The list of other users who have access to the bot if the access is restricted */
	addedUsers?: User[];
}

/** This object represents a bot command. */
export interface BotCommand {
	/** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
	command: string;
	/** Description of the command; 1-256 characters */
	description: string;
	/** True, if the command sends an ephemeral message, which can be seen only by the sender of the message and the bot */
	isEphemeral?: boolean;
}

/** This object represents the scope to which bot commands are applied. Currently, the following 7 scopes are supported: */
export type BotCommandScope =
	| BotCommandScopeDefault
	| BotCommandScopeAllPrivateChats
	| BotCommandScopeAllGroupChats
	| BotCommandScopeAllChatAdministrators
	| BotCommandScopeChat
	| BotCommandScopeChatAdministrators
	| BotCommandScopeChatMember;

/** Represents the default scope of bot commands. Default commands are used if no commands with a narrower scope are specified for the user. */
export interface BotCommandScopeDefault {
	/** Scope type, must be default */
	type: 'default';
}

/** Represents the scope of bot commands, covering all private chats. */
export interface BotCommandScopeAllPrivateChats {
	/** Scope type, must be all_private_chats */
	type: 'all_private_chats';
}

/** Represents the scope of bot commands, covering all group and supergroup chats. */
export interface BotCommandScopeAllGroupChats {
	/** Scope type, must be all_group_chats */
	type: 'all_group_chats';
}

/** Represents the scope of bot commands, covering all group and supergroup chat administrators. */
export interface BotCommandScopeAllChatAdministrators {
	/** Scope type, must be all_chat_administrators */
	type: 'all_chat_administrators';
}

/** Represents the scope of bot commands, covering a specific chat. */
export interface BotCommandScopeChat {
	/** Scope type, must be chat */
	type: 'chat';
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username`. Channel direct messages chats and channel chats aren't supported. */
	chatId: ChatId;
}

/** Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat. */
export interface BotCommandScopeChatAdministrators {
	/** Scope type, must be chat_administrators */
	type: 'chat_administrators';
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username`. Channel direct messages chats and channel chats aren't supported. */
	chatId: ChatId;
}

/** Represents the scope of bot commands, covering a specific member of a group or supergroup chat. */
export interface BotCommandScopeChatMember {
	/** Scope type, must be chat_member */
	type: 'chat_member';
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username`. Channel direct messages chats and channel chats aren't supported. */
	chatId: ChatId;
	/** Unique identifier of the target user */
	userId: number;
}

/** This object represents the bot's name. */
export interface BotName {
	/** The bot's name */
	name: string;
}

/** This object represents the bot's description. */
export interface BotDescription {
	/** The bot's description */
	description: string;
}

/** This object represents the bot's short description. */
export interface BotShortDescription {
	/** The bot's short description */
	shortDescription: string;
}

/** This object describes the bot's menu button in a private chat. It should be one of */
export type MenuButton =
	MenuButtonCommands | MenuButtonWebApp | MenuButtonDefault;

/** Represents a menu button, which opens the bot's list of commands. */
export interface MenuButtonCommands {
	/** Type of the button, must be commands */
	type: 'commands';
}

/** Represents a menu button, which launches a Web App. */
export interface MenuButtonWebApp {
	/** Type of the button, must be web_app */
	type: 'web_app';
	/** Text on the button */
	text: string;
	/** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a `t.me` link to a Web App of the bot can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link. */
	webApp: WebAppInfo;
}

/** Describes that no specific value for the menu button was set. */
export interface MenuButtonDefault {
	/** Type of the button, must be default */
	type: 'default';
}

/** Describes an inline message sent by a Web App on behalf of a user. */
export interface SentWebAppMessage {
	/** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
	inlineMessageId?: string;
}

/** Describes an inline message sent by a guest bot. */
export interface SentGuestMessage {
	/** Identifier of the sent inline message */
	inlineMessageId: string;
}

/** Describes an inline message to be sent by a user of a Mini App. */
export interface PreparedInlineMessage {
	/** Unique identifier of the prepared message */
	id: string;
	/** Expiration date of the prepared message, in Unix time. Expired prepared messages can no longer be used. */
	expirationDate: number;
}

/** Describes a keyboard button to be used by a user of a Mini App. */
export interface PreparedKeyboardButton {
	/** Unique identifier of the keyboard button */
	id: string;
}

/** Describes why a request was unsuccessful. */
export interface ResponseParameters {
	/** The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	migrateToChatId?: number;
	/** In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
	retryAfter?: number;
}
