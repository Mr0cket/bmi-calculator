const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const askName = () => {
    return new Promise((resolve, reject) => readline.question('What is your Name?: ', (ans) => {
        if(ans.length < 1) reject(`Enter a valid name`)
        resolve(ans)
    }))
}

const askWeight = () => {
    return new Promise((resolve, reject) => readline.question('What is your Weight?(kg): ', (ans) => {
    if (isNaN(Number(ans)) || ans.length < 1) {
        reject('You didnt enter a valid weight')
    } else {
        console.log(`you weigh ${ans}kg`)
        resolve(ans)
    }
    })
)}

const askHeight = () => {
    return new Promise((resolve, reject) => readline.question('What is your height?(m): ', (ans) => {
        if(isNaN(Number(ans)) || ans.length < 1) {
            reject( `You didn't Enter a valid height`)
        } else if (ans > 100) {
        console.log(`converting Height in CM => M`)
        resolve(ans/100)
        } else resolve(ans)
        })
    )
}

const askAge = () => {
    return new Promise((resolve, reject) => readline.question('How old are you?(years): ', ans => {
        let parsedAns = parseFloat(ans)
        if (isNaN(parsedAns) || ans.length < 1) {
            reject('you didnt enter a valid age')
        }
        else resolve(parsedAns)
    }))
}

const askGender = () => {
    return new Promise((res, rej) => readline.question('Do you identify as male?(y/n)', ans => {
        if (!/^y?e?s?$|^n?o*$/i.test(ans)) {
            rej('sorry, can you please answer either "yes" or "no"')
        } else res( /^y\w*/i.test(ans) ) // true = Male, false = female
        })
    )
}

function askExercise() {
    return new Promise((res, rej) => readline.question('Do you exercise Daily?(y/n) ', ans => {
        if (!/^ye?s?$|^no?$/i.test(ans)) {
            rej('sorry, can you please answer either "yes" or "no"')
        } else res( /^y\w*/i.test(ans)) // Boolean
    }))
}

exports.askName = askName
exports.askAge = askAge
exports.askHeight = askHeight
exports.askWeight = askWeight
exports.askGender = askGender
exports.askExercise = askExercise
exports.close = readline.close