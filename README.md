# filein

> Super fast file hosting, one drag away

<https://file-in.web.app>

## API

`POST https://file-in.web.app/upload`

The request body should contain raw binary data (for example, a `Buffer` in Node.js).

The MIME type is automatically detected, but as a fallback,
you can pass in a `Content-Type` header if the MIME type couldn't be detected for some reason.

The response is the file URL.
