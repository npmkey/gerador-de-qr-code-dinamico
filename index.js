const express = require('express');
const cors = require('cors'); // <-- aqui

const linkRoutes = require('./routes/linkRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // <-- aqui
app.use(express.json());
app.use('/', linkRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
