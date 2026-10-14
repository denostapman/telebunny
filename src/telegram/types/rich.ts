import type { User } from './chat.ts';
import type {
	CopyTextButton,
	DisabledButton,
	LoginUrl,
	SwitchInlineQueryChosenChat,
	WebAppInfo,
} from './markup.ts';
import type {
	Animation,
	Audio,
	Document,
	InputMediaAnimation,
	InputMediaAudio,
	InputMediaDocument,
	InputMediaPhoto,
	InputMediaVideo,
	InputMediaVoiceNote,
	Location,
	PhotoSize,
	Video,
	Voice,
} from './media.ts';

/** Rich formatted message. */
export interface RichMessage {
	/** Content of the message */
	blocks: RichBlock[];
	/** True, if the rich message must be shown right-to-left */
	isRtl?: boolean;
}

/** Describes a rich message to be sent. Exactly one of the fields html, markdown, or blocks must be used. */
export interface InputRichMessage {
	/** Content of the rich message to send described as a list of blocks */
	blocks?: InputRichBlock[];
	/** Content of the rich message to send described using HTML formatting. See rich message formatting options for more details. Use media field to specify the media used in the message. */
	html?: string;
	/** Content of the rich message to send described using Markdown formatting. See rich message formatting options for more details. Use media field to specify the media used in the message. */
	markdown?: string;
	/** List of media that are specified in the markdown or html fields using `tg://photo?id=`, `tg://video?id=`, `tg://document?id=`, and `tg://audio?id=` links */
	media?: InputRichMessageMedia[];
	/** Pass True if the rich message must be shown right-to-left */
	isRtl?: boolean;
	/** Pass True to skip automatic detection of entities (e.g., URLs, email addresses, username mentions, hashtags, cashtags, bot commands, or phone numbers) in the text */
	skipEntityDetection?: boolean;
}

/** Describes a media element embedded in an outgoing rich message. */
export interface InputRichMessageMedia {
	/** Unique identifier of the media used in a `tg://photo?id=`, `tg://video?id=`, `tg://document?id=`, or `tg://audio?id=` link. 1-64 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. */
	id: string;
	/** The media to be sent. Everything except the media itself and its properties is ignored. */
	media:
		| InputMediaAnimation
		| InputMediaAudio
		| InputMediaDocument
		| InputMediaPhoto
		| InputMediaVideo
		| InputMediaVoiceNote;
}

/** This object represents a button in a RichMessage. Exactly one of the fields other than text and style must be used to specify the type of the button. */
export interface RichMessageButton {
	/** Text of the button. May contain only plain text, RichTextCustomEmoji and RichTextDateTime entities. */
	text: RichText;
	/** Style of the button. Must be one of “danger”, “success”, “primary”, or “link” (the button is shown as a regular link without borders). Apps may use theme-specific colors for the button background and text based on the style. The style “link” is allowed only for callback buttons. */
	style?: 'danger' | 'success' | 'primary' | 'link';
	/** HTTP or tg:// URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings. */
	url?: string;
	/** Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes */
	callbackData?: string;
	/** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a business account. */
	webApp?: WebAppInfo;
	/** An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. Not supported for ephemeral messages. */
	loginUrl?: LoginUrl;
	/** If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
	switchInlineQuery?: string;
	/** If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted. Not supported in channels and for messages sent in channel direct messages chats and on behalf of a business account. */
	switchInlineQueryCurrentChat?: string;
	/** If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
	switchInlineQueryChosenChat?: SwitchInlineQueryChosenChat;
	/** A button that copies the specified text to the clipboard */
	copyText?: CopyTextButton;
	/** If set, then the button is disabled and does nothing */
	disabled?: DisabledButton;
}

