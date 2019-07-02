# [src/serial](./)

**Document objective: To document the [WSS.js](WSS.js) file.**

This directrory contains files related to serial port functionality. Currently, it only contains a single file, [WSS.js](WSS.js). Below, the classes and functions contained in this file are documented.

## Table of contents
* [Function: `applyIntensityLinearization(intensity)`](#function-applyintensitylinearizationintensity)
* [Function: `genSubChannelCode(subChannel)`](#function-genSubChannelCodesubChannel)
* [Function: `genSetAmplitudesCommand(channels)`](#function-genSetAmplitudesCommandchannels)
* [Function: `genSetTimingsCommand(timings)`](#function-genSetTimingsCommandtimings)
* [Function: `intervalExcecute(interval, ...callbacks)`](#function-intervalExcecuteinterval-callbacks)
* [Class: `WSS`](#class-WSS)
  * [`new WSS()`](#new-WSS)
  * [`WSS.listPorts()`](#WSSlistPorts)
  * [`board.openFirstPort()`](#boardopenFirstPort)
  * [`board.setPortName(portName)`](#boardsetPortNameportName)
  * [`board.getPortName()`](#boardgetPortName)
  * [`board.startBuzz()`](#boardstartBuzz)
  * [`board.stopBuzz`](#boardstopBuzz)
  * [`board.closePort`](#boardclosePort)
  * [`board.startStim(stimParams)`](#boardstartStimstimParams)


## Function: `applyIntensityLinearization(intensity)`

This function applies the intensity linearization function to the intensity. It converts intensity from mA to a value from 0 to 255 that the board understands.

Parameters:
* `intensity`: Number indicating the intensity in mA.

Return value: The number from 0 to 255 that is the result of converting `intensity` using the experimentally determined amplitude linearization curve.

## Function: `genSubChannelCode(subChannel)`

This function generates a two byte code that represents a channels stim or rchrg settings, that can be inserted into the amplitude setting command and sent to the board.

Parameters:
* `subChannel`: *Optional.* Object containing two properties: `intensity`, a number indicating the intensity in mA, and `sourceSink`, a string (with value of `'source'` or `'sink'`) indicating whether the subchannel is source or sink.

Return value: An array of two numbers. If `subChannel` is specified, the first value is the source or sink byte, and the second is the `intensity` converted with the `applyIntensityLinearization` function. If `subChannel` is not specified, returns `[0x00, 0x00]`.

## Function: `genSetAmplitudesCommand(channels)`

This function generates a set amplitudes command that can be sent to the board.

Parameters:
* `channels`: Array of channel objects, each containing a `stim` and `rchrg` property, which both should contain a `subChannel` object (See parameters of [`genSubChannelCode`](#function-genSubChannelCodesubChannel) function). The length of the `channels` array should equal the value of the `NUM_CONFIGURABLE_CHANNELS` constant in [`constants.js`](../constants.js)

Return value: The set amplitudes command represented as an array of numbers (0 to 255).

## Function: `genSetTimingsCommand(timings)`

This function generates a set timings command that can be sent to the board.

Parameters:
* `timings`: An object with the following properties representing the desired timings settings: `stimPW`, `interpulseDelay`, `rchrgPW`, and `pulsePeriod`. All of the properties should be integers. The units for all of these properties is μs, except for `pulsePeriod`, whose units are ms.

Return value: The set timings command represented as an array of numbers (0 to 255).

## Function: `intervalExcecute(interval, ...callbacks)`

This function excecutes callback functions at a specified time interval.

Parameters:
* `interval`: Number of milliseconds to wait between excecuting the callback functions. Note: There is no wait before excecuting the first callback.
* `...callbacks`: The callback functions to excecute. The functions are excecuted in the order that they are passed to this function, with a delay of `interval` milliseconds between each function excecution.

## Class: `WSS`

This class provides an easy to use interface to communicate with the WSS board. It extends Node.js's built in `EventEmitter` class, in order to be able to emit events.

### `new WSS()`

Creates a new WSS object, and attempts to open the first available port.

Return value: The new `WSS` object.

Example usage:
```javascript
const board = new WSS();
```

### `WSS.listPorts()`

This static method generates an array containing the names of the available ports.

Return value: A Promise that resolves the the array of available port names.

### `board.openFirstPort()`

This method attempts to connect to the first port in the array obtained by running [`WSS.listPorts()`](#WSSlistPorts). If an empty array is returned, this method does not attempt to connect to any ports.

Return value: A Promise resolving to the list of ports returned by [`WSS.listPorts()`](#WSSlistPorts).

### `board.setPortName(portName)`

This method attempts to connect to the specified port. If the port is already opened, it closes the port and connects to the new port once the port is closed.

Parameters:
* `portName`: String containing the name of the port to connect to.

### `board.getPortName()`

Gets the name of the port currently connected to.

Return value: A string containing the name of the port if currently connected; if not connected to any port, returns `''`.

### `board.startBuzz()`

Sends the start buzz command to the board.

### `board.stopBuzz()`

Sends the stop buzz command to the board.

### `board.closePort()`

Closes the serial port.

### `board.startStim(stimParams)`

Sends the start stim command to the board. If amplitude and/or timings settings are specified, this method also sends the set amplitudes command and/or the set timings command before sending the start stim command.

Parameters:
* `stimParams`: *Optional.* Object with up to two properties: `amplitudes` and/or `timings`. If specified, the `amplitudes` property is passed to the [`genSetAmplitudesCommand`](#function-genSetAmplitudesCommandchannels) function and should follow the requirements of that function's `channels` parameter. The `timings` property, when specified, is passed to the [`genSetTimingsCommand`](#function-genSetTimingsCommandtimings) function and should follow the requirements of that function's `timings` parameter. The set amplitudes and set timings commands generated by these functions will be sent to the board. If this parameter, or either of the properties of this parameter, is/are not specified, those commands will not be sent to the board.
