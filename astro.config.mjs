import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel";

// The Desert Fish home menu is rendered locally and does not require CMS credentials.
export default defineConfig({
  site: "https://desertfish.local/",
  adapter: process.env.NETLIFY ? netlify() : vercel(),
  output: "server",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    vue({ appEntrypoint: "/src/pages/_app" }),
    icon(),
    sitemap(),
  ],
  trailingSlash: "ignore",
  compressHTML: true,
  scopedStyleStrategy: "attribute",
  build: { format: "directory", inlineStylesheets: "always" },
  // Retained as optional declarations so legacy cloned routes can type-check
  // without requiring a Storyblok or delivery-service account locally.
  env: {
    schema: {
      STORYBLOK_PREVIEW_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      STORYBLOK_SPACE_ID: envField.number({ context: "server", access: "public", default: 0 }),
      STORYBLOK_PERSONAL_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      STORYBLOK_REGION: envField.string({ context: "server", access: "public", default: "eu" }),
      SITE_LANG: envField.string({ context: "server", access: "public", default: "es" }),
      CURRENCY: envField.string({ context: "server", access: "public", default: "MXN" }),
      LOCALE: envField.string({ context: "server", access: "public", default: "es-MX" }),
      MAILCHIMP_SERVER_PREFIX: envField.string({ context: "server", access: "public", optional: true }),
      MAILCHIMP_LIST_ID: envField.string({ context: "server", access: "public", optional: true }),
      MAILCHIMP_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      MAILGUN_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      MAILGUN_API_URL: envField.string({ context: "server", access: "public", optional: true }),
      MAILGUN_DOMAIN: envField.string({ context: "server", access: "public", optional: true }),
      FROM_EMAIL_ADDRESS: envField.string({ context: "server", access: "public", optional: true }),
      TO_EMAIL_ADDRESS: envField.string({ context: "server", access: "public", optional: true }),
      POSTMARK_SERVER_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      SLACK_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      SLACK_CHANNEL_ID: envField.string({ context: "server", access: "public", optional: true }),
    },
  },
});
