export const unwrapList = (res) => {
    return res.data.data?.data ?? res.data.data ?? [];
};

export const sanitizeCsvCell = (val) => {
    const str = String(val ?? "").replace(/"/g, '""');
    const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
    return `"${safe}"`;
};