/** This object represents a rich formatted text. Currently, it can be either a String for plain text, an Array of RichText, or any of the following types: */
export type RichText =
	| RichTextBold
	| RichTextItalic
	| RichTextUnderline
	| RichTextStrikethrough
	| RichTextSpoiler
	| RichTextDateTime
	| RichTextTextMention
	| RichTextSubscript
	| RichTextSuperscript
	| RichTextMarked
	| RichTextCode
	| RichTextCustomEmoji
	| RichTextMathematicalExpression
	| RichTextUrl
	| RichTextEmailAddress
	| RichTextPhoneNumber
	| RichTextBankCardNumber
	| RichTextMention
	| RichTextHashtag
	| RichTextCashtag
	| RichTextBotCommand
	| RichTextButton
	| RichTextAnchor
	| RichTextAnchorLink
	| RichTextReference
	| RichTextReferenceLink;

/** A bold text. */
export interface RichTextBold {
	/** Type of the rich text, always “bold” */
	type: 'bold';
	/** The text */
	text: RichText;
}

/** An italicized text. */
export interface RichTextItalic {
	/** Type of the rich text, always “italic” */
	type: 'italic';
	/** The text */
	text: RichText;
}

/** An underlined text. */
export interface RichTextUnderline {
	/** Type of the rich text, always “underline” */
	type: 'underline';
	/** The text */
	text: RichText;
}

/** A strikethrough text. */
export interface RichTextStrikethrough {
	/** Type of the rich text, always “strikethrough” */
	type: 'strikethrough';
	/** The text */
	text: RichText;
}

/** A text covered by a spoiler. */
export interface RichTextSpoiler {
	/** Type of the rich text, always “spoiler” */
	type: 'spoiler';
	/** The text */
	text: RichText;
}

/** Formatted date and time. */
export interface RichTextDateTime {
	/** Type of the rich text, always “date_time” */
	type: 'date_time';
	/** The text */
	text: RichText;
	/** The Unix time associated with the entity */
	unixTime: number;
	/** The string that defines the formatting of the date and time. See date-time entity formatting for more details. */
	dateTimeFormat: string;
}

/** A mention of a Telegram user by their identifier. */
export interface RichTextTextMention {
	/** Type of the rich text, always “text_mention” */
	type: 'text_mention';
	/** The text */
	text: RichText;
	/** The mentioned user */
	user: User;
}

/** A subscript text. */
export interface RichTextSubscript {
	/** Type of the rich text, always “subscript” */
	type: 'subscript';
	/** The text */
	text: RichText;
}

/** A superscript text. */
export interface RichTextSuperscript {
	/** Type of the rich text, always “superscript” */
	type: 'superscript';
	/** The text */
	text: RichText;
}

/** A marked text. */
export interface RichTextMarked {
	/** Type of the rich text, always “marked” */
	type: 'marked';
	/** The text */
	text: RichText;
}

/** A monowidth text. */
export interface RichTextCode {
	/** Type of the rich text, always “code” */
	type: 'code';
	/** The text */
	text: RichText;
}

/** A custom emoji. */
export interface RichTextCustomEmoji {
	/** Type of the rich text, always “custom_emoji” */
	type: 'custom_emoji';
	/** Unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker. */
	customEmojiId: string;
	/** Alternative emoji for the custom emoji */
	alternativeText: string;
}

/** A mathematical expression. */
export interface RichTextMathematicalExpression {
	/** Type of the rich text, always “mathematical_expression” */
	type: 'mathematical_expression';
	/** The expression in LaTeX format */
	expression: string;
}

/** A text with a link. */
export interface RichTextUrl {
	/** Type of the rich text, always “url” */
	type: 'url';
	/** The text */
	text: RichText;
	/** URL of the link */
	url: string;
}

/** A text with an email address. */
export interface RichTextEmailAddress {
	/** Type of the rich text, always “email_address” */
	type: 'email_address';
	/** The text */
	text: RichText;
	/** The email address */
	emailAddress: string;
}

/** A text with a phone number. */
export interface RichTextPhoneNumber {
	/** Type of the rich text, always “phone_number” */
	type: 'phone_number';
	/** The text */
	text: RichText;
	/** The phone number */
	phoneNumber: string;
}

/** A text with a bank card number. */
export interface RichTextBankCardNumber {
	/** Type of the rich text, always “bank_card_number” */
	type: 'bank_card_number';
	/** The text */
	text: RichText;
	/** The bank card number */
	bankCardNumber: string;
}

