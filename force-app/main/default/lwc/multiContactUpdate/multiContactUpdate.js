import { LightningElement, track } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';
import submitContacts from '@salesforce/apex/DisplaySampleContactController.submitContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultiContactUpdate extends LightningElement {
    @track contactName = '';
    @track contacts;

    handleKeyChange(event) {
        this.contactName = event.target.value;
    }

    handleSearch() {
        findContacts({ searchKey: this.contactName })
            .then(result => {
                this.contacts = result;
                console.log(result);
            });
    }

    updateContacts() {
        let contactList = [];
        let contactEleList = Array.from(this.template.querySelectorAll("c-contact-input"));

        contactList = contactEleList.map(conEle => conEle.getContact());

        submitContacts({conList: contactList})
            .then( result => {
                console.log(result);
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts updated Successfully!',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            });
    }
}