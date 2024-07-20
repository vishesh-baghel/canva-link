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
      (folder) => folder.type === 'folder'
    );

    const folders = folderList.map((folder) => {
      return {
        folderId: folder.folder.id,
        folderName: folder.folder.name,
      };
    });

    // You can do any parsing you need for results here before returning them

    return [folders];
  });
};

module.exports = {
  display: {
    description: 'Find all folders in your Canva project',
    hidden: false,
    label: 'Find All Folders',
  },
  key: 'find_all_folders',
  noun: 'Folders',
  operation: {
    sample: { folderId: 'FAFLOu2relw', folderName: 'auto-export' },
    outputFields: [],
    perform: perform,
  },
};
