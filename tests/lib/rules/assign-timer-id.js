/**
 * @fileoverview timer id should assign to a variable for clean up
 * @author littlee
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/assign-timer-id"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
});
ruleTester.run("assign-timer-id", rule, {
  valid: [
    {
      code: "const a = setInterval(() => {}, 1000)",
    },
    {
      code: "const a = setInterval(() => {})",
    },
    {
      code: "someOtherFunction()",
    },
    {
      code: "const a = window.setInterval(() => {}, 1000)",
    },
    {
      code: "someOtherObject.setInterval(() => {}, 1000)",
    },
  ],
  invalid: [
    {
      code: "setInterval(() => {})",
      errors: [
        {
          messageId: "assignTimerId",
        },
      ],
    },
    {
      code: "setInterval(() => {}, 0)",
      errors: [
        {
          messageId: "assignTimerId",
        },
      ],
    },
    {
      code: "setInterval(() => {}, 1000)",
      errors: [
        {
          messageId: "assignTimerId",
        },
      ],
    },
    {
      code: "window.setInterval(() => {}, 1000)",
      errors: [
        {
          messageId: "assignTimerId",
        },
      ],
    },
  ],
});
