function getRandomInt (max=1000, min=1) {
  return Math.floor(Math.random() * (max-min) + min);
}

module.exports = getRandomInt