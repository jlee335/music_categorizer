
import os
from pathlib import Path
from pytube import YouTube

from pydub import AudioSegment

destination = 'mp3_sources'

data_dir = Path(destination)
data_dir.mkdir(parents=True, exist_ok=True)

stage_directory = os.path.join(data_dir)


links = [
    "https://www.youtube.com/watch?v=zajkxWnnAaI&ab_channel=%EC%BD%94%EB%B2%A8CovelTV"
]

i = 0
for link in links: 
    yt = YouTube(link).streams.filter(only_audio=True).first()
    
    if yt == None:
        print("ERROR on link :" + str(link))
        continue

    fname = yt.default_filename

    download = yt.download(stage_directory)
    
    src = download
    dst = download[:-4] + ".wav"
    print()
    print(src)
    print(dst)
    print()
    sound = AudioSegment.from_file(src,format="mp4")
    sound.export(dst, format="wav")