'use strict';

const {
	getAllMessagesInASlackChannel
} = require('@rowanmanning/get-all-messages-in-a-slack-channel');

/**
 * @import { EmojiOccurrence, getAllEmojiInASlackChannel } from '.'
 * @import { Messages } from '@rowanmanning/get-all-messages-in-a-slack-channel'
 */

const emojiRegExp = /:(([a-z0-9'+_-]+)(::(skin-tone-\d))?):/g;

/** @type {getAllEmojiInASlackChannel} */
exports.getAllEmojiInASlackChannel = async function getAllEmojiInASlackChannel(
	slackWebApiClient,
	slackChannelId
) {
	const messages = (await getAllMessagesInASlackChannel(slackWebApiClient, slackChannelId)) || [];
	const emojiOccurrences = [];
	for (const message of messages) {
		emojiOccurrences.push(...extractEmojiOccurrencesFromMessageText(message));
		emojiOccurrences.push(...extractEmojiOccurrencesFromMessageReactions(message));
	}
	return emojiOccurrences;
};

/**
 * @param {NonNullable<Messages>[number]} slackMessage
 * @returns {EmojiOccurrence[]}
 */
function extractEmojiOccurrencesFromMessageText(slackMessage) {
	/**
	 * @type {EmojiOccurrence[]}
	 */
	const emojiOccurrences = [];

	let match;
	// biome-ignore lint/suspicious/noAssignInExpressions: I don't want to refactor this
	while ((match = emojiRegExp.exec(slackMessage.text || '')) !== null) {
		emojiOccurrences.push({
			emoji: match[2],
			modifierEmoji: match[4] || null,
			user: slackMessage.user || null,
			ts: slackMessage.ts || null,
			isReaction: false
		});
	}
	return emojiOccurrences;
}

/**
 * @param {NonNullable<Messages>[number]} slackMessage
 * @returns {EmojiOccurrence[]}
 */
function extractEmojiOccurrencesFromMessageReactions(slackMessage) {
	if (!slackMessage.reactions) {
		return [];
	}

	/**
	 * @type {EmojiOccurrence[]}
	 */
	const emojiOccurrences = [];

	for (const reaction of slackMessage.reactions) {
		const name = reaction.name?.split('::') || [];
		const [emoji, modifierEmoji = null] = name;
		for (const user of reaction?.users || []) {
			emojiOccurrences.push({
				emoji,
				modifierEmoji,
				user,
				ts: slackMessage.ts || null,
				isReaction: true
			});
		}
	}

	return emojiOccurrences;
}
