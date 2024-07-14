const authentication = require('./authentication');
const exportAssetTrigger = require('./triggers/export_asset.js');
const getAllFoldersTrigger = require('./triggers/get_all_folders.js');
const createFolderCreate = require('./creates/create_folder.js');
const findFolderItemsSearch = require('./searches/find_folder_items.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  requestTemplate: {
    headers: { Authorization: 'Bearer {{bundle.authData.access_token}}' },
    params: {},
  },
  triggers: {
    [exportAssetTrigger.key]: exportAssetTrigger,
    [getAllFoldersTrigger.key]: getAllFoldersTrigger,
  },
  creates: { [createFolderCreate.key]: createFolderCreate },
  searches: { [findFolderItemsSearch.key]: findFolderItemsSearch },
  searchOrCreates: {
    find_folder_items: {
      create: 'create_folder',
      display: {
        description:
          'Find all the items present in an folder in your Canva workspace',
        label: 'Create Folder',
      },
      key: 'find_folder_items',
      search: 'find_folder_items',
    },
  },
};
