#!/usr/bin/env sh
yarn run drop-database
yarn run migrate
yarn run test
