/* eslint-disable no-bitwise */

exports.hashCode = function (string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    const char = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
};
