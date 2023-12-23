import { database } from "./mongodb";
import type { AcwiData } from "$lib/type/AcwiData";

// MongoDBにデータ追加
// _idを含んだデータを返す
export const insertChartToMongo = async (data: AcwiData) => {
  const result = await database.collection<AcwiData>("acwi").insertOne(data);

  return {
    _id: result.insertedId,
    ...data,
  };
};
