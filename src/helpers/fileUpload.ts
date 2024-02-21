import { Stream } from "stream";
import { storageBucket } from "../firebase/config";

export const uploadNewFileFromStream = async (fileName: string, readStream: Stream) => {
	const file = storageBucket.file(`${fileName}`);

	const writeStream = file.createWriteStream();

	const pipedStreams = readStream.pipe(writeStream);

	const result: Promise<string> = new Promise((resolve, reject) => {
		pipedStreams.on('error', function (err) {
			reject(err);
		});
		pipedStreams.on('finish', function () {
			file.setMetadata({
				public: true
			});

			const publicUrl = file.getSignedUrl({
				action: 'read',
				expires: '03-09-2491'
			}).then(url => {
				resolve(url.toString());
			})
		});
	});

	return result
}