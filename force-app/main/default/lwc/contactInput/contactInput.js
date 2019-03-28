import { LightningElement, api, track} from 'lwc';


export default class ContactInput extends LightningElement {
    @api contact;
    curConName;
    curConPhone;
    curConEmail;
    curConId;

    @api getContact() {
        let curCon = {};
        curCon.Id = this.curConId;
        curCon.Name = this.curConEmail;
        curCon.Phone = this.curConPhone;
        curCon.Email = this.curConEmail;

        return curCon;
    }

    connectedCallback() {
        this.curConId = this.contact.Id;
        this.curConName = this.contact.Name;
        this.curConEmail = this.contact.Email;
        this.curConPhone = this.contact.Phone;
    }

    handlePhoneChange(event) {
        this.curConPhone = event.target.value;
    }

    handleEmailChange(event) {
        this.curConEmail = event.target.value;
    }
}