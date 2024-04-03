export async function get(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Unable to fetch data.");
  }

  const data = res.json() as unknown;

  return data;
}
