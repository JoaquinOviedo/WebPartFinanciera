import * as React from 'react';
import { useState } from 'react';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { usePortafolio } from '../../../../core/api/portafolio/usePortafolio';
import type { IPortafolioItem, IPortafolioPayload } from '../../../../core/api/portafolio/PortafolioTypes';
import stylesSource from './Administracion.module.scss';
import { ModalForm } from '../shared/ui/ModalForm';
import ListTable from '../shared/ui/ListTable';
import { PrimaryButton, DefaultButton } from '@fluentui/react';

const styles = stylesSource as Record<string, string>;

interface AdministracionProps {
  spfxContext: WebPartContext;
}

const initialForm: IPortafolioPayload = {
  Title: '',
  Descripcion: '',
  moneda_base: undefined
};

interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

const tabs: TabItem[] = [
  { id: 'jerarquia', label: 'Jerarquía', icon: 'OrgChart' },
  { id: 'objetivos', label: 'Objetivos', icon: 'Target' },
  { id: 'riesgos', label: 'Riesgos', icon: 'AlertSolid' },
  { id: 'capturas', label: 'Tipo de Captura', icon: 'Input' },
  { id: 'impacto', label: 'Tipo de Impacto', icon: 'PreviewLink' },
  { id: 'unidades', label: 'Unidad de Medida', icon: 'Ruler' },
  { id: 'usuarios', label: 'Usuarios', icon: 'People' },
  { id: 'tablero', label: 'Tablero', icon: 'BarChart4' }
];

// Mock data for demonstration
const mockData: Record<string, Array<Record<string, string>>> = {
  jerarquia: [
    { area: 'Upstream', negocio: 'Todos/A definir', palanca: 'Construcción de Pozos', subpalanca: 'Etapa 10', referente: 'SELZER, FEDERICO' },
    { area: 'Upstream', negocio: 'Todos/A definir', palanca: 'Construcción de Pozos', subpalanca: 'Etapa 20', referente: 'BONVINI, MARIO ABEL' },
    { area: 'Upstream', negocio: 'Todos/A definir', palanca: 'Construcción de Pozos', subpalanca: 'Etapa 30', referente: 'BONVINI, MARIO ABEL' },
  ],
  objetivos: [
    { objetivo: 'Objetivo 1', descripcion: 'Descripción del objetivo 1', responsable: 'Usuario 1' },
    { objetivo: 'Objetivo 2', descripcion: 'Descripción del objetivo 2', responsable: 'Usuario 2' },
  ],
  riesgos: [
    { riesgo: 'Riesgo 1', probabilidad: 'Alta', impacto: 'Alto', mitigacion: 'Acción 1' },
    { riesgo: 'Riesgo 2', probabilidad: 'Media', impacto: 'Medio', mitigacion: 'Acción 2' },
  ],
  capturas: [
    { tipo: 'Captura 1', descripcion: 'Descripción captura 1' },
    { tipo: 'Captura 2', descripcion: 'Descripción captura 2' },
  ],
  impacto: [
    { tipo: 'Impacto Alto', valor: 'Alto' },
    { tipo: 'Impacto Medio', valor: 'Medio' },
  ],
  unidades: [
    { unidad: 'Metros', simbolo: 'm' },
    { unidad: 'Kilos', simbolo: 'kg' },
  ],
  usuarios: [
    { nombre: 'Usuario 1', email: 'user1@example.com', rol: 'Admin' },
    { nombre: 'Usuario 2', email: 'user2@example.com', rol: 'Editor' },
  ],
  tablero: [
    { indicador: 'Indicador 1', valor: '100', estado: 'OK' },
    { indicador: 'Indicador 2', valor: '95', estado: 'OK' },
  ]
};

const Administracion: React.FC<AdministracionProps> = ({ spfxContext }) => {
  const { fields, items, loading, error, refresh } = usePortafolio(spfxContext);
  const [activeTab, setActiveTab] = useState('jerarquia');
  const [showModal, setShowModal] = useState(false);

  const tabData = mockData[activeTab] || [];
  const tabColumns = tabData.length > 0 ? Object.keys(tabData[0]).map(key => ({ key, title: key.charAt(0).toUpperCase() + key.slice(1) })) : [];

  const handleAddNew = (): void => {
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '2rem', flexShrink: 0 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#031330' }}>ABM de Jerarquía</h1>
          <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0B5DAA', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleAddNew}>
            <span style={{ fontSize: '1.2rem' }}>+</span> Agregar Jerarquía
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)', overflowX: 'auto', flexShrink: 0 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: 0, padding: 0, listStyle: 'none' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.25rem',
                border: 'none',
                background: 'none',
                color: activeTab === tab.id ? '#0B5DAA' : '#666',
                fontSize: '0.95rem',
                fontWeight: activeTab === tab.id ? 600 : 500,
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '3px solid #0B5DAA' : '3px solid transparent',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        {/* Table */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {loading && <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando datos...</p>}
          {error && <p style={{ padding: '2rem', textAlign: 'center', color: '#d32f2f' }}>{error.message}</p>}
          
          {!loading && !error && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(11, 93, 170, 0.05)', borderBottom: '2px solid rgba(11, 93, 170, 0.1)' }}>
                  {tabColumns.map((col) => (
                    <th key={col.key} style={{ padding: '1rem', textAlign: 'left', color: '#031330', fontWeight: 600, backgroundColor: 'rgba(11, 93, 170, 0.05)' }}>
                      {col.title}
                    </th>
                  ))}
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#031330', fontWeight: 600, backgroundColor: 'rgba(11, 93, 170, 0.05)' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tabData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', transition: 'background-color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(11, 93, 170, 0.02)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    {tabColumns.map((col) => (
                      <td key={col.key} style={{ padding: '1rem', color: '#031330', verticalAlign: 'middle' }}>
                        {row[col.key]}
                      </td>
                    ))}
                    <td style={{ padding: '1rem', color: '#031330', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button title="Editar" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', border: 'none', backgroundColor: 'rgba(11, 93, 170, 0.1)', color: '#0B5DAA', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s ease' }}>
                          <i className="ms-Icon ms-Icon--Edit" />
                        </button>
                        <button title="Eliminar" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', border: 'none', backgroundColor: 'rgba(11, 93, 170, 0.1)', color: '#0B5DAA', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s ease' }}>
                          <i className="ms-Icon ms-Icon--Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {(() => {
        const currentTab = tabs.filter(t => t.id === activeTab)[0];
        const modalTitle = currentTab ? `Agregar ${currentTab.label}` : 'Agregar Elemento';
        return (
          <ModalForm title={modalTitle} isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={() => { /* handle submit */ }}>
            <form style={{ display: 'grid', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#031330', fontSize: '0.95rem' }}>Nombre</label>
                <input type="text" placeholder="Ingrese el nombre" style={{ width: '100%', padding: '0.75rem', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'inherit' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#031330', fontSize: '0.95rem' }}>Descripción</label>
                <textarea placeholder="Ingrese la descripción" style={{ width: '100%', padding: '0.75rem', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'inherit', minHeight: '100px', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', gap: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'rgba(0,0,0,0.06)', color: '#031330', border: 'none', borderRadius: '4px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0B5DAA', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
                  Guardar
                </button>
              </div>
            </form>
          </ModalForm>
        );
      })()}
    </div>
  );
};

export default Administracion;
