export function NavBar({ active, onChange, suggestionCount }) {
  const tabs = [
    { id: 'add', label: 'LOG IT' },
    { id: 'vault', label: 'THE VAULT' },
    { id: 'oracle', label: 'ORACLE', badge: suggestionCount },
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
            className="flex-1 flex flex-col items-center py-3 gap-0.5 relative"
            style={{
              color: active === tab.id ? 'var(--acid)' : 'var(--smoke)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderTop: active === tab.id ? '2px solid var(--acid)' : '2px solid transparent',
              transition: 'color 0.15s',
            }}
          >
            <span
              className="text-xs uppercase"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em' }}
            >
              {tab.label}
            </span>
            {tab.badge > 0 && (
              <span
                className="absolute top-1.5 right-3 rounded-full w-4 h-4 flex items-center justify-center"
                style={{
                  background: 'var(--blood)',
                  color: 'var(--bone)',
                  fontSize: '0.55rem',
                  fontFamily: 'Space Mono, monospace',
                }}
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