/** A mention by a username. */
export interface RichTextMention {
	/** Type of the rich text, always “mention” */
	type: 'mention';
	/** The text */
	text: RichText;
	/** The username */
	username: string;
}

/** A hashtag. */
export interface RichTextHashtag {
	/** Type of the rich text, always “hashtag” */
	type: 'hashtag';
	/** The text */
	text: RichText;
	/** The hashtag */
	hashtag: string;
}

/** A cashtag. */
export interface RichTextCashtag {
	/** Type of the rich text, always “cashtag” */
	type: 'cashtag';
	/** The text */
	text: RichText;
	/** The cashtag */
	cashtag: string;
}

/** A bot command. */
export interface RichTextBotCommand {
	/** Type of the rich text, always “bot_command” */
	type: 'bot_command';
	/** The text */
	text: RichText;
	/** The bot command */
	botCommand: string;
}

/** A button. */
export interface RichTextButton {
	/** Type of the rich text, always “button” */
	type: 'button';
	/** The button */
	button: RichMessageButton;
}

/** An anchor. */
export interface RichTextAnchor {
	/** Type of the rich text, always “anchor” */
	type: 'anchor';
	/** The name of the anchor */
	name: string;
}

/** A link to an anchor. */
export interface RichTextAnchorLink {
	/** Type of the rich text, always “anchor_link” */
	type: 'anchor_link';
	/** The link text */
	text: RichText;
	/** The name of the anchor. If the name is empty, then the link brings back to the top of the message. */
	anchorName: string;
}

/** A reference. */
export interface RichTextReference {
	/** Type of the rich text, always “reference” */
	type: 'reference';
	/** Text of the reference */
	text: RichText;
	/** The name of the reference */
	name: string;
}

/** A link to a reference. */
export interface RichTextReferenceLink {
	/** Type of the rich text, always “reference_link” */
	type: 'reference_link';
	/** The link text */
	text: RichText;
	/** The name of the reference */
	referenceName: string;
}

/** Caption of a rich formatted block. */
export interface RichBlockCaption {
	/** Block caption */
	text: RichText;
	/** Block credit which corresponds to the HTML tag <cite> */
	credit?: RichText;
}

/** Cell in a table. */
export interface RichBlockTableCell {
	/** Text in the cell. If omitted, then the cell is invisible. */
	text?: RichText;
	/** True, if the cell is a header cell */
	isHeader?: true;
	/** The number of columns the cell spans if it is bigger than 1 */
	colspan?: number;
	/** The number of rows the cell spans if it is bigger than 1 */
	rowspan?: number;
	/** Horizontal cell content alignment. Currently, must be one of “left”, “center”, or “right”. */
	align: 'left' | 'center' | 'right';
	/** Vertical cell content alignment. Currently, must be one of “top”, “middle”, or “bottom”. */
	valign: 'top' | 'middle' | 'bottom';
}

/** An item of a list. */
export interface RichBlockListItem {
	/** Label of the item */
	label: string;
	/** The content of the item */
	blocks: RichBlock[];
	/** True, if the item has a checkbox */
	hasCheckbox?: true;
	/** True, if the item has a checked checkbox */
	isChecked?: true;
	/** For ordered lists, the numeric value of the item label */
	value?: number;
	/** For ordered lists, the type of the item label; must be one of “a” for lowercase letters, “A” for uppercase letters, “i” for lowercase Roman numerals, “I” for uppercase Roman numerals, or “1” for decimal numbers */
	type?: 'a' | 'A' | 'i' | 'I' | '1';
}

/** This object represents a block in a rich formatted message. Currently, it can be any of the following types: */
export type RichBlock =
	| RichBlockParagraph
	| RichBlockSectionHeading
	| RichBlockPreformatted
	| RichBlockFooter
	| RichBlockDivider
	| RichBlockMathematicalExpression
	| RichBlockAnchor
	| RichBlockList
	| RichBlockBlockQuotation
	| RichBlockExpandableBlockQuotation
	| RichBlockPullQuotation
	| RichBlockCollage
	| RichBlockSlideshow
	| RichBlockTable
	| RichBlockDetails
	| RichBlockMap
	| RichBlockButtons
	| RichBlockAnimation
	| RichBlockAudio
	| RichBlockDocument
	| RichBlockPhoto
	| RichBlockVideo
	| RichBlockVoiceNote
	| RichBlockThinking;

