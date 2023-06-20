const express = require('express');
const app = express();
const cors = require('cors');
const resepList = require('./src/reseplist');
const fs = require('fs');

app.use(cors());
app.use(express.json());

let resepData = resepList;

app.get('/api/resep', (req, res) => {
    res.json(resepData);
});

app.post('/api/resep', (req, res) => {
    const newResep = req.body;
    const newId = resepData.length + 1;
    newResep.id = newId;
    resepData.push(newResep);

    fs.writeFile('./src/reseplist.js', `module.exports = ${JSON.stringify(resepData, null, 4)};`, (err) => {
        if (err) {
            console.error('Terjadi kesalahan saat menulis file reseplist.js', err);
            res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan resep' });
        } else {
            res.status(200).json({ message: 'Resep berhasil diupload', id: newId });
        }
    });
});

app.delete('/api/resep/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = resepData.findIndex(resep => resep.id === id);
    if (index !== -1) {
        resepData.splice(index, 1);
        fs.writeFile('./src/reseplist.js', `module.exports = ${JSON.stringify(resepData, null, 4)};`, (err) => {
            if (err) {
                console.error('Terjadi kesalahan saat menulis file reseplist.js', err);
                res.status(500).json({ message: 'Terjadi kesalahan saat menghapus resep' });
            } else {
                res.status(200).json({ message: 'Resep berhasil dihapus', id: id });
            }
        });
    } else {
        res.status(404).json({ message: 'Resep tidak ditemukan' });
    }
});

app.listen(8000, () => {
    console.log('Server berjalan pada port 8000');
});
