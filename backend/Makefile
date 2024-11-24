#Authored By: Christopher Huelitl
FILES :=                              \
    data.py                     	  \
	api_tests.py				  	  \


ifeq ($(shell uname), Darwin)          # Apple
    PYTHON   := python3
    PIP      := pip3
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := pydoc3
    AUTOPEP8 := autopep8
    DOC := docker run -it -v $$(PWD):/usr/cs373 -w /usr/cs373 fareszf/python
else ifeq ($(shell uname -p), unknown) # Windows
    PYTHON   := python                 # on my machine it's python
    PIP      := pip3
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := python -m pydoc        # on my machine it's pydoc
    AUTOPEP8 := autopep8
    DOC := docker run -it -v /$$(PWD):/usr/cs373 -w //usr/cs373 fareszf/python
else                                   # UTCS
    PYTHON   := python3
    PIP      := pip3
    PYLINT   := pylint3
    COVERAGE := coverage
    PYDOC    := pydoc3
    AUTOPEP8 := autopep8
    DOC := docker run -it -v $$(PWD):/usr/cs373 -w /usr/cs373 fareszf/python
endif

Cheap.log:
	git log > Cheap.log

tests: data.py
	$(COVERAGE) run    --branch api_tests.py > test_results.tmp 2>&1
	$(COVERAGE) report -m                      >> test_results.tmp
	cat test_results.tmp

clean:
	rm -f  .coverage
	rm -f  *.pyc
	rm -f  test_results.tmp
	rm -rf __pycache__
	
config:
	git config -l

format:
	$(AUTOPEP8) -i main.py
	$(AUTOPEP8) -i spotify_tests.py
	$(AUTOPEP8) -i ticketmaster_tests.py

status:
	make clean
	@echo
	git branch
	git remote -v
	git status
	
versions:
	which       $(AUTOPEP8)
	$(AUTOPEP8) --version
	@echo
	which       $(COVERAGE)
	$(COVERAGE) --version
	@echo
	which       git
	git         --version
	@echo
	which       make
	make        --version
	@echo
	which       $(PIP)
	$(PIP)      --version
	@echo
	which       $(PYLINT)
	$(PYLINT)   --version
	@echo
	which        $(PYTHON)
	$(PYTHON)    --version

