export class StringHelper {
    /**
     * Generate a string with specific number of characters
     * 
     * @param length number The number of characters that the generated string should have
     * @returns string
     */
    public static generateString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * Format a dynamic string with list of specific values
     * e.g. formatString('Login with username {0} and password {1}', 'John', 'a1234') => Login with username John and password a1234
     * 
     * @param str string The dynamic string with format {<index>} in where we want to input dynamic value
     * @param val string List of dynamic values will pass to the dynamic string
     * @returns string
     */
    public static formatString(str: string, ...val: string[]): string {
        for (let i = 0; i < val.length; i++) {
            str = str.replace(`{${i}}`, val[i]);
        }
        return str;
    }
}