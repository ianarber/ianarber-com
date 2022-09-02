const axios = require("axios");

exports.handler = async function (event, context) {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
  const CONTENTFUL_BASE_URL = "https://cdn.contentful.com";
  const CONTENT_TYPE = "listenPageAlbums";
  const GET_URL = `${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`;

  try {
    const response = await axios.get(GET_URL);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({ ...response.data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
