import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import AudioPlayer from "../components/AudioPlayer";

const DetailSurat = () => {
  const { id } = useParams(); // Ambil parameter dari URL
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null); // Untuk kontrol audio per ayat

  // Fungsi untuk ambil data surat dari API equran.id
  const getDetailSurat = (idSurat) => {
    fetch(`https://equran.id/api/v2/surat/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDetailSurat(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!surat) return <p>Surat tidak ditemukan.</p>;

  return (
    <>
      <div className="vh-100 overflow-auto">
        {/* Judul dan informasi surat */}
        <h2>
          {surat.namaLatin} ({surat.nama})
        </h2>
        <p>Jumlah Ayat: {surat.jumlahAyat}</p>
        <p>Arti: {surat.arti}</p>
        <p>Deskripsi: {parse(surat.deskripsi)}</p>

        {/* Audio murottal full untuk seluruh surat */}
        <div className="my-3">
          <h5>Putar Audio Full Surat:</h5>
          <audio controls className="w-100">
            <source src={surat.audioFull} type="audio/mpeg" />
            Browser Anda tidak mendukung audio element.
          </audio>
        </div>

        {/* Daftar ayat, teks Arab, audio per ayat, dan terjemahan */}
        <div>
          <ul className="list-group">
            {surat.ayat.map((ayat) => (
              <li key={ayat.nomorAyat}>
                <div className="list-group-item">
                  {/* Baris atas: Teks Arab + Audio */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="arabic-text">{ayat.teksArab}</span>
                    <div className="d-flex align-items-center">
                      <span className="badge text-bg-primary rounded-sm p-2 me-2">
                        {ayat.nomorAyat}
                      </span>
                      <AudioPlayer
                        key={ayat.nomorAyat}
                        url={ayat.audio["05"]} // Mishary
                        currentAudio={currentAudio}
                        setCurrentAudio={setCurrentAudio}
                      />
                    </div>
                  </div>

                  {/* Terjemahan per ayat */}
                  <div className="mt-2">
                    <small className="text-muted fst-italic">
                      {ayat.teksIndonesia}
                    </small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DetailSurat;
