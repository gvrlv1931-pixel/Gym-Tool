import { useMemo, useState } from 'react';
import { EXERCISES, MUSCLE_GROUPS } from '../data/exercises.js';

const EQUIPMENT_FILTERS = [
  { value: '', label: 'All' },
  { value: 'barbell', label: 'Barbell' },
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'machine', label: 'Machine' },
  { value: 'bodyweight', label: 'Bodyweight' },
  { value: 'cable', label: 'Cable' },
  { value: 'kettlebell', label: 'Kettlebell' },
];

const SPICE_MESSAGES = [
  "Here's stuff you probably avoid. Try it.",
  "Random chaos incoming. Your muscles won't know what hit them.",
  "Your comfort zone called. It's bored.",
  "Shake it up. Plateaus are mental.",
  "Something different. Because variety is the law.",
];

function ExerciseResultCard({ exercise, daysSince, lastWeight, pr }) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="card-punk p-3 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div
            className="font-bold text-[var(--acid)] text-sm"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            {exercise.codeName}
          </div>
          <div className="text-xs text-[var(--smoke)]">{exercise.realName}</div>
        </div>
        <div className="text-right text-xs shrink-0">
          {daysSince === null ? (
            <span style={{ color: 'var(--blood)' }}>never done</span>
          ) : daysSince === 0 ? (
            <span className="text-[var(--smoke)]">today</span>
          ) : (
            <span className="text-[var(--smoke)]">{daysSince}d ago</span>
          )}
          {lastWeight && (
            <div
              className="font-bold text-[var(--bone)] mt-0.5"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              last: {lastWeight.weight}{lastWeight.unit}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {exercise.muscleGroups.map(m => <span key={m} className="tag text-[var(--acid)]">{m}</span>)}
        <span className="tag text-[var(--smoke)]">{exercise.defaultEquipment}</span>
      </div>

      <button
        className="text-xs text-left text-[var(--smoke)] underline hover:text-[var(--bone)] transition-colors"
        onClick={() => setShowInstructions(v => !v)}
      >
        {showInstructions ? 'hide' : 'how to do it'}
      </button>

      {showInstructions && exercise.instructions && (
        <div
          className="text-xs text-[var(--bone)] pl-2 slide-up"
          style={{ borderLeft: '2px solid var(--acid)' }}
        >
          {exercise.instructions}
        </div>
      )}
    </div>
  );
}

export function Oracle({ getDaysSince, workouts }) {
  const [muscle, setMuscle] = useState('');
  const [equipment, setEquipment] = useState('');
  const [mode, setMode] = useState('search'); // 'search' | 'spice'
  const [spiceKey, setSpiceKey] = useState(0);

  const getLastWorkout = (exerciseId) => workouts.find(w => w.exerciseId === exerciseId) || null;

  const searchResults = useMemo(() => {
    if (mode !== 'search' || !muscle) return [];
    return EXERCISES.filter(ex => {
      const matchesMuscle = ex.muscleGroups.includes(muscle);
      const matchesEquip = !equipment || ex.defaultEquipment === equipment;
      return matchesMuscle && matchesEquip;
    });
  }, [muscle, equipment, mode]);

  const spiceResults = useMemo(() => {
    if (mode !== 'spice') return [];
    const candidates = EXERCISES.filter(ex => {
      if (equipment && ex.defaultEquipment !== equipment) return false;
      const days = getDaysSince(ex.id);
      return days === null || days >= 7;
    });
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, equipment, spiceKey, getDaysSince]);

  const handleSpice = () => {
    setMode('spice');
    setMuscle('');
    setSpiceKey(k => k + 1);
  };

  const handleMuscle = (m) => {
    setMuscle(muscle === m ? '' : m);
    setMode('search');
  };

  const results = mode === 'spice' ? spiceResults : searchResults;
  const spiceMsg = SPICE_MESSAGES[spiceKey % SPICE_MESSAGES.length];

  return (
    <div className="flex flex-col gap-5 pb-4">

      {/* Muscle group picker */}
      <div>
        <div className="text-xs text-[var(--smoke)] uppercase tracking-widest mb-2">
          What are we working?
        </div>
        <div className="flex flex-wrap gap-2">
          {MUSCLE_GROUPS.map(m => (
            <button
              key={m}
              onClick={() => handleMuscle(m)}
              className="text-xs uppercase tracking-widest px-3 py-1 border transition-all"
              style={{
                fontFamily: 'Oswald, sans-serif',
                borderColor: muscle === m && mode === 'search' ? 'var(--acid)' : '#333',
                color: muscle === m && mode === 'search' ? 'var(--void)' : 'var(--smoke)',
                background: muscle === m && mode === 'search' ? 'var(--acid)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment filter */}
      <div>
        <div className="text-xs text-[var(--smoke)] uppercase tracking-widest mb-2">
          Equipment filter
        </div>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT_FILTERS.map(eq => (
            <button
              key={eq.value}
              onClick={() => setEquipment(equipment === eq.value ? '' : eq.value)}
              className="text-xs px-3 py-1 border transition-all"
              style={{
                fontFamily: 'Oswald, sans-serif',
                borderColor: equipment === eq.value ? 'var(--acid)' : '#333',
                color: equipment === eq.value ? 'var(--void)' : 'var(--smoke)',
                background: equipment === eq.value ? 'var(--acid)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {eq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spice it up */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSpice}
          className="btn-punk btn-blood w-full py-3"
        >
          I'M BORED — SPICE IT UP
        </button>
        <p className="text-xs text-[var(--smoke)] text-center">
          Picks exercises you haven't done in a while (or ever).
          Hit it again for new ones.
        </p>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="flex flex-col gap-3">
          {mode === 'spice' && (
            <p className="text-xs text-[var(--smoke)] italic">{spiceMsg}</p>
          )}
          {mode === 'search' && muscle && (
            <p className="text-xs text-[var(--smoke)]">
              {results.length} exercise{results.length !== 1 ? 's' : ''} for {muscle}
              {equipment ? ` · ${equipment}` : ''}
            </p>
          )}
          {results.map(ex => {
            const last = getLastWorkout(ex.id);
            return (
              <ExerciseResultCard
                key={ex.id}
                exercise={ex}
                daysSince={getDaysSince(ex.id)}
                lastWeight={last ? { weight: last.weight, unit: last.unit } : null}
                pr={null}
              />
            );
          })}
        </div>
      )}

      {mode === 'search' && muscle && results.length === 0 && (
        <p className="text-xs text-[var(--smoke)] text-center py-4">
          Nothing matches those filters. Try removing the equipment filter.
        </p>
      )}

      {!muscle && mode === 'search' && (
        <p className="text-xs text-[var(--smoke)] text-center py-4">
          Pick a muscle group above, or hit the spice button.
        </p>
      )}
    </div>
  );
}
