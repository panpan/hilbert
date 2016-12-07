# [hilbert]

![hilbert]

[hilbert][live] is a fractal generator using L-systems and D3.js. The L-system for the Hilbert Curve (fields are pre-filled) is defined as follows:

```
variables: A B
constants: F + -
axiom: A
rules: A -> -BF+AFA+FB-
       B -> +AF-BFB-FA+
```
where 'F' means 'draw forward', '+' means 'turn right 90°', and '-' means 'turn left 90°'. Users may modify the axiom, rules, and number of iterations to generate other fractals.

[live]: http://pan2.io/hilbert
[hilbert]: ./hilbert.png
