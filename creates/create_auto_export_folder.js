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
      parent_folder_id: 'root',
      name: 'auto-export',
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return {
      auto_export_folder_id: results.folder.id,
    };
  });
};

module.exports = {
  display: {
    description: 'Creates Auto Export Folder in your Canva Project',
    hidden: true,
    label: 'Create Auto Export Folder',
  },
  key: 'create_auto_export_folder',
  noun: 'Auto Export folder',
  operation: {
    sample: { auto_export_folder_id: 'FAFLeQVzXYo' },
    outputFields: [
      { key: 'auto_export_folder_id', label: 'Auto Export Folder ID' },
    ],
    perform: perform,
  },
};
