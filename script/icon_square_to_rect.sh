#!/bin/bash

# --------------------------
# Parameter 1: Name of the color that will be used for the final thumbnail images.
# Allowed color names: https://matplotlib.org/examples/color/named_colors.html
# 
# This script should be run from the directory where the icon fonts are stored, 
# e.g. ~/butler-icon-upload/fonts/fontawesome

# Store current directory
pushd .

# --------------------------
# Convert icon font to images
icon-font-to-png \
--css style.css \
--ttf fonts/icomoon.ttf \
--size 256 \
--color "$1" \
ALL


# --------------------------
# Convert square icons to rectangular ditto, 
# with an aspect ration suitable for use as Qlik Sense sheet thumbnails

mkdir thumbnail
cd exported

FILES=*.png
for f in $FILES
do
  echo $f
  convert $f -gravity center -extent 410x270 "../thumbnail/$f"
done


popd

