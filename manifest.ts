import { ManifestV3Export } from "@crxjs/vite-plugin";

const manifest: ManifestV3Export = {
  manifest_version: 3,

  name: "CodexLedger",

  version: "0.1.0",

  description: "Leetcode Tracker extension",

  background: {
    service_worker: "src/background.ts"
  },

  action: {
    default_popup: "src/popup/popup.html"
  },

  content_scripts: [
    {
      matches: ["https://leetcode.com/*"],
      js: ["src/content/index.ts"]
    }
  ],

  externally_connectable: {
    matches: [
      "http://localhost:5173/*"
    ]
  },

    web_accessible_resources: [
    {
        resources: ["pageScript.js"],
        matches: ["https://leetcode.com/*"]
    }
    ],

  permissions: [
    "storage",
    "tabs"
  ]
};

export default manifest;