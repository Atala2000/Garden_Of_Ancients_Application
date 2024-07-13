import { getAccessToken} from '../../src/utils/paypalUtils';
import { describe, expect, it } from '@jest/globals';

describe('getAccessToken', () => {
    it('should return a valid access token', async () => {
        const accessToken = await getAccessToken();
        expect(accessToken).toBeDefined();
        expect(typeof accessToken).toBe('string');
    });
});