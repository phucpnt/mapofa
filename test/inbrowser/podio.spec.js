/**
 * Created by phucpnt on 5/14/16.
 */

import {expect} from 'chai';
import connectPodio from './helper/connect-podio';


connectPodio((podio) => {
  describe('Podio connection', () => {
    it('should connected', () => {
      expect('hello podio').to.equal('hello podio');
    });
  });
});


