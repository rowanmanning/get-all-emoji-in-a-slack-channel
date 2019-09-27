'use strict';

const assert = require('proclaim');
const mockery = require('mockery');

describe('lib/get-all-emoji-in-a-slack-channel', () => {
	let getAllEmojiInASlackChannel;
	let getAllMessagesInASlackChannel;

	beforeEach(() => {
		getAllMessagesInASlackChannel = require('../mock/npm/@rowanmanning/get-all-messages-in-a-slack-channel');
		mockery.registerMock('@rowanmanning/get-all-messages-in-a-slack-channel', getAllMessagesInASlackChannel);
		getAllEmojiInASlackChannel = require('../../../lib/get-all-emoji-in-a-slack-channel');
	});

	it('exports a function', () => {
		assert.isFunction(getAllEmojiInASlackChannel);
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
			assert.calledOnce(getAllMessagesInASlackChannel);
			assert.calledWithExactly(getAllMessagesInASlackChannel, slackWebApiClient, 'mock-channel-id');
		});

		it('resolves with an array of emoji found in the Slack messages', () => {
			assert.isArray(resolvedValue);
			assert.lengthEquals(resolvedValue, 22);
			assert.deepEqual(resolvedValue, [
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
					emoji: 'mock\'emoji\'6',
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
			let rejectedError;

			beforeEach(async () => {
				try {
					getAllMessagesInASlackChannel.rejects(new Error('mock error'));
					await getAllEmojiInASlackChannel(slackWebApiClient, 'mock-channel-id');
				} catch (error) {
					rejectedError = error;
				}
			});

			it('rejects with a descriptive `TypeError`', () => {
				assert.isInstanceOf(rejectedError, Error);
				assert.strictEqual(rejectedError.message, 'mock error');
			});

		});

	});

});
