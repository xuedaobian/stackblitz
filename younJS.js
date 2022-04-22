function myNew() {
  const newObj = Object.create(null);
  const context = [].shift.call(arguments);
  newObj.__proto__ = context.prototype;
  const ret = context.apply(newObj, arguments);
  return typeof ret === 'object' ? ret : obj;
}
