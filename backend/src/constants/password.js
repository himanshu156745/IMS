module.exports = {
    MIN_LENGTH: 12,
    MAX_LENGTH: 128,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,128}$/,
    MESSAGE: 'Password must be 12–128 characters with upper, lower, digit, and symbol.'
};
