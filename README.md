**PREREQUISITES**

* [PhantomJS](http://phantomjs.org) in system path
* [CasperJS](http://casperjs.org) in system path
* [ConEmu](https://conemu.github.io) for colorized terminal output

**USAGE:**

* to run single test file in the ```tests``` folder, do
    ```{r, engine='bash', single_test}
    casperjs test tests\C1001.js
    ```
    

* to run all test cases separately, do 
    ```{r, engine='bash', all_tests_separately}
    for %i in (tests\*.js) do casperjs test "%~i"
    ```


* to run all test cases separately and log the output to a file, do
    ```{r, engine='bash', all_tests_separately_log_file}
    for %i in (tests\*.js) do casperjs --no-colors test "%~i" >> results.log
    ```


* to watch live screenshots, open ```.\screenshots\live.png``` in an image viewer that can autorefresh on file change, for example:
    - [Visual Studio Code](https://code.visualstudio.com)
    - [Atom](https://atom.io)


**AUTOMATED TEST CASES**
* [C137940](http://wfmtestrailvm/testrail/index.php?/cases/view/137940)
* [C1001](http://wfmtestrailvm/testrail/index.php?/cases/view/1001)
* [C1004](http://wfmtestrailvm/testrail/index.php?/cases/view/1004)
* [C1016](http://wfmtestrailvm/testrail/index.php?/cases/view/1016)
* [C1213](http://wfmtestrailvm/testrail/index.php?/cases/view/1213)
* [C121275](http://wfmtestrailvm/testrail/index.php?/cases/view/121275)
* [C144526](http://wfmtestrailvm/testrail/index.php?/cases/view/144526)
* [C4914](http://wfmtestrailvm/testrail/index.php?/cases/view/4914)