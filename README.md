# top-player

Server: `http://localhost:3001`   
Initialize: 'npm install'  
Create Client Bundle: 'npm run react-dev'  
Start Server: 'npm run server-dev'  
Start Seed Script: 'npm run seedmongo'  


## API Routes

### Create  
Path: `/api`  
HTTP Method: POST  
Inputs: req.data is JSON object conforming to Song schema (below)  
Response: Error code 400 if operation failed, or success JSON object containing:  
  * nCreated: (1) number of documents inserted  
  * `_id`: `_id` of inserted document  

### Read (Random)  
Path: `/api`  
HTTP Method: GET  
Inputs: None  
Response: Error code 404 if operation failed, or success JSON object conforming to Song schema (below) with randomly chosen `_id`  

### Read  
Path: `/api/:_id` (ex: `/api/5` for `_id` of 5)  
HTTP Method: GET  
Inputs: `_id` as URL parameter  
Response: Error code 404 if matching `_id` not found, or success JSON object conforming to Song schema (below) with matching `_id`  

### Update  
Path: `/api`  
HTTP Method: PUT  
Inputs: req.data is JSON object conforming to Song schema (below)  
Response: Error code 404 if matching `_id` not found, or success JSON object containing:  
  * modifiedCount: (1) number of documents modified  

### Delete  
Path: `/api/:_id` (ex: `/api/5` for `_id` of 5)  
HTTP Method: DELETE  
Inputs: `_id` as URL parameter  
Response: Error code 404 if matching `_id` not found, or success JSON object containing:  
  * deletedCount: (1) number of documents deleted  
    
### Song Schema  
```
{
  _id: Number,
  artistName: String,
  songTitle: String,
  mediaFile: String,
  postDate: Date,
  tag: [String, String, String],
  albumCover: String,
  comments: [
    {
      username: String, 
      avatar: String,
      comment: String,
    }
  ]
}
```
