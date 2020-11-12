const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

exports.askName = function askName() {
    return new Promise((resolve, reject) => readline.question('What is your Name?: ', (ans) => {
        if(ans.length < 1) reject(`Enter a valid name`)
        if(//)
        resolve(ans)
    }))
}

exports.askWeight = function askWeight() {
    return new Promise((resolve, reject) => readline.question('What is your Weight?(kg): ', (ans) => {
    if (isNaN(Number(ans)) || ans.length < 1) {
        reject('You didnt enter a valid weight')
    } else {
        console.log(`you weigh ${ans}kg`)
        resolve(ans)
    }
    })
)}

exports.askHeight = function askHeight() {
    return new Promise((resolve, reject) => readline.question('What is your height?(m): ', (ans) => {
        if(isNaN(Number(ans)) || ans.length < 1) {
            reject( `You didn't Enter a valid height`)
        } else if (ans > 100) {// can assume input height in cm
        console.log(`converting Height CM => M`)
        resolve(ans/100)
        } else if ( ans > 2 ) {
            reject(`This app currently doesn't support trees or skyscrapers.
            Please go back to being stuck in the ground`)
        }
        resolve(ans)
        })
    )
}

exports.askAge = function askAge() {
    return new Promise((resolve, reject) => readline.question('How old are you?(years): ', ans => {
        let parsedAns = parseFloat(ans)
        if (isNaN(parsedAns) || ans.length < 1) {
            reject('you didnt enter a valid age')
        }
        else resolve(parsedAns)
    }))
}

exports.askGender = function askGender() {
    return new Promise((res, rej) => readline.question('Do you identify as male?(y/n)', ans => {
        if (!/^y?e?s?$|^n?o*$/i.test(ans)) {
            rej('sorry, can you please answer either "yes" or "no"')
        } else res( /^y\w*/i.test(ans) ) // true = Male, false = female
        })
    )
}

exports.askExercise = function askExercise() {
    return new Promise((res, rej) => readline.question('Do you exercise Daily?(y/n) ', ans => {
        if (!/^ye?s?$|^no?$/i.test(ans)) {
            rej('sorry, can you please answer either "yes" or "no"');
        } else res( /^y\w*/i.test(ans)) // Boolean
    }))
}
exports.close = readline.close