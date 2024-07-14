const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.canva.com/rest/v1/folders/{folderId}/items',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      folderId: bundle.inputData.folderId,
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  display: {
    description:
      'Find all the items present in an folder in your Canva workspace',
    hidden: false,
    label: 'Find Folder Items',
  },
  key: 'find_folder_items',
  noun: 'Folder Items',
  operation: {
    inputFields: [
      {
        key: 'folderId',
        label: 'Folder ID',
        type: 'string',
        helpText: 'Enter the ID of the folder to get the list of items stored.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
  },
};
