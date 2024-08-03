import { DB_PATH } from '@/config';
import {
	IPortfolioCategory,
	IPortfolioWork,
	IPost,
	IUser,
} from '@/types/custom.types';
import { JSONFilePreset } from 'lowdb/node';

export interface IDB {
	portfolioCategories: Array<IPortfolioCategory>;
	portfolioWorks: Array<IPortfolioWork>;
	posts: Array<IPost>;
	users: Array<IUser>;
}

const DB_INITIAL_DATA: IDB = {
	portfolioCategories: [],
	portfolioWorks: [],
	posts: [],
	users: [],
};

export async function loadDB() {
	// create or load the database
	const db = await JSONFilePreset(DB_PATH, DB_INITIAL_DATA);
	db.read();
	return db;
}
