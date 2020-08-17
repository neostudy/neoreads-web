'use strict';

/**
 * 给Markdown文件的每一行添加行号，并转换成<span class="line" num="N"></span>的形式
 * @param {*} md 
 */

module.exports = function ins_plugin(md) {
  // Insert each marker as a separate text token, and add it to delimiter list
  //
  function tokenize(state, silent) {
    var token,
      start = state.pos,
      marker = state.src.charCodeAt(start);

    if (silent) { return false; }

    if (marker !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(state.pos + 1) !== 0x23 /* # */) { return false; }

    if (state.src.charCodeAt(state.pos + 6) !== 0x5D /* ] */) {
      return false;
    } else {
      let linenum = state.src.substr(start + 2, 4)
      token = state.push('linenum', '', 0);
      token.content = linenum;
      state.pos += 7;
      return true;
    }
  }

  function applyid(state) {

    let tks = []
    let tokens = state.tokens;
    for (var i = 0; i < tokens.length; ++i) {
      let token = tokens[i]
      if (token.type === 'paragraph_open' || token.type === 'heading_open') {
        tks.push(token)
      } else if (token.type === 'inline') {
        let children = token.children;
        if (!children) continue;
        for (var j = 0; j < children.length; ++j) {
          let child = children[j]
          if (child.type === 'linenum') {
            tks.push(child)
          }
        }
      }
    }

    for (var k = 0; k < tks.length - 1; ++k) {
      let tk = tks[k]
      let ntk = tks[k + 1]
      if (ntk.type === 'linenum') {
        if (tk.meta === null) {
          tk.meta = {}
        }
        tk.meta.linenum = ntk.content
      }
    }

  }

  md.inline.ruler.before('emphasis', '', tokenize);
  md.core.ruler.before('linkify', '', applyid);

  md.renderer.rules.heading_open = function (tokens, idx) {
    let token = tokens[idx]
    let tag = token.tag;
    let span = '<span class="line">';
    if (token.meta && token.meta.linenum) {
      span = `<span class="line" num="${token.meta.linenum}">`
    }
    if (tokens[idx].hidden) {
      return span;
    } else {
      if (token.attrs && token.attrs.length > 0) {
        let attr = token.attrs[0];
        if (attr.length > 0 && attr[0] === 'id') {
          return `<${tag} class="para" id="${attr[1]}">${span}`;
        } else {
          return `<${tag}>${span}`;
        }
      } else {
        return `<${tag}>${span}`;
      }
    }
  }

  md.renderer.rules.heading_close = function (tokens, idx) {
    let tag = tokens[idx].tag;
    if (tokens[idx].hidden) {
      return "</span>";
    } else {
      return `</span></${tag}>`;
    }
  };

  md.renderer.rules.paragraph_open = function (tokens, idx) {
    let token = tokens[idx]
    let tag = token.tag;
    let span = '<span class="line">';
    if (token.meta && token.meta.linenum) {
      span = `<span class="line" num="${token.meta.linenum}">`
    }
    if (tokens[idx].hidden) {
      return span;
    } else {
      if (token.attrs && token.attrs.length > 0) {
        let attr = token.attrs[0];
        if (attr.length > 0 && attr[0] === 'id') {
          return `<${tag} class="para" id="${attr[1]}">${span}`;
        } else {
          return `<${tag}>${span}`;
        }
      } else {
        return `<${tag}>${span}`;
      }
    }
  };

  md.renderer.rules.paragraph_close = function (tokens, idx) {
    if (tokens[idx].hidden) {
      return "</span>";
    } else {
      return "</span></p>";
    }
  };

  md.renderer.rules.linenum = function (tokens, idx) {
    let token = tokens[idx]
    if (token.meta && token.meta.linenum) {
      return `</span><span class="line" num="${token.meta.linenum}">`
    } else {
      return "";
    }
  }
};