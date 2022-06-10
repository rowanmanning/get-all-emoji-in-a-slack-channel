/**
 * @module @rowanmanning/get-all-emoji-in-a-slack-channel
 */
'use strict';

const getAllMessagesInASlackChannel = require('@rowanmanning/get-all-messages-in-a-slack-channel');

/**
 * A reguler expression used to find emoji in a string.
 *
 * @access private
 * @type {RegExp}
 */
const emojiRegExp = /:(([a-z0-9'+_-]+)(::(skin-tone-\d))?):/g;

/**
 * Get all of the emoji occurrences in a Slack channel.
 *
 * @access public
 * @param {object} slackWebApiClient
 *     A pre-authenticated Slack Web API client {@see https://www.npmjs.com/package/@slack/web-api}.
 * @param {string} slackChannelId
 *     The ID of the Slack channel to get all emoji for.
 * @returns {Promise<Array<EmojiOccurrence>>}
 *     Returns a promise that resolves to an array of emoji.
 * @throws {TypeError}
 *     Throws if any of the parameters are invalid.
 * @throws {Error}
 *     Throws if the Slack API errors.
 */
async function getAllEmojiInASlackChannel(slackWebApiClient, slackChannelId) {
	const messages = await getAllMessagesInASlackChannel(slackWebApiClient, slackChannelId);
	return messages.reduce((emojiOccurrences, message) => [
		...emojiOccurrences,
		...extractEmojiOccurrencesFromMessageText(message),
		...extractEmojiOccurrencesFromMessageReactions(message)
	], []);
}

/**
 * Extract emoji occurrences from a Slack message's text.
 *
 * @access private
 * @param {SlackMessage} slackMessage
 *     A message as returned by the Slack `channels.history` API method.
 * @returns {Array<EmojiOccurrence>}
 *     Returns a promise that resolves to an array of emoji.
 */
function extractEmojiOccurrencesFromMessageText(slackMessage) {
	const emojiOccurrences = [];
	let match;
	while ((match = emojiRegExp.exec(slackMessage.text)) !== null) {
		emojiOccurrences.push({
			emoji: match[2],
			modifierEmoji: match[4] || null,
			user: slackMessage.user,
			ts: slackMessage.ts,
			isReaction: false
		});
	}
	return emojiOccurrences;
}

/**
 * Extract emoji occurrences from a Slack message's reactions.
 *
 * @access private
 * @param {SlackMessage} slackMessage
 *     A message as returned by the Slack `channels.history` API method.
 * @returns {Array<EmojiOccurrence>}
 *     Returns a promise that resolves to an array of emoji.
 */
function extractEmojiOccurrencesFromMessageReactions(slackMessage) {
	if (!slackMessage.reactions) {
		return [];
	}
	return slackMessage.reactions.reduce((emojiOccurrences, reaction) => {
		const [emoji, modifierEmoji = null] = reaction.name.split('::');
		return [...emojiOccurrences, ...reaction.users.map(user => {
			return {
				emoji,
				modifierEmoji,
				user,
				ts: slackMessage.ts,
				isReaction: true
			};
		})];
	}, []);
}

/**
 * @typedef {object} EmojiOccurrence
 * @property {string} emoji
 *     The name of the emoji that was used.
 * @property {(string | null)} modifierEmoji
 *     The name of an emoji modifier that was used.
 * @property {string} user
 *     The ID of the Slack user who used this emoji.
 * @property {string} ts
 *     The Slack timestamp that the message containing the emoji was posted at.
 *     Note: for reactions, the timestamp is the time that the associated message
 *     was posted, not the reaction itself.
 * @property {boolean} isReaction
 *     Whether the emoji occurrence is a reaction on a message or not.
 */

/**
 * @typedef {object} SlackMessage
 * @property {string} text
 *     The text of the Slack message.
 * @property {string} user
 *     The ID of the Slack user who posted the message.
 * @property {string} ts
 *     The Slack timestamp that the message was posted at (used by Slack as a unique ID).
 * @property {Array<SlackReaction>} reactions
 *     The reactions on the Slack message.
 */

/**
 * @typedef {object} SlackReaction
 * @property {string} name
 *     The name of the emoji used in this reaction.
 * @property {Array<string>} users
 *     The IDs of Slack users who reacted.
 */

module.exports = getAllEmojiInASlackChannel;
