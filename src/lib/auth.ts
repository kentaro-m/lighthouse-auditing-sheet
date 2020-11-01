import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

export async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  })
  const authToken = await auth.getClient()
  return authToken
}