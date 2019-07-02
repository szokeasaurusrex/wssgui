# [src/](./)

This folder contains most of the code for the GUI. It includes the files that control the layout of the interface.

## [components/](components/)
This directory contains custom React components which are used in the user interface. For detailed documentation on each component, please consult [`components/README.md`](components/README.md).

## [serial/](serial/)
This directory contains code that enables communication through the serial port. For more detailed documentation, please consult [`serial/README.md`](serial/README.md)

## [App.jsx](App.jsx)
This file defines the main `App` component, which containes the entire user interface. This component can be thought of as the main component, as this is the component which is displayed inside the window. In order to keep the code clean, the `App` component is mainly composed of other custom components in the [`components/`](components/) directory. This way, the code is split up into different files based on the function it performs.

## [App.test.js](App.test.js)
This file contains code that tests that the `App` component works. It has not been modified from the default.

## [constants.js](constants.js)
This file defines constants that are imported and used in many other files.

## [index.css](index.css)
This file defines the styles for the interface. However, most of these styles are overwritten by Material-UI. There should be no need to directly edit this file, it has not been changed from the default.

## [index.jsx](index.jsx)
This file renders the `App` component, and inserts it into the [`index.html`](../public/index.html) file located in the [`public`](../public) directory. This file has not been changed from the default.

## [serviceWorker.js](serviceWorker.js)
This file has not been changed from the default. It contains functionality that this program currently does not require.