import type {
	ForumTopicIconColor,
	MessageEntityType,
	ParseMode,
} from '../enums.ts';
import type { Chat, Community, DirectMessagesTopic, User } from './chat.ts';
import type { ChatId, EmptyObject } from './common.ts';
import type { Game } from './game.ts';
import type { GiftInfo, UniqueGiftInfo } from './gift.ts';
import type { InlineKeyboardMarkup } from './markup.ts';
import type {
	Animation,
	Audio,
	Checklist,
	ChecklistTask,
	Contact,
	Dice,
	Document,
	LivePhoto,
	Location,
	PaidMediaInfo,
	PhotoSize,
	Poll,
	Venue,
	Video,
	VideoNote,
	Voice,
} from './media.ts';
import type { PassportData } from './passport.ts';
import type {
	Invoice,
	RefundedPayment,
	StarAmount,
	SuccessfulPayment,
} from './payment.ts';
import type { RichMessage } from './rich.ts';
import type { Sticker } from './sticker.ts';
import type { Story } from './story.ts';

/** This object represents a message. */
export interface Message {
	/** Unique message identifier inside this chat; 0 for ephemeral messages. In specific instances (e.g., a message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent. */
	messageId: number;
	/** Unique identifier of a message thread or forum topic to which the message belongs; for supergroups and private chats only */
	messageThreadId?: number;
	/** Information about the direct messages chat topic that contains the message */
	directMessagesTopic?: DirectMessagesTopic;
	/** Sender of the message; may be empty for messages sent to channels. For backward compatibility, if the message was sent on behalf of a chat, the field contains a fake sender user in non-channel chats. */
	from?: User;
	/** Sender of the message when sent on behalf of a chat. For example, the supergroup itself for messages sent by its anonymous administrators or a linked channel for messages automatically forwarded to the channel's discussion group. For backward compatibility, if the message was sent on behalf of a chat, the field from contains a fake sender user in non-channel chats. */
	senderChat?: Chat;
	/** If the sender of the message boosted the chat, the number of boosts added by the user */
	senderBoostCount?: number;
	/** The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account. */
	senderBusinessBot?: User;
	/** Tag or custom title of the sender of the message; for supergroups only */
	senderTag?: string;
	/** For ephemeral messages, the user who received the message */
	receiverUser?: User;
	/** For ephemeral messages, identifier of the ephemeral message inside this chat. The identifier may be reused for another ephemeral message after the message is deleted or expires. */
	ephemeralMessageId?: number;
	/** Date the message was sent in Unix time. It is always a positive number, representing a valid date. */
	date: number;
	/** The unique identifier for the guest query. Use this identifier with the method answerGuestQuery to send a response message. If non-empty, the message belongs to the chat where the guest bot was summoned, which may not coincide with other existing bot chats sharing the same identifier. */
	guestQueryId?: string;
	/** Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier. */
	businessConnectionId?: string;
	/** Chat the message belongs to */
	chat: Chat;
	/** Information about the original message for forwarded messages */
	forwardOrigin?: MessageOrigin;
	/** True, if the message is sent to a topic in a forum supergroup or a private chat with the bot */
	isTopicMessage?: true;
	/** True, if the message is a channel post that was automatically forwarded to the connected discussion group */
	isAutomaticForward?: true;
	/** For replies in the same chat and message thread, the original message. Note that the Message object in this field will not contain further replyToMessage fields even if it itself is a reply. If the message is a reply to an ephemeral message, then this field may be omitted. */
	replyToMessage?: Message;
	/** Information about the message that is being replied to, which may come from another chat or forum topic */
	externalReply?: ExternalReplyInfo;
	/** For replies that quote part of the original message, the quoted part of the message */
	quote?: TextQuote;
	/** For replies to a story, the original story */
	replyToStory?: Story;
	/** Identifier of the specific checklist task that is being replied to */
	replyToChecklistTaskId?: number;
	/** Persistent identifier of the specific poll option that is being replied to */
	replyToPollOptionId?: string;
	/** Bot through which the message was sent */
	viaBot?: User;
	/** For a message sent by a guest bot, this is the user whose original message triggered the bot's response */
	guestBotCallerUser?: User;
	/** For a message sent by a guest bot, this is the chat whose original message triggered the bot's response */
	guestBotCallerChat?: Chat;
	/** Date the message was last edited in Unix time */
	editDate?: number;
	/** True, if the message can't be forwarded */
	hasProtectedContent?: true;
	/** True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message */
	isFromOffline?: true;
	/** True, if the message is a paid post. Note that such posts must not be deleted for 24 hours to receive the payment and can't be edited. */
	isPaidPost?: true;
	/** The unique identifier inside this chat of a media message group this message belongs to */
	mediaGroupId?: string;
	/** Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
	authorSignature?: string;
	/** The number of Telegram Stars that were paid by the sender of the message to send it */
	paidStarCount?: number;
	/** For text messages, the actual UTF-8 text of the message */
	text?: string;
	/** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
	entities?: MessageEntity[];
	/** Options used for link preview generation for the message, if it is a text message and link preview options were changed */
	linkPreviewOptions?: LinkPreviewOptions;
	/** Information about suggested post parameters if the message is a suggested post in a channel direct messages chat. If the message is an approved or declined suggested post, then it can't be edited. */
	suggestedPostInfo?: SuggestedPostInfo;
	/** Unique identifier of the message effect added to the message */
	effectId?: string;
	/** Message is a rich formatted message */
	richMessage?: RichMessage;
	/** Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set. */
	animation?: Animation;
	/** Message is an audio file, information about the file */
	audio?: Audio;
	/** Message is a general file, information about the file */
	document?: Document;
	/** Message is a live photo, information about the live photo. For backward compatibility, when this field is set, the photo field will also be set. */
	livePhoto?: LivePhoto;
	/** Message contains paid media; information about the paid media */
	paidMedia?: PaidMediaInfo;
	/** Message is a photo, available sizes of the photo */
	photo?: PhotoSize[];
	/** Message is a sticker, information about the sticker */
	sticker?: Sticker;
	/** Message is a forwarded story */
	story?: Story;
	/** Message is a video, information about the video */
	video?: Video;
	/** Message is a video note, information about the video message */
	videoNote?: VideoNote;
	/** Message is a voice message, information about the file */
	voice?: Voice;
	/** Caption for the animation, audio, document, paid media, photo, video or voice */
	caption?: string;
	/** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
	captionEntities?: MessageEntity[];
	/** True, if the caption must be shown above the message media */
	showCaptionAboveMedia?: true;
	/** True, if the message media is covered by a spoiler animation */
	hasMediaSpoiler?: true;
	/** Message is a checklist */
	checklist?: Checklist;
	/** Message is a shared contact, information about the contact */
	contact?: Contact;
	/** Message is a dice with random value */
	dice?: Dice;
	/** Message is a game, information about the game. More about games » */
	game?: Game;
	/** Message is a native poll, information about the poll */
	poll?: Poll;
	/** Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set. */
	venue?: Venue;
	/** Message is a shared location, information about the location */
	location?: Location;
	/** New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
	newChatMembers?: User[];
	/** A member was removed from the group, information about them (this member may be the bot itself) */
	leftChatMember?: User;
	/** Service message: chat owner has left */
	chatOwnerLeft?: ChatOwnerLeft;
	/** Service message: chat owner has changed */
	chatOwnerChanged?: ChatOwnerChanged;
	/** A chat title was changed to this value */
	newChatTitle?: string;
	/** A chat photo was change to this value */
	newChatPhoto?: PhotoSize[];
	/** Service message: the chat photo was deleted */
	deleteChatPhoto?: true;
	/** Service message: the group has been created */
	groupChatCreated?: true;
	/** Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in replyToMessage if someone replies to a very first message in a directly created supergroup. */
	supergroupChatCreated?: true;
	/** Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in replyToMessage if someone replies to a very first message in a channel. */
	channelChatCreated?: true;
	/** Service message: auto-delete timer settings changed in the chat */
	messageAutoDeleteTimerChanged?: MessageAutoDeleteTimerChanged;
	/** The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	migrateToChatId?: number;
	/** The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	migrateFromChatId?: number;
	/** Specified message was pinned. Note that the Message object in this field will not contain further replyToMessage fields even if it itself is a reply. */
	pinnedMessage?: MaybeInaccessibleMessage;
	/** Message is an invoice for a payment, information about the invoice. More about payments » */
	invoice?: Invoice;
	/** Message is a service message about a successful payment, information about the payment. More about payments » */
	successfulPayment?: SuccessfulPayment;
	/** Message is a service message about a refunded payment, information about the payment. More about payments » */
	refundedPayment?: RefundedPayment;
	/** Service message: users were shared with the bot */
	usersShared?: UsersShared;
	/** Service message: a chat was shared with the bot */
	chatShared?: ChatShared;
	/** Service message: a regular gift was sent or received */
	gift?: GiftInfo;
	/** Service message: a unique gift was sent or received */
	uniqueGift?: UniqueGiftInfo;
	/** Service message: upgrade of a gift was purchased after the gift was sent */
	giftUpgradeSent?: GiftInfo;
	/** The domain name of the website on which the user has logged in. More about Telegram Login » */
	connectedWebsite?: string;
	/** Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess */
	writeAccessAllowed?: WriteAccessAllowed;
	/** Telegram Passport data */
	passportData?: PassportData;
	/** Service message: a user in the chat triggered another user's proximity alert while sharing Live Location */
	proximityAlertTriggered?: ProximityAlertTriggered;
	/** Service message: user boosted the chat */
	boostAdded?: ChatBoostAdded;
	/** Service message: chat background set */
	chatBackgroundSet?: ChatBackground;
	/** Service message: some tasks in a checklist were marked as done or not done */
	checklistTasksDone?: ChecklistTasksDone;
	/** Service message: tasks were added to a checklist */
	checklistTasksAdded?: ChecklistTasksAdded;
	/** Service message: chat or bot added to a Community */
	communityChatAdded?: CommunityChatAdded;
	/** Service message: chat was joined by a user from a Community */
	communityChatJoined?: CommunityChatJoined;
	/** Service message: chat or bot removed from a Community */
	communityChatRemoved?: CommunityChatRemoved;
	/** Service message: the price for paid messages in the corresponding direct messages chat of a channel has changed */
	directMessagePriceChanged?: DirectMessagePriceChanged;
	/** Service message: forum topic created */
	forumTopicCreated?: ForumTopicCreated;
	/** Service message: forum topic edited */
	forumTopicEdited?: ForumTopicEdited;
	/** Service message: forum topic closed */
	forumTopicClosed?: ForumTopicClosed;
	/** Service message: forum topic reopened */
	forumTopicReopened?: ForumTopicReopened;
	/** Service message: the 'General' forum topic hidden */
	generalForumTopicHidden?: GeneralForumTopicHidden;
	/** Service message: the 'General' forum topic unhidden */
	generalForumTopicUnhidden?: GeneralForumTopicUnhidden;
	/** Service message: a scheduled giveaway was created */
	giveawayCreated?: GiveawayCreated;
	/** The message is a scheduled giveaway message */
	giveaway?: Giveaway;
	/** A giveaway with public winners was completed */
	giveawayWinners?: GiveawayWinners;
	/** Service message: a giveaway without public winners was completed */
	giveawayCompleted?: GiveawayCompleted;
	/** Service message: user created a bot that will be managed by the current bot */
	managedBotCreated?: ManagedBotCreated;
	/** Service message: the price for paid messages has changed in the chat */
	paidMessagePriceChanged?: PaidMessagePriceChanged;
	/** Service message: answer option was added to a poll */
	pollOptionAdded?: PollOptionAdded;
	/** Service message: answer option was deleted from a poll */
	pollOptionDeleted?: PollOptionDeleted;
	/** Service message: a suggested post was approved */
	suggestedPostApproved?: SuggestedPostApproved;
	/** Service message: approval of a suggested post has failed */
	suggestedPostApprovalFailed?: SuggestedPostApprovalFailed;
	/** Service message: a suggested post was declined */
	suggestedPostDeclined?: SuggestedPostDeclined;
	/** Service message: payment for a suggested post was received */
	suggestedPostPaid?: SuggestedPostPaid;
	/** Service message: payment for a suggested post was refunded */
	suggestedPostRefunded?: SuggestedPostRefunded;
	/** Service message: video chat scheduled */
	videoChatScheduled?: VideoChatScheduled;
	/** Service message: video chat started */
	videoChatStarted?: VideoChatStarted;
	/** Service message: video chat ended */
	videoChatEnded?: VideoChatEnded;
	/** Service message: new participants invited to a video chat */
	videoChatParticipantsInvited?: VideoChatParticipantsInvited;
	/** Service message: data sent by a Web App */
	webAppData?: WebAppData;
	/** Inline keyboard attached to the message. `loginUrl` buttons are represented as ordinary `url` buttons. */
	replyMarkup?: InlineKeyboardMarkup;
}

