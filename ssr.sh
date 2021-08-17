#!/bin/bash

cd main
hotpack -rs
cp -r dev ../

cd ../dev
npm install
node index.js

