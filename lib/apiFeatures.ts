import { GenericObjectType } from '@/types/custom.types';
import { Low } from 'lowdb';
import { getSingularOrPluralWord } from '../utils';
import { IDB } from './db';

export class APIFeatures {
	private _excludedFields = ['embed', 'sort', 'sortBy', 'fields', 'limit'];
	private _db: Low<IDB>;
	public data: Array<any>;

	constructor(db: Low<IDB>, data: Array<any>) {
		this._db = db;
		this.data = data;
	}

	public findDocumentById(id: string) {
		this.data = [this.data.find((d) => d.id === id)];
	}

	// embed data in documents, - foreign key
	public embedRelatedData(
		searchParams: URLSearchParams,
		selectedFields?: string
	): this {
		const embedField = searchParams.get('embed');

		if (!embedField) return this;

		const relatedDataMap = new Map();
		const relatedDataKey = getSingularOrPluralWord('plural', embedField);
		const relatedData: Array<any> =
			(this._db.data as any)[relatedDataKey] || [];
		const embedKey = getSingularOrPluralWord('singular', embedField);
		const foreignKey: string = embedKey + 'Id';

		if (!relatedData.length) return this;

		this.data = this.data.map((md) => {
			const key = (md as any)[foreignKey];
			if (!key) return md;
			if (!relatedDataMap.size) {
				relatedData.forEach((element) => {
					relatedDataMap.set(element.id, element);
				});
			}

			let embeddedData = relatedDataMap.get(key);

			if (!embeddedData) return md;

			if (selectedFields) {
				// filter embedded fields
				embeddedData = selectedFields.split(',').reduce((acc, field) => {
					acc[field] = embeddedData[field];
					return acc;
				}, {} as GenericObjectType<any>);
			}

			return {
				...md,
				[embedKey]: embeddedData,
			};
		});

		return this;
	}
	// filter the documents by key
	public filter(
		searchParams: URLSearchParams,
		allowedFields: Array<string>
	): this {
		const filter: Array<string[]> = [];

		allowedFields.forEach((f) => {
			if (!this._excludedFields.includes(f) && searchParams.has(f)) {
				// [key, value] format
				const value =
					f === 'id'
						? [f, searchParams.get(f) || '']
						: [f, searchParams.get(f)?.toLowerCase() || ''];

				filter.push(value);
			}
		});

		while (filter.length) {
			const [field, value] = filter.pop() || [];
			this.data = this.data.filter((d) => {
				// compares field value of the filter
				return String(d[field]).toLowerCase() === value;
			});
		}
		return this;
	}
	// limit the number of properties in the documents
	public limiter(searchParams: URLSearchParams): this {
		const fields = searchParams.get('fields');

		if (!fields) return this;

		const parsedFields: Array<string> = fields.split(',') || [];

		this.data = this.data.map((d) => {
			const result: GenericObjectType<any> = parsedFields.reduce(
				(acc, f) => {
					acc[f] = d[f];
					return acc;
				},
				{ id: d.id } as GenericObjectType<any>
			);

			return result;
		});

		return this;
	}

	public sort(searchParams: URLSearchParams): this {
		const sortBy = searchParams.get('sortBy');
		const order = searchParams.get('order') || 'asc';

		if (!sortBy) return this;

		this.data = this.data.toSorted((a, b) => {
			let x = a[sortBy];
			let y = b[sortBy];

			// swap the order of the values in descending order
			if (order === 'desc') {
				x = b[sortBy];
				y = a[sortBy];
			}

			if (typeof x === 'string' && typeof y === 'string') {
				return x.localeCompare(y);
			}
			if (new Date(x) && new Date(y)) {
				return new Date(x).getTime() - new Date(y).getTime();
			}
			return x - y;
		});

		return this;
	}
	// limit the number of documents to be returned
	public limit(searchParams: URLSearchParams): this {
		const limit = searchParams.get('limit');
		const parsedLimit = Number(limit);

		if (limit) {
			this.data = this.data.slice(0, parsedLimit);
		}

		this.data = this.data.slice();
		return this;
	}
}
