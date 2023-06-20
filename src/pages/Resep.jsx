import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import resepData from '../reseplist';

const Resep = () => {
    const [resep, setResep] = useState([]);

    useEffect(() => {
        setResep(resepData);
    }, []);

    return (
        <div>
            <h1>Resep Makanan</h1>
            {resep.map((item) => (
                <div key={item.id}>
                    <h2>{item.nama_resep}</h2>
                    <p>Provinsi: {item.daerah}</p>
                    <p>Bahan: {item.bahan.join(', ')}</p>
                    <p>Cara Membuat:</p>
                    <ol>
                        {item.cara_membuat.map((langkah, index) => (
                            <li key={index}>{langkah}</li>
                        ))}
                    </ol>
                    <Link to={`/resep/${item.id}`}>Lihat Detail</Link>
                </div>
            ))}
        </div>
    );
};

export default Resep;
