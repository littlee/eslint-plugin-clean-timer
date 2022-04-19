/**
 * @fileoverview timer id should assign to an identifier or member for cleaning up
 * @author littlee
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    hasSuggestions: true,
    messages: {
      assignTimerId:
        'timer id should assign to an identifier or member for cleaning up, `let timer = {{calleeName}}(...);`'
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function (context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    function isZeroDelay(delayValue) {
      return (
        delayValue === undefined ||
        (delayValue && Number(delayValue.value) === 0)
      );
    }

    return {
      CallExpression(node) {
        const calleeName = node.callee.name;
        const isTimeout = calleeName === 'setTimeout';
        const isInterval = calleeName === 'setInterval';
        const delayValue = node.arguments[1];
        if (isTimeout && isZeroDelay(delayValue)) {
          return;
        }
        if (isTimeout || isInterval) {
          const parent = node.parent;
          if (parent.right === node && parent.type === 'AssignmentExpression') {
            return;
          }
          if (parent.init === node && parent.type === 'VariableDeclarator') {
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
      }
    };
  }
};
