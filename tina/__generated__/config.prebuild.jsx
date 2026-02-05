// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "local-client-id",
  token: process.env.TINA_TOKEN ?? "local-token",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "film",
        label: "Films",
        path: "content/films",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "director",
            label: "Director"
          },
          {
            type: "image",
            name: "poster",
            label: "Poster"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "global",
        label: "Global",
        path: "content/global",
        format: "json",
        ui: {
          global: true
        },
        fields: [
          {
            type: "object",
            name: "socials",
            label: "Social Media",
            fields: [
              { type: "string", name: "instagram", label: "Instagram URL" },
              { type: "string", name: "email", label: "Email Address" },
              { type: "string", name: "linkedin", label: "LinkedIn URL" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
