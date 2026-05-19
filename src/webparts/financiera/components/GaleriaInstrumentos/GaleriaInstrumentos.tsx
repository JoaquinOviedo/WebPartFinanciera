import * as React from 'react';
import styles from './GaleriaInstrumentos.module.scss';

const GaleriaInstrumentos: React.FC = () => {
  // Datos de ejemplo de instrumentos
  const instrumentos = [
    { id: 1, nombre: 'Acciones', icono: '📈', descripcion: 'Inversión en acciones del mercado' },
    { id: 2, nombre: 'Bonos', icono: '📋', descripcion: 'Instrumentos de deuda' },
    { id: 3, nombre: 'Fondos Mutuos', icono: '💼', descripcion: 'Fondos de inversión diversificados' },
    { id: 4, nombre: 'Derivados', icono: '⚡', descripcion: 'Contratos de futuros y opciones' },
    { id: 5, nombre: 'Criptomonedas', icono: '🪙', descripcion: 'Activos digitales' },
    { id: 6, nombre: 'Materias Primas', icono: '🌾', descripcion: 'Oro, petróleo, cereales' },
  ];

  return (
    <main className={styles.galeriaInstrumentos}>
      <div className={styles.header}>
        <h1>Galería de Instrumentos</h1>
        <p>Explora los diferentes instrumentos financieros disponibles</p>
      </div>

      <div className={styles.grid}>
        {instrumentos.map((instrumento) => (
          <div key={instrumento.id} className={styles.card}>
            <div className={styles.cardIcon}>{instrumento.icono}</div>
            <h3>{instrumento.nombre}</h3>
            <p>{instrumento.descripcion}</p>
            <button className={styles.button}>Ver Detalles</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GaleriaInstrumentos;
