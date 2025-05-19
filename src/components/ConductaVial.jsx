import { useRef,React, useState } from 'react';
import '../styles/ConductaVial.css';
import BotonVehiculo from './BotonVehiculo';
import BotonVehiculoB from './BotonVehiculoB';
import ProgressBar from './ProgressBar';
import video1 from '../assets/video1.mp4';
import Popup from './Popup';
import Conducta from '../assets/ConductaVial.png';
import Qualitas from '../assets/Qualitas.png';


const ConductaVial = () => {


  const [mostrarRepetir, setMostrarRepetir] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const progressRef = useRef();


  const cuandoFinalice = () => {
    setMensaje('¡Se acabó el tiempo!');
    abrirPopupTiempo()
  };

  const handleVideoEnded = () => {
  progressRef.current?.startProgress(); // inicia la barra
  setMostrarRepetir(true); // mostrar botón de repetir
  setMensaje('');
};

const videoRef = useRef();

const repetirVideo = () => {
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setMostrarRepetir(false);
    setMensaje('');
  }
};


const [mostrar, setMostrar] = useState(false);
const [tipo, setTipo] = useState('correcto');

const abrirPopupCorrecto = () => {
  setTipo('correcto');
  setMostrar(true);
  progressRef.current?.stopProgress();
};

const abrirPopupIncorrecto = () => {
  setTipo('incorrecto');
  setMostrar(true);
  progressRef.current?.stopProgress();
};

const abrirPopupTiempo = () => {
  setTipo('tiempo');
  setMostrar(true);
};

const cerrarPopup = () => setMostrar(false);


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
          <label className="instruccion">Analiza la situación que se presenta en el siguiente <br/>video e identifica quién es el responsable</label>
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
            <source src={video1} type="video/mp4" />
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
        <BotonVehiculo onClick={abrirPopupCorrecto}/>
        <BotonVehiculoB onClick={abrirPopupIncorrecto}/>
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
          mensaje={
            tipo === 'correcto'
              ? 'Responsable el vehículo A al realizar maniobra de vuelta en U y cortar la circulación del vehículo B.'
              : tipo === 'incorrecto'
              ? 'Responsable el vehículo B por no ceder el paso al vehículo A.'
              : 'No se realizó ninguna acción en el tiempo permitido.'
          }
          onCerrar={cerrarPopup}
        />
      </div>
        </div>
      </main>

      <footer className="conducta-footer">
        <a className="footer-item" href="https://tarjeta.id/manrodrgz" target="_blank" rel="noopener noreferrer">
          <img src="/src/assets/link.png" alt="Link" className="icon" />
          <span>https://tarjeta.id/manrodrgz</span>
        </a>
        <div className="footer-item">
          <img src="/src/assets/whatsapp.png" alt="WhatsApp" className="icon" />
          <span>228 211 7186</span>
        </div>
        <div className="footer-item">
          <img src="/src/assets/facebook.png" alt="Facebook" className="icon" />
          <span>QualitasSeguros</span>
        </div>
      </footer>
    </div>
  );
};

export default ConductaVial;
