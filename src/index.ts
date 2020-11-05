import { google } from 'googleapis'
import { getAuthToken } from './lib/auth'
import { runLighthouse } from './lib/lighthouse'
import { Sheet } from './lib/sheet'

require('dotenv').config()

async function main() {
  try {
    const targetUrl = process.env.TARGET_URL

    if (!targetUrl) {
      throw new Error('target URL is not set.')
    }
    
    const result = await runLighthouse(targetUrl)

    const {
      'first-contentful-paint': fcp,
      'largest-contentful-paint': lcp,
      'cumulative-layout-shift': cls,
      'server-response-time': ttfb,
      'max-potential-fid': fid,
      'interactive': tti,
      'total-blocking-time': tbt,
      'speed-index': speedIndex,
    } = result.lhr.audits

    const sheetId = process.env.SPREAD_SHEET_ID

    if (!sheetId) {
      throw new Error('spread sheet ID is not set.')
    }

    const token = await getAuthToken()
    const sheetClient = google.sheets({
      version: 'v4',
      auth: token,
    })

    const sheet = new Sheet(sheetClient, sheetId)
    const { data } = await sheet.addRow([
      result.lhr.finalUrl,
      result.lhr.fetchTime,
      result.lhr.userAgent,
      fcp.numericValue,
      lcp.numericValue,
      cls.numericValue,
      ttfb.numericValue,
      fid.numericValue,
      tti.numericValue,
      tbt.numericValue,
      speedIndex.numericValue
    ])

    console.log(data)
  } catch(error) {
    console.log(error)
  }
}

main()