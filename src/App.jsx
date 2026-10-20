import React, { useState, useEffect } from 'react';

function App() {
  const [pestana, setPestana] = useState('prestamo');
  const [moneda, setMoneda] = useState('RD$');

  const [monto, setMonto] = useState('100000');
  const [tasa, setTasa] = useState('12');
  const [plazo, setPlazo] = useState('2');

  const [resultado, setResultado] = useState(null);

  // --- HISTORIAL GUARDADO EN NAVEGADOR ---
  const [historial, setHistorial] = useState(() => {
    const historialGuardado = localStorage.getItem('financalc_historial');
    return historialGuardado ? JSON.parse(historialGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('financalc_historial', JSON.stringify(historial));
  }, [historial]);

  const formatearMonto = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return `${moneda} 0.00`;
    return new Intl.NumberFormat(moneda === 'RD$' ? 'es-DO' : 'en-US', {
      style: 'currency',
      currency: moneda === 'RD$' ? 'DOP' : 'USD',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const handleCalcular = (e) => {
    if (e) e.preventDefault();

    const p = parseFloat(monto);
    const r = parseFloat(tasa) / 100;
    const t = parseFloat(plazo);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      alert('Por favor completa todos los campos con valores válidos.');
      return;
    }

    let resCalculado = {};

    if (pestana === 'prestamo') {
      const n = t * 12;
      const i = r / 12;
      const cuota = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
      const totalPagar = cuota * n;
      const intereses = totalPagar - p;

      resCalculado = {
        tipo: 'Préstamo',
        monto: p,
        moneda: moneda,
        cuotaMensual: cuota,
        totalIntereses: intereses,
        totalPagar: totalPagar,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } else if (pestana === 'simple') {
      const intereses = p * r * t;
      const total = p + intereses;
      resCalculado = {
        tipo: 'Interés Simple',
        monto: p,
        moneda: moneda,
        totalIntereses: intereses,
        totalPagar: total,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } else if (pestana === 'compuesto') {
      const total = p * Math.pow(1 + r, t);
      const intereses = total - p;
      resCalculado = {
        tipo: 'Interés Compuesto',
        monto: p,
        moneda: moneda,
        totalIntereses: intereses,
        totalPagar: total,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } else if (pestana === 'ahorro') {
      const intereses = p * r * t;
      const total = p + intereses;
      resCalculado = {
        tipo: 'Ahorro',
        monto: p,
        moneda: moneda,
        totalIntereses: intereses,
        totalPagar: total,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    setResultado(resCalculado);
    setHistorial([resCalculado, ...historial]);
  };

  const handleLimpiar = () => {
    setMonto('');
    setTasa('');
    setPlazo('');
    setResultado(null);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* BARRA AZUL CON EL NOMBRE FINANCALC */}
      <header style={{ backgroundColor: '#0066cc', color: 'white', padding: '16px 32px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>FinanCalc</h1>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: '#0066cc', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px 0' }}>
            HERRAMIENTAS FINANCIERAS
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#1a1a1a' }}>Calcula con confianza</h2>
          <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>Explora tus préstamos, intereses y ahorros en segundos.</p>
        </div>

        {/* PESTAÑAS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'prestamo', label: 'Préstamo' },
            { id: 'simple', label: 'Interés simple' },
            { id: 'compuesto', label: 'Interés compuesto' },
            { id: 'ahorro', label: 'Ahorro' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setPestana(item.id); setResultado(null); }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                backgroundColor: pestana === item.id ? '#0066cc' : '#ffffff',
                color: pestana === item.id ? '#ffffff' : '#444444',
                boxShadow: pestana === item.id ? '0 2px 4px rgba(0,102,204,0.3)' : 'none',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* LAYOUT 2 COLUMNAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* FORMULARIO */}
          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e1e4e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: '#1a1a1a' }}>
              Datos del {pestana === 'prestamo' ? 'préstamo' : pestana}
            </h3>

            <form onSubmit={handleCalcular} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Capital inicial</label>
                  <select
                    value={moneda}
                    onChange={(e) => setMoneda(e.target.value)}
                    style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', cursor: 'pointer' }}
                  >
                    <option value="RD$">RD$ (Peso)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="100000"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                  Tasa de interés anual (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="12"
                  value={tasa}
                  onChange={(e) => setTasa(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
                  Plazo (años)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="2"
                  value={plazo}
                  onChange={(e) => setPlazo(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', boxSizing: 'border-box' }}
                  required
                />
                <span style={{ fontSize: '12px', color: '#888', marginTop: '4px', display: 'block' }}>Ejemplo: 1,5 equivale a 18 meses.</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#0066cc', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                >
                  Calculadora
                </button>
                <button
                  type="button"
                  onClick={handleLimpiar}
                  style={{ backgroundColor: '#e5e7eb', color: '#374151', padding: '12px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>

          {/* RESULTADO E HISTORIAL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* CAJA DE RESULTADO */}
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e1e4e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              {resultado ? (
                <div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#1a1a1a' }}>Resultado del cálculo</h3>
                  <div style={{ backgroundColor: '#eef6ff', padding: '16px', borderRadius: '12px', border: '1px solid #cce3ff' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#555' }}>Tipo: <strong>{resultado.tipo}</strong></p>
                    {resultado.cuotaMensual && (
                      <p style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#004085' }}>
                        Cuota mensual: {formatearMonto(resultado.cuotaMensual)}
                      </p>
                    )}
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#333' }}>
                      Total de intereses: <strong>{formatearMonto(resultado.totalIntereses)}</strong>
                    </p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a', paddingTop: '8px', borderTop: '1px solid #d0e3ff' }}>
                      Monto total a pagar/recibir: {formatearMonto(resultado.totalPagar)}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1a1a1a' }}>📋 Tu resultado aparecerá aquí</h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Completa los campos y pulsa Calcular.</p>
                </div>
              )}
            </div>

            {/* CAJA DE HISTORIAL */}
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e1e4e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', color: '#1a1a1a' }}>Historial de cálculos</h4>
                {historial.length > 0 && (
                  <button onClick={() => setHistorial([])} style={{ border: 'none', background: 'none', color: '#dc2626', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                    Borrar historial
                  </button>
                )}
              </div>

              {historial.length === 0 ? (
                <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>No hay cálculos recientes.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                  {historial.map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: '#f9fafb', padding: '10px 12px', borderRadius: '8px', border: '1px solid #f3f4f6', fontSize: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#374151' }}>
                        <span>{item.tipo} ({item.moneda})</span>
                        <span style={{ color: '#9ca3af', fontWeight: 'normal' }}>{item.fecha}</span>
                      </div>
                      <div style={{ color: '#0066cc', fontWeight: 'bold', marginTop: '4px' }}>
                        Total: {formatearMonto(item.totalPagar)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default App;