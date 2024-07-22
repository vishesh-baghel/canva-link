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
        type: bundle.inputData.type,
        quality: bundle.inputData.quality,
        export_quality: bundle.inputData.export_quality,
        height: bundle.inputData.height,
        width: bundle.inputData.width,
        lossless: bundle.inputData.lossless,
        as_single_image: bundle.inputData.as_single_image,
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
    description: 'Creates a design export job for images',
    hidden: false,
    label: 'Create Design Export Job For Images',
  },
  key: 'create_design_export_job_for_images',
  noun: 'Design Export Job',
  operation: {
    inputFields: [
      {
        key: 'design_id',
        label: 'Design ID',
        type: 'string',
        helpText: 'Required to create the export job on Canva',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'type',
        label: 'Format Type',
        type: 'string',
        choices: ['png', 'jpg'],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'quality',
        label: 'Design Quality',
        type: 'integer',
        default: '100',
        helpText:
          "Applicable for 'jpg' type. The quality of the exported design determines how compressed the exported file should be. A low quality value (minimum 1) will create a file with a smaller file size, but the resulting file will have pixelated artifacts when compared to a file created with a high quality value (maximum 100).",
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'export_quality',
        label: 'Export Quality',
        type: 'string',
        helpText:
          "Specifies the export quality of the design. Please make sure that you won't be able to export premium elements if you are not subscribed to the Canva Pro Plan.",
        choices: ['regular', 'pro'],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'height',
        label: 'Height',
        type: 'integer',
        helpText:
          "It is optional to specify the height for the design export. It specifies the height in pixels of the exported image. If only one of height or width is specified, then the image will be scaled to match that dimension, respecting the design's aspect ratio. If no width or height is specified, the image will be exported using the dimensions of the design.",
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'width',
        label: 'Width',
        type: 'integer',
        helpText:
          "Is is optional to specify this field. It specifies the width in pixels of the exported image. If only one of height or width is specified, then the image will be scaled to match that dimension, respecting the design's aspect ratio. If no width or height is specified, the image will be exported using the dimensions of the design.",
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'lossless',
        label: 'Lossless',
        type: 'boolean',
        default: 'false',
        helpText:
          "Application for 'png' type. When true, the PNG is compressed with a lossless compression algorithm (false by default).",
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'as_single_image',
        label: 'As Single Image',
        type: 'boolean',
        default: 'false',
        helpText:
          "Applicable for 'png' type. When true, multi-page designs are merged into a single image. When false (default), each page is exported as a separate image.",
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: { job: { id: '3265544793552849979', status: 'in_progress' } },
    outputFields: [
      { key: 'job_id', label: 'Job Id' },
      { key: 'job_status', label: 'Job status' },
    ],
  },
};
