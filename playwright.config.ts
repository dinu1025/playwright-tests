import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


if (process.env.test_env) {
  dotenv.config({
      path:  "./src/resources/"+process.env.test_env+".env",
      override: true
  })
} else {
  dotenv.config({
      path: `./src/resources/stage.env`,
      override: true
  })
}


const config: PlaywrightTestConfig = {
  // Timeout
  timeout: 120000,
  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'never', outputFolder: 'report' }],
    ['junit', { outputFile: 'results.xml' }],
    ['monocart-reporter', {  
      name: "My Test Report",
      outputFile: './test-results/report.html'
  }]
  ],

  use: {
    // Browser options
    headless: false,

    // Context options
    viewport: { width: 1280, height: 720 },

    // Artifacts
    screenshot: 'on',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chrome',
      baseUrl: process.env.baseUrl,
      staffEmail: process.env.staffEmail,
      staffPassword: process.env.staffPassword,
      studentEmail: process.env.studentEmail,
      studentPassword: process.env.studentPassword,
      adminEmail: process.env.adminEmail,
      adminPassword: process.env.adminPassword,
      use: { browserName: 'chromium' },
      fullyParallel: true,
    }
  ],
};

export default config;
