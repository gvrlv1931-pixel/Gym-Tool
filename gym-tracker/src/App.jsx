import { useState, useMemo } from 'react';
import { useWorkouts } from './hooks/useWorkouts.js';
import { WorkoutForm } from './components/WorkoutForm.jsx';
import { WorkoutHistory } from './components/WorkoutHistory.jsx';
import { Suggestions } from './components/Suggestions.jsx';
import { NavBar } from './components/NavBar.jsx';
import { EXERCISES } from './data/exercises.js';

const SLOGANS = [
  'No excuses. Just gainz.',
  "The bar doesn't care about your feelings.",
  'Pain is just weakness screaming on its way out.',
  'Pick things up. Put things down. Repeat.',
  "Your only competition is yesterday's you.",
  "The gym doesn't have off days.",
  'Sweat now. Flex later.',
];

const slogan = SLOGANS[new Date().getDay() % SLOGANS.length];

const TAB_TITLES = {
  add: '⚡ Log a Set',
  history: '📁 The Archives',
  suggestions: '🔮 The Oracle',
};

const TAB_SUBTITLES = {
  add: slogan,
  history: 'Every session. Every PR. Every questionable decision.',
  suggestions: "What the data says you're neglecting.",
};

export default function App() {
  const [tab, setTab] = useState('add');
  const { workouts, addWorkout, deleteWorkout, getDaysSince } = useWorkouts();

  const suggestionCount = useMemo(() => {
    return EXERCISES.filter(ex => {
      const days = getDaysSince(ex.id);
      return days === null || days >= 14;
    }).length;
  }, [getDaysSince]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--void)', maxWidth: '520px', margin: '0 auto' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 pt-4 pb-3"
        style={{ background: 'var(--void)', borderBottom: '1px solid #1a1a1a' }}
      >
        <div className="flex items-baseline justify-between">
          <h1
            className="text-3xl font-bold glitch"
            style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--acid)', letterSpacing: '0.05em' }}
          >
            GAINZ VAULT
          </h1>
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full pulse-dot"
              style={{ background: 'var(--blood)', display: 'inline-block' }}
            />
            <span className="text-xs text-[var(--smoke)]">{workouts.length} logged</span>
          </div>
        </div>
        <div>
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--bone)' }}
          >
            {TAB_TITLES[tab]}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--smoke)' }}>{TAB_SUBTITLES[tab]}</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pt-4 mb-nav overflow-y-auto">
        {tab === 'add' && (
          <WorkoutForm onAdd={addWorkout} />
        )}
        {tab === 'history' && (
          <WorkoutHistory workouts={workouts} onDelete={deleteWorkout} />
        )}
        {tab === 'suggestions' && (
          <Suggestions getDaysSince={getDaysSince} />
        )}
      </main>

      {/* Bottom nav */}
      <NavBar active={tab} onChange={setTab} suggestionCount={suggestionCount} />
    </div>
  );
}
