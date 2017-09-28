/* globals define */

define(function (require, exports, module) {
  module.exports = {
    '#!/usr/bin/env node': 'javascript',
    '#!/usr/bin/node': 'javascript',
    '#!/usr/bin/env groovy': 'groovy',
    '#!/usr/bin/groovy': 'groovy',
    '#!/usr/bin/env python': 'python',
    '#!/usr/bin/python': 'python',
    '#!/usr/bin/env bash': 'bash',
    '#!/usr/bin/bash': 'bash',
    '#!/usr/bin/env sh': 'bash',
    '#!/usr/bin/sh': 'bash',
    '#!/bin/bash': 'bash',
    '#!/bin/sh': 'bash',
    '#!/usr/bin/env stack': 'haskell',
    '#!/usr/bin/stack': 'haskell',
    '#!/usr/bin/env runhaskell': 'haskell',
    '#!/usr/bin/runhaskell': 'haskell',
    '#!/usr/bin/env perl': 'perl',
    '#!/usr/bin/perl': 'perl',
    '#!/usr/local/bin/perl': 'perl',
  };
});
