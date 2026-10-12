import type { InputFile } from '../../client/input-file.ts';
import type { ChatAction, DiceEmoji, ParseMode } from '../enums.ts';
import type { ChatId } from '../types/common.ts';
import type {
	ForceReply,
	InlineKeyboardMarkup,
	ReplyKeyboardMarkup,
	ReplyKeyboardRemove,
} from '../types/markup.ts';
import type {
	File,
	InputChecklist,
	InputMedia,
	InputMediaAudio,
	InputMediaDocument,
	InputMediaLivePhoto,
	InputMediaPhoto,
	InputMediaVideo,
	InputPaidMedia,
	InputPollMedia,
	InputPollOption,
	Poll,
} from '../types/media.ts';
import type {
	EphemeralMessageParameters,
	LinkPreviewOptions,
	Message,
	MessageEntity,
	MessageId,
	ReactionType,
	ReplyParameters,
	SuggestedPostParameters,
} from '../types/message.ts';
import type { InputRichMessage } from '../types/rich.ts';
import type { Method } from './common.ts';

export interface SendMessageParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Text of the message to be sent, 1-4096 characters after entities parsing */
	text: string;
	/** Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: MessageEntity[];
	/** Link preview generation options for the message */
	link_preview_options?: LinkPreviewOptions;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface ForwardMessageParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be forwarded; required if the message is forwarded to a direct messages chat */
	direct_messages_topic_id?: number;
	/** Unique identifier for the chat where the original message was sent (or username of the target bot, supergroup or channel in the format `@username`) */
	from_chat_id: ChatId;
	/** New start timestamp for the forwarded video in the message */
	video_start_timestamp?: number;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the forwarded message from forwarding and saving */
	protect_content?: boolean;
	/** Unique identifier of the message effect to be added to the message; only available when forwarding to private chats */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Message identifier in the chat specified in from_chat_id */
	message_id: number;
}

export interface ForwardMessagesParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the messages will be forwarded; required if the messages are forwarded to a direct messages chat */
	direct_messages_topic_id?: number;
	/** Unique identifier for the chat where the original messages were sent (or username of the target bot, supergroup or channel in the format `@username`) */
	from_chat_id: ChatId;
	/** A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to forward. The identifiers must be specified in a strictly increasing order. */
	message_ids: number[];
	/** Sends the messages silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the forwarded messages from forwarding and saving */
	protect_content?: boolean;
}

export interface CopyMessageParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** Unique identifier for the chat where the original message was sent (or username of the target bot, supergroup or channel in the format `@username`) */
	from_chat_id: ChatId;
	/** Message identifier in the chat specified in from_chat_id */
	message_id: number;
	/** New start timestamp for the copied video in the message */
	video_start_timestamp?: number;
	/** New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept. */
	caption?: string;
	/** Mode for parsing entities in the new caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media. Ignored if a new caption isn't specified. */
	show_caption_above_media?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; only available when copying to private chats */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface CopyMessagesParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the messages will be sent; required if the messages are sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** Unique identifier for the chat where the original messages were sent (or username of the target bot, supergroup or channel in the format `@username`) */
	from_chat_id: ChatId;
	/** A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to copy. The identifiers must be specified in a strictly increasing order. */
	message_ids: number[];
	/** Sends the messages silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent messages from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to copy the messages without their captions */
	remove_caption?: boolean;
}

