export const BAUD_RATE = 115200;
export const START_BUZZ_COMMAND = Object.freeze([0x00, 0x80, 0x05, 0x01, 0x01, 0x00, 0xC0]);
export const STOP_BUZZ_COMMAND = Object.freeze([0x00, 0x80, 0x05, 0x01, 0x00, 0x00, 0xC0]);
export const START_STIM_COMMAND = Object.freeze([0x00, 0x80, 0x0B, 0x01, 0x03, 0x00, 0xC0]);
export const NUM_CHANNELS = 4;
export const NUM_CONFIGURABLE_CHANNELS = 2; // MUST be less than NUM_CHANNELS!
export const MIN_INTENSITY = 0;
export const MAX_INTENSITY = 60;
export const SET_AMPLITUDE_COMMAND_PREFIX = Object.freeze([0x00, 0x80, 0x0B, 0x11, 0x01]);
export const SET_AMPLITUDE_COMMAND_SUFFIX = Object.freeze([0x00, 0xC0]);
export const SINK_CODE = 0x11;
export const SOURCE_CODE = 0x10;
