const readline = require('readline');
const fs = require('fs');
const getRandomInt = require('./functions')

async function writeFile(filepath, data) {
  try {
    await fs.promises.writeFile(filepath, JSON.stringify(data, null, 2)+'\n', {
      encoding: 'utf-8',
      flag: 'a+',
    })
  } catch (e) {
    console.error(e);
  }
}

async function game() {
  const randomInt = getRandomInt();
  console.log(`Добро пожаловать в игру!`);
  console.log(randomInt);
  const input = readline.createInterface(process.stdin, process.stdout);
  let counter = 1

  async function inputListener(data) {
    console.log(`Попытка №${counter}`)
    let output = 'Угадал';
    if (isNaN(data)) {
      output = 'Вы ввели не число';
    }
    if (randomInt > data) {
      output = 'Больше';
    }
    if (randomInt < data) {
      output = 'Меньше';
    }
    console.log(output, '\n');
    const fileData = {
      input: data,
      output: output,
      tryNumber: counter,
    }
    try {
      await writeFile('data.txt', fileData);
      if (randomInt == data) {
        console.log(`Всего попыток: ${counter}`)
        input.close();
      }
      counter++
    } catch (e) {
      console.error(e);
    }
  }

  input.on('error', (err) => {
    console.error(err);
  });
  input.on('line', await inputListener);
}

(async () => {
  await game()
})();