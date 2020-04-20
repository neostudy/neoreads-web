
function nextNode(node) {
  if (node.hasChildNodes()) {
      return node.firstChild;
  } else {
      while (node && !node.nextSibling) {
          node = node.parentNode;
      }
      if (!node) {
          return null;
      }
      return node.nextSibling;
  }
}

function getRangeSelectedNodes(range) {
  var node = range.startContainer;
  var endNode = range.endContainer;

  // Special case for a range that is contained within a single node
  if (node == endNode) {
      return [node];
  }

  // Iterate nodes until we hit the end container
  var rangeNodes = [];
  while (node && node != endNode) {
      rangeNodes.push( node = nextNode(node) );
  }

  // Add partially selected nodes at the start of the range
  node = range.startContainer;
  while (node && node != range.commonAncestorContainer) {
      rangeNodes.unshift(node);
      node = node.parentNode;
  }

  return rangeNodes;
}

export function getSelectedNodes() {
  if (window.getSelection) {
      var sel = window.getSelection();
      if (!sel.isCollapsed) {
          return getRangeSelectedNodes(sel.getRangeAt(0));
      }
  }
  return [];
}

export function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    activeElTagName == "textarea" ||
    (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
      typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(
      activeEl.selectionStart,
      activeEl.selectionEnd
    );
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

export function isCrossoverSelection() {
  if (!window.getSelection()) {
    return false;
  }
  let sel = window.getSelection();
  if (sel.anchorNode == sel.focusNode) {
    return false;
  } else {
    return true;
  }
}

