import type { WebClient } from '@slack/web-api';

export type EmojiOccurrence = {
	emoji: string;
	modifierEmoji: string | null;
	user: string | null;
	ts: string | null;
	isReaction: boolean;
};

declare function getAllEmojiInASlackChannel(
	slackWebApiClient: WebClient,
	slackChannelId: string
): Promise<EmojiOccurrence[]>;
