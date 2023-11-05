// MSCI API のレスポンス形式
export type AcwiDataFromMsci = {
	msci_index_code: string;
	index_variant_type: string;
	ISO_currency_symbol: string;
	indexes: {
		INDEX_LEVELS: {
			level_eod: number;
			calc_date: number;
		}[];
	};
};

export const isAcwiDataFromMsci = (data: unknown): data is AcwiDataFromMsci => {
	return (
		typeof data === 'object' &&
		data !== null &&
		'indexes' in data &&
		typeof data.indexes === 'object' &&
		data.indexes !== null &&
		'INDEX_LEVELS' in data.indexes &&
		Array.isArray(data.indexes.INDEX_LEVELS) &&
		data.indexes.INDEX_LEVELS.every(
			(level: unknown) =>
				typeof level === 'object' && level && 'level_eod' in level && 'calc_date' in level
		)
	);
};
