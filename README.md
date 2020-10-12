# Cf TR UIScripts
A basic API enabled UIScripts framework and collection of custom UI Scripts for use with [TestRail](www.testrail.com)

Cf TR UIScripts includes a customizeable dialog window for use with TR UI Scripts. API calls are also supported. 
Currently only a small subset of API calls are implemented, just what was needed to support the initial References
Add/Remove tool. More UIScripts, custom dialog controls, and API abilities will continue to be added!.

###### Notice
Please see license file. Use UIScripts and customizations at your own risk! 


## (Quick Start) How To Use
1. Session based API authentication must be enabled! Navigate to your TestRail Administration->Site Settings->API(Tab)
to enable! 
2. Navigate to your TestRail Administration->Customizations page 
3. Click "Add UI Script"
4. For each UI Script you wish to use copy the entire contents of the file into the newly created UI Script
5. Remove the /* and */ comment strings around the standard TestRail UI script header.
6. Ensure you have also added required support files (such as UIScripts_CutomDialog and APIFunction) 


## Custom Dialog Win
The included custom dialog window code allows for the creation and spawning of a simple interface for interacting with
various UIScript functionality and API calls from within TestRail. 

This custom dialog is available from all pages within TestRail and is available to use with any other UIScripts.
See examples of the Custom Dialogs usage in the CFUIScripts-References_InsertRemove.js UIScript file


## API calls
The Cf TR UIScripts make use of the TestRail API. Session based API authentication must be enabled on your TestRail 
installation! Navigate to the following page on your TestRail installation to enable it.

`Administration->Site Settings->API(Tab)`
 
## (UIScript) References: Insert and Remove
This included UI Script allows for bulk (group editing) adding or removing test case references from selected test cases
that do not share like references. 

Example:\
Test Case A References: "Ref1, Ref2, Ref3, Ref4"\
Test Case B References: "Ref1, Ref2"\

Attempting to add "Ref5" by group editing Test Case A and B would cause both test cases to lose their pre-existing
references resulting in both cases having only the reference "Ref5".

This UI Script is only available on the Test Cases view page. 

###### Use:
1. Navigate to the Test Cases page within TestRail
2. Select the target test cases using the selection check box next to each test case to be updated
3. Click the `Edit` dropdown box 
4. Select either `Insert Refs Into Selected` or `Remove Refs From Selected`
5. Within the CF UIScripts custom dialog window enter the refeerence to add or remove (CASE SENSITIVE!)
6. Click `Execute Operation!` to begin updating the selected test cases. 

 
## Bugs
Please report any bugs or issues you encounter [here](https://github.com/Corefracture/cf_tr_uiscripts/issues)! 
Thank you!
