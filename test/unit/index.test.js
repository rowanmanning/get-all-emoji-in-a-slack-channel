'use strict';

const assert = require('proclaim');
const mockery = require('mockery');

describe('index', () => {
	let index;
	let getAllEmojiInASlackChannel;

	beforeEach(() => {
		mockery.registerMock('@rowanmanning/get-all-messages-in-a-slack-channel', require('./mock/npm/@rowanmanning/get-all-messages-in-a-slack-channel'));
		index = require('../../index');
		getAllEmojiInASlackChannel = require('../../lib/get-all-emoji-in-a-slack-channel');
	});

	it('aliases `lib/get-all-emoji-in-a-slack-channel`', () => {
		assert.strictEqual(index, getAllEmojiInASlackChannel);
	});

});
