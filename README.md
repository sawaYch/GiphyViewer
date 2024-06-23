# Giphy Viewer

[![Code Check](https://github.com/sawaYch/GiphyViewer/actions/workflows/code-check.yml/badge.svg)](https://github.com/sawaYch/GiphyViewer/actions/workflows/code-check.yml)
[![Release](https://github.com/sawaYch/GiphyViewer/actions/workflows/release-apk.yml/badge.svg?event=push)](https://github.com/sawaYch/GiphyViewer/actions/workflows/release-apk.yml)

This is a simply react native giphy viewer application for interview code test purpose. Since I personally don't have Apple Developer Program subscription and MacBook, this app is only wired up and tested on Android platform.  

Noted that Giphy API free tier has rate limit which its only provide 100 free call within 1 hours, and when limit exceed API will throw HTTP 429 TOO MANY REQUEST.

Github action deploy a release build which include a free tier Giphy API Key using Github secret.  

## Get Started

### Prepare .env file

Create a `.env` file in project root with following content:

```text
GIPHY_API_KEY={your key here}
```

### Bootstrap project

```bash
# install deps
npm ci

# start metro
npm start -- --reset-cache

# install and test the app on android emulator
npm run android
```

## Tasks

- [x] config ESLint
- [x]  config prettier
- [x]  integrate zustand
- [x]  integrate mmkv
- [ ]  unit test 85% coverage
- [x]  ci/cd pipeline

### Search page

- [x]  A search text bar that allow user to search gifs by keywords
- [x]  A scrollable view that show the gifs
- [x]  User able to add the gif ID into favorite list

### My Favorite page

- [x]  Storage for the saved gif ID
- [x]  A scrollable view that shows the saved gifs
- [x]  User able to remove the gif ID from favorite list

### Bonus

- [x]  Pagination – scroll to load more gifs
- [x]  User can share the gif to other messenger etc
- [x]  UI/UX design
