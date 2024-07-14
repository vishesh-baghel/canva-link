module.exports = {
  operation: {
    perform: {
      params: { folderId: 'root' },
      removeMissingValuesFrom: { body: false, params: false },
      url: 'https://api.canva.com/rest/v1/folders/{folderId}',
    },
    type: 'polling',
    canPaginate: true,
  },
  display: {
    description:
      'Fetch the list of all folders present in your Canva workspace',
    hidden: false,
    label: 'All Folders',
  },
  key: 'get_all_folders',
  noun: 'Get All Folders',
};
