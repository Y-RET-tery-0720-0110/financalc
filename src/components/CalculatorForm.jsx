import NumberField from './NumberField.jsx';

// Este componente agrupa los campos numéricos y los botones de acción del formulario.
export default function CalculatorForm({ values, onFieldChange, onSubmit, onReset, type }) {
  return (
    // onSubmit maneja el evento cuando el usuario presiona "Calcular"
    <form onSubmit={onSubmit} className="panel form">
      <h2>Datos del préstamo </h2>
      
      {/* Campo para el Capital Inicial */}
      <NumberField
        id="principal"
        label="Capital inicial (RD$)"
        value={values.principal}
        onChange={(v) => onFieldChange('principal', v)}
      />
      
      {/* Campo para la Tasa de Interés */}
      <NumberField
        id="rate"
        label="Tasa de interés anual (%)"
        value={values.rate}
        onChange={(v) => onFieldChange('rate', v)}
      />
      
      {/* Campo para el Plazo en Años, con pista dinámica según el tipo */}
      <NumberField
        id="years"
        label="Plazo (años)"
        value={values.years}
        onChange={(v) => onFieldChange('years', v)}
        hint={
          type === 'loan'
            ? 'Ejemplo: 1.5 equivale a 18 meses.'
            : 'Puedes utilizar decimales, por ejemplo 2.5 años.'
        }
      />

      <div className="actions">
        {/* El botón de tipo submit activa la función de cálculo */}
        <button className="primary" type="submit">
          Calcular
        </button>
        {/* El botón de tipo button evita que se envíe el formulario por error al limpiar */}
        <button className="secondary" type="button" onClick={onReset}>
          Limpiar
        </button>
      </div>
    </form>
  );
}