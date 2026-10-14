import type { ChatId, EmptyObject } from '../types/common.ts';
import type { InlineKeyboardMarkup } from '../types/markup.ts';
import type {
	Message,
	ReplyParameters,
	SuggestedPostParameters,
} from '../types/message.ts';
import type {
	LabeledPrice,
	ShippingOption,
	StarAmount,
	StarTransactions,
} from '../types/payment.ts';
import type { Method } from './common.ts';

export interface SendInvoiceParams {
	/** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format `@username` */
	chatId: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	messageThreadId?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	directMessagesTopicId?: number;
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
	providerToken?: string;
	/** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
	currency: string;
	/** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
	prices: LabeledPrice[];
	/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of `US$ 1.45` pass `maxTipAmount = 145`. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
	maxTipAmount?: number;
	/** A JSON-serialized Array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed maxTipAmount. */
	suggestedTipAmounts?: number[];
	/** Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter. */
	startParameter?: string;
	/** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
	providerData?: string;
	/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. */
	photoUrl?: string;
	/** Photo size in bytes */
	photoSize?: number;
	/** Photo width */
	photoWidth?: number;
	/** Photo height */
	photoHeight?: number;
	/** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
	needName?: boolean;
	/** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
	needPhoneNumber?: boolean;
	/** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
	needEmail?: boolean;
	/** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
	needShippingAddress?: boolean;
	/** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
	sendPhoneNumberToProvider?: boolean;
	/** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
	sendEmailToProvider?: boolean;
	/** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
	isFlexible?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disableNotification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean;
	/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
	allowPaidBroadcast?: boolean;
	/** Unique identifier of the message effect to be added to the message; for private chats only */
	messageEffectId?: string;
	/** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
	suggestedPostParameters?: SuggestedPostParameters;
	/** Description of the message to reply to */
	replyParameters?: ReplyParameters;
	/** A JSON-serialized object for an inline keyboard. If empty, one 'Pay `total price`' button will be shown. If not empty, the first button must be a Pay button. */
	replyMarkup?: InlineKeyboardMarkup;
}

export interface CreateInvoiceLinkParams {
	/** Unique identifier of the business connection on behalf of which the link will be created. For payments in Telegram Stars only. */
	businessConnectionId?: string;
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
	providerToken?: string;
	/** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
	currency: string;
	/** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
	prices: LabeledPrice[];
	/** The number of seconds the subscription will be active for before the next payment. The currency must be set to “XTR” (Telegram Stars) if the parameter is used. Currently, it must always be 2592000 (30 days) if specified. Any number of subscriptions can be active for a given bot at the same time, including multiple concurrent subscriptions from the same user. Subscription price must no exceed 10000 Telegram Stars. */
	subscriptionPeriod?: number;
	/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of `US$ 1.45` pass `maxTipAmount = 145`. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
	maxTipAmount?: number;
	/** A JSON-serialized Array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed maxTipAmount. */
	suggestedTipAmounts?: number[];
	/** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
	providerData?: string;
	/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
	photoUrl?: string;
	/** Photo size in bytes */
	photoSize?: number;
	/** Photo width */
	photoWidth?: number;
	/** Photo height */
	photoHeight?: number;
	/** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
	needName?: boolean;
	/** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
	needPhoneNumber?: boolean;
	/** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
	needEmail?: boolean;
	/** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
	needShippingAddress?: boolean;
	/** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
	sendPhoneNumberToProvider?: boolean;
	/** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
	sendEmailToProvider?: boolean;
	/** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
	isFlexible?: boolean;
}

export interface AnswerShippingQueryParams {
	/** Unique identifier for the query to be answered */
	shippingQueryId: string;
	/** Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible) */
	ok: boolean;
	/** Required if ok is True. A JSON-serialized Array of available shipping options. */
	shippingOptions?: ShippingOption[];
	/** Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. “Sorry, delivery to your desired address is unavailable”). Telegram will display this message to the user. */
	errorMessage?: string;
}

export interface AnswerPreCheckoutQueryParams {
	/** Unique identifier for the query to be answered */
	preCheckoutQueryId: string;
	/** Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems. */
	ok: boolean;
	/** Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. */
	errorMessage?: string;
}

export interface GetStarTransactionsParams {
	/** Number of transactions to skip in the response */
	offset?: number;
	/** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
	limit?: number;
}

export interface RefundStarPaymentParams {
	/** Identifier of the user whose payment will be refunded */
	userId: number;
	/** Telegram payment identifier */
	telegramPaymentChargeId: string;
}

export interface EditUserStarSubscriptionParams {
	/** Identifier of the user whose subscription will be edited */
	userId: number;
	/** Telegram payment identifier for the subscription */
	telegramPaymentChargeId: string;
	/** Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot. */
	isCanceled: boolean;
}

export interface PaymentMethods {
	/** Use this method to send invoices. On success, the sent Message is returned. */
	sendInvoice: Method<SendInvoiceParams, Message>;
	/** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
	createInvoiceLink: Method<CreateInvoiceLinkParams, string>;
	/** If you sent an invoice requesting a shipping address and the parameter isFlexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
	answerShippingQuery: Method<AnswerShippingQueryParams, true>;
	/** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
	answerPreCheckoutQuery: Method<AnswerPreCheckoutQueryParams, true>;
	/** A method to get the current Telegram Stars balance of the bot. Requires no parameters. On success, returns a StarAmount object. */
	getMyStarBalance: Method<EmptyObject, StarAmount>;
	/** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
	getStarTransactions: Method<GetStarTransactionsParams, StarTransactions>;
	/** Refunds a successful payment in Telegram Stars. Returns True on success. */
	refundStarPayment: Method<RefundStarPaymentParams, true>;
	/** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns True on success. */
	editUserStarSubscription: Method<EditUserStarSubscriptionParams, true>;
}