export interface SendPhotoParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More information on Sending Files » */
	photo: InputFile | string;
	/** Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Pass True if the photo needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendLivePhotoParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Live photo video to send. The video must be no longer than 10 seconds and must not exceed 10 MB in size. Pass a file_id as String to send a video that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
	live_photo: InputFile | string;
	/** The static photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
	photo: InputFile | string;
	/** Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Pass True if the video needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendAudioParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files » */
	audio: InputFile | string;
	/** Audio caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Duration of the audio in seconds */
	duration?: number;
	/** Performer */
	performer?: string;
	/** Track name */
	title?: string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendDocumentParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files » */
	document: InputFile | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Disables automatic server-side content type detection for files uploaded using multipart/form-data */
	disable_content_type_detection?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendVideoParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. More information on Sending Files » */
	video: InputFile | string;
	/** Duration of sent video in seconds */
	duration?: number;
	/** Video width */
	width?: number;
	/** Video height */
	height?: number;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
	cover?: InputFile | string;
	/** Start timestamp for the video in the message */
	start_timestamp?: number;
	/** Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Pass True if the video needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
	/** Pass True if the uploaded video is suitable for streaming */
	supports_streaming?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendAnimationParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. More information on Sending Files » */
	animation: InputFile | string;
	/** Duration of sent animation in seconds */
	duration?: number;
	/** Animation width */
	width?: number;
	/** Animation height */
	height?: number;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the animation caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Pass True if the animation needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendVoiceParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files » */
	voice: InputFile | string;
	/** Voice message caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the voice message caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Duration of the voice message in seconds */
	duration?: number;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendVideoNoteParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending video notes by a URL is currently unsupported. */
	video_note: InputFile | string;
	/** Duration of sent video in seconds */
	duration?: number;
	/** Video width and height, i.e. diameter of the video message */
	length?: number;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
	thumbnail?: InputFile | string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendPaidMediaParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. If the chat is a channel, all Telegram Star proceeds from this media will be credited to the chat's balance. Otherwise, they will be credited to the bot's balance. */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** The number of Telegram Stars that must be paid to buy access to the media; 1-25000 */
	star_count: number;
	/** A JSON-serialized Array describing the media to be sent; up to 10 items */
	media: InputPaidMedia[];
	/** Bot-defined paid media payload, 0-128 bytes. This will not be displayed to the user, use it for your internal processes. */
	payload?: string;
	/** Media caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the media caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendMediaGroupParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the messages will be sent; required if the messages are sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized Array describing messages to be sent, must include 2-10 items */
	media: (
		| InputMediaAudio
		| InputMediaDocument
		| InputMediaLivePhoto
		| InputMediaPhoto
		| InputMediaVideo
	)[];
	/** Sends messages silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent messages from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
}

export interface SendLocationParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Latitude of the location */
	latitude: number;
	/** Longitude of the location */
	longitude: number;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Period in seconds during which the location will be updated (see Live Locations), must be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely. Must be 0 for ephemeral messages. */
	live_period?: number;
	/** For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendVenueParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Latitude of the venue */
	latitude: number;
	/** Longitude of the venue */
	longitude: number;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Foursquare identifier of the venue */
	foursquare_id?: string;
	/** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Google Places identifier of the venue */
	google_place_id?: string;
	/** Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendContactParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** A JSON-serialized object containing the parameters of the ephemeral message to send */
	ephemeral_message_parameters?: EphemeralMessageParameters;
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Contact's last name */
	last_name?: string;
	/** Additional data about the contact in the form of a vCard, 0-2048 bytes */
	vcard?: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendPollParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. Polls can't be sent to channel direct messages chats. */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Poll question, 1-300 characters */
	question: string;
	/** Mode for parsing entities in the question. See formatting options for more details. Currently, only custom emoji entities are allowed. */
	question_parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the poll question. It can be specified instead of question_parse_mode. */
	question_entities?: MessageEntity[];
	/** A JSON-serialized list of 1-12 answer options */
	options: InputPollOption[];
	/** True, if the poll needs to be anonymous, defaults to True */
	is_anonymous?: boolean;
	/** Poll type, “quiz” or “regular”, defaults to “regular” */
	type?: string;
	/** Pass True if the poll allows multiple answers, defaults to False */
	allows_multiple_answers?: boolean;
	/** Pass True if the poll allows to change chosen answer options, defaults to False for quizzes and to True for regular polls */
	allows_revoting?: boolean;
	/** Pass True if the poll options must be shown in random order */
	shuffle_options?: boolean;
	/** Pass True if answer options can be added to the poll after creation; not supported for anonymous polls and quizzes */
	allow_adding_options?: boolean;
	/** Pass True if poll results must be shown only after the poll closes */
	hide_results_until_closes?: boolean;
	/** Pass True if voting is limited to users who have been members of the chat where the poll is being sent for more than 24 hours; for channel chats only */
	members_only?: boolean;
	/** A JSON-serialized list of 0-12 two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which users can vote in the poll; for channel chats only. Use “FT” as a country code to allow users with anonymous numbers to vote. If omitted or empty, then users from any country can participate in the poll. */
	country_codes?: string[];
	/** A JSON-serialized list of monotonically increasing 0-based identifiers of the correct answer options, required for polls in quiz mode */
	correct_option_ids?: number[];
	/** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing */
	explanation?: string;
	/** Mode for parsing entities in the explanation. See formatting options for more details. */
	explanation_parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the poll explanation. It can be specified instead of explanation_parse_mode. */
	explanation_entities?: MessageEntity[];
	/** Media added to the quiz explanation */
	explanation_media?: InputPollMedia;
	/** Amount of time in seconds the poll will be active after creation, 5-2628000. Can't be used together with close_date. */
	open_period?: number;
	/** Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 2628000 seconds in the future. Can't be used together with open_period. */
	close_date?: number;
	/** Pass True if the poll needs to be immediately closed. This can be useful for poll preview. */
	is_closed?: boolean;
	/** Description of the poll to be sent, 0-1024 characters after entities parsing */
	description?: string;
	/** Mode for parsing entities in the poll description. See formatting options for more details. */
	description_parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the poll description, which can be specified instead of description_parse_mode */
	description_entities?: MessageEntity[];
	/** Media added to the poll description */
	media?: InputPollMedia;
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
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendChecklistParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id: string;
	/** Unique identifier for the target chat or username of the target bot in the format `@username` */
	chat_id: ChatId;
	/** A JSON-serialized object for the checklist to send */
	checklist: InputChecklist;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** Unique identifier of the message effect to be added to the message */
	message_effect_id?: string;
	/** A JSON-serialized object for description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface SendDiceParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** Emoji on which the dice throw animation is based. Currently, must be one of “🎲”, “🎯”, “🏀”, “⚽”, “🎳”, or “🎰”. Dice can have values 1-6 for “🎲”, “🎯” and “🎳”, values 1-5 for “🏀” and “⚽”, and values 1-64 for “🎰”. Defaults to “🎲”. */
	emoji?: DiceEmoji;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding */
	protect_content?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allow_paid_broadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	message_effect_id?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggested_post_parameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	reply_parameters?: ReplyParameters;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
	reply_markup?:
		| InlineKeyboardMarkup
		| ReplyKeyboardMarkup
		| ReplyKeyboardRemove
		| ForceReply;
}

