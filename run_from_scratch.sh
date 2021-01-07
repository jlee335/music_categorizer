#!/bin/bash

# I've created this script to download and categorize quickly!

# 1. Running 

cd ..
source downloader/bin/activate
cd music_categorizer/downloader
python downloader.py
cd ../..
source categorizer/bin/activate
cd music_categorizer/categorizer
python categorizer.py

