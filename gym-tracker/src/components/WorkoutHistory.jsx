import { useState, useMemo } from 'react';
import { EXERCISES, MUSCLE_GROUPS } from '../data/exercises.js';
import { HOW_IT_FELT } from '../data/exercises.js';

const EQUIPMENT_LABELS = {
  free_weight: 'Free Weight',
  machine: 'Machine',
  cable: 'Cable',
  bodyweight: 'Bodyweight',
  resistance_band: 'Band',
  kettlebell: 'Kettlebell',
  barbell: 'Barbell',
  dumbbell: 'Dumbbell',
};

function formatDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: diffDays > 365 ? 'numeric' : undefined });
}

function WorkoutCard({ workout, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const felt = HOW_IT_FELT.find(h => h.value === workout.howItFelt);

  return (
    <div className="card-punk p-3 flex flex-col gap-2 slide-up">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl">{workout.exerciseEmoji || '🏋️'}</span>
          <div className="min-w-0">
            <div className="font-bold text-[var(--acid)] text-sm truncate" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {workout.exerciseCodeName || workout.exerciseName}
            </div>
            <div className="text-xs text-[var(--smoke)]">{workout.exerciseName}</div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[var(--bone)] font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {workout.weight}{workout.unit}
          </div>
          <div className="text-xs text-[var(--smoke)]">
            {workout.sets && workout.reps ? `${workout.sets}×${workout.reps}` : workout.sets ? `${workout.sets} sets` : workout.reps ? `${workout.reps} reps` : ''}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 items-center">
        {workout.muscleGroups?.map(m => (
          <span key={m} className="tag text-[var(--acid)]">{m}</span>
        ))}
        {workout.equipmentType && (
          <span className="tag text-[var(--smoke)]">{EQUIPMENT_LABELS[workout.equipmentType] || workout.equipmentType}</span>
        )}
        {felt && (
          <span className="tag" style={{ color: 'var(--bone)' }}>{felt.emoji} {felt.label}</span>
        )}
      </div>

      {workout.notes && (
        <div className="text-xs text-[var(--smoke)] italic border-l border-[#333] pl-2">
          "{workout.notes}"
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--smoke)]">{formatDate(workout.createdAt)}</span>
        {confirming ? (
          <div className="flex gap-2">
            <button
              className="btn-punk btn-blood text-xs py-1 px-2"
              onClick={() => onDelete(workout.id)}
            >
              yeah, nuke it
            </button>
            <button
              className="text-xs text-[var(--smoke)] underline"
              onClick={() => setConfirming(false)}
            >
              nah keep it
            </button>
          </div>
        ) : (
          <button
            className="text-xs text-[#444] hover:text-[var(--blood)] transition-colors"
            onClick={() => setConfirming(true)}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
}

export function WorkoutHistory({ workouts, onDelete }) {
  const [filterMuscle, setFilterMuscle] = useState('');
  const [filterExercise, setFilterExercise] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');

  const uniqueExerciseIds = useMemo(() => {
    const ids = [...new Set(workouts.map(w => w.exerciseId))];
    return ids;
  }, [workouts]);

  const filtered = useMemo(() => {
    let list = [...workouts];
    if (filterMuscle) {
      list = list.filter(w => w.muscleGroups?.includes(filterMuscle));
    }
    if (filterExercise) {
      list = list.filter(w => w.exerciseId === filterExercise);
    }
    switch (sortBy) {
      case 'date_asc': list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      case 'weight_desc': list.sort((a, b) => b.weight - a.weight); break;
      case 'weight_asc': list.sort((a, b) => a.weight - b.weight); break;
      default: list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [workouts, filterMuscle, filterExercise, sortBy]);

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="text-6xl">🦗</div>
        <h2 className="text-2xl text-[var(--smoke)]" style={{ fontFamily: 'Oswald, sans-serif' }}>
          Nothing here yet
        </h2>
        <p className="text-sm text-[var(--smoke)] max-w-xs">
          The archives are empty. Your legacy has not yet been forged.
          Log your first set and let the database tremble.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <select
            className="input-punk text-sm"
            value={filterMuscle}
            onChange={e => { setFilterMuscle(e.target.value); setFilterExercise(''); }}
          >
            <option value="">All muscles</option>
            {MUSCLE_GROUPS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            className="input-punk text-sm"
            value={filterExercise}
            onChange={e => { setFilterExercise(e.target.value); setFilterMuscle(''); }}
          >
            <option value="">All exercises</option>
            {uniqueExerciseIds.map(id => {
              const ex = EXERCISES.find(e => e.id === id);
              const w = workouts.find(w => w.exerciseId === id);
              return (
                <option key={id} value={id}>
                  {ex ? `${ex.emoji} ${ex.codeName}` : w?.exerciseName || id}
                </option>
              );
            })}
          </select>
        </div>
        <select
          className="input-punk text-sm"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date_desc">Latest first</option>
          <option value="date_asc">Oldest first</option>
          <option value="weight_desc">Heaviest first</option>
          <option value="weight_asc">Lightest first</option>
        </select>
      </div>

      {/* Count */}
      <div className="text-xs text-[var(--smoke)]">
        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'} in the archive
        {(filterMuscle || filterExercise) && ' (filtered)'}
      </div>

      {/* Clear filter */}
      {(filterMuscle || filterExercise) && (
        <button
          className="btn-punk btn-blood text-sm py-2 w-full"
          onClick={() => { setFilterMuscle(''); setFilterExercise(''); }}
        >
          Clear filter
        </button>
      )}

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-[var(--smoke)] text-sm">
            No entries match this filter. You skipped {filterMuscle || 'that'} day.
          </div>
        ) : (
          filtered.map(w => (
            <WorkoutCard key={w.id} workout={w} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
}