export interface SendMessageDraftParams {
	/** Unique identifier for the target private chat */
	chat_id: number;
	/** Unique identifier for the target message thread */
	message_thread_id?: number;
	/** Unique identifier of the message draft; must be non-zero. Changes to drafts with the same identifier are animated. Otherwise, the draft is replaced without animation. */
	draft_id: number;
	/** Text of the message to be sent, 0-4096 characters after entities parsing. Pass an empty text to show a “Thinking…” placeholder. */
	text?: string;
	/** Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: MessageEntity[];
	/** Pass True to show the user a button to stop further drafts. The bot will receive an Update “stopped_message_generation” if the user presses the button. */
	can_stop?: boolean;
	/** Pass True to keep the draft in the chat when the button is pressed. The draft will still disappear after a short time or if the bot sends a message. To fully preserve the partial draft, the bot should send it as a new message. */
	keep_on_stop?: boolean;
}

export interface SendChatActionParams {
	/** Unique identifier of the business connection on behalf of which the action will be sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot or supergroup in the format `@username`. Channel chats and channel direct messages chats aren't supported. */
	chat_id: ChatId;
	/** Unique identifier for the target message thread or topic of a forum; for supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes. */
	action: ChatAction;
}

export interface SetMessageReactionParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the target message. If the message belongs to a media group, the reaction is set to the first non-deleted message in the group instead. */
	message_id: number;
	/** A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots. */
	reaction?: ReactionType[];
	/** Pass True to set the reaction with a big animation */
	is_big?: boolean;
}

export interface GetFileParams {
	/** File identifier to get information about */
	file_id: string;
}

export interface GetUserPersonalChatMessagesParams {
	/** Unique identifier for the target user */
	user_id: number;
	/** The maximum number of messages to return; 1-20 */
	limit: number;
}

