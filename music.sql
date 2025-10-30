CREATE TABLE music (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  artist TEXT,
  album TEXT,
  year INTEGER,
  genre TEXT,
  duration INTEGER,
  file BLOB
);
CREATE INDEX idx_artist ON music(artist);
CREATE INDEX idx_album ON music(album);
CREATE INDEX idx_genre ON music(genre);