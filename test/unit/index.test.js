'use strict';

const { afterEach, beforeEach, describe, it } = require('node:test');
const assert = require('node:assert');
const td = require('testdouble');

td.config({ ignoreWarnings: true });

describe('get-all-emoji-in-a-slack-channel', () => {
	let getAllEmojiInASlackChannel;
	let getAllMessagesInASlackChannel;

	beforeEach(() => {
		const mockSlackMessages = require('./fixture/mock-slack-messages.json');
		getAllMessagesInASlackChannel = td.replace(
			'@rowanmanning/get-all-messages-in-a-slack-channel',
			{ getAllMessagesInASlackChannel: td.func() }
		).getAllMessagesInASlackChannel;
		td.when(getAllMessagesInASlackChannel(), { ignoreExtraArgs: true }).thenResolve(
			mockSlackMessages
		);
		getAllEmojiInASlackChannel = require('../..');
	});

	afterEach(() => td.reset());

	it('exports a function', () => {
		assert.strictEqual(typeof getAllEmojiInASlackChannel, 'function');
	});

	describe('getAllEmojiInASlackChannel(slackWebApiClient, slackChannelId)', () => {
		let resolvedValue;
		let slackWebApiClient;

		beforeEach(async () => {
			slackWebApiClient = {
				isMockSlackWebApiClient: true
			};
			resolvedValue = await getAllEmojiInASlackChannel(slackWebApiClient, 'mock-channel-id');
		});

		it('fetches all messages for the Slack channel', () => {
			td.verify(getAllMessagesInASlackChannel(slackWebApiClient, 'mock-channel-id'), {
				times: 1
			});
		});

		it('resolves with an array of emoji found in the Slack messages', () => {
			assert.ok(Array.isArray(resolvedValue));
			assert.strictEqual(resolvedValue.length, 22);
			assert.deepStrictEqual(resolvedValue, [
				{
					emoji: 'mock-emoji-1',
					modifierEmoji: null,
					user: 'mock-user-1',
					ts: 'mock-timestamp-1',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-2',
					modifierEmoji: null,
					user: 'mock-user-2',
					ts: 'mock-timestamp-2',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-3',
					modifierEmoji: null,
					user: 'mock-user-2',
					ts: 'mock-timestamp-2',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-1',
					modifierEmoji: 'skin-tone-1',
					user: 'mock-user-3',
					ts: 'mock-timestamp-3',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-2',
					modifierEmoji: null,
					user: 'mock-user-3',
					ts: 'mock-timestamp-3',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-2',
					modifierEmoji: null,
					user: 'mock-user-3',
					ts: 'mock-timestamp-3',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-1',
					modifierEmoji: null,
					user: 'mock-user-4',
					ts: 'mock-timestamp-4',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-2',
					modifierEmoji: null,
					user: 'mock-user-4',
					ts: 'mock-timestamp-4',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-5',
					modifierEmoji: null,
					user: 'mock-user-5',
					ts: 'mock-timestamp-5',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-5',
					modifierEmoji: null,
					user: 'mock-user-5',
					ts: 'mock-timestamp-5',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-5',
					modifierEmoji: null,
					user: 'mock-user-5',
					ts: 'mock-timestamp-5',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-5',
					modifierEmoji: null,
					user: 'mock-user-5',
					ts: 'mock-timestamp-5',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-5',
					modifierEmoji: null,
					user: 'mock-user-5',
					ts: 'mock-timestamp-5',
					isReaction: false
				},
				{
					emoji: 'mock_emoji_6',
					modifierEmoji: null,
					user: 'mock-user-6',
					ts: 'mock-timestamp-6',
					isReaction: false
				},
				{
					emoji: "mock'emoji'6",
					modifierEmoji: null,
					user: 'mock-user-6',
					ts: 'mock-timestamp-6',
					isReaction: false
				},
				{
					emoji: 'mock+emoji+6',
					modifierEmoji: null,
					user: 'mock-user-6',
					ts: 'mock-timestamp-6',
					isReaction: false
				},
				{
					emoji: 'mock-emoji-7',
					modifierEmoji: null,
					user: 'mock-user-1',
					ts: 'mock-timestamp-7',
					isReaction: true
				},
				{
					emoji: 'mock-emoji-7',
					modifierEmoji: null,
					user: 'mock-user-2',
					ts: 'mock-timestamp-7',
					isReaction: true
				},
				{
					emoji: 'mock-emoji-7',
					modifierEmoji: null,
					user: 'mock-user-3',
					ts: 'mock-timestamp-7',
					isReaction: true
				},
				{
					emoji: 'mock-emoji-8',
					modifierEmoji: null,
					user: 'mock-user-1',
					ts: 'mock-timestamp-8',
					isReaction: true
				},
				{
					emoji: 'mock-emoji-9',
					modifierEmoji: null,
					user: 'mock-user-1',
					ts: 'mock-timestamp-8',
					isReaction: true
				},
				{
					emoji: 'mock-emoji-9',
					modifierEmoji: 'skin-tone-4',
					user: 'mock-user-1',
					ts: 'mock-timestamp-9',
					isReaction: true
				}
			]);
		});

		describe('when `getAllMessagesInASlackChannel` errors', () => {
			let getAllMessagesError;
			let rejectedError;

			beforeEach(async () => {
				try {
					getAllMessagesError = new Error('mock get all messages error');
					td.when(getAllMessagesInASlackChannel(), { ignoreExtraArgs: true }).thenReject(
						getAllMessagesError
					);
					await getAllEmojiInASlackChannel(slackWebApiClient, 'mock-channel-id');
				} catch (error) {
					rejectedError = error;
				}
			});

			it('rejects with the error', () => {
				assert.strictEqual(rejectedError, getAllMessagesError);
			});
		});
	});

	describe('.default', () => {
		it('aliases the module exports', () => {
			assert.strictEqual(getAllEmojiInASlackChannel, getAllEmojiInASlackChannel.default);
		});
	});
});
