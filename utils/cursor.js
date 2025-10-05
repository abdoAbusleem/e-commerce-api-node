function encodeCursor(value) {
  return Buffer.from(String(value)).toString('base64');
}

function decodeCursor(cursor) {
  if (!cursor) return null;
  try {
    return Buffer.from(cursor, 'base64').toString('ascii');
  } catch {
    return null;
  }
}

module.exports = {
  encodeCursor,
  decodeCursor,
};
