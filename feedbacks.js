export const getCount = async (key) => {
  const kv = await Deno.openKv();
  const count = await kv.get(["feedback", key]);
  return count.value ?? 0;
};

export const incrementCount = async (key) => {
  const kv = await Deno.openKv();
  const count = await kv.get(["feedback", key]);
  const newCount = (count.value ?? 0) + 1;
  await kv.set(["feedback", key], newCount);
};
