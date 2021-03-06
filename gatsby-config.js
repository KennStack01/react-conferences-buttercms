require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const previewMode = !(
  process.env.GATSBY_BUTTER_CMS_PREVIEW === "false" ||
  process.env.GATSBY_BUTTER_CMS_PREVIEW === "0"
)
  ? 1
  : 0;

module.exports = {
  siteMetadata: {
    title: `ButterCMS Gatsby.js`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-buttercms`,
      options: {
        authToken: process.env.GATSBY_BUTTER_CMS_API_KEY,
        // Optional array of Collection key

        contentFields: {
          keys: [`conference`],

          // Optional. Set to 1 to enable test mode for viewing draft content.

          test: previewMode,
        },
      },
    },
    // {
    //   resolve: `gatsby-source-buttercms`,
    //   options: {
    //     authToken: process.env.BUTTER_CMS_API_KEY,
    //     // Optional array of Collection key
    //     contentFields: {
    //       keys: [`navigation_menu`],
    //       // Optional. Set to 1 to enable test mode for viewing draft content.
    //       test: previewMode,
    //     },
    //     // Optional array of page type keys
    //     pageTypes: [`landing-page`],
    //     // Optional array of locales (if configured in your account)
    //     locales: [],
    //     preview: previewMode, // Return draft content
    //     levels: 2, // Optional. Defaults to 2. Defines the levels of relationships to serialize
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    "gatsby-plugin-postcss",
  ],
};
