import CodeGen from './CodeGen.js'

function getNthCharAfter(c: string, n: number, offset: number = 0): string {
    return String.fromCharCode(c.charCodeAt(0) + n - offset)
}

function genRandomAlphaNumChar():string{
    // 62 options, divided into 3 classes:
    // a-z: 26 -> cls 0, A-Z: 26 -> clas1, 0-9: 10 -> cls2
    let nrGen = Math.floor(Math.random() * 54)
    let charClass: number = Math.floor(nrGen/26)
    let startingChar: string = (['a', 'A', '0'])[charClass]
    return getNthCharAfter(startingChar, nrGen, charClass * 26)
}

let randomCodeGen: CodeGen = {
    generatePhotoString(numberOfCharacters: number): string {
        let digArr:string[] = []
        for(let i = 0; i < numberOfCharacters; i++)
            digArr.push(genRandomAlphaNumChar());
        return digArr.join('')
    },
    generateConfirmationCode(): string {
        throw new Error('Unimplemented')
    }
}

export default randomCodeGen