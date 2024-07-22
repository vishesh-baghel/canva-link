const perform = async (z, bundle) => {
  function createFolderRequest(subFolderName) {
    const options = {
      url: 'https://api.canva.com/rest/v1/folders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`,
      },
      body: {
        parent_folder_id: bundle.inputData.parent_folder_id,
        name: `${subFolderName}-auto-export`,
      },
      removeMissingValuesFrom: {
        body: false,
        params: false,
      },
    };

    return z.request(options).then((response) => {
      const results = response.json;
      console.log('API Response:', results);

      // Ensure the response structure matches your expectations
      if (results && results.folder && results.folder.id) {
        return results.folder.id;
      } else {
        throw new Error(
          `Unexpected API response structure: ${JSON.stringify(results)}`
        );
      }
    });
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function createFoldersWithDelay() {
    try {
      const imageFolderId = await createFolderRequest('image');
      await delay(1000); // 1-second delay

      const documentsFolderId = await createFolderRequest('documents');
      await delay(1000); // 1-second delay

      const videoFolderId = await createFolderRequest('video');

      return {
        image_auto_export_folder_id: imageFolderId,
        documents_auto_export_folder_id: documentsFolderId,
        video_auto_export_folder_id: videoFolderId,
      };
    } catch (error) {
      console.error('Error creating folders:', error);
      throw error; // Re-throw the error to handle it appropriately in your application
    }
  }

  return createFoldersWithDelay();
};

module.exports = {
  display: {
    description:
      'Creates sub folders for different design type like images, videos, documents etc. ',
    hidden: false,
    label: 'Create Auto Export Sub Folders',
  },
  key: 'create_auto_export_sub_folders',
  noun: 'Auto Export Sub folder',
  operation: {
    inputFields: [
      {
        key: 'parent_folder_id',
        label: 'Parent Folder Id',
        type: 'string',
        default: 'root',
        helpText:
          'The Folder Id for the auto-export folder created before creating the sub folders on the basis of design type formats.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      image_auto_export_folder_id: 'FAFLgIPJTyk',
      documents_auto_export_folder_id: 'FAFLgHeQnNI',
      video_auto_export_folder_id: 'FAFLgC2DzU0',
    },
    outputFields: [
      {
        key: 'image_auto_export_folder_id',
        label: 'Image Auto Export Folder ID',
      },
      {
        key: 'documents_auto_export_folder_id',
        label: 'Documents Auto Export Folder ID',
      },
      {
        key: 'video_auto_export_folder_id',
        label: 'Video Auto Export Folder ID',
      },
    ],
    perform: perform,
  },
};
