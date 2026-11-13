type ValueOf<T> = T[keyof T];

export const UpdateType = {
	Message: 'message',
	EditedMessage: 'edited_message',
	ChannelPost: 'channel_post',
	EditedChannelPost: 'edited_channel_post',
	BusinessConnection: 'business_connection',
	BusinessMessage: 'business_message',
	EditedBusinessMessage: 'edited_business_message',
	DeletedBusinessMessages: 'deleted_business_messages',
	GuestMessage: 'guest_message',
	MessageReaction: 'message_reaction',
	MessageReactionCount: 'message_reaction_count',
	InlineQuery: 'inline_query',
	ChosenInlineResult: 'chosen_inline_result',
	CallbackQuery: 'callback_query',
	ShippingQuery: 'shipping_query',
	PreCheckoutQuery: 'pre_checkout_query',
	PurchasedPaidMedia: 'purchased_paid_media',
	Poll: 'poll',
	PollAnswer: 'poll_answer',
	MyChatMember: 'my_chat_member',
	ChatMember: 'chat_member',
	ChatJoinRequest: 'chat_join_request',
	ChatBoost: 'chat_boost',
	RemovedChatBoost: 'removed_chat_boost',
	ManagedBot: 'managed_bot',
	Subscription: 'subscription',
	StoppedMessageGeneration: 'stopped_message_generation',
} as const;
export type UpdateType = ValueOf<typeof UpdateType>;

export const ChatType = {
	Private: 'private',
	Group: 'group',
	Supergroup: 'supergroup',
	Channel: 'channel',
} as const;
export type ChatType = ValueOf<typeof ChatType>;

export const InlineQueryChatType = {
	Sender: 'sender',
	Private: 'private',
	Group: 'group',
	Supergroup: 'supergroup',
	Channel: 'channel',
} as const;
export type InlineQueryChatType = ValueOf<typeof InlineQueryChatType>;

export const ParseMode = {
	Markdown: 'Markdown',
	MarkdownV2: 'MarkdownV2',
	HTML: 'HTML',
} as const;
export type ParseMode = ValueOf<typeof ParseMode>;

export const MessageEntityType = {
	Mention: 'mention',
	Hashtag: 'hashtag',
	Cashtag: 'cashtag',
	BotCommand: 'bot_command',
	Url: 'url',
	Email: 'email',
	PhoneNumber: 'phone_number',
	Bold: 'bold',
	Italic: 'italic',
	Underline: 'underline',
	Strikethrough: 'strikethrough',
	Spoiler: 'spoiler',
	Blockquote: 'blockquote',
	ExpandableBlockquote: 'expandable_blockquote',
	Code: 'code',
	Pre: 'pre',
	TextLink: 'text_link',
	TextMention: 'text_mention',
	CustomEmoji: 'custom_emoji',
	DateTime: 'date_time',
} as const;
export type MessageEntityType = ValueOf<typeof MessageEntityType>;

export const ChatAction = {
	Typing: 'typing',
	UploadPhoto: 'upload_photo',
	RecordVideo: 'record_video',
	UploadVideo: 'upload_video',
	RecordVoice: 'record_voice',
	UploadVoice: 'upload_voice',
	UploadDocument: 'upload_document',
	ChooseSticker: 'choose_sticker',
	FindLocation: 'find_location',
	RecordVideoNote: 'record_video_note',
	UploadVideoNote: 'upload_video_note',
} as const;
export type ChatAction = ValueOf<typeof ChatAction>;

export const ChatMemberStatus = {
	Creator: 'creator',
	Administrator: 'administrator',
	Member: 'member',
	Restricted: 'restricted',
	Left: 'left',
	Kicked: 'kicked',
} as const;
export type ChatMemberStatus = ValueOf<typeof ChatMemberStatus>;

export const PollType = {
	Regular: 'regular',
	Quiz: 'quiz',
} as const;
export type PollType = ValueOf<typeof PollType>;

