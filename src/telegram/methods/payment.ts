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
	chat_id: ChatId;
	/** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
	message_thread_id?: number;
	/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
	direct_messages_topic_id?: number;
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
	provider_token?: string;
	/** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
	currency: string;
	/** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
	prices: LabeledPrice[];
	/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of `US$ 1.45` pass `max_tip_amount = 145`. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
	max_tip_amount?: number;
	/** A JSON-serialized Array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
	suggested_tip_amounts?: number[];
	/** Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter. */
	start_parameter?: string;
	/** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
	provider_data?: string;
	/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. */
	photo_url?: string;
	/** Photo size in bytes */
	photo_size?: number;
	/** Photo width */
	photo_width?: number;
	/** Photo height */
	photo_height?: number;
	/** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
	need_name?: boolean;
	/** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
	need_phone_number?: boolean;
	/** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
	need_email?: boolean;
	/** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
	need_shipping_address?: boolean;
	/** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
	send_phone_number_to_provider?: boolean;
	/** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
	send_email_to_provider?: boolean;
	/** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
	is_flexible?: boolean;
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
	/** A JSON-serialized object for an inline keyboard. If empty, one 'Pay `total price`' button will be shown. If not empty, the first button must be a Pay button. */
	reply_markup?: InlineKeyboardMarkup;
}

export interface CreateInvoiceLinkParams {
	/** Unique identifier of the business connection on behalf of which the link will be created. For payments in Telegram Stars only. */
	business_connection_id?: string;
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
	provider_token?: string;
	/** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
	currency: string;
	/** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
	prices: LabeledPrice[];
	/** The number of seconds the subscription will be active for before the next payment. The currency must be set to “XTR” (Telegram Stars) if the parameter is used. Currently, it must always be 2592000 (30 days) if specified. Any number of subscriptions can be active for a given bot at the same time, including multiple concurrent subscriptions from the same user. Subscription price must no exceed 10000 Telegram Stars. */
	subscription_period?: number;
	/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of `US$ 1.45` pass `max_tip_amount = 145`. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
	max_tip_amount?: number;
	/** A JSON-serialized Array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
	suggested_tip_amounts?: number[];
	/** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
	provider_data?: string;
	/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
	photo_url?: string;
	/** Photo size in bytes */
	photo_size?: number;
	/** Photo width */
	photo_width?: number;
	/** Photo height */
	photo_height?: number;
	/** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
	need_name?: boolean;
	/** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
	need_phone_number?: boolean;
	/** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
	need_email?: boolean;
	/** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
	need_shipping_address?: boolean;
	/** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
	send_phone_number_to_provider?: boolean;
	/** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
	send_email_to_provider?: boolean;
	/** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
	is_flexible?: boolean;
}

export interface AnswerShippingQueryParams {
	/** Unique identifier for the query to be answered */
	shipping_query_id: string;
	/** Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible) */
	ok: boolean;
	/** Required if ok is True. A JSON-serialized Array of available shipping options. */
	shipping_options?: ShippingOption[];
	/** Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. “Sorry, delivery to your desired address is unavailable”). Telegram will display this message to the user. */
	error_message?: string;
}

export interface AnswerPreCheckoutQueryParams {
	/** Unique identifier for the query to be answered */
	pre_checkout_query_id: string;
	/** Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems. */
	ok: boolean;
	/** Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. */
	error_message?: string;
}

export interface GetStarTransactionsParams {
	/** Number of transactions to skip in the response */
	offset?: number;
	/** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
	limit?: number;
}

export interface RefundStarPaymentParams {
	/** Identifier of the user whose payment will be refunded */
	user_id: number;
	/** Telegram payment identifier */
	telegram_payment_charge_id: string;
}

export interface EditUserStarSubscriptionParams {
	/** Identifier of the user whose subscription will be edited */
	user_id: number;
	/** Telegram payment identifier for the subscription */
	telegram_payment_charge_id: string;
	/** Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot. */
	is_canceled: boolean;
}

export interface PaymentMethods {
	/** Use this method to send invoices. On success, the sent Message is returned. */
	sendInvoice: Method<SendInvoiceParams, Message>;
	/** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
	createInvoiceLink: Method<CreateInvoiceLinkParams, string>;
	/** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
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
