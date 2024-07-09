const getStoreKey = (id, key) => [id, "feedback", key];

export const getCount = async (id, key) => {
  const kv = await Deno.openKv();
  const count = await kv.get(getStoreKey(id, key));
  return count.value ?? 0;
};

export const incrementCount = async (id, key) => {
  const kv = await Deno.openKv();
  const count = await kv.get(getStoreKey(id, key));
  const newCount = (count.value ?? 0) + 1;
  await kv.set(getStoreKey(id, key), newCount);
};
