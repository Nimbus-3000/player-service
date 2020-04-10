DROP SCHEMA IF EXISTS nimbus CASCADE;
CREATE SCHEMA nimbus;

CREATE TABLE nimbus.genres (
  genreId SERIAL PRIMARY KEY,
  genreName VARCHAR (20) NOT NULL
);

CREATE TABLE nimbus.users (
  userId SERIAL PRIMARY KEY,
  userName VARCHAR (30) NOT NULL,
  userAvatar VARCHAR (5) NOT NULL
);

CREATE TABLE nimbus.songs (
  songId SERIAL PRIMARY KEY,
  songName VARCHAR (40) NOT NULL,
  songDate VARCHAR (10),
  songLength SMALLINT NOT NULL,
  songFile SMALLINT NOT NULL,
  coverFile VARCHAR (5) NOT NULL,
  artistId INT NOT NULL,
  genreId INT NOT NULL
  -- FOREIGN KEY (artistId) REFERENCES nimbus.users (id),
  -- FOREIGN KEY (genreId) REFERENCES nimbus.genres (id)
);

CREATE TABLE nimbus.comments (
  commentId SERIAL PRIMARY KEY,
  commentText VARCHAR (100),
  commentTime SMALLINT NOT NULL,
  songId INT NOT NULL,
  userID INT NOT NULL
  -- FOREIGN KEY (songId) REFERENCES nimbus.songs (id),
  -- FOREIGN KEY (userId) REFERENCES nimbus.users (id)
);
