Pour transpiler : se placer dans le dossier racine et lancer la commande "npm run build"

my-chrome-extension/
├── src/
│   ├── background.ts
│   ├── content.ts
│   ├── popup.ts
│   ├── options.ts
│   └── manifest.ts
├── dist/
│   ├── background.js
│   ├── content.js
│   ├── popup.js
│   ├── options.js
│   └── manifest.json
├── assets/
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   └── styles/
│       ├── popup.css
│       └── options.css
├── public/
│   ├── popup.html
│   ├── options.html
│   └── content_script.html
├── .gitignore
├── manifest.json
├── tsconfig.json
├── webpack.config.js
└── README.md