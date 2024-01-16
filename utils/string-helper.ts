export class StringHelper {
    public static generateString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static formatString(str: string, ...val: string[]): string {
        for (let i = 0; i < val.length; i++) {
            str = str.replace(`{${i}}`, val[i]);
        }
        return str;
    }
}