/** This object represents a unique message identifier. */
export interface MessageId {
	/** Unique message identifier. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent. */
	messageId: number;
}

/** This object describes a message that was deleted or is otherwise inaccessible to the bot. */
export interface InaccessibleMessage {
	/** Chat the message belonged to */
	chat: Chat;
	/** Unique message identifier inside the chat */
	messageId: number;
	/** Always 0. The field can be used to differentiate regular and inaccessible messages. */
	date: number;
}

/** This object describes a message that can be inaccessible to the bot. It can be one of */
export type MaybeInaccessibleMessage = Message | InaccessibleMessage;

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export interface MessageEntity {
	/** Type of the entity. Currently, can be “mention” (`@username`), “hashtag” (`#hashtag` or `#hashtag@chatusername`), “cashtag” (`$USD` or `$USD@chatusername`), “bot_command” (`/start@jobs_bot`), “url” (`https://telegram.org`), “email” (`do-not-reply@telegram.org`), “phone_number” (`+1-212-555-0123`), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “blockquote” (block quotation), “expandable_blockquote” (collapsed-by-default block quotation), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames), “custom_emoji” (for inline custom emoji stickers), or “date_time” (for formatted date and time). */
	type: MessageEntityType;
	/** Offset in UTF-16 code units to the start of the entity */
	offset: number;
	/** Length of the entity in UTF-16 code units */
	length: number;
	/** For “text_link” only, URL that will be opened after user taps on the text */
	url?: string;
	/** For “text_mention” only, the mentioned user */
	user?: User;
	/** For “pre” only, the programming language of the entity text */
	language?: string;
	/** For “custom_emoji” only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker. */
	customEmojiId?: string;
	/** For “date_time” only, the Unix time associated with the entity */
	unixTime?: number;
	/** For “date_time” only, the string that defines the formatting of the date and time. See date-time entity formatting for more details. */
	dateTimeFormat?: string;
}

