function getPasswordChecker(password) {
  return function (pwd) {
    return password === pwd;
  }
}

const myPass = getPasswordChecker(123456);
console.log(myPass(1234));
console.log(myPass(123456));

