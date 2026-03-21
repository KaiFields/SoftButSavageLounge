import React, { useMemo, useState } from 'react';
import './App.css';

const initialUser = {
  id: 'player-001',
  username: 'KaiOnTop',
  email: 'kai@skillarena.gg',
  avatar: 'KO',
  rating: 1480,
  balance: 125.5,
  pendingWinnings: 42,
  ageVerified: true,
  region: 'Texas, USA',
  status: 'Eligible'
};

const initialChallenges = [
  {
    id: 'CH-201',
    game: 'Call of Duty',
    mode: '1v1 Kill Race',
    entryFee: 10,
    rules: 'Highest eliminations in one multiplayer match wins.',
    proof: 'Screenshot + Match ID',
    status: 'Open',
    creator: 'FragQueen',
    skillBand: '1400 - 1600 ELO'
  },
  {
    id: 'CH-198',
    game: 'NBA 2K',
    mode: 'Head-to-Head',
    entryFee: 25,
    rules: 'Standard ranked game, no custom sliders.',
    proof: 'Video clip or console screenshot',
    status: 'Active',
    creator: 'BucketzOnly',
    opponent: 'KaiOnTop',
    skillBand: '1450 - 1650 ELO'
  },
  {
    id: 'CH-177',
    game: 'EA FC',
    mode: 'Solo Challenge',
    entryFee: 5,
    rules: 'First to 3 wins in friendlies.',
    proof: 'Screenshot',
    status: 'Completed',
    creator: 'FootyFox',
    opponent: 'LethalLena',
    winner: 'FootyFox',
    skillBand: '1200 - 1500 ELO'
  }
];

const initialTransactions = [
  { id: 'TX-900', type: 'Deposit', amount: 50, status: 'Settled', createdAt: '2026-03-20 09:14 UTC' },
  { id: 'TX-901', type: 'Escrow Hold', amount: -10, status: 'Locked', createdAt: '2026-03-20 19:40 UTC' },
  { id: 'TX-902', type: 'Win', amount: 42, status: 'Pending release', createdAt: '2026-03-21 00:15 UTC' }
];

const initialProof = [
  { id: 'PF-1', challengeId: 'CH-198', user: 'KaiOnTop', type: 'Screenshot', state: 'Submitted', link: 'match_198_scoreboard.png' },
  { id: 'PF-2', challengeId: 'CH-198', user: 'BucketzOnly', type: 'Video', state: 'Awaiting review', link: 'https://youtu.be/example-proof' }
];

const adminQueue = [
  { id: 'DS-77', challengeId: 'CH-198', issue: 'Score mismatch', severity: 'High', action: 'Manual review needed' },
  { id: 'KY-22', challengeId: 'Onboarding', issue: 'Age verification pending', severity: 'Medium', action: 'Request ID confirmation' },
  { id: 'RF-18', challengeId: 'Wallet', issue: 'Restricted region login attempt', severity: 'Low', action: 'Auto-blocked by geofence' }
];

const navItems = [
  ['dashboard', 'Dashboard'],
  ['create', 'Create Challenge'],
  ['join', 'Join Challenge'],
  ['matches', 'Active Matches'],
  ['proof', 'Upload Proof'],
  ['wallet', 'Wallet'],
  ['profile', 'Profile'],
  ['admin', 'Admin Panel']
];

function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </article>
  );
}

function SectionHeader({ eyebrow, title, text, action }) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {action}
    </div>
  );
}

function ChallengeCard({ challenge, actionLabel, onAction }) {
  return (
    <article className="challenge-card">
      <div className="challenge-card__top">
        <span className={`pill pill--${challenge.status.toLowerCase().replace(/\s+/g, '-')}`}>{challenge.status}</span>
        <span className="challenge-card__fee">${challenge.entryFee.toFixed(2)}</span>
      </div>
      <h3>{challenge.game}</h3>
      <p className="challenge-card__mode">{challenge.mode}</p>
      <ul>
        <li><strong>Rules:</strong> {challenge.rules}</li>
        <li><strong>Proof:</strong> {challenge.proof}</li>
        <li><strong>Skill band:</strong> {challenge.skillBand}</li>
        <li><strong>Host:</strong> {challenge.creator}</li>
      </ul>
      {actionLabel ? <button className="primary-button" onClick={onAction}>{actionLabel}</button> : null}
    </article>
  );
}

