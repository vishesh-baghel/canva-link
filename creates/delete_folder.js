const perform = async (z, bundle) => {
  const options = {
    url: `https://api.canva.com/rest/v1/folders/${bundle.inputData.folder_id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {},
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return { results };
  });
};

module.exports = {
  display: {
    description: 'Deletes a folder in Canva Projects by ID',
    hidden: false,
    label: 'Delete Folder',
  },
  key: 'delete_folder',
  noun: 'Delete Folder',
  operation: {
    inputFields: [
      {
        key: 'folder_id',
        label: 'Folder Id',
        type: 'string',
        helpText: 'Id of the folder that you want to delete',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
  },
};
