export const RESOLUTION = {
  HD: 0,
  FHD: 1,
  UHD: 2,
  properties: {
    0: { width: 1280, height: 720, value: '720' },
    1: { width: 1920, height: 1080, value: '1080' },
    2: { width: 3840, height: 2160, value: '4k' }
  }
}

export const CODEC = {
  AUTO: 0,
  H264: 1,
  H265: 2,
  HEVC: 3,
  properties: {
    0: { value: 'auto' },
    1: { value: 'h264' },
    2: { value: 'h265' },
    3: { value: 'hevc' } // alias for H265
  }
}

export const DEBUG = {
  OFF: 0,
  LOW: 1,
  HIGH: 2,
  properties: {
    0: { value: 'silent' },
    1: { value: 'verbose' },
    2: { value: 'debug' }
  }
}
