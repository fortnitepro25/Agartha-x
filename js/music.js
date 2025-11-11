// js/music.js – FULL YOUTUBE EMBED + DYNAMIC ALBUM ART (NO MP3 EVER AGAIN)

// 1. AUTO-FETCH ALBUM ART (your original code – untouched & perfect)
async function fetchAndUpdateAlbumArt(imgElement) {
    const artistName = imgElement.dataset.artist;
    const albumName = imgElement.dataset.album;
    try {
        const response = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artistName)}`);
        const data = await response.json();

        if (data.artists && data.artists[0]) {
            const artistId = data.artists[0].idArtist;
            const albumsResponse = await fetch(`https://www.theaudiodb.com/api/v1/json/2/album.php?i=${artistId}`);
            const albumsData = await albumsResponse.json();

            if (albumsData.album) {
                const album = albumsData.album.find(a =>
                    a.strAlbum.toLowerCase().includes(albumName.toLowerCase())
                );
                if (album && album.strAlbumThumb) {
                    imgElement.src = album.strAlbumThumb;
                    imgElement.alt = `${album.strAlbum} album cover`;
                }
            }
        }
    } catch (error) {
        console.error(`Error fetching album art for ${artistName} - ${albumName}:`, error);
    }
}

// 2. AUTO-REPLACE <div class="track"> WITH YOUTUBE EMBED + ALBUM ART
document.addEventListener('DOMContentLoaded', () => {
    // Find all track containers
    const tracks = document.querySelectorAll('.track');

    tracks.forEach(container => {
        const artist = container.dataset.artist;
        const song = container.dataset.song;
        const album = container.dataset.album || '';
        const videoId = container.dataset.youtube; // YOU SET THIS IN HTML

        // Create glowing player container
        const playerHTML = `
            <div class="yt-player">
                <p class="track-title">${artist} – ${song}</p>
                <img src="img/noart.jpg" 
                     alt="Loading…" 
                     class="album-cover" 
                     data-artist="${artist}" 
                     data-album="${album}">
                <iframe width="100%" height="166"
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&modestbranding=1"
                    title="${artist} – ${song}"
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
            </div>
        `;

        // Replace the old <div class="track"> with the new embed
        container.innerHTML = playerHTML;

        // Now fetch the correct album art for the new img
        const newImg = container.querySelector('.album-cover');
        if (newImg) fetchAndUpdateAlbumArt(newImg);
    });
});