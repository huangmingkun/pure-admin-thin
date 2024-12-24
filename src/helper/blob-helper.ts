const subscriptionMap = new Map();
export const getBlobUrl = (file, key, cleanFunc) => {
  try {
    const url = URL.createObjectURL(file);

    if (!subscriptionMap.has(key)) {
      subscriptionMap.set(key, []);
    }

    subscriptionMap[key].push(() => {
      URL.revokeObjectURL(url);
      cleanFunc();
    });

    return url;
  } catch (error) {
    console.error("获取blobUrl失败", error);
    throw error;
  }
};

export const cleanSubscriptionByKey = key => {
  if (subscriptionMap.has(key)) {
    const callBacks = subscriptionMap.get(key) || [];
    callBacks.forEach(cb => cb());
    subscriptionMap.delete(key);
  }
};
