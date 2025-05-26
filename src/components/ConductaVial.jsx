import { useRef, useState, useEffect } from 'react';
import '../styles/ConductaVial.css';
import BotonVehiculo from './BotonVehiculo';
import BotonVehiculoB from './BotonVehiculoB';
import ProgressBar from './ProgressBar';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';
import AcuerdoSec1 from '../assets/AcuerdoSec1.mp4';
import AcuerdoSec2 from '../assets/AcuerdoSec2.mp4';
import AcuerdoSec3 from '../assets/AcuerdoSec3.mp4';
import AcuerdoSec4 from '../assets/AcuerdoSec4.mp4';
import AcuerdoSec5 from '../assets/AcuerdoSec5.mp4';
import AcuerdoSec6 from '../assets/AcuerdoSec6.mp4';
import AcuerdoSec7 from '../assets/AcuerdoSec7.mp4';
import Popup from './Popup';
import Conducta from '../assets/ConductaVial.png';
import Qualitas from '../assets/Qualitas.png';
import Facebook from '../assets/facebook.svg';
import Link from '../assets/link.svg';
import Whatsapp from '../assets/whatsapp.png';

const videosData = [
  {
    src: video1,
    correcto: 'A',
    mensajes: {
      correcto: 'El vehículo A es responsable al realizar una vuelta en U y cortar la circulación del vehículo B.',
      incorrecto: 'El responsable es el vehículo A por realizar una maniobra de vuelta en U sin precaución.',
      tiempo: 'No se realizó ninguna acción en el tiempo permitido.',
    },
  },
  {
    src: video2,
    correcto: 'ambos',
    mensajes: {
      correcto: 'Hay corresponsabilidad, ya que ambos vehículos retroceden sin precaución.',
      correcto2: 'Ambos vehículos tienen responsabilidad por realizar maniobras de reversa sin precaución.',
      incorrecto: 'No se realizó ninguna acción en el tiempo permitido.',
      tiempo: 'No se realizó ninguna acción en el tiempo permitido.',
    },
  },
  {
    src: video3,
    correcto: 'B',
    mensajes: {
      correcto: 'El vehículo B es responsable por cambiar de carril sin precaución.',
      incorrecto: 'El responsable es el vehículo B por hacer un cambio de carril sin precaución.',
      tiempo: 'No se realizó ninguna acción en el tiempo permitido.',
    },
  },
  {
    src: video4,
    correcto: 'A',
    mensajes: {
      correcto: 'El vehículo A es responsable por salir de la cochera sin precaución.',
      incorrecto: 'El responsable es el vehículo A por incorporarse sin precaución desde la cochera.',
      tiempo: 'No se realizó ninguna acción en el tiempo permitido.',
    },
  },
  {
    src: video5,
    correcto: 'B',
    mensajes: {
      correcto: 'El vehículo B es responsable por incorporarse a la glorieta sin ceder el paso al vehículo A.',
      incorrecto: 'El responsable es el vehículo B al ingresar sin precaución a la glorieta donde circulaba el vehículo A.',
      tiempo: 'No se realizó ninguna acción en el tiempo permitido.',
    },
  },
];

const ConductaVial = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [mostrarRepetir, setMostrarRepetir] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [tipo, setTipo] = useState('');
  const [mensajePopup, setMensajePopup] = useState('');
  const progressRef = useRef();
  const videoRef = useRef();

  const videoActual = videosData[videoIndex];

  const avanzarVideo = () => {
  const siguiente = videoIndex + 1;

  if (siguiente < videosData.length) {
    setVideoIndex(siguiente);
    setMostrar(false);
    setMostrarRepetir(false);

    setTimeout(() => {
      videoRef.current?.load();
      videoRef.current?.play();
      progressRef.current?.resetProgress();
    }, 100);
  } else {
    // Ya no mostramos el alert, ahora cambiamos a pantalla final
    setMostrar(false);
    setPantalla('final'); // <-- Cambio de pantalla aquí
  }
};


  const handleVideoEnded = () => {
    progressRef.current?.startProgress();
    setMostrarRepetir(true);
  };

  const repetirVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setMostrarRepetir(false);
      setTipo('');
      setMensajePopup('');
    }
  };

  const cuandoFinalice = () => {
    setTipo('tiempo');
    setMensajePopup(videoActual.mensajes.tiempo);
    setMostrar(true);

    // Si es el último video, pasamos a la pantalla final
    if (videoIndex + 1 >= videos.length) {
      setPantalla('final'); // espera a que se cierre el popup
    }
  };

  const handleRespuesta = (vehiculo) => {
  const { correcto, mensajes } = videoActual;
  progressRef.current?.stopProgress();

  if (correcto === vehiculo || correcto === 'ambos') {
    setTipo('correcto');
    setMensajePopup(
      correcto === 'ambos'
        ? mensajes.correcto2 || mensajes.correcto
        : mensajes.correcto
    );
    setAciertos((prev) => prev + 1); // suma acierto
  } else {
    setTipo('incorrecto');
    setMensajePopup(mensajes.incorrecto);
  }
  setMostrar(true);
};



const [pantalla, setPantalla] = useState('inicio'); // 'inicio', 'video', 'final'
const [aciertos, setAciertos] = useState(0);

const acuerdoVideos = [AcuerdoSec1, AcuerdoSec2, AcuerdoSec3, AcuerdoSec4, AcuerdoSec5, AcuerdoSec6, AcuerdoSec7];
const [acuerdoIndex, setAcuerdoIndex] = useState(0);
const acuerdoRef = useRef();

