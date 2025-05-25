import { useRef, useState } from 'react';
import '../styles/ConductaVial.css';
import BotonVehiculo from './BotonVehiculo';
import BotonVehiculoB from './BotonVehiculoB';
import ProgressBar from './ProgressBar';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';
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
      setMostrar(false);
      alert('¡Has terminado todos los videos!');
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
    } else {
      setTipo('incorrecto');
      setMensajePopup(mensajes.incorrecto);
    }
    setMostrar(true);
  };

  return (
    <div className="conducta-container">
      <header className="conducta-header">
        <div className="icono-conductor" />
        <img src={Conducta} alt="Conducta Vial" className="logo-izquierdo" />
        <h1>Conducta Vial Quálitas</h1>
        <img src={Qualitas} alt="Qualitas" className="logo-derecho" />
      </header>

      <main className="conducta-main">
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
