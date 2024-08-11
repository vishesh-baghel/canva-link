const perform = async (z, bundle) => {
  const makeDownloadStream = (url, z) => {
    return new Promise((resolve, reject) => {
      z.request({
        url: url,
        method: 'GET',
        raw: true, // Ensures that the response is returned as a stream
      })
        .then((response) => {
          z.console.log('Downloading file');

          // Calculate the size by buffering the entire stream
          const chunks = [];
          response.body.on('data', (chunk) => {
            chunks.push(chunk);
          });

          response.body.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const contentLength = buffer.length;
            z.console.log(`File size: ${contentLength} bytes`);

            // Pause the stream and resolve with the buffer and size
            response.body.pause();
            resolve({ buffer, contentLength });
          });

          response.body.on('error', (error) => {
            reject(error);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const perform = (z, bundle) => {
    z.console.log('Starting the upload job');

    return makeDownloadStream(bundle.inputData.design_download_url, z)
      .then(({ buffer, contentLength }) => {
        z.console.log('Downloaded the file');

        const fileTitle = bundle.inputData.file_title;
        const encodedTitle = Buffer.from(fileTitle).toString('base64');

        z.console.log('Resuming stream and preparing upload');

        return z.request({
          url: 'https://api.canva.com/rest/v1/imports',
          method: 'POST',
          body: buffer,
          headers: {
            Authorization: `Bearer ${bundle.authData.access_token}`,
            'Content-Length': `${contentLength}`,
            'Content-Type': 'application/octet-stream',
            'Import-Metadata': JSON.stringify({ title_base64: encodedTitle }),
          },
        });
      })
      .then((response) => {
        z.console.log('Uploaded the file');
        if (response && response.status >= 200 && response.status < 300) {
          return response.data;
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      })
      .catch((error) => {
        z.console.error('Error occurred during upload', error);
        throw error;
      });
  };

  return perform(z, bundle);
};

module.exports = {
  display: {
    description: 'Creates a job for importing designs to your Canva projects',
    hidden: false,
    label: 'Create Design Import Job',
  },
  key: 'create_design_import_job',
  noun: 'Design Import Job',
  operation: {
    inputFields: [
      {
        key: 'design_download_url',
        label: 'Design Download Url',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'file_title',
        label: 'File Title',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: { job_id: '595846083' },
    outputFields: [{ key: 'job_id', label: 'Job Id' }],
    perform: perform,
  },
};
