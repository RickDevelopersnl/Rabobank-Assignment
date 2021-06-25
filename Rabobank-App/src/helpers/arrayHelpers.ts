export const splitCSV = (string: string) => string.split(/,|;/);
export const sanitizeString = (string: string) => string.replace(/\"/g, '');
