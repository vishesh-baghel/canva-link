const { fs } = require("fs");
const http = require("https");

// const makeDownloadStream = (url, z) => {
//   return new Promise((resolve, reject) => {
//     z.request({
//       url: url,
//       method: "GET",
//       raw: true, // Ensures that the response is returned as a stream
//     })
//       .then((response) => {
//         z.console.log("Downloading file");
//         const stream = response.body;
//         stream.pause(); // Pause the stream to prevent data from being lost
//         resolve({
//           stream: stream,
//         });
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

const makeDownloadStream = (url) =>
  new Promise((resolve, reject) => {
    http
      .request(url, (res) => {
        // We can risk missing the first n bytes if we don't pause!
        res.pause();
        resolve(res);
      })
      .on("error", reject)
      .end();
  });

// Function to perform the request
const perform = (z, bundle) => {
  z.console.log("Starting the upload job");
  return makeDownloadStream(bundle.inputData.design_download_url, z)
    .then((stream) => {
      z.console.log("Downloaded the file");
      // const form = new FormData();
      // form.append('filename', bundle.inputData.filename);
      // form.append('file', stream);

      const fileTitle = bundle.inputData.file_title;
      // const encodedTitle = Buffer.from(fileTitle).toString('base64');

      // Resume the stream before sending the request
      stream.resume();

      return z.request({
        url: "https://api.canva.com/rest/v1/imports",
        method: "POST",
        body: stream,
        headers: {
          Authorization: `Bearer ${bundle.authData.access_token}`,
          "Content-Length": `${bundle.inputData.file_size}`,
          "Content-Type": "application/octet-stream",
          "Import-Metadata": JSON.stringify({
            title_base64: Buffer.from(fileTitle).toString("base64"),
          }),
        },
      });
    })
    .then((response) => {
      z.console.log("Uploaded the file");
      if (response && response.status >= 200 && response.status < 300) {
        return {
          data: response.data, // Ensure response.data is an object
        };
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    })
    .catch((error) => {
      // Handle errors if necessary
      z.console.log("Error occurred");
      z.console.log(error);
      // throw error;
    });
};
fstat;
return perform();
