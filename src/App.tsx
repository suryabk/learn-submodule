import { Play, Pause, SkipBack, SkipForward, Volume1, Volume2 } from 'lucide-react'
import { useTypewriter } from '../shared/typewriter'
import { useYouTubePlayer } from '../shared/player'
import './App.css'

const FRIEREN_PLAYLIST_ID = 'PL1u2mFP_3-VSLtTYbXvhoyJonZJt_8-WF'

const phrases = [
  'A thousand years of solitude.',
  'Magic is the crystallization of human wisdom.',
  'Even a fleeting moment can last forever.',
  'The journey continues beyond the end.',
]

const quotes = [
  { text: 'Humans have such a short lifespan, and yet they leave such a lasting impression.', author: 'Frieren' },
  { text: 'I want to know more about him. The human I traveled with for just ten years.', author: 'Frieren' },
  { text: 'Magic is not about power. It is about the accumulation of human thought and emotion.', author: 'Frieren' },
  { text: 'Even if the journey ends, the memories of those we walked with never fade.', author: 'Himmel' },
  { text: 'I was always watching. I just didn\'t understand what I was seeing.', author: 'Frieren' },
  { text: 'There\'s no such thing as wasted time when it\'s spent with someone you care about.', author: 'Heiter' },
]

function App() {
  const { text } = useTypewriter({ words: phrases, typeSpeed: 70, deleteSpeed: 40, pauseDuration: 2000 })

  const { trackInfo, isReady, isPlaying, currentTime, duration, volume, toggle, next, prev, seek, setVolume, formatTime } =
    useYouTubePlayer({ playlistId: FRIEREN_PLAYLIST_ID, containerId: 'yt-player' })

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="layout">
      <div id="yt-player" style={{ display: 'none' }} />

      {/* ── Header ── */}
      <header className="header">
        <p className="eyebrow">Frieren: Beyond Journey's End</p>
        <h1 className="title">The journey never<br />truly ends.</h1>
        <p className="typewriter-text">
          <span>{text}</span>
          <span className="cursor">|</span>
        </p>
      </header>

      {/* ── Content ── */}
      <div className="content">

        {/* Player */}
        <div className="player">
          <div className="player-info">
            <span className="track-label">Now Playing</span>
            <span className="track-title">{trackInfo.title || '—'}</span>
          </div>

          <div className="progress-bar" onClick={(e) => {
            if (!duration) return
            const rect = e.currentTarget.getBoundingClientRect()
            seek(((e.clientX - rect.left) / rect.width) * duration)
          }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="controls">
            <button onClick={prev} disabled={!isReady}><SkipBack size={17} /></button>
            <button className="play-btn" onClick={toggle} disabled={!isReady}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={next} disabled={!isReady}><SkipForward size={17} /></button>
          </div>

          <div className="volume">
            <Volume1 size={14} />
            <input
              type="range" min={0} max={100} step={1} value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #a78bfa ${volume}%, rgba(255,255,255,0.08) ${volume}%)`
              }}
            />
            <Volume2 size={14} />
          </div>

          {!isReady && <p className="loading-text">Loading...</p>}
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Quotes */}
        <div className="quotes-panel">
          <p className="panel-label">Words that remain</p>
          <div className="quotes-scroll">
            {quotes.map((q, i) => (
              <div className="quote-card" key={i}>
                <p className="quote-text">{q.text}</p>
                <span className="quote-author">— {q.author}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="tags">
          <span className="tag">Fantasy</span>
          <span className="tag">Slice of Life</span>
          <span className="tag">Adventure</span>
          <span className="tag">Evan Call</span>
        </div>
        <p className="copyright">© Kanehito Yamada · Tsukasa Abe · Shogakukan</p>
      </footer>
    </div>
  )
}

export default App
