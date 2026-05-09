export function NavBar({ active, onChange, suggestionCount }) {
  const tabs = [
    { id: 'add', icon: '⚡', label: 'Log It' },
    { id: 'history', icon: '📁', label: 'Archives' },
    { id: 'suggestions', icon: '🔮', label: 'Oracle', badge: suggestionCount },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: 'var(--pit)', borderTop: '1px solid #222' }}
    >
      <div className="flex max-w-lg mx-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex-1 flex flex-col items-center py-3 gap-1 transition-colors relative"
            style={{
              color: active === tab.id ? 'var(--acid)' : 'var(--smoke)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderTop: active === tab.id ? '2px solid var(--acid)' : '2px solid transparent',
            }}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-xs" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
              {tab.label}
            </span>
            {tab.badge > 0 && (
              <span
                className="absolute top-2 right-4 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: 'var(--blood)', color: 'var(--bone)', fontSize: '0.6rem' }}
              >
                {tab.badge > 9 ? '9+' : tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