/** This object contains information about the quoted part of a message that is replied to by the given message. */
export interface TextQuote {
	/** Text of the quoted part of a message that is replied to by the given message */
	text: string;
	/** Special entities that appear in the quote. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are kept in quotes. */
	entities?: MessageEntity[];
	/** Approximate quote position in the original message in UTF-16 code units as specified by the sender */
	position: number;
	/** True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server. */
	isManual?: true;
}

/** This object contains information about a message that is being replied to, which may come from another chat or forum topic. */
export interface ExternalReplyInfo {
	/** Origin of the message replied to by the given message */
	origin: MessageOrigin;
	/** Chat the original message belongs to. Available only if the chat is a supergroup or a channel. */
	chat?: Chat;
	/** Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel. */
	messageId?: number;
	/** Options used for link preview generation for the original message, if it is a text message */
	linkPreviewOptions?: LinkPreviewOptions;
	/** Message is an animation, information about the animation */
	animation?: Animation;
	/** Message is an audio file, information about the file */
	audio?: Audio;
	/** Message is a general file, information about the file */
	document?: Document;
	/** Message is a live photo, information about the live photo */
	livePhoto?: LivePhoto;
	/** Message contains paid media; information about the paid media */
	paidMedia?: PaidMediaInfo;
	/** Message is a photo, available sizes of the photo */
	photo?: PhotoSize[];
	/** Message is a sticker, information about the sticker */
	sticker?: Sticker;
	/** Message is a forwarded story */
	story?: Story;
	/** Message is a video, information about the video */
	video?: Video;
	/** Message is a video note, information about the video message */
	videoNote?: VideoNote;
	/** Message is a voice message, information about the file */
	voice?: Voice;
	/** True, if the message media is covered by a spoiler animation */
	hasMediaSpoiler?: true;
	/** Message is a checklist */
	checklist?: Checklist;
	/** Message is a shared contact, information about the contact */
	contact?: Contact;
	/** Message is a dice with random value */
	dice?: Dice;
	/** Message is a game, information about the game. More about games » */
	game?: Game;
	/** Message is a scheduled giveaway, information about the giveaway */
	giveaway?: Giveaway;
	/** A giveaway with public winners was completed */
	giveawayWinners?: GiveawayWinners;
	/** Message is an invoice for a payment, information about the invoice. More about payments » */
	invoice?: Invoice;
	/** Message is a shared location, information about the location */
	location?: Location;
	/** Message is a native poll, information about the poll */
	poll?: Poll;
	/** Message is a venue, information about the venue */
	venue?: Venue;
}

