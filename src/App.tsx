import { CursorProvider, Cursor, Magnetic } from './index';

function App() {
  return (
    <CursorProvider
      size={24}
      color="#3b82f6"
      smoothness={0.12}
      variant="scale"
      enableTrail={true}
    >
      <Cursor hoverColor="#8b5cf6" hoverScale={2} />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        fontFamily: 'system-ui, sans-serif',
        background: '#0f172a',
        color: 'white',
        padding: '2rem',
      }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>cursor-motion</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Move your mouse to see the cursor!</p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Magnetic>
            <button style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              border: 'none',
              background: '#3b82f6',
              color: 'white',
              cursor: 'pointer',
            }}>
              Magnetic Button
            </button>
          </Magnetic>

          <Magnetic>
            <button style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              border: '2px solid #8b5cf6',
              background: 'transparent',
              color: '#8b5cf6',
              cursor: 'pointer',
            }}>
              Hover Me
            </button>
          </Magnetic>

          <Magnetic>
            <a href="#" style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              background: '#10b981',
              color: 'white',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              Magnetic Link
            </a>
          </Magnetic>
        </div>

        <div style={{ marginTop: '3rem', color: '#64748b', textAlign: 'center' }}>
          <p>Try different variants:</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <span style={{ padding: '0.5rem 1rem', background: '#1e293b', borderRadius: '4px' }}>default</span>
            <span style={{ padding: '0.5rem 1rem', background: '#1e293b', borderRadius: '4px' }}>scale</span>
            <span style={{ padding: '0.5rem 1rem', background: '#1e293b', borderRadius: '4px' }}>glow</span>
            <span style={{ padding: '0.5rem 1rem', background: '#1e293b', borderRadius: '4px' }}>trail</span>
          </div>
        </div>
      </div>
    </CursorProvider>
  );
}

export default App;