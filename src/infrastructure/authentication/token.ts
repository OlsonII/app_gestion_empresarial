export class Token {

    characters: string[] = [
        'a', 'b', 'c',
        'd', 'e', 'f',
        'g', 'h', 'i',
        'j', 'k', 'l',
        'm', 'n', 'o',
        'p', 'q', 'r',
        's', 't', 'u',
        'v', 'w', 'x',
        'y', 'z', '0',
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9'];

    generateToken(): string{
        let token = '';
        for (let i = 0; i < 40; i++){
            const position =Math.trunc(Math.random() * (this.characters.length - 1));
            const character = this.characters[position];
            token += character;
        }
        return token;
    }

}