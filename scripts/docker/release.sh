#!/bin/sh
set -e

TARGET_DIR="${THEME_NAME:-/}"
cd /"${TARGET_DIR}"
cp /release/assets/css/compiled/* ./assets/css/compiled/
