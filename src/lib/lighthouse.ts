const chromeLauncher = require('chrome-launcher')
const lighthouse = require('lighthouse')

export async function runLighthouse(url: string) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--no-sandbox', '--headless'],
  });
  const result = await lighthouse(url, {
    logLevel: 'info',
    onlyCategories: ['performance'],
    port: chrome.port
  });
  
  await chrome.kill();

  return result
}