/** Describes reply parameters for the message that is being sent. */
export interface ReplyParameters {
	/** Identifier of the message that will be replied to in the current chat, or in the chat chatId if it is specified. Required if ephemeralMessageId isn't specified. */
	messageId?: number;
	/** If the message to be replied to is from a different chat, unique identifier for the chat or username of the bot, supergroup or channel in the format `@username`. Not supported for messages sent on behalf of a business account, messages from channel direct messages chats and ephemeral messages. */
	chatId?: ChatId;
	/** Identifier of the incoming ephemeral message that will be replied to in the current chat. A reply to an ephemeral message must itself be an ephemeral message. An ephemeral message may only be replied to within 15 seconds of being sent. Required if messageId isn't specified. */
	ephemeralMessageId?: number;
	/** Pass True if the message should be sent even if the specified message to be replied to is not found. Always False for replies in another chat or forum topic, and sent ephemeral messages. Always True for messages sent on behalf of a business account. */
	allowSendingWithoutReply?: boolean;
	/** Quoted part of the message to be replied to; 0-1024 characters after entities parsing. The quote must be an exact substring of the message to be replied to, including bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities. The message will fail to send if the quote isn't found in the original message. Ignored for ephemeral messages. */
	quote?: string;
	/** Mode for parsing entities in the quote. See formatting options for more details. */
	quoteParseMode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the quote. It can be specified instead of quoteParseMode. */
	quoteEntities?: MessageEntity[];
	/** Position of the quote in the original message in UTF-16 code units */
	quotePosition?: number;
	/** Identifier of the specific checklist task to be replied to */
	checklistTaskId?: number;
	/** Persistent identifier of the specific poll option to be replied to */
	pollOptionId?: string;
}

export interface EphemeralMessageParameters {
	/** Identifier of the user who will receive the message. It is not guaranteed that the user will receive the message, especially if they are offline. See here for more details. */
	receiverUserId: number;
	/** Identifier of the callback query which triggered the message, if any */
	callbackQueryId?: string;
	/** Pass True if the ephemeral message must be shown in place of the original message. Must be False for callback queries from ephemeral messages, which must be edited using regular editEphemeralMessage… methods. */
	replaceCallbackQueryMessage?: boolean;
}

/** This object describes the origin of a message. It can be one of */
export type MessageOrigin =
	| MessageOriginUser
	| MessageOriginHiddenUser
	| MessageOriginChat
	| MessageOriginChannel;

/** The message was originally sent by a known user. */
export interface MessageOriginUser {
	/** Type of the message origin, always “user” */
	type: 'user';
	/** Date the message was sent originally in Unix time */
	date: number;
	/** User that sent the message originally */
	senderUser: User;
}

