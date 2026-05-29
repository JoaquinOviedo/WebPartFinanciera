import * as React from 'react';
import { useState } from 'react';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { usePortafolio } from '../../../../core/hooks/usePortafolio';
import type { IPortafolioItem, IPortafolioPayload } from '../../../../core/services/PortafolioTypes';
import styles from './Administracion.module.scss';

interface AdministracionProps {
  spfxContext: WebPartContext;
}

const initialForm: IPortafolioPayload = {
  Title: '',
  Descripcion: '',
  moneda_base: ''
};

const Administracion: React.FC<AdministracionProps> = ({ spfxContext }) => {
  const { fields, items, loading, error, refresh, createItem, updateItem, deleteItem } = usePortafolio(spfxContext);
  const [form, setForm] = useState<IPortafolioPayload>(initialForm);
  const [selectedItem, setSelectedItem] = useState<IPortafolioItem | null>(null);
  const [formMode, setFormMode] = useState<'new' | 'edit'>('new');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleNew = (): void => {
    setSelectedItem(null);
    setFormMode('new');
    setForm(initialForm);
    setMessage(null);
    setFormError(null);
  };

  const handleEdit = (item: IPortafolioItem): void => {
    setSelectedItem(item);
    setFormMode('edit');
    setForm({
      Title: item.Title || '',
      Descripcion: item.Descripcion || '',
      moneda_base: item.moneda_base || ''
    });
    setMessage(null);
    setFormError(null);
  };

  const handleDelete = async (item: IPortafolioItem): Promise<void> => {
    if (!item.ID && !item.id) {
      setFormError('No se encontró el ID del portafolio.');
      return;
    }

    const confirmDelete = window.confirm(`¿Eliminar portafolio '${item.Title || 'sin título'}'?`);
    if (!confirmDelete) {
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      await deleteItem(item.ID || item.id || 0);
      setMessage(`Portafolio eliminado: ${item.Title}`);
      if (selectedItem?.ID === item.ID) {
        handleNew();
      }
      await refresh();
    } catch (err) {
      setFormError((err as Error).message || 'Error eliminando portafolio.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!form.Title.trim()) {
      setFormError('El campo Nombre es obligatorio.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      if (formMode === 'new') {
        const created = await createItem(form);
        setMessage(`Portafolio creado: ${created.Title}`);
      } else if (selectedItem?.ID || selectedItem?.id) {
        await updateItem(selectedItem.ID || selectedItem.id || 0, form);
        setMessage(`Portafolio actualizado: ${form.Title}`);
      }
      handleNew();
      await refresh();
    } catch (err) {
      setFormError((err as Error).message || 'Error guardando portafolio.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <main className={styles.administracion}>
      <div className={styles.header}>
        <h1>Administración</h1>
        <p>Gestiona portafolios y configuración de la aplicación</p>
      </div>

      <section className={styles.section}>
        <h2>Portafolios</h2>
        <div className={styles.abmGrid}> 
          <div className={styles.abmCard}>
            <div className={styles.cardHeader}>
              <h3>{formMode === 'new' ? 'Nuevo Portafolio' : 'Editar Portafolio'}</h3>
              <button type="button" className={styles.buttonSecondary} onClick={handleNew}>
                Nuevo
              </button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.formLabel} htmlFor="Title">Nombre</label>
              <input
                id="Title"
                name="Title"
                type="text"
                value={form.Title}
                onChange={handleChange}
                className={styles.formInput}
                disabled={submitting}
              />

              <label className={styles.formLabel} htmlFor="Descripcion">Descripción</label>
              <textarea
                id="Descripcion"
                name="Descripcion"
                value={form.Descripcion}
                onChange={handleChange}
                className={styles.formTextarea}
                disabled={submitting}
              />

              <label className={styles.formLabel} htmlFor="moneda_base">Moneda base</label>
              <select
                id="moneda_base"
                name="moneda_base"
                value={form.moneda_base}
                onChange={handleChange}
                className={styles.formInput}
                disabled={submitting}
              >
                <option value="">Selecciona una moneda</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="PEN">PEN</option>
              </select>

              {formError && <div className={styles.messageError}>{formError}</div>}
              {message && <div className={styles.messageInfo}>{message}</div>}

              <button type="submit" className={styles.buttonPrimary} disabled={submitting}>
                {submitting ? 'Guardando...' : 'Guardar Portafolio'}
              </button>
            </form>
          </div>

          <div className={styles.abmCard}>
            <h3>Lista de Portafolios</h3>
            {loading && <p>Cargando portafolios...</p>}
            {error && <p className={styles.messageError}>{error.message}</p>}
            {!loading && !error && (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Moneda</th>
                      <th>Creado</th>
                      <th>Creado por</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.ID || item.id}>
                        <td>{item.Title || '-'}</td>
                        <td>{item.moneda_base || '-'}</td>
                        <td>{item.Created ? new Date(item.Created).toLocaleDateString() : '-'}</td>
                        <td>{item.Author?.Title || '-'}</td>
                        <td className={styles.actionsCell}>
                          <button type="button" className={styles.buttonSecondary} onClick={() => handleEdit(item)}>
                            Editar
                          </button>
                          <button type="button" className={styles.buttonDanger} onClick={() => handleDelete(item)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={5}>No hay portafolios registrados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Información del Sistema</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Campos disponibles</h3>
            <p>{fields.length}</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Última carga</h3>
            <p>{new Date().toLocaleString()}</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Estado</h3>
            <p className={styles.statusOk}>✓ Operativo</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Administracion;
