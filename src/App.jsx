import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './components/ui/Input';
import { Label } from './components/ui/Label';
import { Button } from './components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';

const dias = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
];

const horariosFutbol = [
  "15:00", "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00", "23:00"
];

const horariosPadel = [
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00"
];

const fijosFutbol = ['Joaco Pereyra', 'Ayrton', 'Diego'];

const initialTurnos = {
  FUTBOL: {
    Lunes: {
      '17:00': 'Escuelita',
      '18:00': 'Escuelita',
      '19:00': 'Joaco Pereyra',
    },
    Martes: { '17:00': 'Escuelita', '18:00': 'Escuelita' },
    Miercoles: { '17:00': 'Escuelita', '18:00': 'Escuelita' },
    Jueves: { '17:00': 'Sebastian', '20:00': 'Ayrton' },
    Viernes: { '17:00': 'Escuelita', '18:00': 'Escuelita', '19:00': 'Ricardo' },
    Sabado: {},
    Domingo: {},
  },
  PADEL: {
    Lunes: {
      '14:30': 'Belén',
      '17:00': 'Lucas Altavista',
      '18:00': 'Lucas Altavista',
      '19:00': 'Lucas Altavista',
      '20:00': 'Bonell',
      '21:00': 'Bonell',
      '22:00': 'Bonell',
      '23:00': 'Mateo',
    },
    Martes: {
      '17:00': 'Germán',
      '18:00': 'Germán',
      '19:00': 'Germán',
      '23:00': 'Mateo',
    },
    Miercoles: { '17:00': 'Sáenz', '18:00': 'Sáenz', '19:00': 'Sáenz' },
    Jueves: {
      '16:00': 'Victoria',
      '17:00': 'Victoria / Laura',
      '18:00': 'Laura',
      '19:00': 'Laura',
      '20:00': 'Mauricio',
      '21:00': 'Mauricio',
      '22:00': 'Mauricio',
    },
    Viernes: {
      '16:00': 'Micheloud',
      '17:00': 'Micheloud / Alejo',
      '18:00': 'Alejo',
      '19:00': 'Alejo',
      '20:00': 'Laura',
      '21:00': 'Laura',
    },
    Sabado: {
      '16:00': 'Victoria',
      '17:00': 'Victoria / Fernanda',
      '18:00': 'Fernanda',
    },
    Domingo: {},
  },
};

