const { formatInTimeZone } = require('date-fns-tz');

/**
 * Generates a strict YYYY-MM-DD date key in the application's configured timezone.
 * @param {Date|string|number} [date=new Date()] The date to format
 * @returns {string} The formatted date key (e.g., '2023-10-05')
 */
const generateDateKey = (date = new Date()) => {
    const tz = process.env.APP_TIMEZONE || 'Asia/Kolkata';
    return formatInTimeZone(date, tz, 'yyyy-MM-dd');
};

module.exports = {
    generateDateKey
};
