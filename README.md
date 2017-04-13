**PREREQUISITES**

* [PhantomJS](http://phantomjs.org) in Path
* [CasperJS](http://casperjs.org) in Path

**USAGE:**

* to run single test in tests folder, do

    ```$> casperjs test tests\251214.js```



* to run all tests in tests folder, do

    ```$> casperjs test tests```


* to run all test cases separately, do 

    ```$> for %i in (tests\*.js) do casperjs test "%~i"```


* to run all test cases separately and log the output to a file, do

    ```$> for %i in (tests\*.js) do casperjs --no-colors test "%~i" >> results.log```