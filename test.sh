#!/bin/bash -Ceu

yarn test
yarn run lint:sass
yarn run lint:ts
