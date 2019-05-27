export default class TextandAdditionalInfo {
    constructor(textAndAdditionalInfo) {
        this.textAndAdditionalInfo = textAndAdditionalInfo;
    }

    getText() {
        return this.textAndAdditionalInfo.text;
    }

    getAdditionalInfo() {
        return this.textAndAdditionalInfo.additionalInfo;
    }
    
}