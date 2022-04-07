- [Routes](#routes)
  - [/signup](#signup)
    - [POST](#post)
  - [/login](#login)
    - [GET](#get)
    - [POST](#post-1)

# Routes
## /signup
### POST
- Make a POST request with JSON keys: email, authHash, clientSalt
- The server takes the authHash, hashes it with PBKDF2 another 100000 times before storing it into the database
  - The server uses another serverSalt to salt the hash before storing it with SQLite3

## /login
### GET
- Make a GET request with email in query string 
- Check to see if the account is properly registered in the database
- Sends the clientSalt needed to derive the masterkey to the client

### POST
- Make a POST request with JSON keys: email, authHash
- Server checks if email and authHash match what is in the database
- If so, it can send the client their encrypted vault

