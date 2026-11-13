import type { ButtonStyle } from '../enums.ts';
import type { ChatAdministratorRights, User } from './chat.ts';
import type { EmptyObject } from './common.ts';
import type { CallbackGame } from './game.ts';
import type { MaybeInaccessibleMessage } from './message.ts';

/** Describes a Web App. */
export interface WebAppInfo {
	/** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
	url: string;
}

/** This object represents a custom keyboard with reply options (see Introduction to bots for details and examples). Not supported in channels and for messages sent on behalf of a business account. */
export interface ReplyKeyboardMarkup {
	/** Array of button rows, each represented by an Array of KeyboardButton objects */
	keyboard: KeyboardButton[][];
	/** Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to False, in which case the custom keyboard can be hidden and opened with a keyboard icon. */
	isPersistent?: boolean;
	/** Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to False, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
	resizeKeyboard?: boolean;
	/** Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False. */
	oneTimeKeyboard?: boolean;
	/** The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
	inputFieldPlaceholder?: string;
	/** Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message. Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
	selective?: boolean;
	/** Pass True if the reply interface must be shown to the user, as if they had manually selected the bot's message and tapped 'Reply' */
	forceReply?: boolean;
}

/** This object represents one button of the reply keyboard. At most one of the fields other than text, iconCustomEmojiId, and style must be used to specify the type of the button. For simple text buttons, String can be used instead of this object to specify the button text. */
export interface KeyboardButton {
	/** Text of the button. If none of the fields other than text, iconCustomEmojiId, and style are used, it will be sent as a message when the button is pressed. */
	text: string;
	/** Unique identifier of the custom emoji shown before the text of the button. Can only be used by bots that purchased additional usernames on Fragment or in the messages directly sent by the bot to private, group and supergroup chats if the owner of the bot has a Telegram Premium subscription. */
	iconCustomEmojiId?: string;
	/** Style of the button. Must be one of “danger” (red), “success” (green) or “primary” (blue). If omitted, then an app-specific style is used. */
	style?: ButtonStyle;
	/** If specified, pressing the button will open a list of suitable users. Identifiers of selected users will be sent to the bot in a “usersShared” service message. Available in private chats only. */
	requestUsers?: KeyboardButtonRequestUsers;
	/** If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chatShared” service message. Available in private chats only. */
	requestChat?: KeyboardButtonRequestChat;
	/** If specified, pressing the button will ask the user to create and share a bot that will be managed by the current bot. Available for bots that enabled management of other bots in the @BotFather Mini App. Available in private chats only. */
	requestManagedBot?: KeyboardButtonRequestManagedBot;
	/** If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only. */
	requestContact?: boolean;
	/** If True, the user's current location will be sent when the button is pressed. Available in private chats only. */
	requestLocation?: boolean;
	/** If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only. */
	requestPoll?: KeyboardButtonPollType;
	/** If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a “webAppData” service message. Available in private chats only. */
	webApp?: WebAppInfo;
}

/** This object defines the criteria used to request suitable users. Information about the selected users will be shared with the bot when the corresponding button is pressed. More about requesting users » */
export interface KeyboardButtonRequestUsers {
	/** Signed 32-bit identifier of the request that will be received back in the UsersShared object. Must be unique within the message. */
	requestId: number;
	/** Pass True to request bots, pass False to request regular users. If not specified, no additional restrictions are applied. */
	userIsBot?: boolean;
	/** Pass True to request premium users, pass False to request non-premium users. If not specified, no additional restrictions are applied. */
	userIsPremium?: boolean;
	/** The maximum number of users to be selected; 1-10. Defaults to 1. */
	maxQuantity?: number;
	/** Pass True to request the users' first and last names */
	requestName?: boolean;
	/** Pass True to request the users' usernames */
	requestUsername?: boolean;
	/** Pass True to request the users' photos */
	requestPhoto?: boolean;
}

/** This object defines the criteria used to request a suitable chat. Information about the selected chat will be shared with the bot when the corresponding button is pressed. The bot will be granted requested rights in the chat if appropriate. More about requesting chats ». */
export interface KeyboardButtonRequestChat {
	/** Signed 32-bit identifier of the request, which will be received back in the ChatShared object. Must be unique within the message. */
	requestId: number;
	/** Pass True to request a channel chat, pass False to request a group or a supergroup chat */
	chatIsChannel: boolean;
	/** Pass True to request a forum supergroup, pass False to request a non-forum chat. If not specified, no additional restrictions are applied. */
	chatIsForum?: boolean;
	/** Pass True to request a supergroup or a channel with a username, pass False to request a chat without a username. If not specified, no additional restrictions are applied. */
	chatHasUsername?: boolean;
	/** Pass True to request a chat owned by the user. Otherwise, no additional restrictions are applied. */
	chatIsCreated?: boolean;
	/** A JSON-serialized object listing the required administrator rights of the user in the chat. The rights must be a superset of botAdministratorRights. If not specified, no additional restrictions are applied. */
	userAdministratorRights?: ChatAdministratorRights;
	/** A JSON-serialized object listing the required administrator rights of the bot in the chat. The rights must be a subset of userAdministratorRights. If not specified, no additional restrictions are applied. */
	botAdministratorRights?: ChatAdministratorRights;
	/** Pass True to request a chat with the bot as a member. Otherwise, no additional restrictions are applied. */
	botIsMember?: boolean;
	/** Pass True to request the chat's title */
	requestTitle?: boolean;
	/** Pass True to request the chat's username */
	requestUsername?: boolean;
	/** Pass True to request the chat's photo */
	requestPhoto?: boolean;
}

/** This object defines the parameters for the creation of a managed bot. Information about the created bot will be shared with the bot using the update managed_bot and a Message with the field managedBotCreated. */
export interface KeyboardButtonRequestManagedBot {
	/** Signed 32-bit identifier of the request. Must be unique within the message. */
	requestId: number;
	/** Suggested name for the bot */
	suggestedName?: string;
	/** Suggested username for the bot. The username must end with “bot”. If the user creating the bot has a Telegram Premium subscription, then the username can also end with “agent”, “ai”, “app”, “game”, or “gay”; in this case, the username will be assigned to the bot as a secondary username, and a regular username ending with “bot” will be assigned to the bot automatically. */
	suggestedUsername?: string;
}

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export interface KeyboardButtonPollType {
	/** If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
	type?: string;
}

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup). Not supported in channels and for messages sent on behalf of a business account. */
export interface ReplyKeyboardRemove {
	/** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use oneTimeKeyboard in ReplyKeyboardMarkup) */
	removeKeyboard: true;
	/** Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message. Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
	selective?: boolean;
}

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
export interface InlineKeyboardMarkup {
	/** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
	inlineKeyboard: InlineKeyboardButton[][];
	/** Pass True if the reply interface must be shown to the user, as if they had manually selected the bot's message and tapped 'Reply'. The value of the field can't be changed when the inline keyboard is edited. */
	forceReply?: boolean;
}

/** This object represents one button of an inline keyboard. Exactly one of the fields other than text, iconCustomEmojiId, and style must be used to specify the type of the button. */
export interface InlineKeyboardButton {
	/** Label text on the button */
	text: string;
	/** Unique identifier of the custom emoji shown before the text of the button. Can only be used by bots that purchased additional usernames on Fragment or in the messages directly sent by the bot to private, group and supergroup chats if the owner of the bot has a Telegram Premium subscription. */
	iconCustomEmojiId?: string;
	/** Style of the button. Must be one of “danger” (red), “success” (green) or “primary” (blue). If omitted, then an app-specific style is used. */
	style?: ButtonStyle;
	/** HTTP or tg:// URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings. */
	url?: string;
	/** Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes */
	callbackData?: string;
	/** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a business account and ephemeral messages. */
	webApp?: WebAppInfo;
	/** An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. Not supported for ephemeral messages. */
	loginUrl?: LoginUrl;
	/** If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
	switchInlineQuery?: string;
	/** If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted. This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options. Not supported in channels and for messages sent in channel direct messages chats and on behalf of a business account. */
	switchInlineQueryCurrentChat?: string;
	/** If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
	switchInlineQueryChosenChat?: SwitchInlineQueryChosenChat;
	/** Description of the button that copies the specified text to the clipboard */
	copyText?: CopyTextButton;
	/** Description of the game that will be launched when the user presses the button. NOTE: This type of button must always be the first button in the first row. */
	callbackGame?: CallbackGame;
	/** Specify True, to send a Pay button. Substrings “⭐” and “XTR” in the buttons's text will be replaced with a Telegram Star icon. NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages. */
	pay?: boolean;
	/** If set, then the button is disabled and does nothing */
	disabled?: DisabledButton;
}

/** This object represents a parameter of the inline keyboard button used to automatically authorize a user. It serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in: Sample bot: @DiscussBot */
export interface LoginUrl {
	/** An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data. NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization. */
	url: string;
	/** New text of the button in forwarded messages */
	forwardText?: string;
	/** Username of a bot, which will be used for user authorization; not supported in RichMessageButton. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See Linking your domain to the bot for more details. */
	botUsername?: string;
	/** Pass True to request the permission for your bot to send messages to the user */
	requestWriteAccess?: boolean;
}

/** This object represents an inline button that switches the current user to inline mode in a chosen chat, with an optional default inline query. */
export interface SwitchInlineQueryChosenChat {
	/** The default inline query to be inserted in the input field. If left empty, only the bot's username will be inserted. */
	query?: string;
	/** True, if private chats with users can be chosen */
	allowUserChats?: boolean;
	/** True, if private chats with bots can be chosen */
	allowBotChats?: boolean;
	/** True, if group and supergroup chats can be chosen */
	allowGroupChats?: boolean;
	/** True, if channel chats can be chosen */
	allowChannelChats?: boolean;
}

/** This object represents an inline keyboard button that copies specified text to the clipboard. */
export interface CopyTextButton {
	/** The text to be copied to the clipboard; 1-256 characters */
	text: string;
}

/** This object represents a disabled button which does nothing. Currently holds no information. */
export type DisabledButton = EmptyObject;

/** This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inlineMessageId will be present. Exactly one of the fields data or gameShortName will be present. */
export interface CallbackQuery {
	/** Unique identifier for this query */
	id: string;
	/** Sender */
	from: User;
	/** Message sent by the bot with the callback button that originated the query */
	message?: MaybeInaccessibleMessage;
	/** Identifier of the message sent via the bot in inline mode, that originated the query */
	inlineMessageId?: string;
	/** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
	chatInstance: string;
	/** Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data. */
	data?: string;
	/** Short name of a Game to be returned, serves as the unique identifier for the game */
	gameShortName?: string;
}

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode. Not supported in channels and for messages sent on behalf of a user account. */
export interface ForceReply {
	/** Shows reply interface to the user, as if they had manually selected the bot's message and tapped 'Reply' */
	forceReply: true;
	/** The placeholder to be shown in the input field when the reply is active; 1-64 characters */
	inputFieldPlaceholder?: string;
	/** Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message. */
	selective?: boolean;
}
