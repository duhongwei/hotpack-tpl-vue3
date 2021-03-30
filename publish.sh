#!/bin/bash

#eslint './src'
#if [ $? -ne 0 ]; 
#then
#echo ''
#else
git pull
node --unhandled-rejections=strict ../hotpack/bin/hotpack.js pro
if [ $? -eq 0 ]; 
then
git add . -A
git commit -m 'auto ci'
git push
fi
