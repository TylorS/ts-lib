export const TEST_INDEX =
`import * as assert from 'assert';
import { Awesome } from './';

describe('Awesome', function () {
  it('isAwesome', function () {
    const awesome = new Awesome();

    assert.ok(awesome.isAwesome());
  });
});
`;
