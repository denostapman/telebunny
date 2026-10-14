import type {
	BotAccessSettings,
	BotCommand,
	BotCommandScope,
	BotDescription,
	BotName,
	BotShortDescription,
	MenuButton,
	PreparedKeyboardButton,
	SentGuestMessage,
} from '../types/bot.ts';
import type { ChatAdministratorRights, User } from '../types/chat.ts';
import type { EmptyObject } from '../types/common.ts';
import type { InlineQueryResult } from '../types/inline.ts';
import type { KeyboardButton } from '../types/markup.ts';
import type { InputProfilePhoto } from '../types/media.ts';
import type { Method } from './common.ts';

export interface AnswerCallbackQueryParams {
	/** Unique identifier for the query to be answered */
	callbackQueryId: string;
	/** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters. */
	text?: string;
	/** If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to False. */
	showAlert?: boolean;
	/** URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callbackGame button. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter. */
	url?: string;
	/** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Defaults to 0. */
	cacheTime?: number;
}

export interface AnswerGuestQueryParams {
	/** Unique identifier for the query to be answered */
	guestQueryId: string;
	/** A JSON-serialized object describing the message to be sent */
	result: InlineQueryResult;
}

export interface GetManagedBotTokenParams {
	/** User identifier of the managed bot whose token will be returned */
	userId: number;
}

export interface ReplaceManagedBotTokenParams {
	/** User identifier of the managed bot whose token will be replaced */
	userId: number;
}

export interface GetManagedBotAccessSettingsParams {
	/** User identifier of the managed bot whose access settings will be returned */
	userId: number;
}

export interface SetManagedBotAccessSettingsParams {
	/** User identifier of the managed bot whose access settings will be changed */
	userId: number;
	/** Pass True if only selected users can access the bot. The bot's owner can always access it. */
	isAccessRestricted: boolean;
	/** A JSON-serialized list of up to 10 identifiers of users who will have access to the bot in addition to its owner. Ignored if isAccessRestricted is False. */
	addedUserIds?: number[];
}

export interface SetMyCommandsParams {
	/** A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified. */
	commands: BotCommand[];
	/** A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
	scope?: BotCommandScope;
	/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands. */
	languageCode?: string;
}

export interface DeleteMyCommandsParams {
	/** A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
	scope?: BotCommandScope;
	/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands. */
	languageCode?: string;
}

export interface GetMyCommandsParams {
	/** A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault. */
	scope?: BotCommandScope;
	/** A two-letter ISO 639-1 language code or an empty string */
	languageCode?: string;
}

export interface SetMyNameParams {
	/** New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language. */
	name?: string;
	/** A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name. */
	languageCode?: string;
}

export interface GetMyNameParams {
	/** A two-letter ISO 639-1 language code or an empty string */
	languageCode?: string;
}

export interface SetMyDescriptionParams {
	/** New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language. */
	description?: string;
	/** A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description. */
	languageCode?: string;
}

export interface GetMyDescriptionParams {
	/** A two-letter ISO 639-1 language code or an empty string */
	languageCode?: string;
}

export interface SetMyShortDescriptionParams {
	/** New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language. */
	shortDescription?: string;
	/** A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description. */
	languageCode?: string;
}

export interface GetMyShortDescriptionParams {
	/** A two-letter ISO 639-1 language code or an empty string */
	languageCode?: string;
}

export interface SetMyProfilePhotoParams {
	/** The new profile photo to set */
	photo: InputProfilePhoto;
}

export interface SetChatMenuButtonParams {
	/** Unique identifier for the target private chat. If not specified, the bot's default menu button will be changed. */
	chatId?: number;
	/** A JSON-serialized object for the bot's new menu button. Defaults to MenuButtonDefault. */
	menuButton?: MenuButton;
}

export interface GetChatMenuButtonParams {
	/** Unique identifier for the target private chat. If not specified, the bot's default menu button will be returned. */
	chatId?: number;
}

