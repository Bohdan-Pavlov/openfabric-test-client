export interface IProductFromServer {
	_id: string;
	name: string;
	description: string;
	price: number;
	imgUrl: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProduct {
	name: string;
	description: string;
	price: number;
	imgUrl: string;
}

export interface ApiError {
	error: {
		message: string;
	};
}
