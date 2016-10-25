function getRandomLetter() {
  var list = ['A', 'B'];
  var rand = Math.floor(Math.random() * 2);
  return list[rand];
}

function makeString() {
  var rand = Math.floor(Math.random() * 5);
  var str = '';
  for (var i = 0; i < rand; i++) {
    str += getRandomLetter();
  }
  return str;
}

var str = makeString();
