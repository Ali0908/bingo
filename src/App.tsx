
import { useBingo } from './hooks/useBingo';
import './index.css';

function App() {
  const {
    currentImage,
    draws,
    remainingCount,
    totalCount,
    draw,
    reset,
  } = useBingo();

  const isFinished = remainingCount === 0;

  return (
    <main className="app">
      <header className="header">
        <h1>BINGO</h1>
        <p>Le tirage des images</p>
      </header>

      <section className="game">
        <div className="image-container">
          {currentImage ? (
            <img
              key={currentImage.id}
              src={currentImage.src}
              alt=""
              className="drawn-image"
            />
          ) : (
            <div className="empty-state">
              <span>🎲</span>
            </div>
          )}
        </div>

        <p className="counter">
          {draws.length} / {totalCount}
        </p>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${(draws.length / totalCount) * 100}%`,
            }}
          />
        </div>

        {isFinished ? (
          <p className="finished">
            Toutes les images ont été tirées !
          </p>
        ) : (
          <button className="draw-button" onClick={draw}>
            {draws.length === 0
              ? 'Commencer la partie'
              : 'Tirer une image'}
          </button>
        )}

        <button className="reset-button" onClick={reset}>
          Nouvelle partie
        </button>
      </section>

      {draws.length > 0 && (
        <section className="history">
          <h2>Images déjà tirées</h2>
          <div className="history-grid">
            {draws.map(image => (
              <img
                key={image.id}
                src={image.src}
                alt=""
                className="history-image"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