/** The message was originally sent by an unknown user. */
export interface MessageOriginHiddenUser {
	/** Type of the message origin, always “hidden_user” */
	type: 'hidden_user';
	/** Date the message was sent originally in Unix time */
	date: number;
	/** Name of the user that sent the message originally */
	senderUserName: string;
}

/** The message was originally sent on behalf of a chat to a group chat. */
export interface MessageOriginChat {
	/** Type of the message origin, always “chat” */
	type: 'chat';
	/** Date the message was sent originally in Unix time */
	date: number;
	/** Chat that sent the message originally */
	senderChat: Chat;
	/** For messages originally sent by an anonymous chat administrator, original message author signature */
	authorSignature?: string;
}

/** The message was originally sent to a channel chat. */
export interface MessageOriginChannel {
	/** Type of the message origin, always “channel” */
	type: 'channel';
	/** Date the message was sent originally in Unix time */
	date: number;
	/** Channel chat to which the message was originally sent */
	chat: Chat;
	/** Unique message identifier inside the chat */
	messageId: number;
	/** Signature of the original post author */
	authorSignature?: string;
}

/** Describes data sent from a Web App to the bot. */
export interface WebAppData {
	/** The data. Be aware that a bad client can send arbitrary data in this field. */
	data: string;
	/** Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field. */
	buttonText: string;
}

/** This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user. */
export interface ProximityAlertTriggered {
	/** User that triggered the alert */
	traveler: User;
	/** User that set the alert */
	watcher: User;
	/** The distance between the users */
	distance: number;
}

/** This object represents a service message about a change in auto-delete timer settings. */
export interface MessageAutoDeleteTimerChanged {
	/** New auto-delete time for messages in the chat; in seconds */
	messageAutoDeleteTime: number;
}

/** This object contains information about the bot that was created to be managed by the current bot. */
export interface ManagedBotCreated {
	/** Information about the bot. The bot's token can be fetched using the method getManagedBotToken. */
	bot: User;
}

/** This object contains information about the creation, token update, or owner update of a bot that is managed by the current bot. */
export interface ManagedBotUpdated {
	/** User that created the bot */
	user: User;
	/** Information about the bot. Token of the bot can be fetched using the method getManagedBotToken. */
	bot: User;
}

/** This object contains information about changes to a user payment subscription toward the current bot. */
export interface BotSubscriptionUpdated {
	/** User who subscribed for payments toward the bot */
	user: User;
	/** Bot-specified invoice payload */
	invoicePayload: string;
	/** The new state of the subscription. Currently, it can be one of “canceled” if the user canceled the subscription, “active” if the user re-enabled a previously canceled subscription, or “failed” if payment for the subscription failed. */
	state: 'canceled' | 'active' | 'failed';
}

/** This object describes an update about a user stopping message generation. */
export interface MessageGenerationStopped {
	/** Chat in which the message is generated */
	chat: Chat;
	/** Unique identifier of the message thread in which the message is generated */
	messageThreadId?: number;
	/** Unique identifier of the message draft which was stopped */
	draftId: number;
}

/** Describes a service message about an option added to a poll. */
export interface PollOptionAdded {
	/** Message containing the poll to which the option was added, if known. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	pollMessage?: MaybeInaccessibleMessage;
	/** Unique identifier of the added option */
	optionPersistentId: string;
	/** Option text */
	optionText: string;
	/** Special entities that appear in the optionText */
	optionTextEntities?: MessageEntity[];
}

/** Describes a service message about an option deleted from a poll. */
export interface PollOptionDeleted {
	/** Message containing the poll from which the option was deleted, if known. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	pollMessage?: MaybeInaccessibleMessage;
	/** Unique identifier of the deleted option */
	optionPersistentId: string;
	/** Option text */
	optionText: string;
	/** Special entities that appear in the optionText */
	optionTextEntities?: MessageEntity[];
}

/** This object represents a service message about a user boosting a chat. */
export interface ChatBoostAdded {
	/** Number of boosts added by the user */
	boostCount: number;
}

/** This object describes the way a background is filled based on the selected colors. Currently, it can be one of */
export type BackgroundFill =
	| BackgroundFillSolid
	| BackgroundFillGradient
	| BackgroundFillFreeformGradient;

/** The background is filled using the selected color. */
export interface BackgroundFillSolid {
	/** Type of the background fill, always “solid” */
	type: 'solid';
	/** The color of the background fill in the RGB24 format */
	color: number;
}

/** The background is a gradient fill. */
export interface BackgroundFillGradient {
	/** Type of the background fill, always “gradient” */
	type: 'gradient';
	/** Top color of the gradient in the RGB24 format */
	topColor: number;
	/** Bottom color of the gradient in the RGB24 format */
	bottomColor: number;
	/** Clockwise rotation angle of the background fill in degrees; 0-359 */
	rotationAngle: number;
}

/** The background is a freeform gradient that rotates after every message in the chat. */
export interface BackgroundFillFreeformGradient {
	/** Type of the background fill, always “freeform_gradient” */
	type: 'freeform_gradient';
	/** A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format */
	colors: number[];
}

/** This object describes the type of a background. Currently, it can be one of */
export type BackgroundType =
	| BackgroundTypeFill
	| BackgroundTypeWallpaper
	| BackgroundTypePattern
	| BackgroundTypeChatTheme;

