'use strict';
const handleQuickReply = (bot, message, eventName) => {
	if (message.quick_reply) {
		message.payload = message.quick_reply.payload;
		message.text = message.quick_reply.payload;
		message.label = message.quick_reply.text;
		message.type = eventName || 'facebook_quick_reply';
	}
};

module.exports = (controller, options) => {
	options = options || {};

	controller.middleware.normalize.use((bot, message, next) => {
		if (options.backwardsCompatibility) {
			controller.trigger('message_received', [bot, message]);
		}
		handleQuickReply(bot, message, options.eventName);

		next();
	});
};

module.exports.handler = handleQuickReply;
