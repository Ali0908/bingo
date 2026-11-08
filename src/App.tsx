
import { useState } from 'react';
import '@fontsource/fredoka/600.css';
import '@fontsource/fredoka/700.css';
import { useBingo } from './hooks/useBingo';
import './index.css';

function RefreshIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M39 18A16 16 0 0 0 10 14L6 19"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9V19H16"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 30A16 16 0 0 0 38 34L42 29"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 39V29H32"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GamepadIcon() {
  return (
    <svg viewBox="0 0 56 48" fill="none" aria-hidden="true">
      <path
        d="M17 7H39C45 7 49 11 50 18L53 32C54 39 47 43 41 38L33 31H23L15 38C9 43 2 39 3 32L6 18C7 11 11 7 17 7Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M16 16V27M10.5 21.5H21.5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="37" cy="17" r="2.8" fill="currentColor" />
      <circle cx="43" cy="24" r="2.8" fill="currentColor" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="4"
        width="26"
        height="24"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <circle cx="11" cy="12" r="3" fill="currentColor" />
      <path
        d="m5 24 7-7 5 5 4-4 6 6"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`chevron-icon ${open ? 'is-open' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="m5 9 7 7 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      className="draw-play-icon"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path
        d="M9 5.5C9 4.3 10.3 3.6 11.3 4.3L27 14.8C28 15.5 28 16.9 27 17.6L11.3 28.1C10.3 28.8 9 28.1 9 26.9V5.5Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function App() {
  const {
    currentImage,
    draws,
    remainingCount,
    totalCount,
    draw,
    reset,
  } = useBingo();

  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const isFinished = remainingCount === 0;

  const progress =
    totalCount > 0 ? (draws.length / totalCount) * 100 : 0;

  const handleReset = () => {
    reset();
    setIsHistoryOpen(true);
  };

  return (
    <main className="app">
      <header className="top-header">
        <div className="header-inner">
          <div className="brand" aria-label="Bingo">
            <h1>BINGO</h1>
          </div>

          {draws.length > 0 && (
            <button
              className="new-game-button"
              onClick={handleReset}
              type="button"
            >
              <RefreshIcon />
              <span>Nouvelle partie</span>
            </button>
          )}
        </div>
      </header>

      <div className="page-content">
        <section className="progress-card">
          <div className="progress-heading">
            <div className="progress-label">
              <span className="gamepad-icon">
                <GamepadIcon />
              </span>

              <h2>Partie en cours</h2>
            </div>

            <span className="progress-count">
              {draws.length} / {totalCount}
            </span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Progression de la partie"
            aria-valuemin={0}
            aria-valuemax={totalCount}
            aria-valuenow={draws.length}
          >
            <div
              className="progress-value"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="game-section">
          <div className="image-frame" aria-live="polite">
            {currentImage ? (
              <img
                key={currentImage.id}
                src={currentImage.src}
                alt="Image tirée"
                className="current-image"
              />
            ) : (
              <div className="empty-state">
                <span className="empty-dice" aria-hidden="true">
                  🎲
                </span>
                <p>Prêt à jouer ?</p>
              </div>
            )}
          </div>

          {isFinished ? (
            <div className="finished-message">
              <span aria-hidden="true">🎉</span>
              <p>Bravo ! Toutes les images ont été tirées !</p>
            </div>
          ) : (
            <button
              className="draw-button"
              onClick={draw}
              type="button"
            >
              <PlayIcon />

              <span>
                {draws.length === 0
                  ? 'Commencer la partie'
                  : 'Tirer une image'}
              </span>
            </button>
          )}
        </section>

        {draws.length > 0 && (
          <section className="history-card">
            <button
              className="history-toggle"
              onClick={() => setIsHistoryOpen(value => !value)}
              aria-expanded={isHistoryOpen}
              aria-controls="history-grid"
              type="button"
            >
              <span className="history-heading">
                <span className="gallery-icon">
                  <GalleryIcon />
                </span>

                <span>
                  Images déjà tirées ({draws.length})
                </span>
              </span>

              <ChevronIcon open={isHistoryOpen} />
            </button>

            {isHistoryOpen && (
              <div className="history-grid" id="history-grid">
                {[...draws].reverse().map((image, index) => (
                  <div className="history-item" key={image.id}>
                    <img
                      src={image.src}
                      alt={`Image tirée ${draws.length - index}`}
                      className="history-image"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
