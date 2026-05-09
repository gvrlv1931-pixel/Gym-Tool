import { useState } from 'react';
import { EXERCISES, EQUIPMENT_TYPES, HOW_IT_FELT } from '../data/exercises.js';

const EMPTY_SET = () => ({ reps: '', nearFailure: false });

const DEFAULT_FORM = {
  exerciseId: '',
  customExercise: '',
  equipmentType: '',
  weight: '',
  unit: 'kg',
  sets: [EMPTY_SET()],
  howItFelt: '',
  notes: '',
};

const PR_LINES = [
  'PERSONAL RECORD. You absolute unit.',
  'NEW PR. Your past self just got demolished.',
  'RECORD BROKEN. The iron gods are chanting.',
  'NEW BEST. Frame this. Put it on a wall.',
];

const NEAR_FAILURE_LINES = [
  'You pushed to the limit. That\'s where gains live.',
  'Near failure = near greatness. You masochist.',
  'Dug deep on that one. Adaptation incoming.',
];

const LOGGED_LINES = [
  'Logged. The vault grows stronger.',
  'Entered into the sacred records.',
  'Done. Next time: heavier.',
  'Session captured. Progress noted.',
];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function formatLastWorkout(w) {
  if (!w) return null;
  const sets = w.sets;
  let setsStr = '';
  if (Array.isArray(sets) && sets.length > 0) {
    const valid = sets.filter(s => s.reps);
    setsStr = valid.length ? ` · ${valid.length} sets` : '';
  } else if (typeof sets === 'number' && w.reps) {
    setsStr = ` · ${sets}×${w.reps}`;
  }
  const days = Math.floor((Date.now() - new Date(w.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const when = days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days}d ago`;
  return `${w.weight}${w.unit}${setsStr} — ${when}`;
}

function SetRow({ set, index, total, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs text-[var(--smoke)] shrink-0"
        style={{ fontFamily: 'Oswald, sans-serif', width: '3.5rem' }}
      >
        SET {index + 1}
      </span>
      <input
        type="number"
        inputMode="numeric"
        min="1"
        className="input-punk text-center"
        style={{ width: '4.5rem' }}
        placeholder="reps"
        value={set.reps}
        onChange={e => onChange(index, 'reps', e.target.value)}
      />
      <button
        type="button"
        onClick={() => onChange(index, 'nearFailure', !set.nearFailure)}
        className="flex-1 text-xs py-1 px-2 border transition-all text-left"
        style={{
          borderColor: set.nearFailure ? 'var(--blood)' : '#333',
          color: set.nearFailure ? 'var(--blood)' : 'var(--smoke)',
          background: set.nearFailure ? 'rgba(255,45,85,0.08)' : 'transparent',
          fontFamily: 'Space Mono, monospace',
        }}
      >
        {set.nearFailure ? 'HIT THE LIMIT' : 'near limit?'}
      </button>
      {total > 1 && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-[var(--smoke)] hover:text-[var(--blood)] transition-colors text-lg leading-none shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
}

function SuccessScreen({ type }) {
  if (type === 'pr') {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center slide-up">
        <div
          className="text-5xl font-bold"
          style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--acid)', letterSpacing: '0.05em' }}
        >
          NEW<br />RECORD
        </div>
        <div className="tag text-[var(--blood)] text-sm py-1 px-3">{pick(PR_LINES)}</div>
      </div>
    );
  }
  if (type === 'near_failure') {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center slide-up">
        <div
          className="text-4xl font-bold text-[var(--bone)]"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          PUSHED TO<br />THE LIMIT
        </div>
        <p className="text-sm text-[var(--smoke)] max-w-xs">{pick(NEAR_FAILURE_LINES)}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center slide-up">
      <div
        className="text-4xl font-bold text-[var(--acid)]"
        style={{ fontFamily: 'Oswald, sans-serif' }}
      >
        LOGGED
      </div>
      <p className="text-sm text-[var(--smoke)]">{pick(LOGGED_LINES)}</p>
    </div>
  );
}

export function WorkoutForm({ onAdd, getLastWorkout, getPersonalRecord }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState('');

  const selectedExercise = form.exerciseId && form.exerciseId !== '__custom__'
    ? EXERCISES.find(e => e.id === form.exerciseId)
    : null;

  const lastWorkout = selectedExercise ? getLastWorkout(selectedExercise.id) : null;
  const lastStr = formatLastWorkout(lastWorkout);

  const setField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleExerciseChange = (id) => {
    const ex = EXERCISES.find(e => e.id === id);
    setForm(prev => ({ ...prev, exerciseId: id, equipmentType: ex?.defaultEquipment || '' }));
    setError('');
  };

  const addSet = () => setForm(prev => ({ ...prev, sets: [...prev.sets, EMPTY_SET()] }));

  const removeSet = (i) => setForm(prev => ({
    ...prev, sets: prev.sets.filter((_, idx) => idx !== i),
  }));

  const updateSet = (i, field, value) => setForm(prev => ({
    ...prev, sets: prev.sets.map((s, idx) => idx === i ? { ...s, [field]: value } : s),
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCustom = form.exerciseId === '__custom__';
    if (!form.exerciseId) { setError('Pick an exercise.'); return; }
    if (isCustom && !form.customExercise.trim()) { setError('Name your weapon.'); return; }
    if (!form.weight || isNaN(parseFloat(form.weight))) { setError('Enter the weight.'); return; }

    const exercise = isCustom ? {
      id: 'custom_' + Date.now(),
      realName: form.customExercise.trim(),
      codeName: form.customExercise.trim(),
      muscleGroups: ['full body'],
    } : selectedExercise;

    const weight = parseFloat(form.weight);
    const prevPR = !isCustom ? getPersonalRecord(exercise.id) : null;
    const isPR = prevPR !== null && weight > prevPR;
    const hasNearFailure = form.sets.some(s => s.nearFailure);

    onAdd({
      exerciseId: exercise.id,
      exerciseName: exercise.realName,
      exerciseCodeName: exercise.codeName,
      muscleGroups: exercise.muscleGroups,
      equipmentType: form.equipmentType,
      weight,
      unit: form.unit,
      sets: form.sets.map(s => ({ reps: s.reps ? parseInt(s.reps) : null, nearFailure: s.nearFailure })),
      howItFelt: form.howItFelt,
      notes: form.notes.trim(),
    });

    setSubmitted(isPR ? 'pr' : hasNearFailure ? 'near_failure' : 'done');
    setForm(DEFAULT_FORM);
    setTimeout(() => setSubmitted(null), 3000);
  };

  if (submitted) return <SuccessScreen type={submitted} />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">

      {/* Exercise picker */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
          The Move
        </label>
        <select
          className="input-punk"
          value={form.exerciseId}
          onChange={e => handleExerciseChange(e.target.value)}
        >
          <option value="">— pick your weapon —</option>
          {EXERCISES.map(ex => (
            <option key={ex.id} value={ex.id}>{ex.codeName} ({ex.realName})</option>
          ))}
          <option value="__custom__">Custom / Not Listed</option>
        </select>
      </div>

      {form.exerciseId === '__custom__' && (
        <div>
          <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
            Name Your Weapon
          </label>
          <input
            type="text" className="input-punk"
            placeholder="e.g. The Weird Cable Thing"
            value={form.customExercise}
            onChange={e => setField('customExercise', e.target.value)}
          />
        </div>
      )}

      {/* Last session callout — the most important thing */}
      {lastStr && (
        <div
          className="px-3 py-2 flex items-center justify-between"
          style={{ background: 'rgba(200,245,66,0.06)', borderLeft: '3px solid var(--acid)' }}
        >
          <span className="text-xs text-[var(--smoke)] uppercase tracking-widest">Last time</span>
          <span className="text-sm font-bold text-[var(--acid)]" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {lastStr}
          </span>
        </div>
      )}

      {/* Tagline */}
      {selectedExercise?.tagline && (
        <p className="text-xs text-[var(--smoke)] italic px-1">"{selectedExercise.tagline}"</p>
      )}

      {/* Muscle tags */}
      {selectedExercise && (
        <div className="flex flex-wrap gap-1">
          {selectedExercise.muscleGroups.map(m => (
            <span key={m} className="tag text-[var(--acid)]">{m}</span>
          ))}
        </div>
      )}

      {/* Equipment */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
          Equipment
        </label>
        <select className="input-punk" value={form.equipmentType} onChange={e => setField('equipmentType', e.target.value)}>
          <option value="">— what are you wielding? —</option>
          {EQUIPMENT_TYPES.map(eq => <option key={eq.value} value={eq.value}>{eq.label}</option>)}
        </select>
      </div>

      {/* Weight — wider input, narrow unit */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
          Weight
        </label>
        <div className="flex gap-2">
          <input
            type="number" inputMode="decimal" step="0.5" min="0"
            className="input-punk"
            style={{ flex: '1 1 0', minWidth: 0 }}
            placeholder="e.g. 80"
            value={form.weight}
            onChange={e => setField('weight', e.target.value)}
          />
          <select
            className="input-punk"
            style={{ width: '4.5rem', flexShrink: 0 }}
            value={form.unit}
            onChange={e => setField('unit', e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>

      {/* Sets */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-[var(--smoke)] uppercase tracking-widest">Sets</label>
          <button
            type="button" onClick={addSet}
            className="text-xs border border-[var(--acid)] text-[var(--acid)] px-2 py-0.5 hover:bg-[var(--acid)] hover:text-[var(--void)] transition-all"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            + ADD SET
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {form.sets.map((s, i) => (
            <SetRow
              key={i} set={s} index={i} total={form.sets.length}
              onChange={updateSet} onRemove={removeSet}
            />
          ))}
        </div>
        <p className="text-xs text-[var(--smoke)] mt-1 px-1">
          Toggle "near limit?" on sets where you got close to failure.
        </p>
      </div>

      {/* Vibes */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-2">
          Vibes Check <span className="normal-case">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {HOW_IT_FELT.map(h => (
            <button
              key={h.value} type="button"
              onClick={() => setField('howItFelt', form.howItFelt === h.value ? '' : h.value)}
              className="flex flex-col items-center gap-1 p-2 border transition-all"
              style={{
                borderColor: form.howItFelt === h.value ? 'var(--acid)' : '#333',
                background: form.howItFelt === h.value ? 'var(--acid)' : 'var(--cave)',
                color: form.howItFelt === h.value ? 'var(--void)' : 'var(--bone)',
                minWidth: '4.5rem',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.65rem',
              }}
            >
              <span className="text-xl">{h.emoji}</span>
              <span>{h.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
          Notes <span className="normal-case">(optional)</span>
        </label>
        <textarea
          className="input-punk resize-none" rows={2}
          placeholder="e.g. Grip slipped. Still counts."
          value={form.notes}
          onChange={e => setField('notes', e.target.value)}
        />
      </div>

      {error && (
        <p className="text-[var(--blood)] text-sm px-1">/ {error}</p>
      )}

      <button type="submit" className="btn-punk btn-punk-fill w-full py-4 text-lg mt-2">
        LOG IT
      </button>
    </form>
  );
}
