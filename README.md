# RESTful API

Backend RESTful API  with all CRUD operations using NodeJS, MongoDB and Redis

## Getting started

--- Docker -----------

## Structure

- [README.md](README.md)
   - __api__
     - __controllers__
       - [getUpload.js](api/controllers/getUpload.js)
       - [movies.js](api/controllers/movies.js)
     - __middleware__
       - [pagination.js](api/middleware/pagination.js)
     - __models__
       - [movie.js](api/models/movie.js)
     - __public__
       - __style__
         - [upload.css](api/public/style/upload.css)
         - [upload.css.map](api/public/style/upload.css.map)
         - [upload.scss](api/public/style/upload.scss)
     - __routes__
       - [index.js](api/routes/index.js)
       - [upload.js](api/routes/upload.js)
     - __test__
       - [test.js](api/test/test.js)
     - __views__
       - [upload.html](api/views/upload.html)
   - __collection__
     - [movies.json](collection/movies.json)
   - [node\_modules](node_modules)
   - [package\-lock.json](package-lock.json)
   - [package.json](package.json)
   - [server.js](server.js)

## REST API

| URL                      | HTTP REQ | RESULT                      |
|--------------------------|----------|-----------------------------|
| /movies                  | GET      | all movies                  |
| /movies/:id              | GET      | one movie                   |
| /movies/:id/images/:type | GET      | one movie image of type     |
| /movies                  | POST     | new movie created           |
| /movies/:id              | PATCH    | movie fields edited         |
| /movies/:id              | DELETE   | movie deleted               |
| /upload/                 | GET      | go to upload page           |
| /upload/                 | POST     | upload JSON collection file |

## QUERIES

| QUERY          | FUNCTION                                              | EXAMPLE                  |
|----------------|-------------------------------------------------------|--------------------------|
| search         | search string among titles                            | /movies?search=star wars |
| genre          | search string matching with genres                    | /movies?genre=scifi      |
| page=*&limit=* | set visualized page and number of items per each page | /movies?page=1&limit=5   |

## UPLOAD FILE

### Manually

- Go to /upload and upload the file through the form. The file will be saved into the collection folder and automatically transfer the items to mongoDB

### via API

- Make a POSTMAN or similar POST request to /upload, no headers, body: form-data, with file option


--------------------------------

A movie should have at least the following fields (feel free to add more):
- title
- description
- shortDescription
- duration
- releaseDate
- images (an object with the url of the image for the cover, for the poster, etc)
- genres
1. The GET /movies endpoint should list all movies and work with pagination.
2. It should be possible to retrieve only 1 movie as well.
3. Provide an easy way to populate the movies collection/table, like a file that could be imported directly to
the database or via the API in bulk mode.

4. The infrastructure to serve the API should be entirely configured using Docker with docker-compose
5. Use OOP
6. Preferably use TypeScript
7. Use MongoDB or PostgreSQL for the database
8. Document the endpoints in an OpenAPI (JSON) file in the repository
9. Care about input validation and error handling with correct HTTP codes
10. Use a logger
11. Write your code as production grade.

Optional tasks:
1. Cache the GET /movies endpoint using Redis and deal with cache invalidation
2. Implement search functionality for the movies
3. Create at least one integration test or unit test
4. Image upload and retrieval from S3 using the AWS SDK
5. Create a Postman collection for accessing your API and export it to the repository (We will love you for
that)
6. Integrate your project with a CI service (Travis, for example) to further grab our attention
