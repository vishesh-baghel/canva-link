const perform = async (z, bundle) => {
  const options = {
    url: `https://api.canva.com/rest/v1/folders/root/items`,
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
    const folderList = results.items.filter(
      (folder) =>
        folder.type === 'folder' && folder.folder.name === 'auto-export'
    );

    const folder = folderList.map((folder) => {
      return {
        auto_export_folder_id: folder.folder.id,
      };
    });

    // You can do any parsing you need for results here before returning them

    return folder;
  });
};

module.exports = {
  display: {
    description:
      "Finds or creates a folder named 'auto-export' in your canva projects",
    hidden: false,
    label: 'Find or Create Auto-Export Folder',
  },
  key: 'find_or_create_auto_export_folder',
  noun: 'Auto-export Folder',
  operation: {
    sample: { auto_export_folder_id: 'FAFLeUN1ONg' },
    outputFields: [
      { key: 'auto_export_folder_id', label: 'Auto Export Folder ID' },
    ],
    perform: perform,
  },
};
