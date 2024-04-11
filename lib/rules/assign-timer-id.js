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
        "The code detective says: 🕵️💬 setInterval should be assigned to a variable so that it can be cleared , `const intervalId = {{calleeName}}(...);`",
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    return {
      CallExpression(node) {
        const isWindow =
          Boolean(node.callee.object) && node.callee.object.name === "window";
        const calleeName =
          node.callee.name ||
          (isWindow &&
            Boolean(node.callee.property) &&
            node.callee.property.name);
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
              desc: "The code detective says: 🕵️💬 assign the returned number from setInterval to a variable so that it can be cleared 🙀",
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
