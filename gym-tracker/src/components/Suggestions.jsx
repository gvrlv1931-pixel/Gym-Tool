import { useMemo, useState } from 'react';
import { EXERCISES, getExercisesByMuscle } from '../data/exercises.js';

const SHAME_MESSAGES = [
  (ex, days) => `Your ${ex.muscleGroups[0]} is sending a strongly-worded letter. Last seen ${ex.codeName}: ${days === null ? 'never' : `${days}d ago`}.`,
  (ex, days) => `${ex.codeName} misses you. It's been ${days === null ? 'forever' : `${days} days`}. It weeps.`,
  (ex, days) => `${days === null ? 'You\'ve never done' : `It\'s been ${days} days since`} ${ex.codeName}. Your ${ex.muscleGroups[0]} filed a missing persons report.`,
  (ex, days) => `The ${ex.codeName} station has ${days === null ? 'never been visited' : `gone ${days} days untouched`}. It\'s becoming a museum piece.`,
  (ex, days) => `${days === null ? 'No record of' : `${days} days since`} ${ex.codeName}. Honestly? Kind of embarrassing.`,
];

function SuggestionCard({ exercise, days, alternatives }) {
  const [expanded, setExpanded] = useState(false);
  const msgFn = SHAME_MESSAGES[Math.abs(exercise.id.charCodeAt(0)) % SHAME_MESSAGES.length];

  return (
    <div className="card-punk card-blood p-3 flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <span className="text-3xl shrink-0">{exercise.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[var(--blood)]" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {exercise.codeName}
          </div>
          <div className="text-xs text-[var(--smoke)]">{exercise.realName}</div>
          <div className="text-xs mt-1 text-[var(--bone)]">{msgFn(exercise, days)}</div>
        </div>
        <div className="shrink-0 text-right">
          {days === null ? (
            <span className="tag text-[var(--blood)]">never</span>
          ) : (
            <span className="tag text-[var(--blood)]">{days}d ago</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {exercise.muscleGroups.map(m => (
          <span key={m} className="tag text-[var(--blood)]">{m}</span>
        ))}
      </div>

      <button
        className="text-xs text-left text-[var(--acid)] underline"
        onClick={() => setExpanded(e => !e)}
      >
        {expanded ? '▲ hide alternatives' : '▼ show alternatives that hit same muscles'}
      </button>

      {expanded && (
        <div className="flex flex-col gap-1 pl-2 border-l border-[#333] slide-up">
          <div className="text-xs text-[var(--smoke)] mb-1">Other ways to punish your {exercise.muscleGroups[0]}:</div>
          {alternatives.length === 0 ? (
            <div className="text-xs text-[var(--smoke)] italic">None in the database. You're on your own.</div>
          ) : (
            alternatives.map(alt => (
              <div key={alt.id} className="flex items-center gap-2 text-xs">
                <span>{alt.emoji}</span>
                <span className="text-[var(--acid)]">{alt.codeName}</span>
                <span className="text-[var(--smoke)]">({alt.realName})</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function Suggestions({ getDaysSince }) {
  const [threshold, setThreshold] = useState(14);

  const stale = useMemo(() => {
    return EXERCISES
      .map(ex => ({ ex, days: getDaysSince(ex.id) }))
      .filter(({ days }) => days === null || days >= threshold)
      .sort((a, b) => {
        if (a.days === null && b.days === null) return 0;
        if (a.days === null) return -1;
        if (b.days === null) return 1;
        return b.days - a.days;
      })
      .slice(0, 8);
  }, [getDaysSince, threshold]);

  const getAlternatives = (exercise) => {
    const primaryMuscle = exercise.muscleGroups[0];
    return EXERCISES
      .filter(e => e.id !== exercise.id && e.muscleGroups.includes(primaryMuscle))
      .slice(0, 4);
  };

  if (stale.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="text-6xl">😤</div>
        <h2 className="text-2xl text-[var(--acid)]" style={{ fontFamily: 'Oswald, sans-serif' }}>
          ALL CAUGHT UP
        </h2>
        <p className="text-sm text-[var(--smoke)] max-w-xs">
          You've hit everything in the past {threshold} days.
          Honestly? Impressive. The iron gods approve.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--smoke)]">
          The oracle sees {stale.length} neglected moves
        </p>
        <select
          className="input-punk text-xs w-32"
          value={threshold}
          onChange={e => setThreshold(Number(e.target.value))}
        >
          <option value={7}>7+ days</option>
          <option value={14}>14+ days</option>
          <option value={21}>21+ days</option>
          <option value={30}>30+ days</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {stale.map(({ ex, days }) => (
          <SuggestionCard
            key={ex.id}
            exercise={ex}
            days={days}
            alternatives={getAlternatives(ex)}
          />
        ))}
      </div>
    </div>
  );
}
