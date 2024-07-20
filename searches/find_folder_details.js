const perform = async (z, bundle) => {
  const options = {
    url: `https://api.canva.com/rest/v1/folders/${bundle.inputData.folder_id}`,
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

    return [results.folder];
  });
};

module.exports = {
  display: {
    description:
      'You can find the details about a folder by entering the folder Id. ',
    hidden: false,
    label: 'Find Folder Details',
  },
  key: 'find_folder_details',
  noun: 'Folder Details',
  operation: {
    inputFields: [
      {
        key: 'folder_id',
        label: 'Folder ID',
        type: 'string',
        helpText: 'Enter the folder Id to find the details about that folder',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'f-1',
      name: 'test-folder',
      created_at: 1721149578,
      updated_at: 1721149578,
    },
    outputFields: [
      { key: 'id', label: 'Folder ID', type: 'string' },
      { key: 'name', label: 'Folder Name', type: 'string' },
      { key: 'created_at', label: 'Folder Creation Time', type: 'number' },
      { key: 'updated_at', label: 'Folder Updation Time', type: 'number' },
    ],
    perform: perform,
  },
};
