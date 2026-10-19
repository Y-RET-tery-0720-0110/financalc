import { money } from '../utils/finance.js';

// Este componente muestra los resultados del cálculo o un mensaje inicial si no se ha calculado nada.
export default function ResultCard({ result }) {
  
  // CONDICIONAL: Si 'result' es null (al iniciar la app o limpiar), muestra la pantalla vacía
  if (!result) {
    return (
      // El atributo aria-live="polite" ayuda a los lectores de pantalla de personas con discapacidad visual a detectar cambios
      <section className="panel empty" aria-live="polite">
        <div className="empty-icon">▤</div>
        <h2>Tu resultado aparecerá aquí</h2>
        <p>Completa los campos y pulsa Calcular.</p>
      </section>
    );
  }

  // Si 'result' TIENE datos, muestra el desglose del cálculo
  return (
    <section className="panel results" aria-live="polite">
      <h2>Resultado de tu cálculo</h2>
      {/* Muestra la métrica principal (Cuota mensual, Interés generado o Ahorro proyectado) */}
      <div className="hero-result">
        <span>{result.mainLabel}</span>
        <strong>{money(result.main)}</strong>
      </div>

      {/* Muestra el monto total al finalizar el plazo */}
      <div className="metric">
        <span>Monto total</span>
        <strong>{money(result.total)}</strong>
      </div>

      {/* Muestra los intereses totales pagados o generados */}
      <div className="metric">
        <span>Intereses generados / pagados</span>
        <strong>{money(result.interest)}</strong>
      </div>

      <p className="disclaimer">
        Simulación educativa. No incluye comisiones, impuestos, seguros ni otros cargos.
      </p>
    </section>
  );
}