#!/bin/bash

# Alex Hernandez
# Creates an SSL Cert for your local twitch extension backend
# v1.0.0
# ===============================================================|

# GLOBAL VARS
OPENSSL=$(which openssl)

# CONSTANTS
ROOT_DIR=$(pwd)

# CONFIG
OUTPUT_DIR="certs"
FILE_NAME="server"

COUNTRY="US"
STATE="US"
LOCATION="US"
HOST="localhost"

# DEPENDANCY AVAILABILITY CHECK
if [[ -z ${OPENSSL} ]]; then
  echo "Oh no openssl is missing!"
  exit 2
fi

mkdir ${OUTPUT_DIR}

${OPENSSL} req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout ${ROOT_DIR}/${OUTPUT_DIR}/${FILE_NAME}.key \
    -new \
    -out ${ROOT_DIR}/${OUTPUT_DIR}/${FILE_NAME}.crt \
    -subj "/C=${COUNTRY}/ST=${STATE}/L=${LOCATION}/CN=${HOST}" \
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /System/Library/OpenSSL/openssl.cnf \
        <(printf '[SAN]\nsubjectAltName=DNS:'${HOST})) \
    -sha256 \
    -days 3650
