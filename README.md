# top-player

Server: `http://localhost:3001`   
Initialize: 'npm install'  
Create Client Bundle: 'npm run react-dev'  
Start Server: 'npm run server-dev'  
Start Seed Script: 'npm run seedmongo'  

------------------------------------

## API Routes

------------------------------------

### Create  
Path: `/api/songs`  
HTTP Method: POST  
Inputs: (required) req.data is JSON object conforming to [Song schema](#song-document-schema)  
Response: JSON object:  
```
{  
  nCreated: (1) number of documents inserted
  _id: _id of inserted document
}
```
------------------------------------

### Read  
Path: `/api/songs/:_id` (ex: `/api/songs/5` for `_id` of 5)  
HTTP Method: GET  
Inputs: (optional, defaults to random value if omitted) `_id` as URL parameter  
Response: JSON object conforming to [Song schema](#song-document-schema)  

------------------------------------

### Update  
Path: `/api/songs`  
HTTP Method: PUT  
Inputs: (required) req.data is JSON object conforming to [Song schema](#song-document-schema)  
Response: JSON object:  
```
{
  modifiedCount: (1) number of documents modified
  _id: _id of updated document
}
```
------------------------------------

### Delete  
Path: `/api/songs/:_id` (ex: `/api/songs/5` for `_id` of 5)  
HTTP Method: DELETE  
Inputs: (required) `_id` as URL parameter  
Response: JSON object:  
```
{
  deletedCount: (1) number of documents deleted
  _id: _id of deleted document
}
```
------------------------------------

### Song Document Schema  
```
{
  _id: Number,
  artistName: String,
  songTitle: String,
  mediaFile: String,
  postDate: Date,
  tag: [String],
  albumCover: String,
  comments: [
    {
      username: String, 
      avatar: String,
      comment: String,
    },
  ]
}
```
