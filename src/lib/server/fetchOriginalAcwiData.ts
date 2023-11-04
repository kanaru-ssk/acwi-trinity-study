export const fetchOriginalAcwiData = async () => {
	// TODO: MongoDBに保存されていない最新データのみ取得するように修正する。
	const endpoint = 'https://app2.msci.com/products/service/index/indexmaster/getLevelDataForGraph';
	const currencySymbol = 'currency_symbol=USD';
	const indexVariant = 'index_variant=STRD';
	const startDate = 'start_date=19691231';
	const endDate = 'end_date=20231025';
	const dataFrequency = 'data_frequency=END_OF_MONTH';
	const indexCodes = 'index_codes=892400';

	const data = await fetch(
		`${endpoint}?${currencySymbol}&${indexVariant}&${startDate}&${endDate}&${dataFrequency}&${indexCodes}`
	).then((res) => res.json());

	// TODO: TypeGuard実装する。
	return data;
};
