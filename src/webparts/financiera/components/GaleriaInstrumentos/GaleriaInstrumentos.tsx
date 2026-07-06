import * as React from 'react';
import { useState } from 'react';
import stylesSource from './GaleriaInstrumentos.module.scss';
import { CardLink } from '../shared/ui/CardLink';

const styles = stylesSource as Record<string, string>;

const GaleriaInstrumentos: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filtros = ['Todos', 'Acciones', 'Bonos', 'Criptomonedas', 'Derivados'];

  const instrumentos = [
    { id: 1, nombre: 'Acciones', icono: '📈', descripcion: 'Inversión en acciones del mercado', categoria: 'Acciones' },
    { id: 2, nombre: 'Bonos', icono: '📋', descripcion: 'Instrumentos de deuda', categoria: 'Bonos' },
    { id: 3, nombre: 'Fondos Mutuos', icono: '💼', descripcion: 'Fondos de inversión diversificados', categoria: 'Bonos' },
    { id: 4, nombre: 'Derivados', icono: '⚡', descripcion: 'Contratos de futuros y opciones', categoria: 'Derivados' },
    { id: 5, nombre: 'Criptomonedas', icono: '🪙', descripcion: 'Activos digitales', categoria: 'Criptomonedas' },
    { id: 6, nombre: 'Materias Primas', icono: '🌾', descripcion: 'Oro, petróleo, cereales', categoria: 'Derivados' },
  ];

  const filteredInstrumentos = activeFilter === 'Todos'
    ? instrumentos
    : instrumentos.filter((item) => item.categoria === activeFilter);

  return (
    <main className={styles.galeriaInstrumentos}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1>Galería de Instrumentos</h1>
            <p>Explora los diferentes instrumentos financieros disponibles.</p>
          </div>
          <div className={styles.filterBar}>
            {filtros.map((filtro) => (
              <button
                key={filtro}
                className={`${styles.filterButton} ${activeFilter === filtro ? styles.activeFilter : ''}`}
                type="button"
                onClick={() => setActiveFilter(filtro)}
              >
                {filtro}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredInstrumentos.map((instrumento) => (
          <div key={instrumento.id} className={styles.card}>
            <CardLink title={instrumento.nombre} subtitle={instrumento.descripcion} onClick={() => { /* navigate to details */ }} icon={<span style={{ fontSize: 28 }}>{instrumento.icono}</span>} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default GaleriaInstrumentos;
