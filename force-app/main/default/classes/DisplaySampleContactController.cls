public class DisplaySampleContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByName(String searchKey){
        if (String.isBlank(searchKey)) {
            return new List<Contact>();
        }
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Title, Phone, Email, Picture__c 
                FROM Contact 
                WHERE Name LIKE :key 
                AND Picture__c != null 
                LIMIT 1];
    }

    @AuraEnabled
    public static Contact getSingleContactByName(String searchName){
        List<Contact> conList = getContactsByName(searchName);

        if(!conList.isEmpty()) {
            return conList[0];
        } else {
            return null;
        }
    }

    @AuraEnabled
    public static String updateContact(Contact con){
        update con;
        return 'Success';
    }
}