/** A text paragraph, corresponding to the HTML tag `<p>`. */
export interface RichBlockParagraph {
	/** Type of the block, always “paragraph” */
	type: 'paragraph';
	/** Text of the block */
	text: RichText;
}

/** A section heading, corresponding to the HTML tags `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, or `<h6>`. */
export interface RichBlockSectionHeading {
	/** Type of the block, always “heading” */
	type: 'heading';
	/** Text of the block */
	text: RichText;
	/** Relative size of the text font; 1-6, 1 is the largest, 6 is the smallest */
	size: number;
}

/** A preformatted text block, corresponding to the nested HTML tags `<pre>` and `<code>`. */
export interface RichBlockPreformatted {
	/** Type of the block, always “pre” */
	type: 'pre';
	/** Text of the block */
	text: RichText;
	/** The programming language of the text */
	language?: string;
}

/** A footer, corresponding to the HTML tag `<footer>`. */
export interface RichBlockFooter {
	/** Type of the block, always “footer” */
	type: 'footer';
	/** Text of the block */
	text: RichText;
}

/** A divider, corresponding to the HTML tag `<hr/>`. */
export interface RichBlockDivider {
	/** Type of the block, always “divider” */
	type: 'divider';
}

/** A block with a mathematical expression in LaTeX format, corresponding to the custom HTML tag `<tg-math-block>`. */
export interface RichBlockMathematicalExpression {
	/** Type of the block, always “mathematical_expression” */
	type: 'mathematical_expression';
	/** The mathematical expression in LaTeX format */
	expression: string;
}

/** A block with an anchor, corresponding to the HTML tag `<a>` with the attribute `name`. */
export interface RichBlockAnchor {
	/** Type of the block, always “anchor” */
	type: 'anchor';
	/** The name of the anchor */
	name: string;
}

/** A list of blocks, corresponding to the HTML tag `<ul>` or `<ol>` with multiple nested tags `<li>`. */
export interface RichBlockList {
	/** Type of the block, always “list” */
	type: 'list';
	/** Items of the list */
	items: RichBlockListItem[];
}

/** A block quotation, corresponding to the HTML tag `<blockquote>`. */
export interface RichBlockBlockQuotation {
	/** Type of the block, always “blockquote” */
	type: 'blockquote';
	/** Content of the block */
	blocks: RichBlock[];
	/** Credit of the block */
	credit?: RichText;
}

/** A block quotation, corresponding to the HTML tag `<blockquote>` with custom attribute `"expandable"`. */
export interface RichBlockExpandableBlockQuotation {
	/** Type of the block, always “expandable_blockquote” */
	type: 'expandable_blockquote';
	/** Content of the block */
	text: RichText;
	/** Credit of the block */
	credit?: RichText;
}

/** A quotation with centered text, loosely corresponding to the HTML tag `<aside>`. */
export interface RichBlockPullQuotation {
	/** Type of the block, always “pullquote” */
	type: 'pullquote';
	/** Text of the block */
	text: RichText;
	/** Credit of the block */
	credit?: RichText;
}

