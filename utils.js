function serializeData(data) {
  return JSON.stringify(data, null, 2);
}

function deserializeData(serializedData) {
  let deserializedData;
  try {
    deserializedData = JSON.parse(serializedData);
    return deserializedData;
  } catch {
    return null;
  }
}

module.exports = {
  serializeData,
  deserializeData,
};
