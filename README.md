
# @rowanmanning/get-all-emoji-in-a-slack-channel

Get all emoji in a public Slack channel.


## Table of Contents

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)


## Requirements

This library requires the following to run:

  * [Node.js](https://nodejs.org/) 14+


## Usage

Install alongside the Slack web API with [npm](https://www.npmjs.com/):

```sh
npm install @slack/web-api @rowanmanning/get-all-emoji-in-a-slack-channel
```

Load the library into your code with a `require` call (you'll also need the Slack `WebClient` class):

```js
const {WebClient} = require('@slack/web-api');
const getAllEmojiInASlackChannel = require('@rowanmanning/get-all-emoji-in-a-slack-channel');
```

Get all occurrences of an emoji in a Slack channel:

```js
const slackWebClient = new WebClient('YOUR-SLACK-TOKEN');
const emojiOccurrences = await getAllEmojiInASlackChannel(slackWebClient, 'YOUR-CHANNEL-ID');
```

`emojiOccurrences` will be an array of objects which look like this:

```js
{
    emoji: String,         // The name of the emoji that was used (excluding wrapping colons)
    modifierEmoji: String, // The name of any modifier emoji (currently only skin-tone modifiers)
    user: String,          // The Slack user ID of the person who used this emoji
    ts: String,            // The Slack timestamp for the message that this emoji appear in
    isReaction: Boolean    // Whether the emoji was a reaction rather than part of the message
}
```


## Contributing

[The contributing guide is available here](docs/contributing.md). All contributors must follow [this library's code of conduct](docs/code_of_conduct.md).


## License

Licensed under the [MIT](LICENSE) license.<br/>
Copyright &copy; 2019, Rowan Manning
