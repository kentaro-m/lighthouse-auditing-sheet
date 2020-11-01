import { google } from 'googleapis'
import { getAuthToken } from './lib/auth'
import { Sheet } from './lib/sheet'

require('dotenv').config()

async function main() {
  try {
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
    const { data } = await sheet.addRow(['hoge', 'fuga'])

    console.log(data)
  } catch(error) {
    console.log(error)
  }
}

main()