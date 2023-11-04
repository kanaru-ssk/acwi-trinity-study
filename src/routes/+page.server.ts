import { fetchAcwiData } from '$lib/server/fetchAcwiData';

export const prerender = true;

export const load = async () => {
	const acwiData = await fetchAcwiData();

	const acwiDataStr = acwiData.map((v) => {
		return [v.date.toLocaleString(), String(v.price_usd), String(v.price_jpy), String(v.jpy_usd)];
	});

	return { acwiData: acwiDataStr };
};
