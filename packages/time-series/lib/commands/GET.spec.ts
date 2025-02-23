import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import { transformArguments } from './GET';

describe('GET', () => {
    it('transformArguments', () => {
        assert.deepEqual(
            transformArguments('key'),
            ['TS.GET', 'key']
        );
    });

    describe('client.ts.get', () => {
        testUtils.testWithClient('null', async client => {
            await client.ts.create('key');

            assert.equal(
                await client.ts.get('key'),
                null
            );
        }, GLOBAL.SERVERS.OPEN);

        testUtils.testWithClient('with samples', async client => {
            await client.ts.add('key', 0, 1);

            assert.deepEqual(
                await client.ts.get('key'),
                {
                    timestamp: 0,
                    value: 1
                }
            );
        }, GLOBAL.SERVERS.OPEN);
    });
});
