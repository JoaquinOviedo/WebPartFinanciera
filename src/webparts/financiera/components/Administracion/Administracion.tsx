import * as React from 'react';
import { useState } from 'react';
import styles from './Administracion.module.scss';

interface ConfiguracionItem {
  id: string;
  nombre: string;
  descripcion: string;
  habilitado: boolean;
}

const Administracion: React.FC = () => {
  const [configuracion, setConfiguracion] = useState<ConfiguracionItem[]>([
    {
      id: 'notificaciones',
      nombre: 'Notificaciones',
      descripcion: 'Recibir alertas sobre cambios en el mercado',
      habilitado: true
    },
    {
      id: 'dosFactor',
      nombre: 'Autenticación de Dos Factores',
      descripcion: 'Aumentar seguridad de la cuenta',
      habilitado: false
    },
    {
      id: 'exportarDatos',
      nombre: 'Exportación de Datos',
      descripcion: 'Permitir descarga de reportes',
      habilitado: true
    },
    {
      id: 'reportesAutomaticos',
      nombre: 'Reportes Automáticos',
      descripcion: 'Enviar reportes semanales por correo',
      habilitado: true
    }
  ]);

  const handleToggle = (id: string): void => {
    setConfiguracion(configuracion.map(item =>
      item.id === id ? { ...item, habilitado: !item.habilitado } : item
    ));
  };

  const handleGuardar = (): void => {
    // Aquí iría la lógica para guardar en el backend
    console.log('Configuración guardada:', configuracion);
  };

  return (
    <main className={styles.administracion}>
      <div className={styles.header}>
        <h1>Administración</h1>
        <p>Gestiona la configuración y preferencias de la aplicación</p>
      </div>

      <div className={styles.sections}>
        {/* Sección de Configuración */}
        <section className={styles.section}>
          <h2>Preferencias Generales</h2>
          <div className={styles.configuracionList}>
            {configuracion.map((item) => (
              <div key={item.id} className={styles.configuracionItem}>
                <div className={styles.itemContent}>
                  <h3>{item.nombre}</h3>
                  <p>{item.descripcion}</p>
                </div>
                <div className={styles.toggle}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={item.habilitado}
                      onChange={() => handleToggle(item.id)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Información */}
        <section className={styles.section}>
          <h2>Información del Sistema</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Versión</h3>
              <p>1.0.0</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Última Actualización</h3>
              <p>19 de Mayo, 2026</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Estado del Sistema</h3>
              <p className={styles.statusOk}>✓ Operativo</p>
            </div>
          </div>
        </section>

        {/* Sección de Acciones */}
        <section className={styles.section}>
          <h2>Acciones</h2>
          <div className={styles.actions}>
            <button className={styles.buttonPrimary} onClick={handleGuardar}>
              Guardar Cambios
            </button>
            <button className={styles.buttonSecondary}>
              Exportar Datos
            </button>
            <button className={styles.buttonDanger}>
              Limpiar Caché
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Administracion;
