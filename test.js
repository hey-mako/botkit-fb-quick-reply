import test from 'ava';
import middleware from '.';

test('Test middleware handle to mutate original message', t => {
	const initialMessageStub = {
		text: 'test text',
		type: 'message_received',
		quick_reply: { // eslint-disable-line camelcase
			payload: 'test payload',
			text: 'test text'
		}
	};

	middleware.handler({}, initialMessageStub);
	t.is(initialMessageStub.text, 'test payload', 'Should mutate message.text');
	t.is(initialMessageStub.payload, 'test payload', 'Should mutate message.payload');
	t.is(initialMessageStub.label, 'test text', 'Should mutate message.label');
	t.is(initialMessageStub.type, 'facebook_quick_reply', 'Should mutate message.type');

	middleware.handler({}, initialMessageStub, 'event_override');
	t.is(initialMessageStub.type, 'event_override', 'Should mutate message.type');
});
