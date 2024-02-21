import { ReadStream } from "fs";

export interface IFileUpload {
	createReadStream(): ReadStream;
	filename: string;
	mimetype: string;
	encoding: string;
}