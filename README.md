# WAVDE

## features

After installing the extension in to the browser, as long as it's not
turned off, it should be listening to all requests and responses in the
browser. The user can now freely navigate to different websites and
observe the results using the HUD and the detailed view once a HUD
button has been clicked.

### Highlights

- A Heads-Up Display of detected warnings is shown in the top right corner of all pages visited
- Clicking on any button will open a modal that covers the middle of the screen to show more detailed information about detected vulnerabilities.
- Clicking on the extension button, inside the browser toolbar, at any time opens a pop-up to clear the current warnings storage or download it as a JSON file.

## Installation

In its current form the finish built application is a folder with the
extension manifest.json file and a collection of source code files and
other assets all in the same directory. This can be obtained from the
source code directory by running the command `npm run prod` inside of
the projects root directory. A \"build\" directory will then be
generated which can be then loaded into the browser using the Developer
mode.

Below are instructions on how to load the extension into the browser:

First ensure your version of Chromium is greater than 100 as there are
some issues with service workers inside extensions with versions
previous to this.

Below are step-by-step instructions on how to install the extension from
the build folder using Chrome version 100. Versions above and below may
have different steps.

1.  Navigate to <chrome://extensions/>
2.  Enable Developer mode in the top right corner
3.  Click the \"Load unpacked\" button in the top left corner
4.  Select the \"build\" folder as the extension directory.
5.  To ensure that the service workers do not pre-emptively go to sleep,
    click on the \"Inspect views service worker\". This will open a new
    window with DevTools and as long as you don't close it can be safely
    ignored.
6.  The extension will add a button to the toolbar, which can be pinned
    to always be on display, by clicking the Extension button (a puzzle
    piece symbol) and clicking the pin next to the extension.

## Troubleshooting

### No new warnings are being detected, extension not tracking warnings anymore

This is likely due to a with the webRequest API not reawakening the
service worker. To resolve this, either reload the extension by
restarting the browser or turning the extension on and off in the
extension management page: <chrome://extensions/>.

For a more reliable solution, please open the extensions service worker
in a devtools tab. Go to <chrome://extensions/> and click on the
extension link saying \"Inspect views **service worker**\"

### The extension is showing errors for failed fetch requests

The extension is trying to send full metadata warnings to a separate
HTTP server. By default this is set to <http://localhost:3001/>. As of
version 1.0.0, this URL cannot be changed or the feature disabled by the
user and requires changing values in the source code. If you would want
to change it, you could do a find and replace of the previously
mentioned URL in the source code or compiled build folder.

To see the full metadata warnings, you can also open a HTTP listener to
listen for incoming POST messages at the previously mentioned URL.

### Errors related to websocket connection failing

This issue is likely due to the source code being compiled in
development mode, which includes hot reloading. If the associated web
socket sending changes happening to the source code files is not open,
the extension will complain. The warning is benign though as the
extension will still work as intended.


## Development Notes

### Requirements

The project used as boilerplate *Chrome Extension Boilerplate with React
17 and Webpack 5*[^1] version 4.0.1. So the project shares the same
requirements to build the project. It's worth going to their issues page
see if any issues not mentioned here already have solutions over there.

As for what requirements are recommended for this project:

- Node LTS 16 and associated version NPM

### Installation and Running

#### Extension installation and running instructions:

1.  Navigate to the root of project directory, this is the directory
    with a package.json file that states its name is WAVDE
2.  Run `npm install` to install the dependencies
3.  Run `npm start` to build the project and start the development
    server
4.  Load the extension into Chrome
    1.  Access <chrome://extensions/>
    2.  Check Developer mode ON
    3.  Click on Load unpacked extension
    4.  Select the build folder inside the project directory

The project should now be successfully loaded into chrome and have Hot
Reloading for modules enabled, meaning changes to the source code of the
background scripts should be reflected in the extensions without needing
to reinstall the extension. For changes to Content Scripts, please
repeat the sub-step 4-1 through 4-4.


#### The installation and running instructions for the backend server:

1.  Navigate to the backend directory, this is the directory with a
    package.json file that states its name is backend
2.  Run `npm install` to install the dependencies
3.  Run npm build to transpile the TypeScript files to JavaScript.
4.  Run `npm start` to start the server

Keep the server up and it should print out received messages while
populating a sqlite database when an alert sent by WAVDE.

#### The installation and running instructions for the crawler:

The crawler automatically loads the extension located in the projects
root's \"build\" folder. The crawler will fail if there is an issue with
the extension installation.

1.  Navigate to the crawler directory, this is the directory with a
    package.json file that states its name is
    \"bening-extension-crawler\"
2.  Run `npm install` to install the dependencies
3.  Run npm build to transpile the TypeScript files to JavaScript.
4.  Run `npm start` to start the crawler.

The crawler will then do it's procedure visiting each of the domains in
`majestic_10k_domains_only.csv`.

### Dependencies

Apart from the requirement of Chrome version 100+, npm and Node.js LTS
version 16. All of the dependencies should be located in the
package.json files (one for each part: crawler, wavde, backend). They
should always be as easy to install as running `npm install` in the same
folder as the package.json. The dependencies will then be stored in a
node_modules and be accessible to source code.

### Structure

Some notes on general extension structure:

-   All your extension's code must be placed in the `src` folder.
-   The manifest.json file inside the src folder overwrites the one
    inside the build folder during each build
-   All background scripts are stored Background, all
-   The rest of the contents are split into Content, Devtools, Options,
    Panel, Popup.
-   Content directory is injected onto webpages and the other
    directories are used to render their namesakes parts of the
    extension. For example, Options changes the contents of the
    Extension options page as accessed from the Chrome extensions
    options page and the popup folder renders the pop up displayed when
    clicking the extension toolbar button.

[^1]: <https://github.com/lxieyang/chrome-extension-boilerplate-react>
