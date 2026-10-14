import type { ParseMode } from '../enums.ts';
import type { MessageEntity } from '../types/message.ts';
import type { InputStoryContent, Story, StoryArea } from '../types/story.ts';
import type { Method } from './common.ts';

export interface PostStoryParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Content of the story */
	content: InputStoryContent;
	/** Period after which the story is moved to the archive, in seconds; must be one of `6 * 3600`, `12 * 3600`, `86400`, or `2 * 86400` */
	activePeriod: number;
	/** Caption of the story, 0-2048 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the story caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** A JSON-serialized list of clickable areas to be shown on the story */
	areas?: StoryArea[];
	/** Pass True to keep the story accessible after it expires */
	postToChatPage?: boolean;
	/** Pass True if the content of the story must be protected from forwarding and screenshotting */
	protectContent?: boolean;
}

export interface RepostStoryParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Unique identifier of the chat which posted the story that should be reposted */
	fromChatId: number;
	/** Unique identifier of the story that should be reposted */
	fromStoryId: number;
	/** Period after which the story is moved to the archive, in seconds; must be one of `6 * 3600`, `12 * 3600`, `86400`, or `2 * 86400` */
	activePeriod: number;
	/** Pass True to keep the story accessible after it expires */
	postToChatPage?: boolean;
	/** Pass True if the content of the story must be protected from forwarding and screenshotting */
	protectContent?: boolean;
}

export interface EditStoryParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Unique identifier of the story to edit */
	storyId: number;
	/** Content of the story */
	content: InputStoryContent;
	/** Caption of the story, 0-2048 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the story caption. See formatting options for more details. */
	parseMode?: ParseMode;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parseMode */
	captionEntities?: MessageEntity[];
	/** A JSON-serialized list of clickable areas to be shown on the story */
	areas?: StoryArea[];
}

export interface DeleteStoryParams {
	/** Unique identifier of the business connection */
	businessConnectionId: string;
	/** Unique identifier of the story to delete */
	storyId: number;
}

export interface StoryMethods {
	/** Posts a story on behalf of a managed business account. Requires the canManageStories business bot right. Returns Story on success. */
	postStory: Method<PostStoryParams, Story>;
	/** Reposts a story on behalf of a business account from another business account. Both business accounts must be managed by the same bot, and the story on the source account must have been posted (or reposted) by the bot. Requires the canManageStories business bot right for both business accounts. Returns Story on success. */
	repostStory: Method<RepostStoryParams, Story>;
	/** Edits a story previously posted by the bot on behalf of a managed business account. Requires the canManageStories business bot right. Returns Story on success. */
	editStory: Method<EditStoryParams, Story>;
	/** Deletes a story previously posted by the bot on behalf of a managed business account. Requires the canManageStories business bot right. Returns True on success. */
	deleteStory: Method<DeleteStoryParams, true>;
}
