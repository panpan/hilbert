# Hilbert

![hilbert]

Hilbert is an interactive fractal visualizer using Lindenmayer systems and turtle graphics, built with D3.js. The L-system for the Hilbert Curve (fields are pre-filled) is defined as follows:

```
variables: A B
constants: F + -
axiom: A
rules: A -> -BF+AFA+FB-
       B -> +AF-BFB-FA+
```
where 'F' means 'draw forward', '+' means 'turn right 90°', and '-' means 'turn left 90°'. Users may modify the axiom, rules, and number of iterations to generate other fractals.

see: [Hilbert Curve][wolfram], [L-sytems][wikipedia]

[hilbert]: ./assets/hilbert.png
[wolfram]: http://mathworld.wolfram.com/HilbertCurve.html
[wikipedia]: https://en.wikipedia.org/wiki/L-system
