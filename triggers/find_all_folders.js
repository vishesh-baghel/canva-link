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

    let index = 0;
    const folders = folderList.map((folder) => {
      return {
        id: index++,
        folderId: folder.folder.id,
        folderName: folder.folder.name,
      };
    });

    // You can do any parsing you need for results here before returning them

    return folders;
  });
};

module.exports = {
  operation: {
    perform: perform,
    canPaginate: false,
    sample: { id: 0, folderId: 'FAFLebd92o8', folderName: 'auto-export' },
    outputFields: [
      { key: 'id', label: 'Item Id' },
      { key: 'folderId', label: 'Folder ID' },
      { key: 'folderName', label: 'Folder Name' },
    ],
  },
  display: {
    description: 'Finds all folders present in your Canva project',
    hidden: false,
    label: 'Find All Folders',
  },
  key: 'find_all_folders',
  noun: 'All Folders',
};
