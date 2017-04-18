**PREREQUISITES**

* [PhantomJS](http://phantomjs.org) in system path
* [CasperJS](http://casperjs.org) in system path
* [ConEmu](https://conemu.github.io) for colorized terminal output

**USAGE:**

* to run single test in tests folder, do
    ```{r, engine='bash', all_tests_separately}
    casperjs test tests\251214.js
    ```
    

* to run all test cases separately, do 
    ```{r, engine='bash', all_tests_separately}
    for %i in (tests\*.js) do casperjs test "%~i"
    ```


* to run all test cases separately and log the output to a file, do
    ```{r, engine='bash', all_tests_separately}
    for %i in (tests\*.js) do casperjs --no-colors test "%~i" >> results.log
    ```

**AUTOMATED TEST CASES**
* [C137940](http://wfmtestrailvm/testrail/index.php?/cases/view/137940)
* [C1001](http://wfmtestrailvm/testrail/index.php?/cases/view/1001)
* [C1004](http://wfmtestrailvm/testrail/index.php?/cases/view/1004)
* [C1213](http://wfmtestrailvm/testrail/index.php?/cases/view/1213)
* [C121275](http://wfmtestrailvm/testrail/index.php?/cases/view/121275)
* [C144526](http://wfmtestrailvm/testrail/index.php?/cases/view/144526)