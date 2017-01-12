function es6BindAll(context, methodNames) {
  // eslint-disable-next-line array-callback-return
  methodNames.map(function(methodName) {
    if (!(methodName in context)) {
      let e = new Error(methodName + " does not exist in " + context.constructor.name +
        ". Check the call to es6BindAll in " + context.constructor.name);
      throw e;
    }
    context[methodName] = context[methodName].bind(context);
  });
}

export default es6BindAll;