/** The background is automatically filled based on the selected colors. */
export interface BackgroundTypeFill {
	/** Type of the background, always “fill” */
	type: 'fill';
	/** The background fill */
	fill: BackgroundFill;
	/** Dimming of the background in dark themes, as a percentage; 0-100 */
	darkThemeDimming: number;
}

/** The background is a wallpaper in the JPEG format. */
export interface BackgroundTypeWallpaper {
	/** Type of the background, always “wallpaper” */
	type: 'wallpaper';
	/** Document with the wallpaper */
	document: Document;
	/** Dimming of the background in dark themes, as a percentage; 0-100 */
	darkThemeDimming: number;
	/** True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12 */
	isBlurred?: true;
	/** True, if the background moves slightly when the device is tilted */
	isMoving?: true;
}

/** The background is a .PNG or .TGV (gzipped subset of SVG with MIME type “application/x-tgwallpattern”) pattern to be combined with the background fill chosen by the user. */
export interface BackgroundTypePattern {
	/** Type of the background, always “pattern” */
	type: 'pattern';
	/** Document with the pattern */
	document: Document;
	/** The background fill that is combined with the pattern */
	fill: BackgroundFill;
	/** Intensity of the pattern when it is shown above the filled background; 0-100 */
	intensity: number;
	/** True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only. */
	isInverted?: true;
	/** True, if the background moves slightly when the device is tilted */
	isMoving?: true;
}

/** The background is taken directly from a built-in chat theme. */
export interface BackgroundTypeChatTheme {
	/** Type of the background, always “chat_theme” */
	type: 'chat_theme';
	/** Name of the chat theme, which is usually an emoji */
	themeName: string;
}

/** This object represents a chat background. */
export interface ChatBackground {
	/** Type of the background */
	type: BackgroundType;
}

/** Describes a service message about checklist tasks marked as done or not done. */
export interface ChecklistTasksDone {
	/** Message containing the checklist whose tasks were marked as done or not done. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	checklistMessage?: Message;
	/** Identifiers of the tasks that were marked as done */
	markedAsDoneTaskIds?: number[];
	/** Identifiers of the tasks that were marked as not done */
	markedAsNotDoneTaskIds?: number[];
}

/** Describes a service message about tasks added to a checklist. */
export interface ChecklistTasksAdded {
	/** Message containing the checklist to which the tasks were added. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	checklistMessage?: Message;
	/** List of tasks added to the checklist */
	tasks: ChecklistTask[];
}

/** Describes a service message about a chat or a bot being added to a community. */
export interface CommunityChatAdded {
	/** The new community to which the chat or the bot belongs */
	community: Community;
}

/** Describes a service message about a chat being joined by a user from a community. */
export interface CommunityChatJoined {
	/** The community from which the chat was joined */
	community: Community;
}

/** Describes a service message about a chat or a bot being removed from a community. Currently holds no information. */
export type CommunityChatRemoved = EmptyObject;

