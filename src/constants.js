export const BAUD_RATE = 115200;
export const START_BUZZ_COMMAND = Object.freeze([0x00, 0x80, 0x05, 0x01, 0x01, 0x00, 0xC0]);
export const STOP_BUZZ_COMMAND = Object.freeze([0x00, 0x80, 0x05, 0x01, 0x00, 0x00, 0xC0]);
export const START_STIM_COMMAND = Object.freeze([0x00, 0x80, 0x0B, 0x01, 0x03, 0x00, 0xC0]);
export const NUM_CHANNELS = 4;
export const NUM_CONFIGURABLE_CHANNELS = 2; // MUST be less than NUM_CHANNELS!