export const DiceEmoji = {
	Dice: '🎲',
	Darts: '🎯',
	Basketball: '🏀',
	Football: '⚽',
	Bowling: '🎳',
	SlotMachine: '🎰',
} as const;
export type DiceEmoji = ValueOf<typeof DiceEmoji>;

export const StickerFormat = {
	Static: 'static',
	Animated: 'animated',
	Video: 'video',
} as const;
export type StickerFormat = ValueOf<typeof StickerFormat>;

export const StickerType = {
	Regular: 'regular',
	Mask: 'mask',
	CustomEmoji: 'custom_emoji',
} as const;
export type StickerType = ValueOf<typeof StickerType>;

export const MaskPositionPoint = {
	Forehead: 'forehead',
	Eyes: 'eyes',
	Mouth: 'mouth',
	Chin: 'chin',
} as const;
export type MaskPositionPoint = ValueOf<typeof MaskPositionPoint>;

export const ButtonStyle = {
	Danger: 'danger',
	Success: 'success',
	Primary: 'primary',
} as const;
export type ButtonStyle = ValueOf<typeof ButtonStyle>;

export const InputMediaType = {
	Animation: 'animation',
	Audio: 'audio',
	Document: 'document',
	LivePhoto: 'live_photo',
	Photo: 'photo',
	Video: 'video',
} as const;
export type InputMediaType = ValueOf<typeof InputMediaType>;

export const BotCommandScopeType = {
	Default: 'default',
	AllPrivateChats: 'all_private_chats',
	AllGroupChats: 'all_group_chats',
	AllChatAdministrators: 'all_chat_administrators',
	Chat: 'chat',
	ChatAdministrators: 'chat_administrators',
	ChatMember: 'chat_member',
} as const;
export type BotCommandScopeType = ValueOf<typeof BotCommandScopeType>;

export const MenuButtonType = {
	Commands: 'commands',
	WebApp: 'web_app',
	Default: 'default',
} as const;
export type MenuButtonType = ValueOf<typeof MenuButtonType>;

export const InlineQueryResultType = {
	Audio: 'audio',
	Document: 'document',
	Gif: 'gif',
	Mpeg4Gif: 'mpeg4_gif',
	Photo: 'photo',
	Sticker: 'sticker',
	Video: 'video',
	Voice: 'voice',
	Article: 'article',
	Contact: 'contact',
	Game: 'game',
	Location: 'location',
	Venue: 'venue',
} as const;
export type InlineQueryResultType = ValueOf<typeof InlineQueryResultType>;

export const ReactionKind = {
	Emoji: 'emoji',
	CustomEmoji: 'custom_emoji',
	Paid: 'paid',
} as const;
export type ReactionKind = ValueOf<typeof ReactionKind>;

export const ForumTopicIconColor = {
	Blue: 0x6fb9f0,
	Yellow: 0xffd67e,
	Violet: 0xcb86db,
	Green: 0x8eee98,
	Rose: 0xff93b2,
	Red: 0xfb6f5f,
} as const;
export type ForumTopicIconColor = ValueOf<typeof ForumTopicIconColor>;

export const PassportElementType = {
	PersonalDetails: 'personal_details',
	Passport: 'passport',
	DriverLicense: 'driver_license',
	IdentityCard: 'identity_card',
	InternalPassport: 'internal_passport',
	Address: 'address',
	UtilityBill: 'utility_bill',
	BankStatement: 'bank_statement',
	RentalAgreement: 'rental_agreement',
	PassportRegistration: 'passport_registration',
	TemporaryRegistration: 'temporary_registration',
	PhoneNumber: 'phone_number',
	Email: 'email',
} as const;
export type PassportElementType = ValueOf<typeof PassportElementType>;

export const PassportElementErrorSource = {
	Data: 'data',
	FrontSide: 'front_side',
	ReverseSide: 'reverse_side',
	Selfie: 'selfie',
	File: 'file',
	Files: 'files',
	TranslationFile: 'translation_file',
	TranslationFiles: 'translation_files',
	Unspecified: 'unspecified',
} as const;
export type PassportElementErrorSource = ValueOf<
	typeof PassportElementErrorSource
>;
