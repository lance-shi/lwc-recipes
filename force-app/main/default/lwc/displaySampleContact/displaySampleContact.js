import { LightningElement, track, wire } from 'lwc';
import getContactsByName from '@salesforce/apex/DisplaySampleContactController.getContactsByName';

export default class DisplaySampleContact extends LightningElement {
    @track contactName = '';
    @track searchKey = '';

    @wire(getContactsByName, {searchKey: '$searchKey'})
    contacts; //This is the line which causes the page to break

    handleKeyChange(event) {
        this.contactName = event.target.value;
    }

    handleSearch() {
        this.searchKey = this.contactName;
    }
}