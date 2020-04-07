DROP KEYSPACE IF EXISTS nimbus;
CREATE KEYSPACE nimbus WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE nimbus;

CREATE TABLE songComments(
  songtitle text,
  artistname text,
  commentuuid uuid,
  albumcover text,
  albumname text,
  commentavatar text,
  commentusername text,
  commenttext text,
  commenttime smallint,
  genre text,
  length smallint,
  mediafile tinyint,
  postdate text,
  PRIMARY KEY ((songtitle, artistname), commentuuid)
);

COPY songComments (songtitle,artistname,commentuuid,albumcover,albumname,commentavatar,commentusername,commenttext,commenttime,genre,length,mediafile,postdate) FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/cassandra/data/songComments.csv' WITH DELIMITER=',' AND HEADER=TRUE;
