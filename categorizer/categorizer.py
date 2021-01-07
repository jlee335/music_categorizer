"""
venv -> categorizer

<Categorizer.py>

1. Load pretrained model
2. Preprocess to mel-distribution thingy
3. mel -> model -> 2D coordinates


TODO:
1. Call librosa.load on ALL files on TEMPORARY directory, where downloader pushed in files.

2. use MongoDB to save the following

{
    1. Title                (downloader)
    2. Thumbnail            (downloader)
    3. x                    (not here)
    4. y                    (not here)
    5. wav_file             (downloader)
    6. link                 (downloader)
    7. processed            (downloader)
    8. mel_link             (not here)
}

"""
import os
import librosa
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import pymongo as mongo

import torch
import models
from torchvision.utils import save_image
import boto3


# Set up mongoDB connection
client = mongo.MongoClient("mongodb+srv://jlee335:jHPvQvjSqVWXpSQq@cluster0.yk0dr.mongodb.net/database?retryWrites=true&w=majority")
db = client["database"]
unprocessed_collection = db["unprocessed"]
processed_collection = db["processed"]

# Set up AWS S3 connection via boto3
s3 = boto3.client('s3')
#mel_image_bucket = s3.Bucket('musiccategorizermel')

device = 'cuda' if torch.cuda.is_available() and args.gpu else 'cpu'

print_mel = False

#   Load Classifier model.
model = models.SimpleClassifier().to(device)
#model = load_state_dict(from path or DB)
model.eval()

#   Load WAV file. 
#   This method may change if DB is used later on.

# We want to generate a mel spectogram for ALL unprocessed wav files!

destination = '../downloader/mp3_sources'
data_dir = Path(destination)
stage_directory = os.path.join(data_dir)


# 1. Query ALL unclassified mongoDB entries
entries = unprocessed_collection.find()

for entry in entries:

    print("processing : " + str(entry["Title"]))

    file_dir = entry["wav_file"]

    y,sr = librosa.load(file_dir)

    spec = librosa.feature.melspectrogram(y=y, sr=sr,fmax = 8000)

    mel_torch = torch.from_numpy(spec).to(device)

    result = model(mel_torch)

    # Create new entry and upload to MongoDB. 

    # Delete entry from unprocessed collection and add to processed collection list
    unprocessed_collection.delete_one({'_id': entry["_id"]})


    # Delete wav file as not needed
    os.remove(file_dir)


    entry["wav_file"] = ''
    entry["processed"] = 'True'
    entry["x"] = str(result[0].item())
    entry["y"] = str(result[1].item())

    new_entry = processed_collection.insert_one(entry)

    # Save mel spectogram result into cloud storage. I will use Amazon s3
    save_image(mel_torch, 'mel.png')

    filename = 'mel.png'
    bucketname = 'musiccategorizermel'
    objectname = str(entry['_id'])

    s3.upload_file(filename, bucketname, objectname)
    print("saved by : " + str(entry['_id']))



