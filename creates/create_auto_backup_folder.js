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
      name: 'auto-backup',
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
      auto_backup_folder_id: results.folder.id,
    };
  });
};

module.exports = {
  display: {
    description:
      'A backup folder for all the designs that were auto exported. ',
    hidden: false,
    label: 'Create Auto Backup Folder',
  },
  key: 'create_auto_backup_folder',
  noun: 'Auto Backup Folder',
  operation: {
    perform: perform,
    sample: { auto_backup_folder_id: 'FAFL4Fbjaxk' },
    outputFields: [
      { key: 'auto_backup_folder_id', label: 'Auto Backup Folder Id' },
    ],
  },
};
