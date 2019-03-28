import { LightningElement, track } from 'lwc';
import addAccounts from "@salesforce/apex/DisplaySampleContactController.addAccounts"
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddMultipleAccounts extends LightningElement {
    @track accounts = [];
    @track idicator = 1;

    addAccount() {
        let newAcc = {};
        newAcc.Id = this.idicator;
        this.idicator++;
        newAcc.Name = '';

        this.accounts.push(newAcc);
    }

    submitAccounts() {
        let accInputs = Array.from(this.template.querySelectorAll(".accNameInput"));
        let allNames = accInputs.map(acc => acc.value);

        addAccounts({accNameList: allNames})
            .then(result => {
                console.log(result);
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts added Successfully!',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            });
    }
}