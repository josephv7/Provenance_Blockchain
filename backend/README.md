# Installation Guide

Replace code in `/backend/node_modules/async-iterator-to-pull-stream/index.js` with    
```
module.exports = iterator => {
  if (!iterator.next) {
    if (iterator[Symbol.asyncIterator]) {
      iterator = iterator[Symbol.asyncIterator]()
    } else if (iterator[Symbol.iterator]) {
      iterator = iterator[Symbol.iterator]()
    }
  }

  return async (end, cb) => {
    if (end) return cb(end)

    let next
    try {
      next = await iterator.next()
    } catch (err) {
      return cb(err)
    }

    if (next.done) return cb(true) // eslint-disable-line
    cb(null, next.value)
  }
}


```

