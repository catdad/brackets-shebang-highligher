/* globals define */

define(function (require, exports, module) {
  exports.list = {
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
  };
});
