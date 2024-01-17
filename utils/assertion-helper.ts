import { expect } from "@playwright/test";

export class AssertionHelper {
    public static assertEqual(actual: any, expected: any): void {
        expect(actual).toEqual(expected);
    }
}