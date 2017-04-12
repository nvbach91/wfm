"# wfm" 
* run all tests in tests folder
    casperjs test tests


* to run all test cases do 

    for %i in (tests\*.js) do casperjs --no-colors test "%~i"

    

* to run all test cases and log the output to a file do

    for %i in (tests\*.js) do casperjs --no-colors test "%~i" >> results.log