module.exports = {
  operation: {
    perform: {
      params: { export_directory: '{{bundle.inputData.export_directory}}' },
    },
    inputFields: [
      {
        key: 'export_directory',
        type: 'string',
        label: 'Export folder',
        helpText: 'Select the folder that you want to share with Google drive',
        default: 'google-drive-export',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  display: {
    description: 'Exports an asset from Canva folder to Google Drive folder',
    hidden: false,
    label: 'Export Asset',
  },
  key: 'export_asset',
  noun: 'Canva Asset Export',
};
