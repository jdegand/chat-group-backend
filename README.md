<h1 align="center">Chat Group Backend</h1>

<div align="center">
   Solution for a challenge from  <a href="https://web.archive.org/web/20231130042247/https://legacy.devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0" target="_blank">Devchallenges.io</a>.
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [Thoughts](#thoughts)
- [Continued Development](#continued-development)
- [How to use](#how-to-use)
- [Useful Resources](#useful-resources)

## Overview

### Built With

- express generator
- bcrypt
- cookie-parser
- cors
- express
- jsonwebtoken
- mongoose
- multer

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://web.archive.org/web/20231130042247/https://legacy.devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0) was to build an application to complete the given user stories. **Note**: The previous design document may be incomplete, as you need to find an archived version of the challenge as all `legacy` challenges have had their documentation removed from DevChallenges.

## Thoughts

- I left many routes open - could add `JWTVerifys` to all routes vs. just the mutate routes (post, put, delete).
- Messages and Channels are open. You can see the chat before signing in.
- Need another server, `socket.io`, to have chat group be realtime across users - don't think so - because useEffect will update the view when channels and messages change
- `Promise.all()` might be needed for multiple route calls in some functions - async - have to worry about order of results.
- Design choice: seeding the database vs. using my hacky way of creating a welcome channel if it doesn't exist.
- "select: false" in model vs removing field with `.select('-password')` vs removing field in `populate` call - what is best approach?
- Password field may be sent back in some calls - intermediate step - password forwarded along with userInfo then removed later - should exlude first and then forward or overly concerned - password is hashed and protected by jwt
- You can't pass two parameters to the same route because Express can't differentiate between them. You need to add an extra word in between i.e. `/:channel/:id` vs. `/:channel/id/:id`.
- `Channel` controller has a very convoluted route because of that and it could be cleaned up.
- Design choice: sorting with Mongoose vs. sorting `response.data` in the client. In React, use `memo` on the data.
- Multer and controllers don't mix.
- Getting file path is difficult - fakepath issues - can't get the file to save - the folder will be created - dir name in Multer middleware.
- I had issues with the Multer callback syntax. `console.logs` need to be inside functions inside the callbacks.
- Added `fs.unlink` logic to remove photos that are no longer tied to user profiles.
- Profile pictures are sourced from [freepik](https://freepik.com).  Check for links below - the majority of pictures belong to the same series.
- Added `public/uploads` to `.gitignore`.

## Continued Development

- Adding `helmet` will give better security for the server.
- Testing
- Multer (2.0) may require significant changes.
- To upgrade application to Express 5, some other changes may be needed.  I removed `maxAge` from the cookie used and move may need to be done.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/jdegand/chat-group-backend.git

# Install dependencies
$ npm install

# Add env variables (PORT, MONGO_URI, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET) and connect to mongo

# Run the app
$ npm start
```

## Useful Resources

- [Steps to replicate a design with only HTML and CSS](https://devchallenges-blogs.web.app/how-to-replicate-design/)
- [Mafia vector created by pikisuperstar - www.freepik.com](https://www.freepik.com/vectors/mafia)
- [Cute cat vector created by catalyststuff - www.freepik.com](https://www.freepik.com/vectors/cute-cat)
- [3d avatar psd created by freepik - www.freepik.com](https://www.freepik.com/psd/3d-avatar)
- [Github](https://github.com/piyush-eon/notezipper) - Notezipper
- [Stack Overflow](https://stackoverflow.com/questions/60323551/how-to-exclude-password-field-in-the-response-in-mongodb) - exclude password field in response
- [Stack Overflow](https://stackoverflow.com/questions/40370363/express-routes-with-same-path-but-different-parameters) - express routes with same path but different parameters
- [Stack Overflow](https://stackoverflow.com/questions/12096262/how-to-protect-the-password-field-in-mongoose-mongodb-so-it-wont-return-in-a-qu) - populate and exclude fields
- [Stack Overflow](https://stackoverflow.com/questions/44860181/mongoose-findbyidandupdate-not-adding-item-in-array) - findByIdAndUpdate and arrays
- [Stack Overflow](https://stackoverflow.com/questions/36193289/moongoose-aggregate-match-does-not-match-ids) - mongoose matching ids
- [Stack Overflow](https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings) - compare mongoose ids
- [Stack Overflow](https://stackoverflow.com/questions/70899119/filter-an-array-to-return-matching-ids-of-a-nested-array-in-javascript) - filter nested array
- [Stack Overflow](https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call) - mutiple query populates in single call
- [Stack Overflow](https://stackoverflow.com/questions/67264632/mongoose-sorting-by-createdat) - mongoose sorting by createdAt
- [Express Docs](http://expressjs.com/en/resources/middleware/multer.html) - multer middleware
- [Stack Overflow](https://stackoverflow.com/questions/27213418/node-js-and-multer-handle-the-destination-of-the-uploaded-file-in-callback-fun) - destination of uploaded file multer
- [Stack Overflow](https://stackoverflow.com/questions/58474765/how-to-call-multer-middleware-inside-a-controller-in-nodejs) - multer and controllers
- [Stack Overflow](https://stackoverflow.com/questions/52206055/nodejs-multer-diskstorage-not-working-why-destination-targeting-temp-folder-an) - destination troubleshooting multer
- [Stack Overflow](https://stackoverflow.com/questions/69347579/multer-didnt-work-for-me-not-storing-image-in-local-folder-or-database) - storing image in local folder
- [Positronx](https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/) - file upload tutorial with express & multer
- [Stack Overflow](https://stackoverflow.com/questions/33976006/multer-wont-recognize-files-with-put) - multer & put
- [Stack Overflow](https://stackoverflow.com/questions/4851595/how-to-resolve-the-c-fakepath) - fakepath in image file name
- [Stack Overflow](https://stackoverflow.com/questions/29317045/why-i-cant-directly-set-console-log-as-callback-function) - console.log and callback functions
- [Stack Overflow](https://stackoverflow.com/questions/34697502/how-to-limit-the-file-size-when-uploading-with-multer) - limit file size 
- [CodingShisha](https://codingshiksha.com/javascript/node-js-multer-file-upload-type-validation-filters-and-limit-file-size-and-error-handling-using-express-full-tutorial-for-beginners-with-examples/) - multer validation
- [Blog](https://sebhastian.com/node-check-if-file-exists/#:~:text=In%20NodeJS%2C%20You%20can%20check,%3D%20require(%22fs%22)%3B) - node check if file exists
- [Geeks for Geeks](https://www.geeksforgeeks.org/node-js-fs-readdir-method/) - node fs readdir method
