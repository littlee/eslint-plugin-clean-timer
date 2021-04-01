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
    messages: {
      assignTimerId:
        'timer id should assign to an identifier or member for cleaning up'
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

    return {
      CallExpression(node) {
        const calleeName = node.callee.name;
        if (calleeName === 'setTimeout' || calleeName === 'setInterval') {
          const delayValue = node.arguments[1];
          if (delayValue === undefined || Number(delayValue) === 0) {
            return;
          }
          const parent = node.parent;
          if (parent.right === node && parent.type === 'AssignmentExpression') {
            return;
          }
          if (parent.init === node && parent.type === 'VariableDeclarator') {
            return;
          }
          context.report({
            node,
            messageId: 'assignTimerId'
          });
        }
      }
    };
  }
};
