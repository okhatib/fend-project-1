// Import the js file to test
import { getApiKey } from "../src/client/js/getApiKey"


describe("Testing the Get API Key functionality", () => { 
    test("Testing the getApiKey() function exists", () => {
        expect(getApiKey).toBeDefined();
    });

    it('returns promise resolving to parsed response', () => {
        global.fetch = jest.fn(() => Promise.resolve({ json: () => ''}))
        expect(getApiKey()).resolves.toBe('');
    })
});