/** A collage, corresponding to the custom HTML tag `<tg-collage>`. */
export interface RichBlockCollage {
	/** Type of the block, always “collage” */
	type: 'collage';
	/** Elements of the collage */
	blocks: RichBlock[];
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A slideshow, corresponding to the custom HTML tag `<tg-slideshow>`. */
export interface RichBlockSlideshow {
	/** Type of the block, always “slideshow” */
	type: 'slideshow';
	/** Elements of the slideshow */
	blocks: RichBlock[];
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A table, corresponding to the HTML tag `<table>`. */
export interface RichBlockTable {
	/** Type of the block, always “table” */
	type: 'table';
	/** Cells of the table */
	cells: RichBlockTableCell[][];
	/** True, if the table has borders */
	isBordered?: true;
	/** True, if the table is striped */
	isStriped?: true;
	/** True, if table cells have smaller indents */
	isCompact?: true;
	/** Caption of the table */
	caption?: RichText;
}

/** An expandable block for details disclosure, corresponding to the HTML tag `<details>`. */
export interface RichBlockDetails {
	/** Type of the block, always “details” */
	type: 'details';
	/** Always shown summary of the block */
	summary: RichText;
	/** Content of the block */
	blocks: RichBlock[];
	/** True, if the content of the block is visible by default */
	isOpen?: true;
}

/** A block with a map, corresponding to the custom HTML tag `<tg-map>`. */
export interface RichBlockMap {
	/** Type of the block, always “map” */
	type: 'map';
	/** Location of the center of the map */
	location: Location;
	/** Map zoom level */
	zoom: number;
	/** Expected width of the map */
	width: number;
	/** Expected height of the map */
	height: number;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block containing a list of buttons that are shown in one row, corresponding to the custom HTML tag `<tg-button-row>`. */
export interface RichBlockButtons {
	/** Type of the block, always “buttons” */
	type: 'buttons';
	/** The buttons */
	buttons: RichMessageButton[];
	/** Horizontal alignment of the buttons. Currently, must be one of “left”, “center”, or “right”. */
	align?: 'left' | 'center' | 'right';
}

/** A block with an animation, corresponding to the HTML tag `<video>`. */
export interface RichBlockAnimation {
	/** Type of the block, always “animation” */
	type: 'animation';
	/** The animation */
	animation: Animation;
	/** True, if the media preview is covered by a spoiler animation */
	hasSpoiler?: true;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a music file, corresponding to the HTML tag `<audio>`. */
export interface RichBlockAudio {
	/** Type of the block, always “audio” */
	type: 'audio';
	/** The audio */
	audio: Audio;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a general file, corresponding to the custom HTML tag `<tg-document>`. */
export interface RichBlockDocument {
	/** Type of the block, always “document” */
	type: 'document';
	/** The document */
	document: Document;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a photo, corresponding to the HTML tag `<img>`. */
export interface RichBlockPhoto {
	/** Type of the block, always “photo” */
	type: 'photo';
	/** Available sizes of the photo */
	photo: PhotoSize[];
	/** True, if the media preview is covered by a spoiler animation */
	hasSpoiler?: true;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a video, corresponding to the HTML tag `<video>`. */
export interface RichBlockVideo {
	/** Type of the block, always “video” */
	type: 'video';
	/** The video */
	video: Video;
	/** True, if the media preview is covered by a spoiler animation */
	hasSpoiler?: true;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a voice note, corresponding to the HTML tag `<audio>`. */
export interface RichBlockVoiceNote {
	/** Type of the block, always “voice_note” */
	type: 'voice_note';
	/** The voice note */
	voiceNote: Voice;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a “Thinking…” placeholder, corresponding to the custom HTML tag `<tg-thinking>`. The block may be used only in sendRichMessageDraft, therefore it can't be received in messages. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
export interface RichBlockThinking {
	/** Type of the block, always “thinking” */
	type: 'thinking';
	/** Text of the block. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
	text: RichText;
}

/** An item of a list to be sent. */
export interface InputRichBlockListItem {
	/** The content of the item */
	blocks: InputRichBlock[];
	/** Pass True if the item has a checkbox */
	hasCheckbox?: true;
	/** Pass True if the item has a checked checkbox */
	isChecked?: true;
	/** For ordered lists, the numeric value of the item label */
	value?: number;
	/** For ordered lists, the type of the item label; must be one of “a” for lowercase letters, “A” for uppercase letters, “i” for lowercase Roman numerals, “I” for uppercase Roman numerals, or “1” for decimal numbers */
	type?: 'a' | 'A' | 'i' | 'I' | '1';
}

/** This object represents a block in a rich formatted message to be sent. Currently, it can be any of the following types: */
export type InputRichBlock =
	| InputRichBlockParagraph
	| InputRichBlockSectionHeading
	| InputRichBlockPreformatted
	| InputRichBlockFooter
	| InputRichBlockDivider
	| InputRichBlockMathematicalExpression
	| InputRichBlockAnchor
	| InputRichBlockList
	| InputRichBlockBlockQuotation
	| InputRichBlockExpandableBlockQuotation
	| InputRichBlockPullQuotation
	| InputRichBlockCollage
	| InputRichBlockSlideshow
	| InputRichBlockTable
	| InputRichBlockDetails
	| InputRichBlockMap
	| InputRichBlockButtons
	| InputRichBlockAnimation
	| InputRichBlockAudio
	| InputRichBlockDocument
	| InputRichBlockPhoto
	| InputRichBlockVideo
	| InputRichBlockVoiceNote
	| InputRichBlockThinking;

/** A text paragraph, corresponding to the HTML tag `<p>`. */
export interface InputRichBlockParagraph {
	/** Type of the block, always “paragraph” */
	type: 'paragraph';
	/** Text of the block */
	text: RichText;
}

/** A section heading, corresponding to the HTML tags `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, or `<h6>`. */
export interface InputRichBlockSectionHeading {
	/** Type of the block, always “heading” */
	type: 'heading';
	/** Text of the block */
	text: RichText;
	/** Relative size of the text font; 1-6, 1 is the largest, 6 is the smallest */
	size: number;
}

/** A preformatted text block, corresponding to the nested HTML tags `<pre>` and `<code>`. */
export interface InputRichBlockPreformatted {
	/** Type of the block, always “pre” */
	type: 'pre';
	/** Text of the block */
	text: RichText;
	/** The programming language of the text */
	language?: string;
}

/** A footer, corresponding to the HTML tag `<footer>`. */
export interface InputRichBlockFooter {
	/** Type of the block, always “footer” */
	type: 'footer';
	/** Text of the block */
	text: RichText;
}

/** A divider, corresponding to the HTML tag `<hr/>`. */
export interface InputRichBlockDivider {
	/** Type of the block, always “divider” */
	type: 'divider';
}

/** A block with a mathematical expression in LaTeX format, corresponding to the custom HTML tag `<tg-math-block>`. */
export interface InputRichBlockMathematicalExpression {
	/** Type of the block, always “mathematical_expression” */
	type: 'mathematical_expression';
	/** The mathematical expression in LaTeX format */
	expression: string;
}

/** A block with an anchor, corresponding to the HTML tag `<a>` with the attribute `name`. */
export interface InputRichBlockAnchor {
	/** Type of the block, always “anchor” */
	type: 'anchor';
	/** The name of the anchor */
	name: string;
}

/** A list of blocks, corresponding to the HTML tag `<ul>` or `<ol>` with multiple nested tags `<li>`. */
export interface InputRichBlockList {
	/** Type of the block, always “list” */
	type: 'list';
	/** Items of the list */
	items: InputRichBlockListItem[];
}

/** A block quotation, corresponding to the HTML tag `<blockquote>`. */
export interface InputRichBlockBlockQuotation {
	/** Type of the block, always “blockquote” */
	type: 'blockquote';
	/** Content of the block */
	blocks: InputRichBlock[];
	/** Credit of the block */
	credit?: RichText;
}

/** A block quotation, corresponding to the HTML tag `<blockquote>` with custom attribute `"expandable"`. */
export interface InputRichBlockExpandableBlockQuotation {
	/** Type of the block, always “expandable_blockquote” */
	type: 'expandable_blockquote';
	/** Content of the block */
	text: RichText;
	/** Credit of the block */
	credit?: RichText;
}

/** A quotation with centered text, loosely corresponding to the HTML tag `<aside>`. */
export interface InputRichBlockPullQuotation {
	/** Type of the block, always “pullquote” */
	type: 'pullquote';
	/** Text of the block */
	text: RichText;
	/** Credit of the block */
	credit?: RichText;
}

/** A collage, corresponding to the custom HTML tag `<tg-collage>`. */
export interface InputRichBlockCollage {
	/** Type of the block, always “collage” */
	type: 'collage';
	/** Elements of the collage */
	blocks: InputRichBlock[];
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A slideshow, corresponding to the custom HTML tag `<tg-slideshow>`. */
export interface InputRichBlockSlideshow {
	/** Type of the block, always “slideshow” */
	type: 'slideshow';
	/** Elements of the slideshow */
	blocks: InputRichBlock[];
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A table, corresponding to the HTML tag `<table>`. */
export interface InputRichBlockTable {
	/** Type of the block, always “table” */
	type: 'table';
	/** Cells of the table */
	cells: RichBlockTableCell[][];
	/** Pass True if the table has borders */
	isBordered?: true;
	/** Pass True if the table is striped */
	isStriped?: true;
	/** Pass True if table cells must have smaller indents */
	isCompact?: true;
	/** Caption of the table */
	caption?: RichText;
}

/** An expandable block for details disclosure, corresponding to the HTML tag `<details>`. */
export interface InputRichBlockDetails {
	/** Type of the block, always “details” */
	type: 'details';
	/** Always shown summary of the block */
	summary: RichText;
	/** Content of the block */
	blocks: InputRichBlock[];
	/** Pass True if the content of the block is visible by default */
	isOpen?: true;
}

/** A block with a map, corresponding to the custom HTML tag `<tg-map>`. The map's width and height must not exceed 10000 in total. The width and height ratio must be at most 20. */
export interface InputRichBlockMap {
	/** Type of the block, always “map” */
	type: 'map';
	/** Location of the center of the map */
	location: Location;
	/** Map zoom level; 0-24 */
	zoom?: number;
	/** Map width; 0-10000 */
	width?: number;
	/** Map height; 0-10000 */
	height?: number;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block containing a list of buttons that are shown in one row, corresponding to the custom HTML tag `<tg-button-row>`. */
export interface InputRichBlockButtons {
	/** Type of the block, always “buttons” */
	type: 'buttons';
	/** List of 1-8 buttons to send */
	buttons: RichMessageButton[];
	/** Horizontal alignment of the buttons. Currently, must be one of “left”, “center”, or “right”. */
	align?: 'left' | 'center' | 'right';
}

/** A block with an animation, corresponding to the HTML tag `<video>`. */
export interface InputRichBlockAnimation {
	/** Type of the block, always “animation” */
	type: 'animation';
	/** The animation. Caption is ignored. */
	animation: InputMediaAnimation;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a music file, corresponding to the HTML tag `<audio>`. */
export interface InputRichBlockAudio {
	/** Type of the block, always “audio” */
	type: 'audio';
	/** The audio. Caption is ignored. */
	audio: InputMediaAudio;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a general file, corresponding to the custom HTML tag `<tg-document>`. */
export interface InputRichBlockDocument {
	/** Type of the block, always “document” */
	type: 'document';
	/** The document. Caption is ignored. */
	document: InputMediaDocument;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a photo, corresponding to the HTML tag `<img>`. */
export interface InputRichBlockPhoto {
	/** Type of the block, always “photo” */
	type: 'photo';
	/** The photo. Caption is ignored. */
	photo: InputMediaPhoto;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a video, corresponding to the HTML tag `<video>`. */
export interface InputRichBlockVideo {
	/** Type of the block, always “video” */
	type: 'video';
	/** The video. Caption is ignored. */
	video: InputMediaVideo;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a voice note, corresponding to the HTML tag `<audio>`. */
export interface InputRichBlockVoiceNote {
	/** Type of the block, always “voice_note” */
	type: 'voice_note';
	/** The voice note. Caption is ignored. */
	voiceNote: InputMediaVoiceNote;
	/** Caption of the block */
	caption?: RichBlockCaption;
}

/** A block with a “Thinking…” placeholder, corresponding to the custom HTML tag `<tg-thinking>`. The block may be used only in sendRichMessageDraft, therefore it can't be received in messages. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
export interface InputRichBlockThinking {
	/** Type of the block, always “thinking” */
	type: 'thinking';
	/** Text of the block. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
	text: RichText;
}
