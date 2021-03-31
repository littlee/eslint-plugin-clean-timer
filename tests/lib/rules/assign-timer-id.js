/**
 * @fileoverview timer id should assign to a variable for clean up
 * @author littlee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/assign-timer-id'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('assign-timer-id', rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: 'setTimeout(() => {}, 1000)',
      errors: [
        {
          message: 'Fill me in.',
          type: 'Me too'
        }
      ]
    }
  ]
});
