'use strict';

const {
	getAllMessagesInASlackChannel
} = require('@rowanmanning/get-all-messages-in-a-slack-channel');

/**
 * @import { WebClient } from '@slack/web-api'
 */

/**
 * A reguler expression used to find emoji in a string.
 *
 * @private
 * @type {RegExp}
 */
const emojiRegExp = /:(([a-z0-9'+_-]+)(::(skin-tone-\d))?):/g;

/**
 * Get all of the emoji occurrences in a Slack channel.
 *
 * @public
 * @param {WebClient} slackWebApiClient
 *     A pre-authenticated Slack Web API client {@see https://www.npmjs.com/package/@slack/web-api}.
 * @param {string} slackChannelId
 *     The ID of the Slack channel to get all emoji for.
 * @returns {Promise<EmojiOccurrence[]>}
 *     Returns a promise that resolves to an array of emoji.
 * @throws {TypeError}
 *     Throws if any of the parameters are invalid.
 * @throws {Error}
 *     Throws if the Slack API errors.
 */
async function getAllEmojiInASlackChannel(slackWebApiClient, slackChannelId) {
	const messages = (await getAllMessagesInASlackChannel(slackWebApiClient, slackChannelId)) || [];
	const emojiOccurrences = [];
	for (const message of messages) {
		emojiOccurrences.push(...extractEmojiOccurrencesFromMessageText(message));
		emojiOccurrences.push(...extractEmojiOccurrencesFromMessageReactions(message));
	}
	return emojiOccurrences;
}

/**
 * Extract emoji occurrences from a Slack message's text.
 *
 * @private
 * @param {import('@slack/web-api/dist/response/ConversationsHistoryResponse').MessageElement} slackMessage
 *     A message as returned by the Slack `channels.history` API method.
 * @returns {EmojiOccurrence[]}
 *     Returns a promise that resolves to an array of emoji.
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
 * Extract emoji occurrences from a Slack message's reactions.
 *
 * @private
 * @param {import('@slack/web-api/dist/response/ConversationsHistoryResponse').MessageElement} slackMessage
 *     A message as returned by the Slack `channels.history` API method.
 * @returns {EmojiOccurrence[]}
 *     Returns a promise that resolves to an array of emoji.
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

/**
 * @typedef {object} EmojiOccurrence
 * @property {string} emoji
 *     The name of the emoji that was used.
 * @property {(string | null)} modifierEmoji
 *     The name of an emoji modifier that was used.
 * @property {(string | null)} user
 *     The ID of the Slack user who used this emoji.
 * @property {(string | null)} ts
 *     The Slack timestamp that the message containing the emoji was posted at.
 *     Note: for reactions, the timestamp is the time that the associated message
 *     was posted, not the reaction itself.
 * @property {boolean} isReaction
 *     Whether the emoji occurrence is a reaction on a message or not.
 */

/** @type {getAllEmojiInASlackChannel} */
module.exports = getAllEmojiInASlackChannel;
module.exports.default = module.exports;
