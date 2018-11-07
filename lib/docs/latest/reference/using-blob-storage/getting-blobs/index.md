# Getting blobs

To get a blob, call the `getBlob` function of the depot SDK and pass the blob ID as parameter. This returns an object that contains the blob and its file name and content type. In Node.js the blob is returned as a stream, in the browser it is returned as an instance of `Blob`:

```javascript
const { content, contentType, fileName } = await depotClient.getBlob({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401'
});
```

In the browser there are different ways to process the blob: For example, you can use the `FileReader` class to read the blob or convert it to a data url. For details on how to use this see [Reading files in JavaScript using the File APIs](https://www.html5rocks.com/en/tutorials/file/dndfiles/).

To read the blob into an array, use the following code:

```javascript
const { content, fileName, contentType } = await depotClient.getBlob({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401'
});

const reader = new FileReader();

reader.addEventListener('loadend', () => {
  // result is an instance of ArrayBuffer.
  console.log(reader.result);
});

reader.readAsArrayBuffer(content);
```

## Using data urls

To convert a blob to a data url, use the `asDataUrl` function with the result of the call to the `getBlob` function:

```javascript
const blob = await depotClient.getBlob({
  id: '2a7e9f8f-9bfc-4c19-87b9-274c0e193401'
});

const dataUrl = await blob.asDataUrl();
```

You can use a data url, for example, to easily display blobs containing images:

```javascript
const image = new Image();

image.src = dataUrl;

document.body.appendChild(image);
```

## Using the HTTP API

To get a blob using the HTTP API, call the route `GET /api/v1/blob/:id` and provide the blob ID as part of the path.

To authenticate your request, proceed as described in [accessing blob storage](../accessing-blob-storage/#using-the-http-api).

If the blob was successfully read, you will receive the status code `200` and the blob in the response body. The content type is provided in the `content-type` header. The blob ID and its file name are sent in the `x-metadata` header as a stringified JSON object with the following structure:

```json
{
  "id": "2a7e9f8f-9bfc-4c19-87b9-274c0e193401",
  "contentType": "image/png",
  "fileName": "wolkenkit.png"
}
```

In case of errors, you will receive one of the following error codes:

- `401 (Unauthorized)`
- `404 (Not found)`
- `500 (Internal server error)`
