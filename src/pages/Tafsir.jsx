//Menambah Halaman untuk Tafsir Quran
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Tafsir = () => {
  const { nomor } = useParams();
  const [tafsir, setTafsir] = useState(null);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/tafsir/${nomor}`)
      .then(response => response.json())
      .then(data => setTafsir(data.data));
  }, [nomor]);

  if (!tafsir) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tafsir Surat {tafsir.nama}</h2>
      {tafsir.tafsir.map((ayat, index) => (
        <div key={index}>
          <h4>Ayat {ayat.ayat}</h4>
          <p>{ayat.teks}</p>
        </div>
      ))}
    </div>
  );
};

export default Tafsir;
