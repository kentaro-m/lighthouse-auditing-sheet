# lighthouse-auditing-sheet
A job which audits a page using Google Lighthouse and write results to Google Spreadsheets.

## :arrow_forward: Usage

### Setup environment variables
Add some environment variables to `.env` file.

- **TARGET_URL** A URL of auditing target page
- **SPREAD_SHEET_ID** A ID of Google Spreadsheets
- **GCLOUD_PROJECT** A ID of Google Cloud Project
- **GOOGLE_APPLICATION_CREDENTIALS** A file path for credential of service accounts

### Install dependencies
```shell
$ npm install
```

### Run a job
```shell
$ npm run build
$ npm start
```

### Development
```
$ npm run dev
```

## :memo: Licence
MIT