export interface EditMessageTextParams {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	business_connection_id?: string;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. */
	chat_id?: ChatId;
	/** Required if inline_message_id is not specified. Identifier of the message to edit. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
	/** New text of the message, 1-4096 characters after entity parsing; required if rich_message isn't specified */
	text?: string;
	/** Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: MessageEntity[];
	/** Link preview generation options for the message */
	link_preview_options?: LinkPreviewOptions;
	/** New rich content of the message; required if text isn't specified. Direct upload of new files and explicit upload of files by a URL isn't supported when an inline message is edited. */
	rich_message?: InputRichMessage;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditMessageCaptionParams {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	business_connection_id?: string;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. */
	chat_id?: ChatId;
	/** Required if inline_message_id is not specified. Identifier of the message to edit. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
	/** New caption of the message, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the message caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media. Supported only for animation, photo and video messages. */
	show_caption_above_media?: boolean;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditMessageMediaParams {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	business_connection_id?: string;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. */
	chat_id?: ChatId;
	/** Required if inline_message_id is not specified. Identifier of the message to edit. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
	/** A JSON-serialized object for the new media content of the message */
	media: InputMedia;
	/** A JSON-serialized object for a new inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditMessageLiveLocationParams {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	business_connection_id?: string;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. */
	chat_id?: ChatId;
	/** Required if inline_message_id is not specified. Identifier of the message to edit. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
	/** Latitude of new location */
	latitude: number;
	/** Longitude of new location */
	longitude: number;
	/** New period in seconds during which the location can be updated, starting from the message send date. If 0x7FFFFFFF is specified, then the location can be updated forever. Otherwise, the new value must not exceed the current live_period by more than a day, and the live location expiration date must remain within the next 90 days. If not specified, then live_period remains unchanged. */
	live_period?: number;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** The maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
	/** A JSON-serialized object for a new inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface StopMessageLiveLocationParams {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	business_connection_id?: string;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. */
	chat_id?: ChatId;
	/** Required if inline_message_id is not specified. Identifier of the message with live location to stop. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
	/** A JSON-serialized object for a new inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditMessageChecklistParams {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	business_connection_id: string;
	/** Unique identifier for the target chat or username of the target bot in the format `@username` */
	chat_id: ChatId;
	/** Unique identifier for the target message */
	message_id: number;
	/** A JSON-serialized object for the new checklist */
	checklist: InputChecklist;
	/** A JSON-serialized object for the new inline keyboard for the message */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditMessageReplyMarkupParams {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	business_connection_id?: string;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username`. */
	chat_id?: ChatId;
	/** Required if inline_message_id is not specified. Identifier of the message to edit. */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message. */
	inline_message_id?: string;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface StopPollParams {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	business_connection_id?: string;
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the original message with the poll */
	message_id: number;
	/** A JSON-serialized object for a new message inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditEphemeralMessageTextParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the user who received the message */
	receiver_user_id: number;
	/** Identifier of the ephemeral message to edit */
	ephemeral_message_id: number;
	/** New text of the message, 1-4096 characters after entity parsing; required if rich_message isn't specified */
	text?: string;
	/** Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: MessageEntity[];
	/** New rich content of the message; required if text isn't specified */
	rich_message?: InputRichMessage;
	/** Link preview generation options for the message */
	link_preview_options?: LinkPreviewOptions;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditEphemeralMessageMediaParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the user who received the message */
	receiver_user_id: number;
	/** Identifier of the ephemeral message to edit */
	ephemeral_message_id: number;
	/** A JSON-serialized object for the new media content of the message */
	media: InputMedia;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditEphemeralMessageCaptionParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the user who received the message */
	receiver_user_id: number;
	/** Identifier of the ephemeral message to edit */
	ephemeral_message_id: number;
	/** New caption of the message, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the message caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True if the caption must be shown above the message media. Supported only for animation, photo and video messages. */
	show_caption_above_media?: boolean;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface EditEphemeralMessageReplyMarkupParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the user who received the message */
	receiver_user_id: number;
	/** Identifier of the ephemeral message to edit */
	ephemeral_message_id: number;
	/** A JSON-serialized object for an inline keyboard */
	reply_markup?: InlineKeyboardMarkup;
}

export interface ApproveSuggestedPostParams {
	/** Unique identifier for the target direct messages chat */
	chat_id: number;
	/** Identifier of a suggested post message to approve */
	message_id: number;
	/** Point in time (Unix timestamp) when the post is expected to be published; omit if the date has already been specified when the suggested post was created. If specified, then the date must be not more than 2678400 seconds (30 days) in the future. */
	send_date?: number;
}

export interface DeclineSuggestedPostParams {
	/** Unique identifier for the target direct messages chat */
	chat_id: number;
	/** Identifier of a suggested post message to decline */
	message_id: number;
	/** Comment for the creator of the suggested post; 0-128 characters */
	comment?: string;
}

export interface DeleteMessageParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the message to delete */
	message_id: number;
}

export interface DeleteMessagesParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chat_id: ChatId;
	/** A JSON-serialized list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted. */
	message_ids: number[];
}

export interface DeleteEphemeralMessageParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the user who received the message */
	receiver_user_id: number;
	/** Identifier of the ephemeral message to delete */
	ephemeral_message_id: number;
}

export interface DeleteMessageReactionParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the target message */
	message_id: number;
	/** Identifier of the user whose reaction will be removed, if the reaction was added by a user */
	user_id?: number;
	/** Identifier of the chat whose reaction will be removed, if the reaction was added by a chat */
	actor_chat_id?: number;
}

export interface DeleteAllMessageReactionsParams {
	/** Unique identifier for the target chat or username of the target supergroup in the format `@username` */
	chat_id: ChatId;
	/** Identifier of the user whose reactions will be removed, if the reactions were added by a user */
	user_id?: number;
	/** Identifier of the chat whose reactions will be removed, if the reactions were added by a chat */
	actor_chat_id?: number;
}

export interface MessageMethods {
	/** Use this method to send text messages. On success, the sent Message is returned. */
	sendMessage: Method<SendMessageParams, Message>;
	/** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
	forwardMessage: Method<ForwardMessageParams, Message>;
	/** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an Array of MessageId of the sent messages is returned. */
	forwardMessages: Method<ForwardMessagesParams, MessageId[]>;
	/** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_ids is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
	copyMessage: Method<CopyMessageParams, MessageId>;
	/** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_ids is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an Array of MessageId of the sent messages is returned. */
	copyMessages: Method<CopyMessagesParams, MessageId[]>;
	/** Use this method to send photos. On success, the sent Message is returned. */
	sendPhoto: Method<SendPhotoParams, Message>;
	/** Use this method to send live photos. On success, the sent Message is returned. */
	sendLivePhoto: Method<SendLivePhotoParams, Message>;
	/** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future. For sending voice messages, use the sendVoice method instead. */
	sendAudio: Method<SendAudioParams, Message>;
	/** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
	sendDocument: Method<SendDocumentParams, Message>;
	/** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
	sendVideo: Method<SendVideoParams, Message>;
	/** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
	sendAnimation: Method<SendAnimationParams, Message>;
	/** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
	sendVoice: Method<SendVoiceParams, Message>;
	/** Use this method to send a rounded square MPEG4 video of up to 1 minute long. On success, the sent Message is returned. */
	sendVideoNote: Method<SendVideoNoteParams, Message>;
	/** Use this method to send paid media. On success, the sent Message is returned. */
	sendPaidMedia: Method<SendPaidMediaParams, Message>;
	/** Use this method to send a group of photos, live photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an Array of Message objects that were sent is returned. */
	sendMediaGroup: Method<SendMediaGroupParams, Message[]>;
	/** Use this method to send point on the map. On success, the sent Message is returned. */
	sendLocation: Method<SendLocationParams, Message>;
	/** Use this method to send information about a venue. On success, the sent Message is returned. */
	sendVenue: Method<SendVenueParams, Message>;
	/** Use this method to send phone contacts. On success, the sent Message is returned. */
	sendContact: Method<SendContactParams, Message>;
	/** Use this method to send a native poll. On success, the sent Message is returned. */
	sendPoll: Method<SendPollParams, Message>;
	/** Use this method to send a checklist on behalf of a connected business account. On success, the sent Message is returned. */
	sendChecklist: Method<SendChecklistParams, Message>;
	/** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
	sendDice: Method<SendDiceParams, Message>;
	/** Use this method to stream a partial message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you must call sendMessage with the complete message to persist it in the user's chat. Returns True on success. */
	sendMessageDraft: Method<SendMessageDraftParams, true>;
	/** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success. Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use sendChatAction with action = upload_photo. The user will see a “sending photo” status for the bot. We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
	sendChatAction: Method<SendChatActionParams, true>;
	/** Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. Bots can't use paid reactions. Returns True on success. */
	setMessageReaction: Method<SetMessageReactionParams, true>;
	/** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`, where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again. */
	getFile: Method<GetFileParams, File>;
	/** Use this method to get the last messages from the personal chat (i.e., the chat currently added to their profile) of a given user. On success, an Array of Message objects is returned. */
	getUserPersonalChatMessages: Method<
		GetUserPersonalChatMessagesParams,
		Message[]
	>;
	/** Use this method to edit text, rich and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageText: Method<EditMessageTextParams, Message | true>;
	/** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageCaption: Method<EditMessageCaptionParams, Message | true>;
	/** Use this method to edit animation, audio, document, live photo, photo, or video messages, or to replace a text or a rich message with a media. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo, a live photo, or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageMedia: Method<EditMessageMediaParams, Message | true>;
	/** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
	editMessageLiveLocation: Method<
		EditMessageLiveLocationParams,
		Message | true
	>;
	/** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
	stopMessageLiveLocation: Method<
		StopMessageLiveLocationParams,
		Message | true
	>;
	/** Use this method to edit a checklist on behalf of a connected business account. On success, the edited Message is returned. */
	editMessageChecklist: Method<EditMessageChecklistParams, Message>;
	/** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageReplyMarkup: Method<
		EditMessageReplyMarkupParams,
		Message | true
	>;
	/** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
	stopPoll: Method<StopPollParams, Poll>;
	/** Use this method to edit an ephemeral text or rich message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
	editEphemeralMessageText: Method<EditEphemeralMessageTextParams, true>;
	/** Use this method to edit the media of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
	editEphemeralMessageMedia: Method<EditEphemeralMessageMediaParams, true>;
	/** Use this method to edit the caption of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
	editEphemeralMessageCaption: Method<
		EditEphemeralMessageCaptionParams,
		true
	>;
	/** Use this method to edit only the reply markup of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
	editEphemeralMessageReplyMarkup: Method<
		EditEphemeralMessageReplyMarkupParams,
		true
	>;
	/** Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can_post_messages' administrator right in the corresponding channel chat. Returns True on success. */
	approveSuggestedPost: Method<ApproveSuggestedPostParams, true>;
	/** Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can_manage_direct_messages' administrator right in the corresponding channel chat. Returns True on success. */
	declineSuggestedPost: Method<DeclineSuggestedPostParams, true>;
	/** Use this method to delete a message, including service messages, with the following limitations: - A message can only be deleted if it was sent less than 48 hours ago. - Service messages about a supergroup, channel, or forum topic creation can't be deleted. - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago. - Bots can delete outgoing messages in private chats, groups, and supergroups. - Bots can delete incoming messages in private chats. - Bots granted can_post_messages permissions can delete outgoing messages in channels. - If the bot is an administrator of a group, it can delete any message there. - If the bot has can_delete_messages administrator right in a supergroup or a channel, it can delete any message there. - If the bot has can_manage_direct_messages administrator right in a channel, it can delete any message in the corresponding direct messages chat. Returns True on success. */
	deleteMessage: Method<DeleteMessageParams, true>;
	/** Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped. Returns True on success. */
	deleteMessages: Method<DeleteMessagesParams, true>;
	/** Use this method to delete an ephemeral message. Note that it is not guaranteed that the user will receive the message deletion event, especially if they are offline. Returns True on success. */
	deleteEphemeralMessage: Method<DeleteEphemeralMessageParams, true>;
	/** Use this method to remove a reaction from a message in a group or a supergroup chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns True on success. */
	deleteMessageReaction: Method<DeleteMessageReactionParams, true>;
	/** Use this method to remove up to 10000 recent reactions in a group or a supergroup chat added by a given user or chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns True on success. */
	deleteAllMessageReactions: Method<DeleteAllMessageReactionsParams, true>;
}
