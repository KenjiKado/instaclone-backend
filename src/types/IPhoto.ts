export interface IPhoto {
	id: number;
	userId: number;
	url: string;
	description?: string;
	hashtags?: string[];
	createdAt: string;
	updatedAt: string;
}