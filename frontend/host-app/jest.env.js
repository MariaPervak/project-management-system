const NodeEnvironment = require('jest-environment-jsdom').default;

class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();
        const { TextEncoder, TextDecoder } = require('util');
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
    }
}

module.exports = CustomEnvironment;