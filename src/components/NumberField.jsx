// Este componente es un campo de entrada reutilizable para evitar repetir código en el formulario.
// Recibe props como etiqueta (label), valor (value) y función de cambio (onChange).
export default function NumberField({ id, label, value, onChange, min = 0, step = 'any', hint }) {
  return (
    <div className="field">
      {/* Vinculamos el label con el input usando el id para accesibilidad */}
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={value}
        // Cada vez que el usuario escribe, onChange comunica el nuevo valor al componente padre (App)
        onChange={(e) => onChange(e.target.value)}
        required
      />
      {/* Si existe una pista o ayuda (hint), se muestra debajo del input */}
      {hint && <small>{hint}</small>}
    </div>
  );
}