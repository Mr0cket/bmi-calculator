module.exports = class User {
    constructor(name, height, weight, age, isMale, exercisesDaily) {
        this.name = name;
        this.height = height
        this.weight = weight;
        this.age = age;
        this.isMale = isMale;
        this.exercisesDaily = exercisesDaily;
        this.bmi = this.weight / this.height ** 2;
        this.bmr = this.isMale ? 10 * this.weight + 6.25 * 178 - 5 * this.age + 50 : 10 * this.weight + 6.25 * 178 - 5 * this.age - 150
        this.dailyCals = this.exercisesDaily ? this.bmr * 1.6 : this.bmr * 1.4
        this.idealWeight = 22.5 * this.height ** 2 
        this.dietType = this.bmi <= 22.5 ? 'gain' : 'lose';
        this.deltaWght = Math.abs(this.idealWeight - this.weight)
    }
}