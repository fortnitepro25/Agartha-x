// Function to fetch album art and update the image
async function fetchAndUpdateAlbumArt(imgElement) {
    const artistName = imgElement.dataset.artist;
    const albumName = imgElement.dataset.album;

    try {
        // Fetch artist info
        const response = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artistName)}`);
        const data = await response.json();
        
        if (data.artists && data.artists[0]) {
            // Get artist ID
            const artistId = data.artists[0].idArtist;
            
            // Fetch albums for this artist
            const albumsResponse = await fetch(`https://www.theaudiodb.com/api/v1/json/2/album.php?i=${artistId}`);
            const albumsData = await albumsResponse.json();
            
            if (albumsData.album) {
                // Find the specific album
                const album = albumsData.album.find(a => 
                    a.strAlbum.toLowerCase().includes(albumName.toLowerCase())
                );
                
                if (album && album.strAlbumThumb) {
                    // Update the image source
                    imgElement.src = album.strAlbumThumb;
                    imgElement.alt = `${album.strAlbum} album cover`;
                }
            }
        }
    } catch (error) {
        console.error(`Error fetching album art for ${artistName} - ${albumName}:`, error);
    }
}

// Initialize all album covers
document.addEventListener('DOMContentLoaded', () => {
    // Get all album cover images
    const albumCovers = document.querySelectorAll('.album-cover');
    
    // Fetch and update each album cover
    albumCovers.forEach(img => {
        fetchAndUpdateAlbumArt(img);
    });
});