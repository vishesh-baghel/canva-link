const perform = async (z, bundle) => {
  const options = {
    url: `https://api.canva.com/rest/v1/imports/${bundle.inputData.job_id}`,
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
    const status = results.status.state;

    return [{ status }];
  });
};

module.exports = {
  display: {
    description: 'Find the status of the design import job in Canva',
    hidden: false,
    label: 'Find Design Import Job',
  },
  key: 'find_design_import_job',
  noun: 'Design Import Job',
  operation: {
    inputFields: [
      {
        key: 'job_id',
        label: 'Job ID',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: { status: 'success' },
    outputFields: [{ key: 'status', label: 'Job Status' }],
  },
};
