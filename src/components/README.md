# src/components/

This directory contains custom React components. The bulk
of the GUI's code and functionality is located here.

## [`AmplitudeSettings.jsx`](AmplitudeSettings.jsx)
This file defines the `AmplitudeSettings` component, which
displays the [`ChannelSettings`](#ChannelSettings.jsx),
where the user inputs settings for individual channels.

#### Properties
  * `amplitudes`: Array of objects which define settings for
    the individual channels. *Required.*
  * `setAmplitudes`: Function which updates `amplitudes` in
    the parent component. *Required.*
  * `updateValidity`: Function that allows individual input
    boxes to update whether they are valid. *Required.*

#### Functions in this file
  * `handleChannelChange`: Handles a change to the settings in
    one of the channels. Updates the `amplitudes` array to
    reflect the changes.

    Parameters:
      * channelNum: Index of the modified channel in the
        `amplitudes` array.
      * newChannelSettings: The new channel settings.
    
## [`BoardError.jsx`](BoardError.jsx)
This file defines the `BoardError` component, which displays
a dismissable error dialog box whenever there is an error
communicating over serial port with the board.

#### Properties
  * `board`: Instance of the [`WSS`](../serial/WSS.js) object
    that `BoardError` listens to errors on. *Required.*

#### Functions in this file
  * `errorListener`: The function that is called when an error
    occurs on the board. This function opens the error dialog
    and inserts the error message.
  
    Parameters:
      * `err`: The error object emitted by the board.

## [`BuzzerButton.jsx`](BuzzerButton.jsx)
This file defines the `BuzzerButton` component, which
provides a button that can turn the buzzer on and off.

#### Properties
  * `board`: Instance of the [`WSS`](../serial/WSS.js)
    object to send the start and stop buzz commands to
  * `boardIsOpen`: Boolean value storing whether the
    board is open and connected, when `true` the
    `BuzzerButton` is enabled and clickable; when `false`,
    the `BuzzerButton` is disabled and cannot be clicked.

## [`ChannelSettings.jsx`](ChannelSettings.jsx)
This file defines the `ChannelSettings` component, which
contains the [`SubChannelSettings`](#SubChannelSettings.jsx) components (one for stim and another for rchrg), where the
specific stim and rchrg settings are respectively set.