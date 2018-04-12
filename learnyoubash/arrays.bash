#!/usr/bin/env bash

sentence=(I am "${@:2:2}" and "${@:4:1}")
echo ${sentence[*]}
