/**
 * Created by phucpnt on 5/22/16.
 */

import t from 'tcomb-form';

const Contact = t.struct({
  id: t.Number,
  avatar: t.maybe(t.String),
  name: t.String,
});