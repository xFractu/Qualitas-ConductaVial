import React from 'react';
import '../styles/Popup.css';

const Popup = ({ mostrar, tipo, titulo, mensaje, onCerrar }) => {
  if (!mostrar) return null;

  // Colores e iconos según el tipo
  let colorIcono = '#00bcd4'; // default correcto
  let icono = '✔';

  if (tipo === 'incorrecto') {
    colorIcono = '#f44336';
    icono = '✖';
  } else if (tipo === 'tiempo') {
    colorIcono = '#ff9800';
    icono = '⏰';
  }

  return (
    <div className="overlay">
      <div className="popup">
        <div className="icono-check" style={{ color: colorIcono }}>
          {icono}
        </div>
        <h2 className="titulo" style={{ color: colorIcono }}>{titulo}</h2>
        <p className="mensaje">{mensaje}</p>
        <button className="boton-siguiente" onClick={onCerrar}>Siguiente</button>
      </div>
    </div>
  );
};

export default Popup;
