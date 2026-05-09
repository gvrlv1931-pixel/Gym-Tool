import { useState, useMemo } from 'react';
import { HOW_IT_FELT } from '../data/exercises.js';

const DELETE_PROMPTS = [
  "This set will be stricken from the record.",
  "Pretend it never happened?",
  "Erase this from your legacy forever?",
  "The iron gods will not remember this.",
  "Gone. Like your motivation on Mondays.",
  "This one goes in the void.",
];

function formatDate(iso) {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function Sparkline({ weights }) {
  if (!weights || weights.length < 2) return null;
  const max = Math.max(...weights);
  const min = Math.min(...weights);
  const range = max - min || 1;
  const W = 72, H = 24, PAD = 2;
  const pts = weights.map((w, i) => {
    const x = PAD + (i / (weights.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((w - min) / range) * (H - PAD * 2);
    return `${x},${y}`;
  }).join(' ');
  const last = weights[weights.length - 1];
  const lastX = W - PAD;
  const lastY = H - PAD - ((last - min) / range) * (H - PAD * 2);

  return (
    <svg width={W} height={H} style={{ overflow: 'visible', display: 'block' }}>
      <polyline points={pts} fill="none" stroke="var(--acid)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3" fill="var(--acid)" />
    </svg>
  );
}

function setsDisplay(workout) {
  if (!workout.sets) return null;
  if (Array.isArray(workout.sets)) {
    const valid = workout.sets.filter(s => s.reps);
    if (!valid.length) return null;
    return valid.map((s, i) => ({ num: i + 1, reps: s.reps, nearFailure: s.nearFailure }));
  }
  if (typeof workout.sets === 'number' && workout.reps) {
    return Array.from({ length: workout.sets }, (_, i) => ({ num: i + 1, reps: workout.reps, nearFailure: false }));
  }
  return null;
}

function ExerciseCard({ group }) {
  const [expanded, setExpanded] = useState(false);
  const sorted = [...group.workouts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const last = sorted[0];
  const pr = Math.max(...group.workouts.map(w => w.weight));
  const isPRSession = last.weight >= pr;
  const recentWeights = sorted.slice(0, 8).reverse().map(w => w.weight);
  const trend = recentWeights.length >= 2
    ? recentWeights[recentWeights.length - 1] - recentWeights[0]
    : 0;

  const lastSets = setsDisplay(last);

  return (
    <div className="card-punk p-4 flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div
            className="font-bold text-[var(--acid)] leading-tight"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.05rem' }}
          >
            {group.exerciseCodeName || group.exerciseName}
          </div>
          <div className="text-xs text-[var(--smoke)] mt-0.5">{group.exerciseName}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {group.muscleGroups?.map(m => <span key={m} className="tag text-[var(--acid)]">{m}</span>)}
          </div>
        </div>
        {/* Last weight — the number that matters */}
        <div className="text-right shrink-0">
          <div
            className="font-bold text-[var(--bone)]"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', lineHeight: 1 }}
          >
            {last.weight}
            <span className="text-sm text-[var(--smoke)] font-normal ml-0.5">{last.unit}</span>
          </div>
          <div className="text-xs text-[var(--smoke)] mt-0.5">{formatDate(last.createdAt)}</div>
          {isPRSession && (
            <div className="tag text-[var(--blood)] mt-1">PR</div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[var(--smoke)]">
            All-time best: <span className="text-[var(--bone)]">{pr}{last.unit}</span>
          </span>
          <span className="text-xs text-[var(--smoke)]">
            {group.workouts.length} session{group.workouts.length !== 1 ? 's' : ''}
            {trend > 0 && <span className="text-[var(--acid)] ml-1">+{trend}{last.unit} trend</span>}
            {trend < 0 && <span className="text-[var(--smoke)] ml-1">{trend}{last.unit} trend</span>}
          </span>
        </div>
        <Sparkline weights={recentWeights} />
      </div>

      {/* Last session sets detail */}
      {lastSets && (
        <div className="flex flex-wrap gap-1">
          {lastSets.map(s => (
            <span
              key={s.num}
              className="tag"
              style={{ color: s.nearFailure ? 'var(--blood)' : 'var(--smoke)' }}
            >
              {s.num}: {s.reps}r{s.nearFailure ? ' !' : ''}
            </span>
          ))}
        </div>
      )}

      {/* History toggle */}
      {group.workouts.length > 1 && (
        <button
          className="text-xs text-left text-[var(--smoke)] underline"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? 'hide history' : `show all ${group.workouts.length} sessions`}
        </button>
      )}

      {expanded && (
        <div className="flex flex-col gap-1 border-t border-[#222] pt-2 mt-1">
          {sorted.slice(1).map(w => {
            const wSets = setsDisplay(w);
            return (
              <div key={w.id} className="flex items-center justify-between text-xs">
                <span className="text-[var(--smoke)]">{formatDate(w.createdAt)}</span>
                <div className="flex items-center gap-2">
                  {wSets && (
                    <span className="text-[var(--smoke)]">
                      {wSets.map(s => s.reps).join('/')}r
                    </span>
                  )}
                  <span
                    className="font-bold"
                    style={{ fontFamily: 'Oswald, sans-serif', color: w.weight >= pr ? 'var(--acid)' : 'var(--bone)' }}
                  >
                    {w.weight}{w.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LogCard({ workout, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [deletePrompt] = useState(() => DELETE_PROMPTS[Math.floor(Math.random() * DELETE_PROMPTS.length)]);
  const felt = HOW_IT_FELT.find(h => h.value === workout.howItFelt);
  const sets = setsDisplay(workout);

  return (
    <div className="card-punk p-3 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div
            className="font-bold text-[var(--acid)] text-sm truncate"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            {workout.exerciseCodeName || workout.exerciseName}
          </div>
          <div className="text-xs text-[var(--smoke)]">{workout.exerciseName}</div>
        </div>
        <div className="text-right shrink-0">
          <div
            className="font-bold text-[var(--bone)]"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}
          >
            {workout.weight}{workout.unit}
          </div>
        </div>
      </div>

      {sets && (
        <div className="flex flex-wrap gap-1">
          {sets.map(s => (
            <span key={s.num} className="tag" style={{ color: s.nearFailure ? 'var(--blood)' : 'var(--smoke)' }}>
              {s.num}: {s.reps}r{s.nearFailure ? ' !' : ''}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1">
        {workout.muscleGroups?.map(m => <span key={m} className="tag text-[var(--acid)]">{m}</span>)}
        {felt && <span className="tag text-[var(--bone)]">{felt.emoji} {felt.label}</span>}
      </div>

      {workout.notes && (
        <p className="text-xs text-[var(--smoke)] italic border-l border-[#333] pl-2">
          "{workout.notes}"
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--smoke)]">{formatDate(workout.createdAt)}</span>
        {confirming ? (
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs text-[var(--smoke)] italic text-right">{deletePrompt}</span>
            <div className="flex gap-2">
              <button
                className="btn-punk btn-blood text-xs py-0.5 px-2"
                style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.06em' }}
                onClick={() => onDelete(workout.id)}
              >
                BURY IT
              </button>
              <button
                className="text-xs text-[var(--smoke)] hover:text-[var(--bone)] transition-colors"
                onClick={() => setConfirming(false)}
              >
                spare it
              </button>
            </div>
          </div>
        ) : (
          <button
            className="text-xs text-[#444] hover:text-[var(--blood)] transition-colors"
            onClick={() => setConfirming(true)}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
}

export function Vault({ workouts, onDelete }) {
  const [view, setView] = useState('records');

  const byExercise = useMemo(() => {
    const map = {};
    workouts.forEach(w => {
      if (!map[w.exerciseId]) {
        map[w.exerciseId] = {
          exerciseId: w.exerciseId,
          exerciseName: w.exerciseName,
          exerciseCodeName: w.exerciseCodeName,
          muscleGroups: w.muscleGroups,
          workouts: [],
        };
      }
      map[w.exerciseId].workouts.push(w);
    });
    return Object.values(map).sort((a, b) => {
      const aLast = Math.max(...a.workouts.map(w => new Date(w.createdAt).getTime()));
      const bLast = Math.max(...b.workouts.map(w => new Date(w.createdAt).getTime()));
      return bLast - aLast;
    });
  }, [workouts]);

  const chronological = useMemo(
    () => [...workouts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [workouts]
  );

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div
          className="text-2xl font-bold text-[var(--smoke)]"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          THE VAULT IS EMPTY
        </div>
        <p className="text-sm text-[var(--smoke)] max-w-xs">
          Your legacy has not yet been forged.<br />Log your first set.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* View toggle */}
      <div className="flex" style={{ border: '1px solid #333' }}>
        {[
          { id: 'records', label: 'RECORDS' },
          { id: 'log', label: 'SESSION LOG' },
        ].map(v => (
          <button
            key={v.id}
            className="flex-1 py-2 text-xs uppercase tracking-widest transition-all"
            style={{
              fontFamily: 'Oswald, sans-serif',
              background: view === v.id ? 'var(--acid)' : 'transparent',
              color: view === v.id ? 'var(--void)' : 'var(--smoke)',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === 'records' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-[var(--smoke)]">
            {byExercise.length} exercise{byExercise.length !== 1 ? 's' : ''} tracked —
            big number is last session weight
          </p>
          {byExercise.map(g => <ExerciseCard key={g.exerciseId} group={g} />)}
        </div>
      )}

      {view === 'log' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-[var(--smoke)]">{chronological.length} entries</p>
          {chronological.map(w => <LogCard key={w.id} workout={w} onDelete={onDelete} />)}
        </div>
      )}
    </div>
  );
}
