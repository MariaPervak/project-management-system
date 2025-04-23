module.exports = {
    default: jest.fn().mockImplementation(() => ({
        id: 1,
        role: 'user',
        iat: 1234567890
    }))
};