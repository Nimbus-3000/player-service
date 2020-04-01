# top-player

Server: http://localhost:3001
Initialize: 'npm install'
Create Client Bundle: 'npm run react-dev' 
Start Server: 'npm run server-dev'
Start Seed Script: 'npm run seedmongo'

# ########## #
# API Routes #
# ########## #

# Create
Path: `/api`
HTTP Method: POST
Inputs:
  -req.data is JSON object conforming to Song schema (below)
Response:
  -Error code 400 if operation failed, or
  -Success JSON object containing:
    -nMatched: (0) number of documents found with matching _id to inserted document
    -nUpserted: (1) number of documents inserted
    -nModified: (0) number of documents modified by query
    -_id: _id of inserted document

# Read (RANDOM)
Path: `/api`
HTTP Method: GET
Inputs: None
Response:
  -Error code 404 if operation failed, or
  -Success JSON object conforming to Song schema (below) with randomly chosen _id

# Read
Path: `/api/:_id` (ex: `/api/5` for _id = 5)
HTTP Method: GET
Inputs:
  -_id as URL parameter
Response:
  -Error code 404 if matching _id not found, or
  -Success JSON object conforming to Song schema (below) with matching _id

# Update
Path: `/api`
HTTP Method: PUT
Inputs:
  -req.data is JSON object conforming to Song schema (below)
Response:
  -Error code 404 if matching _id not found, or
  -Success JSON object containing:
    -acknowledged: (true) boolean indicating if request was accepted
    -matchedCount: (1) number of documents found with matching _id
    -modifiedCount: (1) number of documents modified

# Delete
Path: `/api/:_id` (ex: `/api/5` for _id = 5)
HTTP Method: DELETE
Inputs:
  -_id as URL parameter
Response:
  -Error code 404 if matching _id not found, or
  -Success JSON object containing:
    -acknowledged: (true) boolean indicating if request was accepted
    -deletedCount: (1) number of documents deleted

# Song Schema
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
