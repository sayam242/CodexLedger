import { ManifestV3Export } from "@crxjs/vite-plugin";

const manifest: ManifestV3Export = {
  manifest_version: 3,

  name: "CodexLedger",

  version: "0.1.0",

  description: "Leetcode Tracker extension",

  background: {
    service_worker: "src/background.ts"
  },

  content_scripts: [
    {
      matches: ["https://leetcode.com/*"],
      js: ["src/content/index.ts"]
    }
  ],

    web_accessible_resources: [
    {
        resources: ["pageScript.js"],
        matches: ["https://leetcode.com/*"]
    }
    ],

  permissions: []
};

export default manifest;