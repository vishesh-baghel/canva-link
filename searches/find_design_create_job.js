const perform = async (z, bundle) => {
  const options = {
    url: `https://api.canva.com/rest/v1/exports/${bundle.inputData.export_id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them
    const url = results.job.urls[0];

    return [{ url }];
  });
};

module.exports = {
  display: {
    description: 'Find design export job for the corresponding design id',
    hidden: false,
    label: 'Find Design Export Job',
  },
  key: 'find_design_create_job',
  noun: 'Design Export Job',
  operation: {
    inputFields: [
      {
        key: 'export_id',
        label: 'Export Id',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: {
      url: 'https://export-download.canva.com/VILN0/DAEVSbVILN0/-1/0/0001-392248233031119500.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20240722%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240722T013944Z&X-Amz-Expires=59670&X-Amz-Signature=a2d368346bf9c44d4ea857e242ea5cbe2dc3834d3adcf1329666e44d7b253098&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Mon%2C%2022%20Jul%202024%2018%3A14%3A14%20GMT',
    },
    outputFields: [{ key: 'url', label: 'Downloadable Url' }],
  },
};
