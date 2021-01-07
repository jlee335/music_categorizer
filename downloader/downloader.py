
import os
from pathlib import Path
from pytube import YouTube

from pydub import AudioSegment

import pymongo as mongo


client = mongo.MongoClient("mongodb+srv://jlee335:jHPvQvjSqVWXpSQq@cluster0.yk0dr.mongodb.net/database?retryWrites=true&w=majority")
db = client["database"]
collection = db["unprocessed"]
'''
TODO:
1. Make temporary directory to store all downloaded music files
2. Use MongoDB to make Music Entry 
{
    1. Title of Music       (downloader)
    2. Thumbnail            (downloader)
    3. x                    (not here)
    4. y                    (not here)
    5. wav file directory   (downloader)
    6. Link                 (downloader)
    7. Processed?           (downloader)
    8. mel_link             (not here)
}
'''

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
    thumbnail_url = YouTube(link).thumbnail_url


    download = yt.download(stage_directory)
    
    src = download
    dst = download[:-4] + ".wav"
    sound = AudioSegment.from_file(src,format="mp4")
    sound.export(dst, format="wav")

    os.remove(src)

    music = {'Title':fname,'Thumbnail':thumbnail_url,'x':'','y':'','wav_file':dst,'link':link,'processed':'False','mel_link':''}

    music_inserted = collection.insert_one(music)



    print(music_inserted)

    #   mongoDB 에 파일의 존재를 알리자!
