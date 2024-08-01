const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.canva.com/rest/v1/folders/move',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {
      from_folder_id: bundle.inputData.from_folder_id,
      to_folder_id: bundle.inputData.to_folder_id,
      item_id: bundle.inputData.item_id,
    },
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
    description: 'You can move an design from one folder to another',
    hidden: false,
    label: 'Move Folder Item',
  },
  key: 'move_folder_items',
  noun: 'Move Folder Item Job',
  operation: {
    inputFields: [
      {
        key: 'from_folder_id',
        label: 'Origin Folder Id',
        type: 'string',
        helpText: 'The Folder from which you want to move designs.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'to_folder_id',
        label: 'Destination Folder Id',
        type: 'string',
        helpText: 'The folder in which you want to move designs.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'item_id',
        label: 'Folder Item Id',
        type: 'string',
        helpText:
          'The unique id of the item that you want to move from origin to destination folder.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
  },
};
