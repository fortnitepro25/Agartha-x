document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.track').forEach(container => {
    const videoId = container.dataset.youtube;
    if (!videoId) return;

    const playerHTML = `
      <div class="music-player">
        <h3>${container.dataset.artist || 'UNKNOWN'}</h3>
        <p class="song-info">${container.dataset.song || ''} - ${container.dataset.album || ''} (Official)</p>
        <iframe class="youtube-embed"
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&modestbranding=1&rel=0&controls=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
    `;

    container.innerHTML = playerHTML;
  });
});