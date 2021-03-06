'use strict';

const mm = require('egg-mock');
const utils = require('../utils');

describe('test/lib/beidou.test.js', () => {
  beforeEach(() => {
    mm.consoleLevel('NONE');
  });

  afterEach(() => {
    mm.restore();
  });

  describe('Master start fail', () => {
    let master;

    after(() => {
      master.close();
    });

    it('should master exit with 1', (done) => {
      master = utils.startMaster('apps/master-worker-start-fail', {
        coverage: true,
      });
      master.expect('code', 1).ready(done);
    });
  });

  describe('Master started success', () => {
    let app;

    afterEach(() => {
      app.close();
    });

    it('should stdout message include "Beidou started"', (done) => {
      app = utils.startMaster('apps/master-worker-start-success', {
        coverage: true,
      });
      app.expect('stdout', /Beidou started/).ready(done);
    });
  });
});
