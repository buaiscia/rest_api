# RESTful API

Backend RESTful API  with all CRUD operations using NodeJS, MongoDB and Redis

## Getting started

- Have Docker running
- Run 'docker-compose up'. This will start Redis, MongoDB and the application
- The application will be accessible on http://localhost
- The API entry point is /movies
- Requests are documented in the file openapi.json and in the postman collection file. Requests available are GET, POST, PATCH, DELETE
- To access an API endpoint from another application, it's possible, in the example of fetching one movie data, to make a GET ruquest on the endpoint hostname/movie/:id

## Upload bulk collection file

### Manually

- Go to /upload and upload the file through the form. The file will be saved into the collection folder and automatically transfer the items to mongoDB

### via API

- Make a POSTMAN or similar POST request to /upload, no headers, body: form-data, with file option

## Queries

It's possible to search for title or genre, adding params.query.title  ( /movies?search=** ) or genre ( /movies?genre=*** ).
Pagination is available on all queries through query.page and query.limit ( /movies?genre=scifi&page=1&limit=5)

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

### Notes

- There's a unit test for GET/POST requests
- S3 image upload/retrieval and CI integration optional points were not done

--------------------------------