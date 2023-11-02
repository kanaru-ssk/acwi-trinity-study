import xlsx from 'node-xlsx';

export const prerender = true;

export const load = async () => {
	// とりあえず10行分のデータを取得
	const acwiData = xlsx
		.parse('data/acwi.xls')[0]
		.data.filter((v) => v[0])
		.slice(3, 13);
	const jpyPerUsdData = xlsx.parse('data/jpy-usd.csv')[0].data.slice(1, 11);

	return { acwiData, jpyPerUsdData };
};
