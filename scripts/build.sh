#!/bin/bash

# Alex Hernandez
# Packages your twitch extension into an uploadable zip
# v1.0.0
# ===============================================================|

# GLOBAL VARS
DITTO=$(which ditto)

# CONSTANTS
ROOT_DIR=$(pwd)
TIMESTAMP=$(date +'%F-%T')

# CONFIG
INPUT_DIR="src"
OUTPUT_DIR="builds"
ZIP_NAME="ext-build"

# DEPENDANCY AVAILABILITY CHECK
if [[ -z ${DITTO} ]]; then
  echo "Oh no ditto is missing!"
  exit 2
fi

# BUILD SCRIPT
${DITTO} -c -k --sequesterRsrc ${ROOT_DIR}/${INPUT_DIR} ${ROOT_DIR}/${OUTPUT_DIR}/${ZIP_NAME}-${TIMESTAMP}.zip
