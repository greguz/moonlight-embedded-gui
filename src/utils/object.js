export function isObject (val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

export function pick (obj, ...keys) {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {}
  }

  var res = {}
  if (typeof keys === 'string') {
    if (keys in obj) {
      res[keys] = obj[keys]
    }
    return res
  }

  var len = keys.length
  var idx = -1

  while (++idx < len) {
    var key = keys[idx]
    if (key in obj) {
      res[key] = obj[key]
    }
  }
  return res
}
