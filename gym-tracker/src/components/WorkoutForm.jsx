import { useState } from 'react';
import { EXERCISES, EQUIPMENT_TYPES, HOW_IT_FELT } from '../data/exercises.js';

const DEFAULT = {
  exerciseId: '',
  customExercise: '',
  equipmentType: '',
  weight: '',
  unit: 'kg',
  reps: '',
  sets: '',
  howItFelt: '',
  notes: '',
};

export function WorkoutForm({ onAdd }) {
  const [form, setForm] = useState(DEFAULT);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const selectedExercise = EXERCISES.find(e => e.id === form.exerciseId);

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleExerciseChange = (id) => {
    const ex = EXERCISES.find(e => e.id === id);
    set('exerciseId', id);
    if (ex) set('equipmentType', ex.defaultEquipment);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.exerciseId && !form.customExercise.trim()) {
      setError('Pick an exercise, legend. Any exercise.');
      triggerShake();
      return;
    }
    if (!form.weight) {
      setError('How much weight? Even 2.5kg counts. We don\'t judge.');
      triggerShake();
      return;
    }

    const exercise = selectedExercise || {
      id: 'custom_' + Date.now(),
      realName: form.customExercise.trim(),
      codeName: form.customExercise.trim(),
      muscleGroups: ['full body'],
      emoji: '🏋️',
    };

    onAdd({
      exerciseId: exercise.id,
      exerciseName: exercise.realName,
      exerciseCodeName: exercise.codeName,
      exerciseEmoji: exercise.emoji,
      muscleGroups: exercise.muscleGroups,
      equipmentType: form.equipmentType,
      weight: parseFloat(form.weight),
      unit: form.unit,
      reps: form.reps ? parseInt(form.reps) : null,
      sets: form.sets ? parseInt(form.sets) : null,
      howItFelt: form.howItFelt,
      notes: form.notes.trim(),
    });

    setSubmitted(true);
    setForm(DEFAULT);
    setTimeout(() => setSubmitted(false), 2500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 slide-up">
        <div className="text-6xl">🤘</div>
        <h2 className="text-3xl text-[var(--acid)]" style={{ fontFamily: 'Oswald, sans-serif' }}>
          LOGGED, BEAST
        </h2>
        <p className="text-[var(--smoke)] text-sm text-center">
          The gains database has been updated.<br />
          The iron gods are pleased.
        </p>
      </div>
    );
  }

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
            <option key={ex.id} value={ex.id}>
              {ex.emoji} {ex.codeName} ({ex.realName})
            </option>
          ))}
          <option value="__custom__">✏️ Custom / Not Listed</option>
        </select>
      </div>

      {/* Custom exercise name */}
      {form.exerciseId === '__custom__' && (
        <div className="slide-up">
          <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
            Name Your Weapon
          </label>
          <input
            type="text"
            className="input-punk"
            placeholder="e.g. The Weird Cable Thing"
            value={form.customExercise}
            onChange={e => set('customExercise', e.target.value)}
          />
        </div>
      )}

      {/* Exercise tagline */}
      {selectedExercise && (
        <div className="text-xs text-[var(--smoke)] italic px-1 slide-up">
          "{selectedExercise.tagline}"
        </div>
      )}

      {/* Muscle groups display */}
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
        <select
          className="input-punk"
          value={form.equipmentType}
          onChange={e => set('equipmentType', e.target.value)}
        >
          <option value="">— what are you wielding? —</option>
          {EQUIPMENT_TYPES.map(eq => (
            <option key={eq.value} value={eq.value}>{eq.label}</option>
          ))}
        </select>
      </div>

      {/* Weight + unit */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
          Weight (the numbers that matter)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="decimal"
            step="0.5"
            min="0"
            className="input-punk flex-1"
            placeholder="e.g. 80"
            value={form.weight}
            onChange={e => set('weight', e.target.value)}
          />
          <select
            className="input-punk w-20"
            value={form.unit}
            onChange={e => set('unit', e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>

      {/* Sets + Reps (optional) */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
            Sets <span className="text-[var(--smoke)] normal-case">(optional)</span>
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            className="input-punk"
            placeholder="e.g. 4"
            value={form.sets}
            onChange={e => set('sets', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
            Reps <span className="text-[var(--smoke)] normal-case">(optional)</span>
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            className="input-punk"
            placeholder="e.g. 8"
            value={form.reps}
            onChange={e => set('reps', e.target.value)}
          />
        </div>
      </div>

      {/* How it felt */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-2">
          Vibes Check <span className="text-[var(--smoke)] normal-case">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {HOW_IT_FELT.map(h => (
            <button
              key={h.value}
              type="button"
              onClick={() => set('howItFelt', form.howItFelt === h.value ? '' : h.value)}
              className="flex flex-col items-center gap-1 p-2 border transition-all"
              style={{
                borderColor: form.howItFelt === h.value ? 'var(--acid)' : '#333',
                background: form.howItFelt === h.value ? 'var(--acid)' : 'var(--cave)',
                color: form.howItFelt === h.value ? 'var(--void)' : 'var(--bone)',
                minWidth: '4rem',
              }}
            >
              <span className="text-2xl">{h.emoji}</span>
              <span className="text-xs" style={{ fontFamily: 'Space Mono, monospace' }}>{h.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs text-[var(--smoke)] uppercase tracking-widest mb-1">
          Notes / War Stories <span className="text-[var(--smoke)] normal-case">(optional)</span>
        </label>
        <textarea
          className="input-punk resize-none"
          rows={2}
          placeholder="e.g. Grip slipped. Still counts."
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
        />
      </div>

      {/* Error */}
      {error && (
        <div className={`text-[var(--blood)] text-sm px-1 ${shake ? 'shake' : ''}`}>
          ⚠ {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn-punk btn-punk-fill w-full py-4 text-lg mt-2"
      >
        ⚡ Log It
      </button>
    </form>
  );
}
