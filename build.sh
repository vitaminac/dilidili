#!/usr/bin/env bash
docker build --tag=dalao666 .
docker tag dalao666 hellodalao/dalao666:$VERSION
docker push hellodalao/dalao666:$VERSION
docker tag dalao666 hellodalao/dalao666:latest
docker push hellodalao/dalao666:latest