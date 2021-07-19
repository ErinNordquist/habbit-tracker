FROM ubuntu:18.04

#set up python
RUN apt-get update -y && \
    apt-get install -y python3.7 python3-pip python3-dev python3-setuptools --no-install-recommends

RUN update-alternatives --install /usr/bin/python python3 /usr/bin/python3.7 1
RUN update-alternatives --set python3 /usr/bin/python3.7


COPY ./requirements.txt /server/requirements.txt

WORKDIR /server

RUN python3 -m pip install -r requirements.txt


COPY . /server

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

CMD python3 ./habit_app/api/api.py
