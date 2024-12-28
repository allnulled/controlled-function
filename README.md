# controlled-function

API to return values through 1 outter function scope.

## Installation

```sh
npm i -s @allnulled/controlled-function
```

## Importation

In node.js:

```js
require("@allnulled/controlled-function");
```

In browser:

```html
<script src="node_modules/@allnulled/controlled-function"></script>
```

## Usage

This is the test provided in source:

```js
require(__dirname + "/controlled-function.js");

const { ReturnController, ReturnControl } = ControlledFunction;

const controlledFunction = function () {
  
  const control = new ReturnController();

  // Reseteando y cargando un nuevo conjunto de funciones
  const knowledge = {
    step1() {
      return new ReturnControl('step 1 Resolved');
    },
    step2() {
      return new ReturnControl('step 2 Resolved');
    },
    step3() {
      return new ReturnControl('step 3 Resolved');
    },
    stepA() {
      return new ReturnControl('step A Resolved');
    },
    stepB() {
      return new ReturnControl('step B Resolved');
    },
    stepC() {
      return new ReturnControl('step C Resolved');
    }
  };
  control.reset().load(knowledge);
  
  // Pasareleamos por los pipes usando la misma instancia para invocar y para acceder:
  if (control.pipe("output", ["step1", "step2", "step3"])) {
    return control.solved("output");
  } else if(control.pipe("output2", ["stepA", "stepB", "stepC"])) {
    return control.solved("output2");
  }

};

controlledFunction();
```