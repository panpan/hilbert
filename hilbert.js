var width = 600;
var height = 600;

var createSVG = function(data) {
  var svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);

  var d = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

  svg.append('path')
     .data([data])
     .attr('d', d);

  turtle = {
    x: width / 2,
    y: height / 2,
    angle: 0
  };
};

var turtle = {
  x: width / 2,
  y: height / 2,
  angle: 0
};

/*
Hilbert curve L-system:
  variables : A B
  constants : F + -
  axiom : A
  rules : (A -> -BF+AFA+FB-), (B -> +AF-BFB-FA+)
*/

var fractal = function(axiom, rules, iters) {
  if (iters === 0) {
    return axiom;
  }

  axiom = axiom.split('').map(function(c) {
    return rules[c] ? rules[c] : c;
  }).join('');

  return fractal(axiom, rules, iters - 1);
};

var hilbertAxiom = 'A';
var hilbertRules = {
  A: '-BF+AFA+FB-',
  B: '+AF-BFB-FA+'
};

var draw = {
  'F': function(data) {
    var x = turtle.x + Math.cos(turtle.angle)*5;
    var y = turtle.y + Math.sin(turtle.angle)*5;
    data.push({x: x, y: y});
    turtle.x = x;
    turtle.y = y;
    return data;
  },
  '+': function(data) {
    turtle.angle -= Math.PI / 2;
    return data;
  },
  '-': function(data) {
    turtle.angle += Math.PI / 2;
    return data;
  }
};

var getData = function(str, draw) {
  var data = [];
  str.split('').forEach(function(c) {
    if (draw[c]) {
      data = draw[c](data);
    }
  });
  return data;
};

$('.hilbert-form').submit(function() {
  var axiom = $('.axiom').val();
  var rules = {
    A: $('.ruleA').val(),
    B: $('.ruleB').val()
  };
  var iters = $('.iters').val();

  if (!axiom || !rules.A || !rules.B || !iters) {
    alert('must enter inputs');
    return false;
  } else if (parseFloat(iters) <= 0 || !Number.isInteger(parseFloat(iters))) {
    alert('iterations must be a positive integer');
    return false;
  }

  var str = fractal(axiom, rules, parseInt(iters));
  var data = getData(str, draw);
  $('svg').remove();
  createSVG(data);
  return false;
});
