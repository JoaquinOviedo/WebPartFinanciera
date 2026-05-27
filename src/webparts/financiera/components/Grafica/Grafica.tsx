import * as React from 'react';
import stylesSource from './Grafica.module.scss';

const styles = stylesSource as Record<string, string>;

const Grafica: React.FC = () => {
  const chartData = [
    { mes: 'Ene', valor: 45 },
    { mes: 'Feb', valor: 52 },
    { mes: 'Mar', valor: 48 },
    { mes: 'Abr', valor: 61 },
    { mes: 'May', valor: 55 },
    { mes: 'Jun', valor: 67 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.valor));
  const average = (chartData.reduce((acc, d) => acc + d.valor, 0) / chartData.length).toFixed(2);
  const minValue = Math.min(...chartData.map((d) => d.valor));

  return (
    <main className={styles.grafica}>
      <div className={styles.header}>
        <h1>Gráfica de Análisis</h1>
        <p>Visualización de datos financieros y tendencias del mercado.</p>
      </div>

      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <span>Promedio</span>
          <strong>{average}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>Máximo</span>
          <strong>{maxValue}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>Mínimo</span>
          <strong>{minValue}</strong>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <div className={styles.yAxis}>
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
          <div className={styles.bars}>
            {chartData.map((data, index) => (
              <div key={index} className={styles.barWrapper}>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{ height: `${(data.valor / maxValue) * 100}%` }}
                    title={`${data.mes}: ${data.valor}`}
                  />
                </div>
                <span className={styles.barLabel}>{data.mes}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Rendimiento actual</h3>
          <p className={styles.value}>+7.4%</p>
        </div>
        <div className={styles.statCard}>
          <h3>Volatilidad</h3>
          <p className={styles.value}>Moderada</p>
        </div>
        <div className={styles.statCard}>
          <h3>Actividad reciente</h3>
          <p className={styles.value}>6 eventos</p>
        </div>
      </div>
    </main>
  );
};

export default Grafica;
