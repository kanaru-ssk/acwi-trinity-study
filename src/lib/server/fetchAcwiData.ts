import { database } from '$lib/server/mongodb';
import type { AcwiData } from '$lib/type/AcwiData';

export const fetchAcwiData = () => database.collection<AcwiData>('acwi').find().toArray();
