import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Resep = () => {
    const [resep, setResep] = useState([]);

    useEffect(() => {
        fetchResep();
    }, []);

    const fetchResep = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/resep');
            if (response.ok) {
                const resepData = await response.json();
                setResep(resepData);
            } else {
                console.log('Terjadi kesalahan saat mengambil data resep');
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat mengambil data resep', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/resep/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedResep = resep.filter((item) => item.id !== id);
                setResep(updatedResep);
            } else {
                console.log('Terjadi kesalahan saat menghapus resep');
            }
        } catch (error) {
            console.log('Terjadi kesalahan saat menghapus resep', error);
        }
    };

    return (
        <div>
            <h1>Resep Makanan</h1>
            {resep.map((item) => (
                <div key={item.id}>
                    <h2>{item.nama_resep}</h2>
                    <p>Provinsi: {item.provinsi}</p>
                    <p>Daerah: {item.daerah}</p>
                    <p>Bahan: {item.bahan.join(', ')}</p>
                    <p>Cara Membuat:</p>
                    <ol>
                        {item.cara_membuat.map((langkah, index) => (
                            <li key={index}>{langkah}</li>
                        ))}
                    </ol>
                    <Link to={`/resep/${item.id}`}>Lihat Detail</Link>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Resep;
