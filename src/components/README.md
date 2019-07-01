# [src/components/](./)

**Document objective: To describe all of the files in this directory.**

This directory contains custom React components. The bulk of the GUI's code and functionality is located here.

## [AmplitudeSettings.jsx](AmplitudeSettings.jsx)
This file defines the `AmplitudeSettings` component, which displays the [`ChannelSettings`](#ChannelSettings.jsx), where the user inputs settings for individual channels.

#### Properties
* `amplitudes`: Array of objects which define settings for the individual channels. *Default value:* `[]`.
* `setAmplitudes`: Function which updates `amplitudes` in the parent component. The parameter passed to this function becomes the new value of `amplitudes`. *Required.*
* `updateValidity`: Function that allows individual input boxes to update whether they are valid. *Required.*

#### Functions in this file
* `handleChannelChange(channelNum, newChannelSettings)`: Handles a change to the settings in one of the channels. Updates the `amplitudes` array to reflect the changes.

  Parameters:
  * `channelNum`: Index of the modified channel in the `amplitudes` array.
  * `newChannelSettings`: The new channel settings.
    
## [BoardError.jsx](BoardError.jsx)
This file defines the `BoardError` component, which displays an [`ErrorDialog`](#ErrorDialog.jsx) containing an error message whenever the board produces

#### Properties
  * `board`: Instance of the [`WSS`](../serial/WSS.js) object that `BoardError` listens to errors on. *Required.*

#### Functions in this file
* `errorListener(err)`: The function that is called when an error occurs on the board. This function opens the error dialog and inserts the error message.

  Parameters:
  * `err`: The error object emitted by the board.

## [BuzzerButton.jsx](BuzzerButton.jsx)
This file defines the `BuzzerButton` component, which provides a button that can turn the buzzer on and off.

#### Properties
* `board`: Instance of the [`WSS`](../serial/WSS.js) object to send the start and stop buzz commands to
* `boardIsOpen`: Boolean value storing whether the board is open and connected, when `true` the `BuzzerButton` is enabled and clickable; when `false`, the `BuzzerButton` is disabled and cannot be clicked.

## [ChannelSettings.jsx](ChannelSettings.jsx)
This file defines the `ChannelSettings` component, which contains the [`SubChannelSettings`](#SubChannelSettings.jsx) components (one for stim and another for rchrg), where the specific stim and rchrg settings are respectively set.

#### Properties
* `channel`: Object which contains the settings for thechannel. The `channel` object has two properties, `stim` and `rchrg`, which define the stim and the recharge settings, respectively. *Default value:* `{}`.
* `setChannel`: Function that updates `channel` in the parent component; the parameter passed to this function becomes the new value of `channel`. *Required.*
* `channelNum`: The number of the channel. Please note, the channel number displayed in the GUI is actually 1 more than `channelNum` (i.e. the displayed value is equal to `channelNum + 1`). *Required.*
* `updateValidity`: Function that allows individual input boxes to update whether they are valid. *Required.*
* `disabled`: Boolean value. When `true`, the inputs for the `ChannelSettings` will be disabled, and nothing can be entered. *Required.*

#### Functions in file
* `handleSubChannelChange(subChannelType, newSettings)`: Triggered automatically when one of the inputs in one of the subchannels (stim or rchrg) changes. This function updates the settings stored in the `channel` object to reflect the changes.

  Parameters:
  * `subChannelType`: String (with value of `'stim'` or `'rchrg'`), this is the property of `channel` which will be updated.
  * `newSettings`: Object containing the new settings, `channel[subChannelType]` is updated to match these settings. (Specifically, `channel[subChannelType]` will be updated so it is a copy of `newSettings`.)

## [ErrorDialog.jsx](ErrorDialog.jsx)
This file defines the `ErrorDialog` component, which displays a dismissable error dialog with a customizable message.

#### Properties
* `message`: String containing the error message to be displayed. *Default value:* `''`.
* `isOpen`: Boolean value. If `true`, the dialog box is visible, if `false`, the dialog box is not visible. *Default value:* `false`.
* `handleClose`: Function that is run upon closing the dialog. This function should change the value of `isOpen` to `false` in the parent component to achieve proper functionality. *Default value:* `() => {}`.

## [IntegerInput.jsx](IntegerInput.jsx)
This file defines the `IntegerInput` component, which provides an input box that checks that all inputs are valid integers, and can optionally check that the input is larger than a minimum, and smaller than a maximum value. This component reports its validity to the `updateValidity` function which is passed as a property to `IntegerInput`.

#### Properties
* `value`: String containing the value entered in the input box. (Note: `value` is not a number as it is a string, but the string should contain a number assuming the user's input was valid.) *Default value:* `''`.
* `setValue`: Function that changes `value` to the value of the parameter passed to `setValue` in the parent component.
* `updateValidity`: Function that allows individual input boxes to update whether they are valid. The function takes two parameters. The first parameter is the [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) (stored in `uuid.current`) of the input box; the second parameter is a boolean which should be `true` if the input is valid, and `false` if invalid. *Required.*
* `disabled`: Boolean value. If `true`, the input box is disabled, otherwise it is enabled.
* `maxValue`: Numerical value that is the largest that can be entered without displaying an error. (Note: An input of `maxValue` is considered valid; any value above `maxValue` is not.) If `maxValue == null`, the input box will not check for any maximum value. *Default value:* `null`.
* `minValue`: Numerical value that is the smallest that can be entered without displaying an error. (Note: An input of `minValue` is considered valid; any value below `minValue` is not.) If `minValue == null`, the input box will not check for any minimum value. *Default value:* `null`.
* `name`: String containing the name of the input box, shown in error messages. *Required.*
* `label`: String containing the label for the input box. The `label` is displayed greyed out inside of the input box before anything is entered. *Default value:* `''`.

## [PortSelect.jsx](PortSelect.jsx)
This file defines the `PortSelect` component, which provides a drop down selection menu to choose the port, as well as a refresh button that can be pressed to refresh the available ports.

#### Properties
* `board`: Instance of [`WSS`](../serial/WSS.js) class. The `board`'s `setPortName` method is used to update the port when a new port is selected, and its `getPortName` method is used to show the current selected port. *Required.*

#### Functions in file
* `updatePorts()`: Fetches a list of all available ports by running `WSS.listPorts()`, and updates the options in the select menu to match.
* `openListener()`: This function is run when the port opens. It sets the selected port to match the `board`'s port (returned by `board.getPortName()`), and stops the error status from showing.
* `errorListener()`: This function is run whenever there is an `error` event in the `board`. The port selection is cleared, the error status is shown, and `updatePorts` is run so that the port options are updated.
* `handleChange(event)`: This function is run whenever a new option is selected. This function sets the `board`'s port to the newly selected port.
  
  Parameters:
  * `event`: The event object. `event.target.value` contains the newly selected value.
* `handleRefreshClick()`: This function is run when the refresh button is clicked. It runs `board.openFirstPort()` in order to open the first available port, and updates the list of ports in the menu to match the available ports.

## [SettingsHeading.jsx](SettingsHeading.jsx)
This file defines the `SettingsHeading` component, which provides a heading for a settings group, as well as a checkbox to select whether the default values should be used.

#### Properties
* `usingDefault`: Boolean value to indicate whether default settings should be used. If `true`, the checkbox is checked, if `false`, the checkbox is not checked. *Required.*
* `setUsingDefault`: Function that updates the value of `usingDefault` to the passed parameter in the parent component. *Required.*
* `headingText`: String containing the text to be displayed in the heading. *Required.*

## [SourceSinkSelection.jsx](SourceSinkSelection.jsx)
This file defines the `SourceSinkSelection` component, which provides radio buttons that can be used to select whether the subchannel should be source or sink.

#### Properties
* `sourceSink`: String (with value of `'source'`, `'sink'`, or `''`), indicating the currently selected option (or that no option is currently selected in the case of `''`). *Default value:* `''`.
* `setSourceSink`: Function that updates `sourceSink` to the passed parameter in the parent component. *Required.*
* `updateValidity`: Function that allows individual input boxes to update whether they are valid. The function takes two parameters. The first parameter is the [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) (stored in `uuid.current`) of the input box; the second parameter is a boolean which should be `true` if the input is valid, and `false` if invalid. *Required.*
* `disabled`: Boolean value. If `true`, the input options are disabled, otherwise they are enabled. *Required.*

## [StartStimButton.jsx](StartStimButton.jsx)
This file defines the `StartStimButton` component, which provides a button that can be pressed to start stimulation on the board.

#### Properties
* `handleClick`: Function that is triggered when button is clicked; in order to achieve proper functionality, this function should send the start stim command to the board. *Required.*
* `disabled`: Boolean value. If `true`, the button is greyed out and not clickable; if `false`, the button is enabled and can be clicked.

## [SubChannelSettings.jsx](SubChannelSettings.jsx)
This file defines the `SubChannelSettings` component, which is contains an [`IntegerInput`](#IntegerInput.jsx) component, where the intensity is entered, as well as a [`SourceSinkSelection`](#SourceSinkSelection.jsx) component, where the user can choose whether the subchannel should be source or sink.

#### Properties
* `subChannel`: Object containing the subchannel's settings. This object should have an `intensity` and a `sourceSink` property, which store the intensity and whether the subchannel is source or sink, respectively. *Default value:* `{}`.
* `setSubChannel`: Function that updates `subChannel` to match the passed parameter in the parent component. *Required.*
* `subChannelType`: String (with value of `'stim'` or `'rchrg'`), which tells whether the `SubChannelSettings` is being used to set stim or rchrg settings. *Required.*
* `updateValidity`: Function that allows individual input boxes to update whether they are valid. *Required.*
* `channelNum`: The number of the channel. Please note, the channel number displayed in the GUI is actually 1 more than `channelNum` (i.e. the displayed value is equal to `channelNum + 1`). *Required.*
* `disabled`: Boolean value. If `true`, the inputs in this `SubChannelSettings` component with be disabled; if `false`, they are enabled. *Required.*

#### Functions in file
* `handleChange(param, newValue)`: Triggered automatically when any of the inputs in the `SubChannelSettings` changes. Handles the change by updating `subChannel` in the parent component to reflect the changes.

  Parameters:
  * `param`: String (with value of `'intensity'` or `'sourceSink'`) containing the name of the property of `subChannel` to update.
  * `newValue`: The new value that `subChannel[param]` should be updated to.

## [TimingsSettings.jsx](TimingsSettings.jsx)
This file defines the `TimingsSettings` component, which provides [`IntegerInput`](#IntegerInput.jsx) components where the individual timings settings are set.

#### Properties
* `timings`: Object containing the timings settings. This object should have four properties: `stimPW`, `interpulseDelay`, `rchrgPW`, and `pulsePeriod`. *Default value:* `{}`.
* `setTimings`: Function that updates `timings` to match the passed parameter in the parent component. *Required.*
* `updateValidity`: Function that allows individual input boxes to update whether they are valid. *Required.*

#### Functions in file
* `handleChange(param, newValue)`: Triggered automatically when any of the inputs in the `TimingsSettings` changes. Handles the change by updating `timings` in the parent component to reflect the changes.

  Parameters:
  * `param`: String (with value of `'stimPW'`, `'interpulseDelay'`, `'rchrgPW'`, or `'pulsePeriod'`) containing the name of the property of `timings` to update.
  * `newValue`: The new value that `timings[param]` should be updated to.

## [TopBar.jsx](TopBar.jsx)
This file defines the `TopBar` component, which contains the top bar of the application.

#### Properties
* `children`: The content to be displayed on the right side of the bar. Note: Unlike most other React properties, this property is passed by including content inside the opening and closing tags, not by listing the property name in the opening tag. *Default value:* `null`.