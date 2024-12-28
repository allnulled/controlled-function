(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['ControlledFunction'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['ControlledFunction'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const ReturnControl = class {

    constructor(value) {
      this.value = value;
    }

  }

  const ReturnController = class {

    constructor() {
      this.results = new Map();
      this.functions = new Map(); // Para almacenar las funciones cargadas
    }

    // Carga las funciones que se usarán
    load(functions) {
      this.functions = new Map(Object.entries(functions)); // Convierte las funciones en un mapa
      return this; // Permite encadenar
    }

    // Devuelve el valor resuelto para una función
    solved(name) {
      return this.results.get(name);
    }

    // Ejecuta un conjunto de funciones secuenciales
    pipe(outputName, functionNames, parameters = []) {
      for (let fnName of functionNames) {
        const fnCallback = this.functions.get(fnName);
        const result = fnCallback(...parameters);
        if (result instanceof ReturnControl) {
          this.results.set(outputName, result.value);
          return this.solved(outputName); // Si se resuelve, devuelve el resultado
        }
      }
      return null; // Si no se resuelve nada
    }

    // Resetea el controlador para permitir cargar nuevas funciones
    reset() {
      this.results.clear();
      return this; // Permite encadenar
    }

  }

  const ControlledFunction = {
    ReturnControl,
    ReturnController,
  };

  ControlledFunction.default = ControlledFunction;

  return ControlledFunction;

});
