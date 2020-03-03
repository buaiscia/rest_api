Create a REST API using Express or Restify with endpoints to Create, Read, Update and Delete Movies.

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


### Issues

- fix missing validation in upload file