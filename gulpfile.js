'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

const getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  const result = getTasks.call(build.rig);

  if (result.get('serve-deprecated')) {
    result.set('serve', result.get('serve-deprecated'));
  }

  return result;
};

build.initialize(require('gulp'));