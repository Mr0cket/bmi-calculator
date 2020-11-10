function retry(fn, promise, promiseObj) {
    promiseObj = promiseObj || {
        resolve: null,
        resject: null
    }
    promise = promise || new Promise((resolve, reject) => {
        promiseObj.resolve = resolve
        promiseObj.reject = reject
    })
    fn().then( res => {
        promiseObj.resolve(res)
    }).catch(err => {
        console.error(err)
        retry(fn, promise, promiseObj)
    })
    return promise;
}
module.exports = retry