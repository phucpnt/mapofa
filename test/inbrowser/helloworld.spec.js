/**
 * Created by phucpnt on 5/13/16.
 */

import { expect } from 'chai';

describe('Test App', () => {
  describe('Given accessing the test url', () => {
    it('should see hello world', () => {
      expect('hello world').to.be.equal('hello world');
    });
  });
});