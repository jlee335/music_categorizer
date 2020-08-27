from pytube import YouTube

import os
import shutil
import math
import datetime

yt_link = 'https://www.youtube.com/watch?v=XFma0j6CZb0'

video = YouTube(yt_link)
t = video.streams.filter(only_audio=True)

t[0].download(output_path="/files")