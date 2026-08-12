import { query } from '$app/server';

const TTL = 5 * 60 * 1000;
const REPO = 'https://api.github.com/repos/enisbu/amicro-sv';

let cache: { value: number; expires: number } | null = null;

export const githubStars = query(async (): Promise<number> => {
	if (cache && cache.expires > Date.now()) return cache.value;

	try {
		const res = await fetch(REPO, { headers: { Accept: 'application/vnd.github+json' } });
		if (!res.ok) return cache?.value ?? 0;

		const data = await res.json();
		const value = data?.stargazers_count;
		if (typeof value !== 'number') return cache?.value ?? 0;

		cache = { value, expires: Date.now() + TTL };
		return value;
	} catch {
		return cache?.value ?? 0;
	}
});
