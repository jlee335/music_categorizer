"""
venv -> categorizer

<Categorizer.py>

1. Load pretrained model
2. Preprocess to mel-distribution thingy
3. mel -> model -> 2D coordinates
"""

import librosa
import numpy as np
import matplotlib.pyplot as plt

import torch
import models

device = 'cuda' if torch.cuda.is_available() and args.gpu else 'cpu'

print_mel = False

#   Load Classifier model.
model = models.SimpleClassifier().to(device)
#model = load_state_dict(from path or DB)
model.eval()


#   Load WAV file. 
#   This method may change if DB is used later on.

y,sr = librosa.load('../downloader/mp3_sources/file.wav')

#   Change wav file to mel spectogram using Librosa library
spec = librosa.feature.melspectrogram(y=y, sr=sr,fmax = 8000)

#   Convert to pytorch tensor
mel_torch = torch.from_numpy(spec).to(device)

print(mel_torch.shape)

result = model(mel_torch)

print(result)


if print_mel:
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(librosa.power_to_db(spec,ref=np.max),y_axis='mel', fmax=8000,x_axis='time')
    plt.title('Reference power spectrogram')
    plt.colorbar(format='%+2.0f dB')
    plt.tight_layout()
    plt.savefig('foo.png')

