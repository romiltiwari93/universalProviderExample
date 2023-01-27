import 'react-native-get-random-values'
import '@ethersproject/shims'
import 'fast-text-encoding';

if (typeof __dirname === 'undefined') {
    global.__dirname = '/'
}
if (typeof __filename === 'undefined') {
    global.__filename = ''
}
/* if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
} */

process.browser = false
/* if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer
if (typeof BigInt === 'undefined') global.BigInt = require('big-integer'); */
/* if (typeof TextEncoder === 'undefined' ) global.TextEncoder = require('fast-text-encoding').TextEncoder
if (typeof TextDecoder === 'undefined' ) global.TextDecoder = require('fast-text-encoding').TextDecoder */

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
Object.assign(process.env, { NODE_ENV: isDev ? 'development' : 'production' })
//process.env["NODE_ENV"] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
    localStorage.debug = isDev ? '*' : ''
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto')
require('promise.allsettled').shim()
if (typeof BigInt === 'undefined') {
    global.BigInt = require('big-integer')
}
