'use strict';

function handler(node, context) {
  const calleeName = getCalleeName(node);
  const isTimeout = calleeName === 'setTimeout';
  const delayValue = node.arguments[1];

  if (isTimeout && isZeroDelay(delayValue)) {
    return;
  }
  const parent = node.parent;
  const isAssignment = parent.right === node && parent.type === 'AssignmentExpression';
  const isVariableDeclarator = parent.init === node && parent.type === 'VariableDeclarator';
  if (isAssignment || isVariableDeclarator) {
    return;
  }
  context.report({
    node,
    messageId: 'assignTimerId',
    data: {
      calleeName
    },
    suggest: [
      {
        desc: 'assign timer id to a variable',
        fix: function (fixer) {
          return fixer.insertTextBefore(node, 'let timer = ');
        }
      }
    ]
  });
}

function getCalleeName(node) {
  if (node.callee.type === 'MemberExpression') {
    return node.callee.property.name;
  }
  return node.callee.name;
}

function isZeroDelay(delayValue) {
  return (
    delayValue === undefined ||
    (delayValue && Number(delayValue.value) === 0)
  );
}

module.exports = {
  meta: {
    hasSuggestions: true,
    messages: {
      assignTimerId:
        'timer id should assign to an identifier or member for cleaning up, `let timer = {{calleeName}}(...);`'
    },
    fixable: null,
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression[callee.object.name=/^(window|global|globalThis|self)$/][callee.property.name=/^(setTimeout|setInterval)$/]'(node) {
        handler(node, context);
      },
      'CallExpression[callee.name=/^(setTimeout|setInterval)$/]'(node) {
        handler(node, context);
      }
    };
  }
};
