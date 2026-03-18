# Auto Mail Sender Chrome Extension

This extension allows you to send emails automatically via Gmail API.

## Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the Gmail API.
4. Create OAuth 2.0 credentials (Web application).
5. Add your extension's ID to the authorized origins (you can get the ID after loading the extension).
6. Copy the Client ID and paste it into `manifest.json` replacing `YOUR_CLIENT_ID_HERE`.

## Installation

1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select the `d:\AutoMailSender` folder.

## Usage

1. Click the extension icon.
2. Enter the list of emails (one per line), subject, and body.
3. Click "Send Emails".
4. Authorize the extension if prompted.

The extension will send emails one by one with a 1-second delay.
