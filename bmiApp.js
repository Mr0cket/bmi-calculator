const fs = require('fs');
const users = fs.existsSync('users.json') && require('./users.json') || []
const questions = require('./questions') // import quesitons module containing all the questions!
const User = require('./User')
const retry = require('./PromiseRetry')
// --Business Logic--
// collect and store the Name , weight, height of user then 
// calculate, display and store BMI of said user.
// user can access their data on request.

// --Data Model & Storage--
//  Write JSON file for Each User that enters their weight.
// retrieve that data whenever the user enters their name.
// fs.

async function bmiCalculator(){
    let existingUser;
    const name = await retry(questions.askName)
    users.forEach(user => {if (user.name === name) existingUser = user} )
    if (existingUser) {
        console.log(`
        Wecome Back, ${existingUser.name}.
        Here are your Results:`)
        readline.close()
        showResults(existingUser)
        
    } else {
    console.log(`hello ${name}`)
    const weight = await retry(questions.askWeight)
    const height = await retry(questions.askHeight)
    const age = await retry(questions.askAge)
    const exercisesDaily = await retry(questions.askExercise)
    const isMale = await retry(questions.askGender)
    const user = new User(name, height, weight, age, isMale, exercisesDaily)

    showResults(user)

    users.push(user)

    saveResults(users)
    }
    
}

function timelyGreeting() {
    const hoursOfDay = new Date().getHours()
    const timeofDay =  `Good ${hoursOfDay < 12 ? 'morning' : hoursOfDay < 18 ? 'afternoon' : 'evening'}`
    return timeofDay;
}

function showResults(usr) {
    console.log(`
            **************
            BMI CALCULATOR
            **************
            
            height: ${usr.height}m
            weight: ${usr.weight}kg
            age: ${usr.age}
            Gender: ${usr.isMale ? 'Boy' : 'Girl'}
            exercise daily: ${ usr.exercisesDaily ? 'Yes' : 'No'}
            
            ****************
            FACING THE FACTS
            ****************
            
            ${timelyGreeting()} ${usr.name}, Here are some statistics about your health:

            Your BMI is ${usr.bmi.toFixed(1)}
            
            With your BMi you are considered  ${usr.bmi < 18.5 ? 'underweight, eat more cheeseburgers!' : usr.bmi <= 25 ? 'a healthy, healthy human being! \n               Go eat some cheeseburgers to celebrate!' : 'overweight, stop eating cheeseburgers'}
            
            Your Ideal Weight is: ${ usr.idealWeight.toFixed(1) }kg
            With a normal lifestyle, you burn ${usr.dailyCals} calories/day
            **********
            DIET PLAN
            **********

            To get to your ideal weight, you need to ${usr.dietType} ${usr.deltaWght.toFixed(2)}kgs. 
            You should eat ${ usr.dailyCals + 500 } calories/day
            For up to ${Math.ceil(usr.deltaWght/0.5)} weeks!
            `)
}
function saveResults(usrs) {
    fs.writeFile(`./users.json`, JSON.stringify(usrs), () => console.log(`New json entry created from ${usrs}`))
}
bmiCalculator()