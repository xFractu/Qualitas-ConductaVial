import React from 'react';
import '../styles/BotonVehiculoB.css';

const BotonVehiculo = ({ texto = "Vehículo", letra = "B", onClick }) => {
  return (
    <div className="boton-vehiculoB" onClick={onClick}>
      <span className="texto">{texto}</span>
      <span className="circulo">{letra}</span>
    </div>
  );
};

export default BotonVehiculo;