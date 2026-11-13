import type { BotMethods } from './bot.ts';
import type { BusinessMethods } from './business.ts';
import type { ChatMethods } from './chat.ts';
import type { GameMethods } from './game.ts';
import type { GiftMethods } from './gift.ts';
import type { InlineMethods } from './inline.ts';
import type { MessageMethods } from './message.ts';
import type { PassportMethods } from './passport.ts';
import type { PaymentMethods } from './payment.ts';
import type { RichMethods } from './rich.ts';
import type { StickerMethods } from './sticker.ts';
import type { StoryMethods } from './story.ts';
import type { UpdateMethods } from './update.ts';
import type { WidgetMethods } from './widget.ts';

export type * from './bot.ts';
export type * from './business.ts';
export type * from './chat.ts';
export type * from './game.ts';
export type * from './gift.ts';
export type * from './inline.ts';
export type * from './message.ts';
export type * from './passport.ts';
export type * from './payment.ts';
export type * from './rich.ts';
export type * from './sticker.ts';
export type * from './story.ts';
export type * from './update.ts';
export type * from './widget.ts';

export interface ApiMethods
	extends
		BotMethods,
		BusinessMethods,
		ChatMethods,
		GameMethods,
		GiftMethods,
		InlineMethods,
		MessageMethods,
		PassportMethods,
		PaymentMethods,
		RichMethods,
		StickerMethods,
		StoryMethods,
		UpdateMethods,
		WidgetMethods {}

export type ApiMethod = keyof ApiMethods;
export type ParamsOf<M extends ApiMethod> = ApiMethods[M]['params'];
export type ResultOf<M extends ApiMethod> = ApiMethods[M]['result'];
