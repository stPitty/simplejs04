const readline = require('readline');
const fs = require('fs');
const getRandomInt = require('./functions')

function writeFile(filepath, data, cb) {
  fs.writeFile(filepath, JSON.stringify(data, null, 2)+'\n', {
    encoding: 'utf-8',
    flag: 'a+',
  }, (err) => {
    if (err) {
      cb(err, false);
    } else {
      cb(null, true);
    }
  })
}

const randomInt = getRandomInt();

console.log(`Добро пожаловать в игру!`);
console.log(randomInt);
const input = readline.createInterface(process.stdin, process.stdout);
let counter = 1;

function question(filepath) {
  console.log(`\n Попытка № ${counter}`)
  let output;
  input.question('Введите число: ', (data) => {
    if (isNaN(data)) {
      output = 'Вы ввели не число';
      console.log(output);
      writeFile(filepath, {input: data, output: output, tryNumber: counter}, (err) => {
        if (err) {
          console.error(err);
        } else {
          counter++
          question(filepath)
        }
      })
    }
    if (randomInt > data) {
      output = 'Больше';
      console.log(output);
      writeFile(filepath, {input: data, output: output, tryNumber: counter}, (err) => {
        if (err) {
          console.error(err);
        } else {
          counter++
          question(filepath)
        }
      })
    }
    if (randomInt < data) {
      output = 'Меньше'
      console.log(output);
      writeFile(filepath, {input: data, output: output, tryNumber: counter}, (err) => {
        if (err) {
          console.error(err);
        } else {
          counter++
          question(filepath)
        }
      })
    }
    if (randomInt == data) {
      output = 'Угадал';
      console.log(output);
      writeFile(filepath, {input: data, output: output, tryNumber: counter}, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Общее кол-во попыток: ${counter}`);
          process.exit();
        }
      })
    }
  })
}

question('data.txt')