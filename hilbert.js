/*
L-system (hilbert):
  variables : A B
  constants : F + -
  axiom : A
  rules : (A -> -BF+AFA+FB-), (B -> +AF-BFB-FA+)
*/

var width = 600;
var height = 600;
var step = 10;
var theta = Math.PI / 2;
var turtle = {
  x: width / 2,
  y: height / 2,
  angle: 0
};

var lSystem = function(axiom, rules, iters) {
  if (iters === 0) {
    return axiom;
  }

  axiom = axiom.split('').map(function(x) {
    return rules[x] ? rules[x] : x;
  }).join('');

  return lSystem(axiom, rules, iters - 1);
};

var processStr = {
  'F': function(data) {
    var x = turtle.x + step * Math.cos(turtle.angle);
    var y = turtle.y + step * Math.sin(turtle.angle);
    turtle.x = x;
    turtle.y = y;
    data.push({ x: x, y: y });
    return data;
  },
  '+': function(data) {
    turtle.angle -= theta;
    return data;
  },
  '-': function(data) {
    turtle.angle += theta;
    return data;
  }
};

var getData = function(instructions, processStr) {
  var data = [];
  instructions.split('').forEach(function(x) {
    if (processStr[x]) {
      data = processStr[x](data);
    }
  });
  return data;
};

var createSVG = function(data) {
  turtle = {
    x: width / 2,
    y: height / 2,
    angle: 0
  };

  var svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);

  var xs = data.map(function(point) { return point.x; });
  xmax = d3.max(xs);
  xmin = d3.min(xs);

  var x = d3.scaleLinear().domain([xmin, xmax])
                           .range([0, 600]);

  var ys = data.map(function(point) { return point.y; });
  var y = d3.scaleLinear().domain([d3.min(ys), d3.max(ys)])
                           .range([0, 600]);

  var d = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

  svg.append('path')
    .data([data])
    .attr('d', d);
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

  var instructions = lSystem(axiom, rules, parseInt(iters));
  var data = getData(instructions, processStr);
  $('svg').remove();
  createSVG(data);
  return false;
});
