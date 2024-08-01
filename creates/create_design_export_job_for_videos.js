const perform = async (z, bundle) => {
  const designExportJobOptions = {
    url: 'https://api.canva.com/rest/v1/exports',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {
      design_id: bundle.inputData.design_id,
      format: {
        type: 'mp4',
        quality: bundle.inputData.quality,
        export_quality: bundle.inputData.export_quality,
      },
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  const designExportJob = z.request(designExportJobOptions).then((response) => {
    const results = response.json;
    // z.console.log(bundle.inputData.format)

    return results;
  });

  return designExportJob;
};

module.exports = {
  display: {
    description:
      'Creates a design export job for videos from your canva projects ',
    hidden: false,
    label: 'Create Design Export Job For Videos',
  },
  key: 'create_design_export_job_for_videos',
  noun: 'Design Export Job',
  operation: {
    inputFields: [
      {
        key: 'design_id',
        label: 'Design ID',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'quality',
        label: 'Design Quality',
        type: 'string',
        default: 'horizontal_480p',
        choices: [
          'horizontal_480p',
          'horizontal_720p',
          'horizontal_1080p',
          'horizontal_4k',
          'vertical_480p',
          'vertical_720p',
          'vertical_1080p',
          'vertical_4k',
        ],
        helpText:
          'For the mp4 type, the quality is the orientation and resolution of the exported video. Orientation is either horizontal or vertical, and resolution is one of 480p, 720p, 1080p or 4k.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'export_quality',
        label: 'Export Quality',
        type: 'string',
        default: 'regular',
        choices: ['regular', 'pro'],
        helpText:
          "Specifies the export quality of the design. Please make sure that you won't be able to export premium elements if you are not subscribed to the Canva Pro Plan",
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: { job: { id: '7072213316422536874', status: 'in_progress' } },
    outputFields: [{ key: 'job_id', label: 'Job Id' }],
  },
};
