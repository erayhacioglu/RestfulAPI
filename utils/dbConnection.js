import mongoose from 'mongoose';

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log('Mongodb connected...');
	} catch (err) {
		console.error('Server Error : ' + err);
	}
};

export default dbConnection;
