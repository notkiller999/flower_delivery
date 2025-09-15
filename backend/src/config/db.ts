import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI as string || '5000';
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