function App() {
  const [screen, setScreen] = useState('dashboard');
  const [user] = useState(initialUser);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [proofItems, setProofItems] = useState(initialProof);
  const [challengeForm, setChallengeForm] = useState({
    game: 'Call of Duty',
    mode: '1v1',
    entryFee: '10',
    rules: '',
    proof: 'Screenshot',
    regionLocked: true
  });
  const [proofForm, setProofForm] = useState({ challengeId: 'CH-198', type: 'Screenshot', link: '' });

  const openChallenges = useMemo(
    () => challenges.filter((challenge) => challenge.status === 'Open'),
    [challenges]
  );
  const activeChallenges = useMemo(
    () => challenges.filter((challenge) => challenge.status === 'Active'),
    [challenges]
  );

  function createChallenge(event) {
    event.preventDefault();
    const newChallenge = {
      id: `CH-${Date.now().toString().slice(-3)}`,
      game: challengeForm.game,
      mode: challengeForm.mode,
      entryFee: Number(challengeForm.entryFee),
      rules: challengeForm.rules,
      proof: challengeForm.proof,
      status: 'Open',
      creator: user.username,
      skillBand: `${user.rating - 100} - ${user.rating + 100} ELO`
    };

    setChallenges((current) => [newChallenge, ...current]);
    setChallengeForm({
      game: 'Call of Duty',
      mode: '1v1',
      entryFee: '10',
      rules: '',
      proof: 'Screenshot',
      regionLocked: true
    });
    setScreen('join');
  }

  function joinChallenge(challengeId) {
    setChallenges((current) =>
      current.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, status: 'Active', opponent: user.username }
          : challenge
      )
    );
    setTransactions((current) => [
      {
        id: `TX-${Date.now().toString().slice(-3)}`,
        type: 'Escrow Hold',
        amount: -10,
        status: 'Locked',
        createdAt: '2026-03-21 12:00 UTC'
      },
      ...current
    ]);
    setScreen('matches');
  }

  function submitProof(event) {
    event.preventDefault();
    if (!proofForm.link.trim()) return;
    setProofItems((current) => [
      {
        id: `PF-${Date.now().toString().slice(-3)}`,
        challengeId: proofForm.challengeId,
        user: user.username,
        type: proofForm.type,
        state: 'Submitted',
        link: proofForm.link.trim()
      },
      ...current
    ]);
    setProofForm((current) => ({ ...current, link: '' }));
  }

  const content = {
    dashboard: (
      <div className="screen-stack">
        <SectionHeader
          eyebrow="Skill-based competition"
          title="Build a compliant MVP for skill challenges"
          text="Authentication, wallet visibility, challenge creation, proof review, and an ops-ready admin workflow are mapped into one launch plan."
          action={<button className="primary-button" onClick={() => setScreen('create')}>Launch challenge</button>}
        />
        <div className="stats-grid">
          <StatCard label="Skill rating" value={`${user.rating} ELO`} helper="Used for fair matchmaking bands" />
          <StatCard label="Wallet balance" value={`$${user.balance.toFixed(2)}`} helper="Deposits available for entry fees" />
          <StatCard label="Pending winnings" value={`$${user.pendingWinnings.toFixed(2)}`} helper="Released after proof approval" />
          <StatCard label="Compliance" value={user.status} helper="18+ verified, geofence active" />
        </div>

        <div className="two-column-grid">
          <section className="panel">
            <SectionHeader
              eyebrow="Match flow"
              title="Escrow-first payout logic"
              text="Entry fees are locked from both players, proof is uploaded, verified wins are released automatically, and mismatches route to disputes."
            />
            <ol className="flow-list">
              <li>Create a challenge with game, mode, rules, and proof requirement.</li>
              <li>Opponent joins within the allowed skill band and region rules.</li>
              <li>Both entry fees move into escrow before the external match starts.</li>
              <li>Players upload screenshots, video, or streaming links.</li>
              <li>Verified winner receives the pooled prize minus platform fee.</li>
              <li>Disputes, suspicious patterns, and region violations go to admin review.</li>
            </ol>
          </section>

          <section className="panel">
            <SectionHeader
              eyebrow="Legal and safety"
              title="MVP guardrails"
              text="The product framing emphasizes skill outcomes, age gating, restricted-region blocking, and clear terms before wallet actions unlock."
            />
            <div className="compliance-list">
              <div>
                <strong>Age verification</strong>
                <p>Require 18+ confirmation before deposits, withdrawals, or challenge joins.</p>
              </div>
              <div>
                <strong>Geo-restrictions</strong>
                <p>Block restricted regions before onboarding completes or wallets activate.</p>
              </div>
              <div>
                <strong>Anti-gambling notice</strong>
                <p>State clearly that outcomes are determined by player skill and proof verification.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    ),
    create: (
      <section className="panel screen-stack">
        <SectionHeader
          eyebrow="Screen 4"
          title="Create challenge"
          text="Capture the essential match metadata your backend will need for matchmaking, escrow, and proof review."
        />
        <form className="form-grid" onSubmit={createChallenge}>
          <label>
            Game
            <select value={challengeForm.game} onChange={(event) => setChallengeForm((current) => ({ ...current, game: event.target.value }))}>
              <option>Call of Duty</option>
              <option>NBA 2K</option>
              <option>EA FC</option>
              <option>Madden NFL</option>
            </select>
          </label>
          <label>
            Mode
            <select value={challengeForm.mode} onChange={(event) => setChallengeForm((current) => ({ ...current, mode: event.target.value }))}>
              <option>1v1</option>
              <option>Solo challenge</option>
              <option>Kill race</option>
            </select>
          </label>
          <label>
            Entry fee
            <input type="number" min="1" step="1" value={challengeForm.entryFee} onChange={(event) => setChallengeForm((current) => ({ ...current, entryFee: event.target.value }))} />
          </label>
          <label>
            Proof required
            <select value={challengeForm.proof} onChange={(event) => setChallengeForm((current) => ({ ...current, proof: event.target.value }))}>
              <option>Screenshot</option>
              <option>Video</option>
              <option>Screenshot + Match ID</option>
            </select>
          </label>
          <label className="form-grid__full">
            Rules
            <textarea value={challengeForm.rules} onChange={(event) => setChallengeForm((current) => ({ ...current, rules: event.target.value }))} placeholder="Example: Highest eliminations in one public match wins." required />
          </label>
          <label className="toggle">
            <input type="checkbox" checked={challengeForm.regionLocked} onChange={(event) => setChallengeForm((current) => ({ ...current, regionLocked: event.target.checked }))} />
            Restrict this challenge to approved regions only.
          </label>
          <div className="form-grid__actions">
            <button className="primary-button" type="submit">Publish challenge</button>
            <button className="secondary-button" type="button" onClick={() => setScreen('dashboard')}>Cancel</button>
          </div>
        </form>
      </section>
    ),
    join: (
      <section className="screen-stack">
        <SectionHeader
          eyebrow="Screen 5"
          title="Join a challenge"
          text="Show live lobbies, fee amounts, and proof expectations so players know exactly what they are accepting."
        />
        <div className="card-grid">
          {openChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} actionLabel="Join and lock escrow" onAction={() => joinChallenge(challenge.id)} />
          ))}
        </div>
      </section>
    ),
    matches: (
      <section className="screen-stack">
        <SectionHeader
          eyebrow="Screen 6"
          title="Active matches"
          text="Monitor escrow state, proof status, and payout logic for matches currently in progress."
        />
        <div className="card-grid">
          {activeChallenges.map((challenge) => (
            <article className="challenge-card" key={challenge.id}>
              <div className="challenge-card__top">
                <span className="pill pill--active">{challenge.status}</span>
                <span className="challenge-card__fee">${challenge.entryFee.toFixed(2)}</span>
              </div>
              <h3>{challenge.game}</h3>
              <p>{challenge.creator} vs {challenge.opponent ?? 'Waiting for opponent'}</p>
              <ul>
                <li><strong>Escrow:</strong> Locked from both players</li>
                <li><strong>Payout:</strong> Winner gets ${(challenge.entryFee * 2 * 0.92).toFixed(2)} after 8% fee</li>
                <li><strong>Dispute route:</strong> Admin review if proof conflicts</li>
              </ul>
              <button className="primary-button" onClick={() => setScreen('proof')}>Upload result proof</button>
            </article>
          ))}
        </div>
      </section>
    ),
    proof: (
      <section className="panel screen-stack">
        <SectionHeader
          eyebrow="Screen 7"
          title="Proof upload"
          text="Support screenshots, video files, and streaming links so admins can verify winners or escalate disputes."
        />
        <form className="form-grid" onSubmit={submitProof}>
          <label>
            Challenge
            <select value={proofForm.challengeId} onChange={(event) => setProofForm((current) => ({ ...current, challengeId: event.target.value }))}>
              {activeChallenges.map((challenge) => (
                <option key={challenge.id} value={challenge.id}>{challenge.id} · {challenge.game}</option>
              ))}
            </select>
          </label>
          <label>
            Proof type
            <select value={proofForm.type} onChange={(event) => setProofForm((current) => ({ ...current, type: event.target.value }))}>
              <option>Screenshot</option>
              <option>Video</option>
              <option>Twitch link</option>
              <option>YouTube link</option>
            </select>
          </label>
          <label className="form-grid__full">
            File or link reference
            <input value={proofForm.link} onChange={(event) => setProofForm((current) => ({ ...current, link: event.target.value }))} placeholder="proof-url-or-file-name" required />
          </label>
          <div className="form-grid__actions">
            <button className="primary-button" type="submit">Submit proof</button>
          </div>
        </form>
        <div className="data-table">
          <div className="data-table__header">
            <span>Challenge</span>
            <span>User</span>
            <span>Type</span>
            <span>Status</span>
          </div>
          {proofItems.map((item) => (
            <div className="data-table__row" key={item.id}>
              <span>{item.challengeId}</span>
              <span>{item.user}</span>
              <span>{item.type}</span>
              <span>{item.state}</span>
            </div>
          ))}
        </div>
      </section>
    ),
    wallet: (
      <section className="panel screen-stack">
        <SectionHeader
          eyebrow="Screen 8"
          title="Wallet"
          text="Keep balances, pending winnings, deposits, withdrawals, and escrow history visible so users trust the platform."
          action={<div className="button-row"><button className="primary-button">Deposit</button><button className="secondary-button">Withdraw</button></div>}
        />
        <div className="stats-grid">
          <StatCard label="Available" value={`$${user.balance.toFixed(2)}`} helper="Ready for deposits or challenge fees" />
          <StatCard label="Pending" value={`$${user.pendingWinnings.toFixed(2)}`} helper="Waiting on proof approval" />
          <StatCard label="Platform fee" value="5-10%" helper="Configurable per match type" />
        </div>
        <div className="data-table">
          <div className="data-table__header">
            <span>ID</span>
            <span>Type</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {transactions.map((transaction) => (
            <div className="data-table__row" key={transaction.id}>
              <span>{transaction.id}</span>
              <span>{transaction.type}</span>
              <span className={transaction.amount > 0 ? 'positive' : 'negative'}>{transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}</span>
              <span>{transaction.status}</span>
            </div>
          ))}
        </div>
      </section>
    ),
    profile: (
      <section className="panel screen-stack">
        <SectionHeader
          eyebrow="Screen 9"
          title="Player profile"
          text="User identity, rating, trust indicators, and onboarding compliance live together to support fair competition."
        />
        <div className="profile-card">
          <div className="avatar">{user.avatar}</div>
          <div>
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p><strong>Region:</strong> {user.region}</p>
          </div>
        </div>
        <div className="stats-grid">
          <StatCard label="ELO rating" value={user.rating} helper="Matchmaking target band" />
          <StatCard label="Trust score" value="94/100" helper="Based on verified results and dispute rate" />
          <StatCard label="Bans" value="0" helper="Anti-cheat and conduct actions" />
          <StatCard label="Verification" value="18+ complete" helper="Required before payouts" />
        </div>
      </section>
    ),
    admin: (
      <section className="panel screen-stack">
        <SectionHeader
          eyebrow="Screen 10"
          title="Admin panel"
          text="Operations can review disputes, approve payouts, monitor compliance, and take anti-cheat actions from one console."
          action={<button className="primary-button">Approve queued payouts</button>}
        />
        <div className="card-grid admin-grid">
          {adminQueue.map((item) => (
            <article key={item.id} className="challenge-card">
              <div className="challenge-card__top">
                <span className={`pill pill--${item.severity.toLowerCase()}`}>{item.severity}</span>
                <span>{item.id}</span>
              </div>
              <h3>{item.issue}</h3>
              <p><strong>Area:</strong> {item.challengeId}</p>
              <p>{item.action}</p>
              <div className="button-row">
                <button className="secondary-button">Review</button>
                <button className="secondary-button">Ban user</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">SkillArena</p>
          <h1>Competitive skill gaming MVP</h1>
          <p className="sidebar__copy">
            A launch-ready product direction for a skill-based challenge platform with wallet visibility, proof submission, and moderation workflows.
          </p>
        </div>

        <div className="sidebar__user-card">
          <div className="avatar avatar--small">{user.avatar}</div>
          <div>
            <strong>{user.username}</strong>
            <p>{user.email}</p>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Primary navigation">
          {navItems.map(([key, label]) => (
            <button
              key={key}
              className={screen === key ? 'nav-button nav-button--active' : 'nav-button'}
              onClick={() => setScreen(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="legal-banner">
          <strong>Compliance first</strong>
          <p>18+ verification, geofencing, terms acceptance, and skill-outcome messaging should gate wallet actions.</p>
        </div>
      </aside>

      <main className="main-content">
        <section className="hero-card">
          <div>
            <p className="eyebrow">MVP Blueprint</p>
            <h2>From concept to shipping screens</h2>
            <p>
              This React prototype translates the provided startup spec into a tangible product surface with all core screens represented for fast iteration.
            </p>
          </div>
          <div className="hero-card__chips">
            <span>Email + Google auth</span>
            <span>Wallet + escrow</span>
            <span>Challenges + proof</span>
            <span>Admin review</span>
          </div>
        </section>

        {content[screen]}
      </main>
    </div>
  );
}

export default App;
