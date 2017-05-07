/*
L-system (hilbert)
  variables : A B
  constants : F + -
  axiom : A
  rules : (A -> -BF+AFA+FB-), (B -> +AF-BFB-FA+)
*/

var width = 400;
var height = 400;
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

var getData = function(instructions) {
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

  var x = data.map(function(d) { return d.x; });
  var xScale = d3.scaleLinear().domain([d3.min(x), d3.max(x)])
                           .range([0, width]);

  var y = data.map(function(d) { return d.y; });
  var yScale = d3.scaleLinear().domain([d3.min(y), d3.max(y)])
                           .range([0, height]);

  var d = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });

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

  if (!axiom || !rules.A || !rules.B) {
    alert('must enter inputs');
    return false;
  }

  var instructions = lSystem(axiom, rules, parseInt(iters));
  var data = getData(instructions);
  $('svg').remove();
  createSVG(data);
  return false;
});
