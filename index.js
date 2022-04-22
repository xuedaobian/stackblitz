// Import stylesheets
import './style.css';

/**
 * 创建虚拟 DOM
 * @param tagName type: String mark: 标签名
 * @param props type: Object mark: 属性
 * @param children type: Array mark: 子元素
 * @returns {Object} type: Object mark: 虚拟 DOM
 */
const h = (tagName, { props = {}, children = [] } = {}) => {
  const element = Object.create(null);

  Object.assign(element, {
    tagName,
    props,
    children,
  });

  return element;
};
/**
 * 挂载到真实 DOM 中
 * @params $node type: HTMLElement mark: 生成的真实的 DOM 节点
 * @params $target type: HTMLElement mark: 父级 DOM 节点
 */
const mount = ($node, $target) => {
  return $target.appendChild($node);
};

/**
 * 将虚拟 DOM 对象渲染为真实的 DOM 节点
 * @param vNode type: Object mark: 虚拟 DOM
 * @returns {HTMLElement} type: HTMLElement mark: 真实的 DOM 节点
 */

const render = (vNode) => {
  // 如果虚拟DOM对象是数字或者字符串，那么就是一个文本节点
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }
  // 元素节点
  // 创建元素节点
  const el = document.createElement(vNode.tagName);
  // 设置属性
  for (let [key, val] of Object.entries(vNode.props)) {
    el.setAttribute(key, val);
  }
  // 设置子元素 子元素是一个数组；它可能是单个文本节点，可能是多个元素节点，但是总而言之它是一个节点数组，所以我们直接遍历这个数组，对子节点先渲染，然后添加到 el 的子节点中
  for (let child of vNode.children) {
    el.appendChild(render(child));
  }
  return el;
};

const vApp = h('div', {
  props: {
    id: 'app',
  },
  children: [
    'hhhhh',
    h('h1', {
      props: {
        id: 'title',
      },
      children: ['hello world!'],
    }),
  ],
});

const $app = render(vApp);

mount($app, document.getElementById('vm'));
