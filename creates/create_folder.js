const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.canva.com/rest/v1/folders',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {
      parent_folder_id: bundle.inputData.parent_folder_id,
      name: bundle.inputData.name,
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
    description: 'Create a folder in your Canva workspace',
    hidden: false,
    label: 'Create Folder',
  },
  key: 'create_folder',
  noun: 'Folder',
  operation: {
    inputFields: [
      {
        key: 'name',
        label: 'Folder',
        type: 'string',
        default: 'test-folder',
        helpText:
          'Name of the folder that you want to create inside Canva directory',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'parent_folder_id',
        label: 'Parent Folder ID',
        type: 'string',
        helpText:
          "The folder ID of the parent folder. To create a new folder at the top level of your projects, use the ID 'root'",
        default: 'root',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      folder: {
        id: 'FAFK7I9HjL8',
        name: 'test-1',
        created_at: 1720958735,
        updated_at: 1720958735,
      },
    },
    outputFields: [
      { key: 'folder_id', label: 'Folder ID' },
      { key: 'folder_name', label: 'Folder Name' },
    ],
    perform: perform,
  },
};
