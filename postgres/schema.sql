DROP SCHEMA IF EXISTS nimbus CASCADE;
CREATE SCHEMA nimbus;

CREATE TABLE nimbus.genres (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR (40) NOT NULL
);

CREATE TABLE nimbus.users (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR (40) NOT NULL,
  avatar VARCHAR (300) NOT NULL
);

CREATE TABLE nimbus.artists (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR (40) NOT NULL
);

CREATE TABLE nimbus.albums (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR (40) NOT NULL,
  cover VARCHAR (300),
  artistId int NOT NULL,
  FOREIGN KEY (artistId) REFERENCES nimbus.artists (id)
);

CREATE TABLE nimbus.songs (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR (40) NOT NULL,
  postDate VARCHAR(10),
  length INT NOT NULL,
  mediaFile VARCHAR (300) NOT NULL,
  albumId INT NOT NULL,
  genreId INT NOT NULL,
  FOREIGN KEY (albumId) REFERENCES nimbus.albums (id),
  FOREIGN KEY (genreId) REFERENCES nimbus.genres (id)
);

CREATE TABLE nimbus.comments (
  id INT NOT NULL PRIMARY KEY,
  comment VARCHAR (200),
  time INT NOT NULL,
  songId INT NOT NULL,
  userID INT NOT NULL,
  FOREIGN KEY (songId) REFERENCES nimbus.songs (id),
  FOREIGN KEY (userId) REFERENCES nimbus.users (id)
);
