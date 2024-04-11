/**
 * @fileoverview timer id should assign to an identifier or member for cleaning up
 * @author littlee
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    hasSuggestions: true,
    messages: {
      assignTimerId:
        "setInterval timer id should assign to an identifier or member for cleaning up, `const intervalId = {{calleeName}}(...);`",
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    return {
      CallExpression(node) {
        const calleeName =
          node.callee.name ||
          (node.callee.property && node.callee.property.name);
        const isInterval = calleeName === "setInterval";

        if (!isInterval) {
          return;
        }

        const parent = node.parent;
        if (parent.right === node && parent.type === "AssignmentExpression") {
          return;
        }
        if (parent.init === node && parent.type === "VariableDeclarator") {
          return;
        }
        context.report({
          node,
          messageId: "assignTimerId",
          data: {
            calleeName,
          },
          suggest: [
            {
              desc: "assign setInterval timer id to a variable",
              fix: function (fixer) {
                return fixer.insertTextBefore(node, "const intervalId = ");
              },
            },
          ],
        });
      },
    };
  },
};
