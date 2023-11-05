import type { AcwiData } from '$lib/type/AcwiData';
import { isAcwiDataFromMsci } from '$lib/type/AcwiDataFromMsci';

// MSCI API から最新のACWIチャートデータをフェッチ
export const fetchAcwiDataFromMsci = async (
	lastDataDate: Date
): Promise<Omit<AcwiData, 'price_jpy' | 'jpy_usd'>[] | null> => {
	lastDataDate.setDate(lastDataDate.getDate() + 1);
	const lastDataDateStr = toNoBreakStr(lastDataDate);
	const latestWeekDayStr = toNoBreakStr(getNextWeekDay(new Date()));

	const endpoint = 'https://app2.msci.com/products/service/index/indexmaster/getLevelDataForGraph';
	const currencySymbol = 'currency_symbol=USD';
	const indexVariant = 'index_variant=STRD';
	const startDate = `start_date=${lastDataDateStr}`;
	const endDate = `end_date=${latestWeekDayStr}`;
	const dataFrequency = 'data_frequency=END_OF_MONTH';
	const indexCodes = 'index_codes=892400';

	const res = await fetch(
		`${endpoint}?${currencySymbol}&${indexVariant}&${startDate}&${endDate}&${dataFrequency}&${indexCodes}`
	);
	if (!res.ok) return null;

	const data: unknown = await res.json();
	if (!isAcwiDataFromMsci(data)) return null;

	return data.indexes.INDEX_LEVELS.map((level) => {
		const date = toDate(String(level.calc_date));
		return {
			date,
			price_usd: level.level_eod
		};
	});
};

// 2023-11-05 -> "20231105"
const toNoBreakStr = (date: Date) => {
	const year = String(date.getFullYear());
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return year + month + day;
};

// "20231105" -> 2023-11-05
const toDate = (noBreakStr: string): Date => {
	const yearStr = noBreakStr.slice(0, 4);
	const monthStr = noBreakStr.slice(4, 6);
	const dayStr = noBreakStr.slice(6);
	const dateStr = `${yearStr}/${monthStr}/${dayStr}`;
	return new Date(dateStr);
};

// 土日の時は次の月曜日を返す
const getNextWeekDay = (date: Date) => {
	const nextWeekDay = date;
	const day = date.getDay();

	if (day === 0) nextWeekDay.setDate(date.getDate() + 1);
	if (day === 6) nextWeekDay.setDate(date.getDate() + 2);

	return nextWeekDay;
};
