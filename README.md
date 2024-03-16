All the Tests are stored in test/Specs/
All the page related object and methods are stored in test/pageobjects
Utilities are stored in test/Utilities
Test Data is stored at test/constant.js


For Reporting Allure Report has been used. To generate Allure report use the following method:
1. Open cmd where the project folder is located
2. Run the tests with command: "npx wdio run ./wdio.conf.js"
3. Once Run is finished, Type "allure generate --clear" and hit enter
4. Once Allure is generated, Type "allure open" and hit enter



You can run one specific test as well, Follow the following steps:

1. Open cmd where the project folder is located
2. Run the tests with command: "npx wdio run .\wdio.conf.js --spec .\test\specs\ItemSortValidations.js"   -----After specs you can give the name of the particular test file you want to run.