/** This object represents a service message about a new forum topic created in the chat. */
export interface ForumTopicCreated {
	/** Name of the topic */
	name: string;
	/** Color of the topic icon in RGB format */
	iconColor: ForumTopicIconColor;
	/** Unique identifier of the custom emoji shown as the topic icon */
	iconCustomEmojiId?: string;
	/** True, if the name of the topic wasn't specified explicitly by its creator and likely needs to be changed by the bot */
	isNameImplicit?: true;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
export type ForumTopicClosed = EmptyObject;

/** This object represents a service message about an edited forum topic. */
export interface ForumTopicEdited {
	/** New name of the topic, if it was edited */
	name?: string;
	/** New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
	iconCustomEmojiId?: string;
}

/** This object represents a service message about a forum topic reopened in the chat. Currently holds no information. */
export type ForumTopicReopened = EmptyObject;

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
export type GeneralForumTopicHidden = EmptyObject;

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
export type GeneralForumTopicUnhidden = EmptyObject;

/** This object contains information about a user that was shared with the bot using a KeyboardButtonRequestUsers button. */
export interface SharedUser {
	/** Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so 64-bit integers or double-precision float types are safe for storing these identifiers. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
	userId: number;
	/** First name of the user, if the name was requested by the bot */
	firstName?: string;
	/** Last name of the user, if the name was requested by the bot */
	lastName?: string;
	/** Username of the user, if the username was requested by the bot */
	username?: string;
	/** Available sizes of the chat photo, if the photo was requested by the bot */
	photo?: PhotoSize[];
}

/** This object contains information about the users whose identifiers were shared with the bot using a KeyboardButtonRequestUsers button. */
export interface UsersShared {
	/** Identifier of the request */
	requestId: number;
	/** Information about users shared with the bot */
	users: SharedUser[];
}

/** This object contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button. */
export interface ChatShared {
	/** Identifier of the request */
	requestId: number;
	/** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
	chatId: number;
	/** Title of the chat, if the title was requested by the bot */
	title?: string;
	/** Username of the chat, if the username was requested by the bot and available */
	username?: string;
	/** Available sizes of the chat photo, if the photo was requested by the bot */
	photo?: PhotoSize[];
}

/** This object represents a service message about a user allowing a bot to write messages after adding it to the attachment menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess. */
export interface WriteAccessAllowed {
	/** True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess */
	fromRequest?: boolean;
	/** Name of the Web App, if the access was granted when the Web App was launched from a link */
	webAppName?: string;
	/** True, if the access was granted when the bot was added to the attachment or side menu */
	fromAttachmentMenu?: boolean;
}

/** This object represents a service message about a video chat scheduled in the chat. */
export interface VideoChatScheduled {
	/** Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator */
	startDate: number;
}

/** This object represents a service message about a video chat started in the chat. Currently holds no information. */
export type VideoChatStarted = EmptyObject;

/** This object represents a service message about a video chat ended in the chat. */
export interface VideoChatEnded {
	/** Video chat duration in seconds */
	duration: number;
}

/** This object represents a service message about new members invited to a video chat. */
export interface VideoChatParticipantsInvited {
	/** New members that were invited to the video chat */
	users: User[];
}

/** Describes a service message about a change in the price of paid messages within a chat. */
export interface PaidMessagePriceChanged {
	/** The new number of Telegram Stars that must be paid by non-administrator users of the supergroup chat for each sent message */
	paidMessageStarCount: number;
}

/** Describes a service message about a change in the price of direct messages sent to a channel chat. */
export interface DirectMessagePriceChanged {
	/** True, if direct messages are enabled for the channel chat; False otherwise */
	areDirectMessagesEnabled: boolean;
	/** The new number of Telegram Stars that must be paid by users for each direct message sent to the channel. Does not apply to users who have been exempted by administrators. Defaults to 0. */
	directMessageStarCount?: number;
}

/** Describes a service message about the approval of a suggested post. */
export interface SuggestedPostApproved {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	suggestedPostMessage?: Message;
	/** Amount paid for the post */
	price?: SuggestedPostPrice;
	/** Date when the post will be published */
	sendDate: number;
}

/** Describes a service message about the failed approval of a suggested post. Currently, only caused by insufficient user funds at the time of approval. */
export interface SuggestedPostApprovalFailed {
	/** Message containing the suggested post whose approval has failed. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	suggestedPostMessage?: Message;
	/** Expected price of the post */
	price: SuggestedPostPrice;
}

/** Describes a service message about the rejection of a suggested post. */
export interface SuggestedPostDeclined {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	suggestedPostMessage?: Message;
	/** Comment with which the post was declined */
	comment?: string;
}

/** Describes a service message about a successful payment for a suggested post. */
export interface SuggestedPostPaid {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	suggestedPostMessage?: Message;
	/** Currency in which the payment was made. Currently, one of “XTR” for Telegram Stars or “TON” for TON grams. */
	currency: 'XTR' | 'TON';
	/** The amount of the currency that was received by the channel in nanograms; for payments in TON grams only */
	amount?: number;
	/** The amount of Telegram Stars that was received by the channel; for payments in Telegram Stars only */
	starAmount?: StarAmount;
}

/** Describes a service message about a payment refund for a suggested post. */
export interface SuggestedPostRefunded {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the replyToMessage field even if it itself is a reply. */
	suggestedPostMessage?: Message;
	/** Reason for the refund. Currently, one of “post_deleted” if the post was deleted within 24 hours of being posted or removed from scheduled messages without being posted, or “payment_refunded” if the payer refunded their payment. */
	reason: 'post_deleted' | 'payment_refunded';
}

/** This object represents a service message about the creation of a scheduled giveaway. */
export interface GiveawayCreated {
	/** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
	prizeStarCount?: number;
}

/** This object represents a message about a scheduled giveaway. */
export interface Giveaway {
	/** The list of chats which the user must join to participate in the giveaway */
	chats: Chat[];
	/** Point in time (Unix timestamp) when winners of the giveaway will be selected */
	winnersSelectionDate: number;
	/** The number of users which are supposed to be selected as winners of the giveaway */
	winnerCount: number;
	/** True, if only users who join the chats after the giveaway started should be eligible to win */
	onlyNewMembers?: true;
	/** True, if the list of giveaway winners will be visible to everyone */
	hasPublicWinners?: true;
	/** Description of additional giveaway prize */
	prizeDescription?: string;
	/** A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways. */
	countryCodes?: string[];
	/** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
	prizeStarCount?: number;
	/** The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
	premiumSubscriptionMonthCount?: number;
}

/** This object represents a message about the completion of a giveaway with public winners. */
export interface GiveawayWinners {
	/** The chat that created the giveaway */
	chat: Chat;
	/** Identifier of the message with the giveaway in the chat */
	giveawayMessageId: number;
	/** Point in time (Unix timestamp) when winners of the giveaway were selected */
	winnersSelectionDate: number;
	/** Total number of winners in the giveaway */
	winnerCount: number;
	/** List of up to 100 winners of the giveaway */
	winners: User[];
	/** The number of other chats the user had to join in order to be eligible for the giveaway */
	additionalChatCount?: number;
	/** The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only */
	prizeStarCount?: number;
	/** The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
	premiumSubscriptionMonthCount?: number;
	/** Number of undistributed prizes */
	unclaimedPrizeCount?: number;
	/** True, if only users who had joined the chats after the giveaway started were eligible to win */
	onlyNewMembers?: true;
	/** True, if the giveaway was canceled because the payment for it was refunded */
	wasRefunded?: true;
	/** Description of additional giveaway prize */
	prizeDescription?: string;
}

/** This object represents a service message about the completion of a giveaway without public winners. */
export interface GiveawayCompleted {
	/** Number of winners in the giveaway */
	winnerCount: number;
	/** Number of undistributed prizes */
	unclaimedPrizeCount?: number;
	/** Message with the giveaway that was completed, if it wasn't deleted */
	giveawayMessage?: Message;
	/** True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway. */
	isStarGiveaway?: true;
}

/** Describes the options used for link preview generation. */
export interface LinkPreviewOptions {
	/** True, if the link preview is disabled */
	isDisabled?: boolean;
	/** URL to use for the link preview. If empty, then the first URL found in the message text will be used. */
	url?: string;
	/** True, if the media in the link preview is supposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
	preferSmallMedia?: boolean;
	/** True, if the media in the link preview is supposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
	preferLargeMedia?: boolean;
	/** True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
	showAboveText?: boolean;
}

/** Describes the price of a suggested post. */
export interface SuggestedPostPrice {
	/** Currency in which the post will be paid. Currently, must be one of “XTR” for Telegram Stars or “TON” for TON grams. */
	currency: 'XTR' | 'TON';
	/** The amount of the currency that will be paid for the post in the smallest units of the currency, i.e. Telegram Stars or nanograms. Currently, price in Telegram Stars must be between 5 and 100000, and price in nanograms must be between 10000000 and 10000000000000. */
	amount: number;
}

/** Contains information about a suggested post. */
export interface SuggestedPostInfo {
	/** State of the suggested post. Currently, it can be one of “pending”, “approved”, “declined”. */
	state: 'pending' | 'approved' | 'declined';
	/** Proposed price of the post. If the field is omitted, then the post is unpaid. */
	price?: SuggestedPostPrice;
	/** Proposed send date of the post. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user or administrator who approves it. */
	sendDate?: number;
}

/** Contains parameters of a post that is being suggested by the bot. */
export interface SuggestedPostParameters {
	/** Proposed price for the post. If the field is omitted, then the post is unpaid. */
	price?: SuggestedPostPrice;
	/** Proposed send date of the post. If specified, then the date must be between 300 second and 2678400 seconds (30 days) in the future. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user who approves it. */
	sendDate?: number;
}

/** This object describes the type of a reaction. Currently, it can be one of */
export type ReactionType =
	ReactionTypeEmoji | ReactionTypeCustomEmoji | ReactionTypePaid;

/** The reaction is based on an emoji. */
export interface ReactionTypeEmoji {
	/** Type of the reaction, always “emoji” */
	type: 'emoji';
	/** Reaction emoji. Currently, it can be one of "❤", "👍", "👎", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡". */
	emoji: string;
}

/** The reaction is based on a custom emoji. */
export interface ReactionTypeCustomEmoji {
	/** Type of the reaction, always “custom_emoji” */
	type: 'custom_emoji';
	/** Custom emoji identifier */
	customEmojiId: string;
}

/** The reaction is paid. */
export interface ReactionTypePaid {
	/** Type of the reaction, always “paid” */
	type: 'paid';
}

/** Represents a reaction added to a message along with the number of times it was added. */
export interface ReactionCount {
	/** Type of the reaction */
	type: ReactionType;
	/** Number of times the reaction was added */
	totalCount: number;
}

/** This object represents a change of a reaction on a message performed by a user. */
export interface MessageReactionUpdated {
	/** The chat containing the message the user reacted to */
	chat: Chat;
	/** Unique identifier of the message inside the chat */
	messageId: number;
	/** The user that changed the reaction, if the user isn't anonymous */
	user?: User;
	/** The chat on behalf of which the reaction was changed, if the user is anonymous */
	actorChat?: Chat;
	/** Date of the change in Unix time */
	date: number;
	/** Previous list of reaction types that were set by the user */
	oldReaction: ReactionType[];
	/** New list of reaction types that have been set by the user */
	newReaction: ReactionType[];
}

/** This object represents reaction changes on a message with anonymous reactions. */
export interface MessageReactionCountUpdated {
	/** The chat containing the message */
	chat: Chat;
	/** Unique message identifier inside the chat */
	messageId: number;
	/** Date of the change in Unix time */
	date: number;
	/** List of reactions that are present on the message */
	reactions: ReactionCount[];
}

/** Describes a service message about the chat owner leaving the chat. */
export interface ChatOwnerLeft {
	/** The user who will become the new owner of the chat if the previous owner does not return to the chat */
	newOwner?: User;
}

/** Describes a service message about an ownership change in the chat. */
export interface ChatOwnerChanged {
	/** The new owner of the chat */
	newOwner: User;
}
