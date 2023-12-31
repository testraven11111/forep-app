import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const Upload = () => {
    const [value, setValue] = useState('');
    const [namaMakanan, setNamaMakanan] = useState('');
    const [provinsi, setProvinsi] = useState('');

    const handleSubmit = () => {
        const payload = {
            id: generateId(),
            provinsi: provinsi,
            daerah: '',
            nama_resep: namaMakanan,
            bahan: value,
            cara_membuat: '',
        };
        axios
            .post('http://localhost:8000/api/resep', payload)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Terjadi kesalahan saat mengupload resep', error);
            });
    };

    const generateId = () => {
        return Math.random().toString(36).slice(2, 11);
    };

    return (
        <div className="add">
            <div className="content">
                <h1>Title</h1>
                <input
                    type="text"
                    placeholder="Masukkan nama makanan..."
                    value={namaMakanan}
                    onChange={(e) => setNamaMakanan(e.target.value)}
                />
                <h1>Bahan dan Cara Pembuatan</h1>
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Gambar</h1>
                    <input style={{ display: 'none' }} type="file" id="file" name="" />
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <div className="buttons">
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Asal Daerah</h1>
                    <select
                        className="prov"
                        value={provinsi}
                        onChange={(e) => setProvinsi(e.target.value)}
                    >
                        <option value="">--pilih provinsi--</option>
                        <option value="Aceh">Aceh</option>
                        <option value="Sumatera Utara">Sumatera Utara</option>
                        <option value="Sumatera Selatan">Sumatera Selatan</option>
                        <option value="Sumatera Barat">Sumatera Barat</option>
                        <option value="Bengkulu">Bengkulu</option>
                        <option value="Riau">Riau</option>
                        <option value="Jambi">Jambi</option>
                        <option value="Lampung">Lampung</option>
                        <option value="Bangka Belitung">Bangka Belitung</option>
                        <option value="Kalimantan Barat">Kalimantan Barat</option>
                        <option value="Kalimantan Timur">Kalimantan Timur</option>
                        <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                        <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                        <option value="Kalimantan Utara">Kalimantan Utara</option>
                        <option value="Banten">Banten</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                        <option value="Jawa Tengah">Jawa Tengah</option>
                        <option value="DI Yogyakarta">DI Yogyakarta</option>
                        <option value="Jawa Timur">Jawa Timur</option>
                        <option value="Bali">Bali</option>
                        <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                        <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
                        <option value="Gorontalo">Gorontalo</option>
                        <option value="Sulawesi Barat">Sulawesi Barat</option>
                        <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                        <option value="Sulawesi Utara">Sulawesi Utara</option>
                        <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                        <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                        <option value="Maluku Utara">Maluku Utara</option>
                        <option value="Maluku">Maluku</option>
                        <option value="Papua">Papua</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Upload;