export interface SetMyDefaultAdministratorRightsParams {
	/** A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared. */
	rights?: ChatAdministratorRights;
	/** Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed. */
	forChannels?: boolean;
}

export interface GetMyDefaultAdministratorRightsParams {
	/** Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned. */
	forChannels?: boolean;
}

export interface SavePreparedKeyboardButtonParams {
	/** Unique identifier of the target user that can use the button */
	userId: number;
	/** A JSON-serialized object describing the button to be saved. The button must be of the type requestUsers, requestChat, or requestManagedBot. */
	button: KeyboardButton;
}

export interface BotMethods {
	/** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
	getMe: Method<EmptyObject, User>;
	/** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
	logOut: Method<EmptyObject, true>;
	/** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
	close: Method<EmptyObject, true>;
	/** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned. Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter. */
	answerCallbackQuery: Method<AnswerCallbackQueryParams, true>;
	/** Use this method to reply to a received guest message. On success, a SentGuestMessage object is returned. */
	answerGuestQuery: Method<AnswerGuestQueryParams, SentGuestMessage>;
	/** Use this method to get the token of a managed bot. Returns the token as String on success. */
	getManagedBotToken: Method<GetManagedBotTokenParams, string>;
	/** Use this method to revoke the current token of a managed bot and generate a new one. Returns the new token as String on success. */
	replaceManagedBotToken: Method<ReplaceManagedBotTokenParams, string>;
	/** Use this method to get the access settings of a managed bot. Returns a BotAccessSettings object on success. */
	getManagedBotAccessSettings: Method<
		GetManagedBotAccessSettingsParams,
		BotAccessSettings
	>;
	/** Use this method to change the access settings of a managed bot. Returns True on success. */
	setManagedBotAccessSettings: Method<
		SetManagedBotAccessSettingsParams,
		true
	>;
	/** Use this method to change the list of the bot's commands. See this manual for more details about bot commands. Returns True on success. */
	setMyCommands: Method<SetMyCommandsParams, true>;
	/** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
	deleteMyCommands: Method<DeleteMyCommandsParams, true>;
	/** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
	getMyCommands: Method<GetMyCommandsParams, BotCommand[]>;
	/** Use this method to change the bot's name. Returns True on success. */
	setMyName: Method<SetMyNameParams, true>;
	/** Use this method to get the current bot name for the given user language. Returns BotName on success. */
	getMyName: Method<GetMyNameParams, BotName>;
	/** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
	setMyDescription: Method<SetMyDescriptionParams, true>;
	/** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
	getMyDescription: Method<GetMyDescriptionParams, BotDescription>;
	/** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
	setMyShortDescription: Method<SetMyShortDescriptionParams, true>;
	/** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
	getMyShortDescription: Method<
		GetMyShortDescriptionParams,
		BotShortDescription
	>;
	/** Changes the profile photo of the bot. Returns True on success. */
	setMyProfilePhoto: Method<SetMyProfilePhotoParams, true>;
	/** Removes the profile photo of the bot. Requires no parameters. Returns True on success. */
	removeMyProfilePhoto: Method<EmptyObject, true>;
	/** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
	setChatMenuButton: Method<SetChatMenuButtonParams, true>;
	/** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
	getChatMenuButton: Method<GetChatMenuButtonParams, MenuButton>;
	/** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
	setMyDefaultAdministratorRights: Method<
		SetMyDefaultAdministratorRightsParams,
		true
	>;
	/** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
	getMyDefaultAdministratorRights: Method<
		GetMyDefaultAdministratorRightsParams,
		ChatAdministratorRights
	>;
	/** Stores a keyboard button that can be used by a user within a Mini App. Returns a PreparedKeyboardButton object. */
	savePreparedKeyboardButton: Method<
		SavePreparedKeyboardButtonParams,
		PreparedKeyboardButton
	>;
}
