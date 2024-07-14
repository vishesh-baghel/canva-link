const test = async (z, bundle) => {
  const options = {
    url: 'https://api.canva.com/rest/v1/users/me/profile',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
    body: {
      token: bundle.authData.access_token,
      client_id: process.env.CLIENT_SECRET,
      client_secret: process.env.CLIENT_SECRET,
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const getAccessToken = async (z, bundle) => {
  const options = {
    url: 'https://api.canva.com/rest/v1/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    params: {},
    body: {
      grant_type: 'authorization_code',
      code: bundle.inputData.code,
      code_verifier: bundle.inputData.code_verifier,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: bundle.inputData.redirect_uri,
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const refreshAccessToken = async (z, bundle) => {
  const options = {
    url: 'https://api.canva.com/rest/v1/oauth/token',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    params: {},
    body: {
      refresh_token: bundle.authData.refresh_token,
      grant_type: 'refresh_token',
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const connectionLabel = async (z, bundle) => {
  return bundle.inputData.profile.display_name;
};

module.exports = {
  type: 'oauth2',
  test: test,
  oauth2Config: {
    authorizeUrl: {
      url: 'https://www.canva.com/api/oauth/authorize?response_type=code&client_id=OC-AZBa6gfy8pLV&scope=design:content:read%20design:meta:read%20design:content:write%20design:permission:read%20design:permission:write%20folder:read%20folder:write%20folder:permission:read%20folder:permission:write%20asset:read%20asset:write%20comment:read%20comment:write%20brandtemplate:meta:read%20brandtemplate:content:read%20profile:read',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
      },
    },
    getAccessToken: getAccessToken,
    refreshAccessToken: refreshAccessToken,
    enablePkce: true,
    autoRefresh: true,
  },
  connectionLabel: connectionLabel,
};
