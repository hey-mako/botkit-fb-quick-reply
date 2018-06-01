# botkit-fb-quick-reply [![Build Status](https://travis-ci.com/mako-ai/botkit-fb-quick-reply.svg?branch=master)](https://travis-ci.com/mako-ai/botkit-fb-quick-reply)

> A Botkit middleware to handle Facebook Messenger's quick reply in an intuitive manner

Using this [Botkit](https://github.com/howdyai/botkit) middleware allows your controller to "listen" on Facebook Messenger quick reply payloads instead of the quick reply label/text. In addition, it also supports backwards compatibility to prevent breaking any existing code.

The message object is updated to the following:
```js
message.payload = message.quick_reply.payload;
message.text = message.quick_reply.payload;
message.label = message.quick_reply.text;
message.type = eventName || 'facebook_quick_reply';
```

## Install

```
$ npm install --save botkit-fb-quick-reply
```

## Usage

```js
const quickReplyMiddleware = require('botkit-fb-quick-reply');

// Load middleware
quickReplyMiddleware(controller);
// Now controller can handle "facebook_quick_reply" events and set messages accordingly
// messages.label = quick reply text label
// message.payload = quick reply payload

// Listen to events by the payload
controller.hears('MY_QUICK_REPLY_PAYLOAD', 'facebook_quick_reply', doSomething);

// Listen to a payload that can be provided from a postback OR quick reply
controller.hears('MY_QUICK_REPLY_PAYLOAD', ['facebook_quick_reply', 'facebook_postback'], doSomethingElse);
```


## API

### botkitFbQuickReply(controller [, options])

#### controller
Type: `object`

A botkit configured controller

#### options
Configure the middleware

##### options.eventName
Type: `string`<br>
Default: `facebook_quick_reply`

Override the default quick reply event name. For example, you can use `facebook_postback` if you feel have overlapping functionalities from the menu or quick replies.

##### options.backwardsCompatibility
Type: `boolean`<br>
Default: `false`

This will trigger both a `message_received` in the default behavior, and in the new `facebook_quick_reply` event. Thus activate this if you want backwards compability, but want to use the newer means of handling quick reply events.

## License

MIT © [Mako AI](https://github.com/mako-ai/botkit-fb-quick-reply)
