import { database } from '$lib/server/mongodb';
import type { AcwiData } from '$lib/type/AcwiData';

export const insertToMongo = async (data: AcwiData) => {
	const result = await database.collection<AcwiData>('acwi').insertOne(data);

	return {
		_id: result.insertedId,
		...data
	};
};
