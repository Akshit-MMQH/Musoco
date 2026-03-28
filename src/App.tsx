import { useMemo, useState } from 'react';

type NavKey = 'Home' | 'Categories' | 'Artists' | 'Playlists';
type Category = 'All' | 'Relax' | 'Sad' | 'Party' | 'Romance' | 'Energetic' | 'Relaxing' | 'Jazz' | 'Alternative';

type HeroCard = {
  title: string;
  artist: string;
  gradient: string;
  image: string;
};

type Song = {
  title: string;
  artist: string;
  gradient: string;
  image: string;
};

const heroCards: HeroCard[] = [
   { title: 'End of the Beginning', artist: 'Djo', gradient: 'linear-gradient(135deg, #3d1f4a, #4a2558)', image: '/end_of_the_beginning.jpeg' },
  { title: 'Thodi Si Daaru', artist: 'AP Dhillon', gradient: 'linear-gradient(135deg, #2e1a3d, #4a2558)', image: '/todhi_si_daaru.jpeg' },
  { title: 'Nasamajh', artist: 'Aditya Rikhari', gradient: 'linear-gradient(135deg, #2e1040, #6b2060)', image: '/nasamajh.jpeg' },
  { title: 'I Thought I Saw Your Face Today', artist: 'She & Him', gradient: 'linear-gradient(135deg, #1e1545, #4a2080)', image: '/thought_i_saw_your_face_today.jpeg' },
  { title: 'Love Me Not', artist: 'Ravyn Lenae', gradient: 'linear-gradient(135deg, #3d1530, #8b2055)', image: '/love_me_not.jpeg' },
];

const categories: Category[] = ['All', 'Relax', 'Sad', 'Party', 'Romance', 'Energetic', 'Relaxing', 'Jazz', 'Alternative'];

const songs: Song[] = [
  { title: 'American Pie', artist: 'Don McLean', gradient: 'linear-gradient(135deg, #130a18, #0f0a18)', image: '/american_pie.jpeg' },
  { title: 'Meet Me at Our Spot', artist: 'THE ANXIETY, WILLOW, Tyler Cole', gradient: 'linear-gradient(135deg, #0f0a18, #140810)', image: '/meet_me_at_our_spot.jpeg' },
  { title: "God's Plan", artist: 'Drake', gradient: 'linear-gradient(135deg, #140810, #130a18)', image: '/gods_plan.jpeg' },
  { title: 'Be My Baby', artist: 'The Ronettes', gradient: 'linear-gradient(135deg, #130a18, #140810)', image: '/be_my_baby.jpeg' },
  { title: 'Bairan', artist: 'Asees Kaur', gradient: 'linear-gradient(135deg, #0f0a18, #130a18)', image: '/bairan.jpeg' },
  { title: 'Mere Mehboob Qayamat Hogi', artist: 'Kishore Kumar', gradient: 'linear-gradient(135deg, #140810, #0f0a18)', image: '/mere_mehboob_qayamat_hogi.jpeg' },
];

const playerTrack = {
  title: 'Lonely',
  artist: 'Akon',
  image: '/lonely.jpeg',
};

const playlistItems = [
  { name: 'Crying Cat', tooltip: 'Cat', image: '/crying_cat.jpeg' },
  { name: '3AM Bad Decisions', tooltip: 'no one is checking on you. go to sleep', image: '/3am.jpg' },
  { name: 'Gayless Roar', tooltip: 'Gay', image: '/gayless.jpg' },
];

function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (name) {
    case 'music':
      return (
        <svg {...common}>
          <path d="M9 18V6l11-2v12" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10.5V20h14v-9.5" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'artist':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      );
    case 'playlist':
      return (
        <svg {...common}>
          <path d="M4 6h10" />
          <path d="M4 12h10" />
          <path d="M4 18h6" />
          <circle cx="18" cy="16" r="2" />
          <path d="M20 16V8l-5 1" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...common}>
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M13 5h6v14h-6" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M20.8 8.6a5.2 5.2 0 0 0-8.8-3.6A5.2 5.2 0 0 0 3.2 8.6c0 6.1 8.8 11.2 8.8 11.2s8.8-5.1 8.8-11.2Z" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z" />
        </svg>
      );
    case 'left':
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    case 'right':
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case 'back':
      return (
        <svg {...common}>
          <path d="m17 18-6-6 6-6" />
          <path d="m11 18-6-6 6-6" />
        </svg>
      );
    case 'next':
      return (
        <svg {...common}>
          <path d="m7 6 6 6-6 6" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case 'shuffle':
      return (
        <svg {...common}>
          <path d="M3 7h4l10 10h4" />
          <path d="m17 7h4v4" />
          <path d="M3 17h4l3-3" />
          <path d="m17 17h4v-4" />
        </svg>
      );
    case 'repeat':
      return (
        <svg {...common}>
          <path d="M17 2 21 6l-4 4" />
          <path d="M3 11V9a3 3 0 0 1 3-3h15" />
          <path d="M7 22 3 18l4-4" />
          <path d="M21 13v2a3 3 0 0 1-3 3H3" />
        </svg>
      );
    case 'volume':
      return (
        <svg {...common}>
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      );
    case 'hamburger':
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );
    default:
      return null;
  }
}

