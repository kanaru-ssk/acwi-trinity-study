import { database } from './mongodb';
import type { AcwiData } from '$lib/type/AcwiData';

// MongoDBからチャートデータをフェッチ
// 日付が古い順
export const fetchAcwiChartFromMongo = () =>
	database.collection<AcwiData>('acwi').find().sort({ date: 1 }).toArray();
