import { randomNum } from "../utils";

const reg_html = /\<.+?\>\{\{(.+?)\}\}\<\/.+?\>/g;
const reg_tag = /\<(.+?)\>/;
const reg_var = /\{\{(.+?)\}\}/g;

const statePool = [];
let o = 0;

function stateFormat(template, state) {
  let _state = {};

  // 绑定 mark
  template = template.replace(reg_html, function (node, key) {
    const matched = node.match(reg_tag);
    const _mark = randomNum();

    _state.mark = _mark;
    statePool.push(_state);
    _state = {}

    return `<${matched[1]} data-mark="${_mark}">{{ ${key} }}</${matched[1]}>`;
  });

  // 替换数据
  template = template.replace(reg_var, function (node, key) {
    let _var = key.trim();
    const _varArr = _var.split(".");
    let i = 0;

    while (i < _varArr.length) {
      _var = state[_varArr[i]];
      i++;
    }

    _state.state = _varArr;
    statePool[o].state = _varArr;
    o++;

    return _var;
  });

  return template;
}

export { statePool, stateFormat };
