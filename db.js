const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar com MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
