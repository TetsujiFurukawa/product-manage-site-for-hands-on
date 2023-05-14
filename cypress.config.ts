import { defineConfig } from 'cypress';

const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
    }
  }
});
