import { LightningElement, track} from 'lwc';
import getSingleContactByName from '@salesforce/apex/DisplaySampleContactController.getSingleContactByName';
import updateContact from '@salesforce/apex/DisplaySampleContactController.updateContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UpdateContactDetail extends LightningElement {
    @track contactName = '';
    @track contact;

    handleKeyChange(event) {
        this.contactName = event.target.value;
    }

    handleSearch() {
        getSingleContactByName({ searchName: this.contactName })
            .then(result => {
                this.contact = result;
            });
    }

    handlePhoneChange(event) {
        this.contact.Phone = event.target.value;
    }

    handleEmailChange(event) {
        this.contact.Email = event.target.value;
    }

    updateContact() {
        updateContact({con: this.contact})
            .then(result => {
                console.log(result);
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact Updated Successfully!',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            });
    }
}