useEffect(() => {
  if (pantalla === 'final') {
    const video = acuerdoRef.current;
    if (video) {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch((err) => {
        console.warn('No se pudo reproducir el video automáticamente:', err);
      });
    }
  }
}, [pantalla, acuerdoIndex]);

  return (
    <div className="conducta-container">
      <header className="conducta-header">
        <div className="icono-conductor" />
        <img src={Conducta} alt="Conducta Vial" className="logo-izquierdo" />
        <h1>Conducta Vial Quálitas</h1>
        <img src={Qualitas} alt="Qualitas" className="logo-derecho" />
      </header>

      <main className="conducta-main">
      {pantalla === 'inicio' && (
        <div className="pantalla-inicio" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Bienvenido a la dinámica de conducta vial</h2>
          <button
            onClick={() => setPantalla('video')}
            style={{
              padding: '12px 24px',
              fontSize: '18px',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            🚦 Iniciar
          </button>
        </div>
      )}

      {pantalla === 'video' && (
        <>
          <div className="panel-texto">
            <label className="instruccion">
              Analiza la situación que se presenta en el siguiente <br />
              video e identifica quién es el responsable
            </label>
          </div>
          <div className="panel-contenido">
            <div className="panel-video" style={{ position: 'relative' }}>
              <video
                ref={videoRef}
                width="100%"
                height="auto"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
              >
                <source src={videoActual.src} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>

              {mostrarRepetir && (
                <button
                  onClick={repetirVideo}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  🔁 Repetir Video
                </button>
              )}
            </div>
            <div className="panel-opciones">
              <BotonVehiculo onClick={() => handleRespuesta('A')} />
              <BotonVehiculoB onClick={() => handleRespuesta('B')} />
              <ProgressBar ref={progressRef} onComplete={cuandoFinalice} />
              <Popup
                mostrar={mostrar}
                tipo={tipo}
                titulo={
                  tipo === 'correcto'
                    ? 'Correcto'
                    : tipo === 'incorrecto'
                    ? 'Incorrecto'
                    : 'Se acabó el tiempo'
                }
                mensaje={mensajePopup}
                onCerrar={avanzarVideo}
              />
            </div>
          </div>
        </>
      )}

      {pantalla === 'final' && (
      <div
        className="pantalla-final"
        style={{
          display: 'flex',
          padding: '1rem',
          gap: '2rem',
          alignItems: 'stretch'
        }}
      >
        {/* LADO IZQUIERDO: Video y navegación */}
        <div style={{ flex: 1 }}>
          <div className="panel-video" style={{ position: 'relative' }}>
            <video
              ref={acuerdoRef}
              width="100%"
              height="auto"
              autoPlay
              muted={false}
              playsInline
              controls
              key={acuerdoIndex}
              onEnded={() => {
                if (acuerdoIndex + 1 < acuerdoVideos.length) {
                  setAcuerdoIndex(acuerdoIndex + 1);
                }
              }}
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <source src={acuerdoVideos[acuerdoIndex]} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1rem'
              }}
            >
              <button
                onClick={() =>
                  setAcuerdoIndex((prev) => Math.max(prev - 1, 0))
                }
                disabled={acuerdoIndex === 0}
                style={{
                  padding: '10px 24px',
                  backgroundColor:
                    acuerdoIndex === 0 ? '#cccccc' : '#007bff',
                  color: '#fff',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor:
                    acuerdoIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ⬅️ Anterior
              </button>
              <button
                onClick={() =>
                  setAcuerdoIndex((prev) =>
                    Math.min(prev + 1, acuerdoVideos.length - 1)
                  )
                }
                disabled={acuerdoIndex === acuerdoVideos.length - 1}
                style={{
                  padding: '10px 24px',
                  backgroundColor:
                    acuerdoIndex === acuerdoVideos.length - 1
                      ? '#cccccc'
                      : '#007bff',
                  color: '#fff',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor:
                    acuerdoIndex === acuerdoVideos.length - 1
                      ? 'not-allowed'
                      : 'pointer'
                }}
              >
                Siguiente ➡️
              </button>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Texto final */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%'
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            ¡Has terminado!
          </h2>
          <p style={{ fontSize: '1.5rem' }}>✅ Aciertos: {aciertos}</p>
          <button
            onClick={() => {
              setPantalla('inicio');
              setAciertos(0);
              setVideoIndex(0);
              setAcuerdoIndex(0);
            }}
            style={{
              marginTop: '2rem',
              padding: '14px 28px',
              backgroundColor: '#28a745',
              color: '#fff',
              fontSize: '18px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            🔁 Volver a empezar
          </button>
        </div>
      </div>
    )}
    </main>

      <footer className="conducta-footer">
        <a
          className="footer-item"
          href="https://tarjeta.id/manrodrgz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Link} alt="Link" className="icon" />
          <span>https://tarjeta.id/manrodrgz</span>
        </a>
        <div className="footer-item">
          <img src={Whatsapp} alt="WhatsApp" className="icon" />
          <span>228 211 7186</span>
        </div>
        <div className="footer-item">
          <img src={Facebook} alt="Facebook" className="icon" />
          <span>QualitasSeguros</span>
        </div>
      </footer>
    </div>
  );
};

export default ConductaVial;
