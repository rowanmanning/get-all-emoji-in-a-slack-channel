'use strict';

const sinon = require('sinon');

module.exports = sinon.stub().resolves([
	{
		text: 'mock text 1 :mock-emoji-1:',
		user: 'mock-user-1',
		ts: 'mock-timestamp-1',
		reactions: []
	},
	{
		text: 'mock text 2 :mock-emoji-2: :mock-emoji-3:',
		user: 'mock-user-2',
		ts: 'mock-timestamp-2',
		reactions: []
	},
	{
		text: 'mock text 3 :mock-emoji-1::skin-tone-1: :mock-emoji-2::mock-emoji-2:',
		user: 'mock-user-3',
		ts: 'mock-timestamp-3',
		reactions: []
	},
	{
		text: 'mock :mock-emoji-1: text :mock-emoji-2: 4',
		user: 'mock-user-4',
		ts: 'mock-timestamp-4',
		reactions: []
	},
	{
		text: 'mock text 5 :mock-emoji-5::mock-emoji-5::mock-emoji-5::mock-emoji-5::mock-emoji-5:',
		user: 'mock-user-5',
		ts: 'mock-timestamp-5',
		reactions: []
	},
	{
		text: 'mock text 6 :mock_emoji_6: :mock\'emoji\'6: :mock+emoji+6:',
		user: 'mock-user-6',
		ts: 'mock-timestamp-6',
		reactions: []
	},
	{
		text: 'mock text 7',
		user: 'mock-user-7',
		ts: 'mock-timestamp-7',
		reactions: [
			{
				name: 'mock-emoji-7',
				users: [
					'mock-user-1',
					'mock-user-2',
					'mock-user-3'
				]
			}
		]
	},
	{
		text: 'mock text 8',
		user: 'mock-user-8',
		ts: 'mock-timestamp-8',
		reactions: [
			{
				name: 'mock-emoji-8',
				users: [
					'mock-user-1'
				]
			},
			{
				name: 'mock-emoji-9',
				users: [
					'mock-user-1'
				]
			}
		]
	},
	{
		text: 'mock text 9',
		user: 'mock-user-9',
		ts: 'mock-timestamp-9',
		reactions: [
			{
				name: 'mock-emoji-9::skin-tone-4',
				users: [
					'mock-user-1'
				]
			}
		]
	}
]);

/**
 * @typedef {Object} SlackReaction
 * @property {String} name
 *     The name of the emoji used in this reaction.
 * @property {Array<String>} users
 *     The IDs of Slack users who reacted.
 */
