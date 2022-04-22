// 是否是未定义
function isUndef(v) {
  return v === undefined || v === null;
}
// 是否是定义
function isDef(v) {
  return v !== undefined && v !== null;
}
// 是否为真
function isTrue(v) {
  return v === true;
}
// 是否为假
function isFalse(v) {
  return v === false;
}
// 是否是原始值
function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  );
}
// 是否是引用类型
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
// 是否是纯对象类型
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
// 是否是有效索引值
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
// 是否是promise
function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  );
}
// 转字符串
var _toString = Object.prototype.toString;
function toString(val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
}
// 转化为数字，若不能，则返回原来的值
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
// 删除数组中的某一项
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
// 是否是对象自己的属性
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
// 利用闭包特性，缓存数据
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
// 连字符 - 转驼峰 on-click => onClick
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

// 把类数组转换成数组，支持从哪个位置开始，默认从 0 开始。
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
// 将函数包裹起来确保只会被执行一次
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

// 由于数组、对象等是引用类型，所以两个内容即使看起来相等，在环境看来不相等。
// 该函数是对数组、日期、对象进行递归比对。如果内容完全相等则宽松相等。
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every(function (e, i) {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every(function (key) {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
