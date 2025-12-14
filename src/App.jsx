
import './App.css';
import logo from './assets/logo.svg';
import JournalEntries from './JournalEntries';
import UserAuth from './UserAuth';
import Rituals from './Rituals';
import Community from './Community';



function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Soft But Savage logo" />
        <div className="brand">Soft But Savage</div>
        <div className="tagline">A journal‑styled sanctuary for reclaiming soft power</div>
        <UserAuth onAuth={setUser} />
        <nav style={{ margin: '1rem 0' }}>
          <button className="cta" onClick={() => setPage('journal')}>Journal</button>
          <button className="cta" onClick={() => setPage('rituals')}>Rituals</button>
          <button className="cta" onClick={() => setPage('community')}>Community</button>
        </nav>
        {page === 'home' && <div className="small">Designed with warmth, ritual, and sisterhood.</div>}
      </header>
      <main style={{ width: '100%', maxWidth: 600, margin: '2rem auto' }}>
        {page === 'journal' && user && <JournalEntries user={user} />}
        {page === 'journal' && !user && <div style={{color:'#cfa87a',marginTop:24}}>Please log in to access your journal.</div>}
        {page === 'rituals' && <Rituals />}
        {page === 'community' && <Community />}
      </main>
    </div>
  );
}

export default App;
