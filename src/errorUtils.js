export const userFriendlyError = message =>
    JSON.stringify(message, null, 2).replaceAll(/[{}]/g, '').trim();