const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/resep', (req, res) => {
  const resepData = req.body;
  res.status(200).json({ message: 'Resep berhasil diupload' });
});
app.listen(8000, () => {
  console.log('Server berjalan pada port 8000');
});