function App() {
  const [activeNav, setActiveNav] = useState<NavKey>('Home');
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isPlaying, setIsPlaying] = useState(true);
  const [heroIndex, setHeroIndex] = useState(2);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  const heroOffsets = useMemo(() => [-2, -1, 0, 1, 2], []);

  const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroCards.length);
  const prevHero = () => setHeroIndex((prev) => (prev - 1 + heroCards.length) % heroCards.length);

  const handleTouchStart = (x: number) => setTouchX(x);

  const handleTouchEnd = (x: number) => {
    if (touchX === null) return;
    const diff = x - touchX;
    if (diff > 40) prevHero();
    if (diff < -40) nextHero();
    setTouchX(null);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar desktop-only">
        <div className="logo-row">
          <h1>Musoco</h1>
        </div>

        <nav className="main-nav">
          {(['Home', 'Categories', 'Artists'] as NavKey[]).map((item) => (
            <button
              key={item}
              className={`nav-item ${activeNav === item ? 'active' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              <Icon name={item === 'Home' ? 'home' : item === 'Categories' ? 'grid' : 'artist'} />
              <span>{item}</span>
            </button>
          ))}

          <div className="playlists-block">
            <button
              className={`nav-item ${activeNav === 'Playlists' ? 'active' : ''}`}
              onClick={() => {
                setActiveNav('Playlists');
                setIsPlaylistOpen((prev) => !prev);
              }}
            >
              <Icon name="playlist" />
              <span>Playlists</span>
              <span className={`playlist-caret ${isPlaylistOpen ? 'open' : ''}`}>
                <Icon name="chevron-down" />
              </span>
            </button>

            {isPlaylistOpen && (
              <div className="playlist-subitems">
                {playlistItems.map((entry, idx) => (
                  <button key={entry.name} className="playlist-subitem">
                    <span
                      className="thumb"
                      style={{
                        backgroundImage: `url('${entry.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: idx === 0
                          ? '#3a1030'
                          : idx === 1
                            ? '#1a0a2e'
                            : '#2a1020',
                      }}
                    />
                    <span>{entry.name}</span>
                    <span className="playlist-tooltip">{entry.tooltip}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button className="logout-btn">
          <Icon name="logout" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="content-area">
        <header className="top-nav">
          <button className="mobile-action mobile-only" aria-label="Menu">
            <Icon name="hamburger" />
          </button>

          <div className={`search-wrap ${mobileSearchOpen ? 'open' : ''}`}>
            <input placeholder="Search for a song" aria-label="Search for a song" />
            <button aria-label="Search">
              <Icon name="search" />
            </button>
          </div>

          <button
            className="mobile-action mobile-only"
            aria-label="Open search"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
          >
            <Icon name="search" />
          </button>

          <div className="profile-wrap">
            <div className="avatar" style={{ backgroundImage: "url('/akshit.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="profile-meta desktop-only-inline">
              <p className="name">Akshit MMQH</p>
              <p className="tier">Premium XD</p>
            </div>
            <button className="icon-btn desktop-only-inline" aria-label="Favorites"><Icon name="heart" /></button>
            <button className="icon-btn desktop-only-inline" aria-label="Settings"><Icon name="settings" /></button>
          </div>
        </header>

        <section className="hero-section">
          <div className="section-controls desktop-only-inline-flex">
            <button className="icon-btn hero-nav-btn" onClick={prevHero} aria-label="Previous featured"><Icon name="left" /></button>
            <button className="icon-btn hero-nav-btn" onClick={nextHero} aria-label="Next featured"><Icon name="right" /></button>
          </div>

          <div className="hero-stack desktop-only">
            {heroOffsets.map((offset) => {
              const rawIndex = (heroIndex + offset + heroCards.length) % heroCards.length;
              const card = heroCards[rawIndex];
              const absOffset = Math.abs(offset);

              return (
                <article
                  key={`${card.title}-${offset}`}
                  className={`hero-card depth-${absOffset} ${offset === 0 ? 'center' : ''}`}
                  style={{
                    backgroundImage: `url('${card.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: offset === 0
                      ? undefined
                      : absOffset === 1
                        ? `translateX(${offset < 0 ? '-52%' : '52%'}) scale(0.88)`
                        : `translateX(${offset < 0 ? '-88%' : '88%'}) scale(0.78)`,
                    opacity: offset === 0 ? 1 : absOffset === 1 ? 0.65 : 0.4,
                    zIndex: 20 - absOffset,
                  }}
                >
                  <div className="hero-overlay" />
                  {offset === 0 && (
                    <div className="hero-content">
                      <div>
                        <h2>{card.title}</h2>
                        <p>{card.artist}</p>
                      </div>
                      <button className="hero-play" aria-label="Play featured track">
                        <span className="play-triangle" />
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div
            className="hero-mobile mobile-only"
            onTouchStart={(event) => handleTouchStart(event.changedTouches[0].clientX)}
            onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
          >
            <article
              className="hero-card center"
              style={{
                backgroundImage: `url('${heroCards[heroIndex].image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="hero-overlay" />
              <div className="hero-content">
                <div>
                  <h2>{heroCards[heroIndex].title}</h2>
                  <p>{heroCards[heroIndex].artist}</p>
                </div>
                <button className="hero-play" aria-label="Play featured track">
                  <span className="play-triangle" />
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-head">
            <h3>Select Categories</h3>
            <div className="section-arrows">
              <button className="icon-btn section-nav-btn" aria-label="Previous categories"><Icon name="left" /></button>
              <button className="icon-btn section-nav-btn" aria-label="Next categories"><Icon name="right" /></button>
            </div>
          </div>

          <div className="chip-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-head">
            <h3>Popular songs</h3>
            <div className="section-arrows">
              <button className="icon-btn section-nav-btn" aria-label="Previous songs"><Icon name="left" /></button>
              <button className="icon-btn section-nav-btn" aria-label="Next songs"><Icon name="right" /></button>
            </div>
          </div>

          <div className="songs-row">
            {songs.map((song) => (
              <article key={song.title + song.artist} className="song-card">
                <div className="song-art" style={{ backgroundImage: `url('${song.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="player-bar">
        <div className="player-track">
          <div className="mini-art" style={{ backgroundImage: `url('${playerTrack.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div>
            <p className="track-title">{playerTrack.title}</p>
            <p className="track-artist">{playerTrack.artist}</p>
          </div>
        </div>

        <div className="player-center">
          <div className="controls-row">
            <button className="icon-btn player-icon-btn" aria-label="Skip back"><Icon name="back" /></button>
            <button className="play-main" onClick={() => setIsPlaying((prev) => !prev)} aria-label="Toggle playback">
              {isPlaying ? <span className="pause-bars" /> : <span className="play-triangle large" />}
            </button>
            <button className="icon-btn player-icon-btn" aria-label="Skip forward"><Icon name="next" /></button>
          </div>
          <div className="timeline">
            <span>1:10</span>
            <div className="progress-track">
              <div className="progress-fill">
                <span className="scrubber" />
              </div>
            </div>
            <span>4:23</span>
          </div>
        </div>

        <div className="player-actions desktop-only-inline-flex">
          <button className="icon-btn player-icon-btn" aria-label="Like current"><Icon name="heart" /></button>
          <button className="icon-btn player-icon-btn" aria-label="Shuffle"><Icon name="shuffle" /></button>
          <button className="icon-btn player-icon-btn" aria-label="Repeat"><Icon name="repeat" /></button>
          <button className="icon-btn player-icon-btn" aria-label="Volume"><Icon name="volume" /></button>
        </div>
      </footer>

      <nav className="mobile-tabs mobile-only">
        {(['Home', 'Categories', 'Artists', 'Playlists'] as NavKey[]).map((item) => (
          <button
            key={item}
            className={`mobile-tab ${activeNav === item ? 'active' : ''}`}
            onClick={() => {
              setActiveNav(item);
              if (item === 'Playlists') setIsPlaylistOpen((prev) => !prev);
            }}
          >
            <Icon name={item === 'Home' ? 'home' : item === 'Categories' ? 'grid' : item === 'Artists' ? 'artist' : 'playlist'} />
            <span>{item}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
