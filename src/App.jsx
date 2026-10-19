import { useEffect, useState } from 'react';
// Importamos todos los componentes que creamos
import Header from './components/Header.jsx';
import CalculatorTabs from './components/CalculatorTabs.jsx';
import CalculatorForm from './components/CalculatorForm.jsx';
import ResultCard from './components/ResultCard.jsx';
// Importamos la función matemática de cálculo
import { calculate } from './utils/finance.js';

// Valores iniciales por defecto para los campos del formulario
const initialValues = { principal: '100000', rate: '12', years: '2' };

export default function App() {
  // ESTADOS DE LA APLICACIÓN (useState)
  const [type, setType] = useState('loan');               // Tipo de simulación (loan, simple, compound, savings)
  const [values, setValues] = useState({ ...initialValues }); // Valores de los campos (capital, tasa, años)
  const [result, setResult] = useState(null);            // Objeto con los resultados de la simulación
  const [error, setError] = useState('');                 // Mensaje de error si la validación falla

  // EFECTO (useEffect): Cambia el título de la pestaña del navegador cuando la app se carga por primera vez
  useEffect(() => {
    document.title = 'FinanCalc | Calculadora financiera';
  }, []);

  // Función para cambiar de pestaña/modalidad
  const changeType = (nextType) => {
    setType(nextType);
    setResult(null); // Limpia el resultado anterior al cambiar de pestaña
    setError('');
  };

  // Función para actualizar un campo individual de forma inmutable
  const changeField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value })); // Copia el estado anterior y actualiza la propiedad modificada
    setResult(null); // Limpia el resultado para que el usuario tenga que dar clic en 'Calcular' de nuevo
    setError('');
  };

  // Función que se ejecuta al presionar "Calcular"
  const submit = (event) => {
    event.preventDefault(); // Evita que la página web se recargue
    try {
      // Ejecutamos la función matemática importada de utils/finance.js
      const res = calculate(type, values.principal, values.rate, values.years);
      setResult(res);   // Guardamos el resultado exitoso
      setError('');     // Limpiamos errores anteriores
    } catch (err) {
      setResult(null);  // Si falla la validación, borramos resultados
      setError(err.message); // Mostramos el mensaje de error
    }
  };

  // Función para restablecer el formulario a sus valores originales
  const reset = () => {
    setValues({ ...initialValues });
    setResult(null);
    setError('');
  };

  return (
    <>
      <Header />
      <main className="shell">
        <div className="intro">
          <span className="eyebrow">HERRAMIENTAS FINANCIERAS</span>
          <h1>Calcula con confianza</h1>
          <p>Explora tus préstamos, intereses y ahorros en segundos.</p>
        </div>

        {/* Pestañas de selección */}
        <CalculatorTabs value={type} onChange={changeType} />

        {/* Mensaje de error (si existe) */}
        {error && <p className="error" role="alert">{error}</p>}

        {/* Disposición en cuadrícula para formulario y resultados */}
        <div className="layout">
          <CalculatorForm
            type={type}
            values={values}
            onFieldChange={changeField}
            onSubmit={submit}
            onReset={reset}
          />
          <ResultCard result={result} />
        </div>
      </main>
      <footer className="shell footer">
        FinanCalc · Proyecto educativo desarrollado con React JS
      </footer>
    </>
  );
}