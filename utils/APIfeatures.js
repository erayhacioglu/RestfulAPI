export default class APIfeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filtering() {
		const queryObj = { ...this.queryString };
		const excludedFields = ['page', 'sort', 'limit', 'search'];
		excludedFields.forEach((el) => delete queryObj[el]);
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt|regex)\b/g,
			(match) => `$${match}`
		);
		this.query.find(JSON.parse(queryStr));
		return this;
	}
	sorting() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}
		return this;
	}
	paginating() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 5;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
	searching() {
		if (this.queryString.search) {
			let queryObj = {};
			queryObj.$or = [
				{ title: { $regex: this.queryString.search, $options: 'i' } },
				{ category: { $regex: this.queryString.search, $options: 'i' } },
				{ description: { $regex: this.queryString.search, $options: 'i' } },
			];
			this.query.find(queryObj);
		} else {
			this.query = this.query.find();
		}
		return this;
	}
}