export default function TurnosApp() {
  const [pantalla, setPantalla] = useState('home');
  const [deporte, setDeporte] = useState('FUTBOL');
  const [turnos, setTurnos] = useState(initialTurnos);
  const [nuevoTurno, setNuevoTurno] = useState({
    dia: '',
    horaInicio: '',
    horaFin: '',
    nombre: '',
  });
  
  const [showFijos, setShowFijos] = useState(false);
  const [celdaActiva, setCeldaActiva] = useState(null);
  const [semanaActual, setSemanaActual] = useState(0);
  const horarios = deporte === "PADEL" ? horariosPadel : horariosFutbol;

  const horaAminutos = (hora) => {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  };
  
  const esFijo = (nombre) => fijosFutbol.includes(nombre);

  const handleFormChange = (field, value) => {
    setNuevoTurno({ ...nuevoTurno, [field]: value });
    if (field === 'nombre' && value === '/F' && deporte === 'FUTBOL') {
      setShowFijos(true);
    } else {
      setShowFijos(false);
    }
  };

  const handleSelectFijo = (nombre) => {
    setNuevoTurno({ ...nuevoTurno, nombre });
    setShowFijos(false);
  };
  const handleGuardar = () => {
    const { dia, horaInicio, horaFin, nombre } = nuevoTurno;
    if (!dia || !horaInicio || !horaFin || !nombre) return;
  
    const startIndex = horarios.indexOf(horaInicio);
    const endIndex = horarios.indexOf(horaFin);
  
    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
      alert('Rango de horas inválido.');
      return;
    }
  
    const horasSeleccionadas = horarios.slice(startIndex, endIndex);
  
    const diaTurnos = turnos[deporte]?.[dia] || {};
    const conflicto = horasSeleccionadas.some((hora) => diaTurnos[hora]);
  
    if (conflicto) {
      alert('Al menos una de las horas seleccionadas ya está ocupada.');
      return;
    }
  
    const nuevosTurnos = { ...diaTurnos };
    horasSeleccionadas.forEach((hora) => {
      nuevosTurnos[hora] = nombre;
    });
  
    setTurnos((prev) => ({
      ...prev,
      [deporte]: {
        ...prev[deporte],
        [dia]: nuevosTurnos,
      },
    }));
  
    alert('Turno guardado correctamente.');
    setNuevoTurno({ dia: '', horaInicio: '', horaFin: '', nombre: '' });
    setPantalla('home');
  };
  
  
  // Validación
  const ocupados = horariosSeleccionados.some(
    (h) => turnos[deporte]?.[dia]?.[h]
  );
  if (ocupados) {
    alert("Uno o más horarios del rango ya están ocupados.");
    return;
  }
  
  // Agregar todos los horarios del rango
  const nuevos = {};
  horariosSeleccionados.forEach((h) => {
    nuevos[h] = nombre;
  });
  
  setTurnos((prev) => ({
    ...prev,
    [deporte]: {
      ...prev[deporte],
      [dia]: {
        ...prev[deporte][dia],
        ...nuevos,
      },
    },
  }));
  
    alert('Turno guardado correctamente.');
    setNuevoTurno({ dia: '', hora: '', nombre: '' });
    setPantalla('home');
  };

  const nombresRecientes = Array.from(
    new Set(
      dias
        .flatMap((dia) => Object.values(turnos[deporte]?.[dia] || {}))
        .filter((n) => n && !fijosFutbol.includes(n))
    )
  ).slice(-5);

  const handleAgregarDesdeTabla = (e, dia, hora) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCeldaActiva({
      dia,
      hora,
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
  };

  const seleccionarNombreDesdeTabla = (nombre) => {
    const { dia, hora } = celdaActiva;
    setTurnos((prev) => ({
      ...prev,
      [deporte]: {
        ...prev[deporte],
        [dia]: {
          ...prev[deporte][dia],
          [hora]: nombre,
        },
      },
    }));
    setCeldaActiva(null);
  };

  const obtenerFechasSemana = (semanaOffset) => {
    const hoy = new Date();
    const primerDiaSemana = new Date(hoy);
    primerDiaSemana.setDate(hoy.getDate() - hoy.getDay() + 1 + (semanaOffset * 7));
    
    return dias.map((_, index) => {
      const fecha = new Date(primerDiaSemana);
      fecha.setDate(primerDiaSemana.getDate() + index);
      return fecha;
    });
  };

  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { 
      day: 'numeric',
      month: 'short'
    });
  };

  const fechasSemana = obtenerFechasSemana(semanaActual);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-white via-blue-50 to-sky-100 text-sm md:text-base relative">
      <AnimatePresence mode="wait">
        {pantalla === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="text-center mt-20"
          >
            <h1 className="text-4xl font-extrabold mb-6 text-indigo-900 drop-shadow-sm">
              ¿Qué pintó hoy?
            </h1>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setPantalla('agregar')}
                className="rounded-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white shadow-md"
              >
                Agregar turno
              </Button>
              <Button
                onClick={() => setPantalla('ver')}
                className="rounded-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              >
                Ver turnos
              </Button>
            </div>
          </motion.div>
        )}

        {pantalla === 'agregar' && (
          <motion.div
            key="agregar"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="max-w-md mx-auto mt-8 bg-white shadow-xl rounded-2xl p-6 border border-blue-100"
          >
            <h2 className="text-xl font-semibold mb-4">Nuevo Turno</h2>

            <div className="mb-4">
              <Label className="block mb-1">Deporte</Label>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeporte('FUTBOL')}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    deporte === 'FUTBOL'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Fútbol
                </button>
                <button
                  onClick={() => setDeporte('PADEL')}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    deporte === 'PADEL'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pádel
                </button>
              </div>
            </div>

            <div className="mb-4">
              <Label className="block mb-1">Día</Label>
              <div className="grid grid-cols-7 gap-1">
                {dias.map((dia) => (
                  <button
                    key={dia}
                    onClick={() => handleFormChange('dia', dia)}
                    className={`p-2 text-center text-sm rounded ${
                      nuevoTurno.dia === dia
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dia.slice(0, 2)}
                  </button>
                ))}
              </div>
            </div>

            {nuevoTurno.dia && (
              <div className="mb-4">
              <Label className="block mb-1">Hora de inicio</Label>
              <select
                value={nuevoTurno.horaInicio}
                onChange={(e) => handleFormChange('horaInicio', e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Seleccionar hora de inicio</option>
                {horarios.map((hora) => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <Label className="block mb-1">Hora de fin</Label>
              <select
                value={nuevoTurno.horaFin}
                onChange={(e) => handleFormChange('horaFin', e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Seleccionar hora de fin</option>
                {horarios.map((hora) => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
              </select>
            </div>
            
            )}

            <Label className="block mb-1">Nombre</Label>
            <Input
              placeholder="Nombre de quien reserva"
              className="mb-2"
              value={nuevoTurno.nombre}
              onChange={(e) => handleFormChange('nombre', e.target.value)}
            />
            {showFijos && (
              <div className="mb-4 border border-indigo-200 rounded-md bg-indigo-50 p-2">
                <p className="text-sm text-indigo-600 mb-1">Fijos sugeridos:</p>
                <div className="flex flex-wrap gap-2">
                  {fijosFutbol.map((fijo) => (
                    <button
                      key={fijo}
                      onClick={() => handleSelectFijo(fijo)}
                      className="bg-indigo-200 hover:bg-indigo-300 text-indigo-900 text-sm px-3 py-1 rounded-full"
                    >
                      {fijo}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={handleGuardar} className="w-full">
                Guardar
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setPantalla('home')}
              >
                Cancelar
              </Button>
            </div>
          </motion.div>
        )}

        {pantalla === 'ver' && (
          <motion.div
            key="ver"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-screen-lg mx-auto"
          >
            <Tabs defaultValue="FUTBOL" onValueChange={(v) => setDeporte(v)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="FUTBOL">⚽ Fútbol</TabsTrigger>
                <TabsTrigger value="PADEL">🏓 Pádel</TabsTrigger>
              </TabsList>
              <TabsContent value={deporte}>
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setSemanaActual(prev => prev - 1)}
                    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    ← Semana anterior
                  </button>
                  <div className="text-center">
                    <h3 className="font-semibold">
                      {formatearFecha(fechasSemana[0])} - {formatearFecha(fechasSemana[6])}
                    </h3>
                    {semanaActual === 0 ? (
                      <span className="text-sm text-green-600">Semana actual</span>
                    ) : (
                      <button
                        onClick={() => setSemanaActual(0)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Volver a semana actual
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setSemanaActual(prev => prev + 1)}
                    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    Semana siguiente →
                  </button>
                </div>

                <div className="overflow-x-auto border rounded-xl shadow bg-white">
                  <table className="min-w-full text-center">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="p-2 border-r bg-white text-left">Hora</th>
                        {dias.map((dia, index) => (
                          <th
                            key={dia}
                            className="p-2 border-r text-sky-900 font-semibold"
                          >
                            <div>{dia}</div>
                            <div className="text-xs text-sky-700">
                              {formatearFecha(fechasSemana[index])}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {horarios.map((hora) => (
                        <tr key={hora} className="border-t">
                          <td className="p-2 border-r bg-gray-50 font-medium text-sky-700 text-left">
                            {hora}
                          </td>
                          {dias.map((dia) => {
                            const nombre = turnos[deporte]?.[dia]?.[hora];
                            const ocupado = Boolean(nombre);
                            const fijo = esFijo(nombre);
                            return (
                              <td
                                key={dia}
                                className={`p-2 border-r relative ${
                                  ocupado
                                    ? fijo
                                      ? 'bg-green-200 text-green-900 opacity-70'
                                      : 'bg-green-100 text-green-800'
                                    : 'bg-white text-gray-300'
                                }`}
                              >
                                {ocupado ? (
                                  nombre
                                ) : (
                                  <button
                                    className="text-gray-400 hover:text-indigo-600 text-lg"
                                    onClick={(e) =>
                                      handleAgregarDesdeTabla(e, dia, hora)
                                    }
                                  >
                                    +
                                  </button>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {celdaActiva && (
                  <div
                    className="absolute z-50 bg-white border rounded shadow p-2 text-sm"
                    style={{ top: celdaActiva.y, left: celdaActiva.x }}
                  >
                    <p className="mb-1 text-gray-500">Agregar turno:</p>
                    {nombresRecientes.map((nombre) => (
                      <button
                        key={nombre}
                        onClick={() => seleccionarNombreDesdeTabla(nombre)}
                        className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                      >
                        {nombre}
                      </button>
                    ))}
                    <button
                      onClick={() => setCeldaActiva(null)}
                      className="mt-1 w-full text-left px-2 py-1 text-red-400 hover:bg-red-50"
                    >
                      Cancelar
                    </button>
                  </div>
                )}

                <Button
                  className="mt-4 w-full"
                  onClick={() => setPantalla('home')}
                >
                  Volver
                </Button>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}