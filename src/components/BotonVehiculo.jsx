import React from 'react';
import '../styles/BotonVehiculo.css';

const BotonVehiculo = ({ texto = "Vehículo", letra = "A", onClick }) => {
  return (
    <div className="boton-vehiculo" onClick={onClick}>
      <span className="texto">{texto}</span>
      <span className="circulo">{letra}</span>
    </div>
  );
};

export default BotonVehiculo;