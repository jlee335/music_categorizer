"""
<Categorizer.py>

1. Load pretrained model
2. Preprocess to mel-distribution thingy
3. mel -> model -> 2D coordinates
"""

import librosa
import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt

import torch


print_mel = False



y,sr = librosa.load('../downloader/mp3_sources/file.wav')

spec = librosa.feature.melspectrogram(y=y, sr=sr,fmax = 8000)

print(spec.shape)









if print_mel:
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(librosa.power_to_db(spec,ref=np.max),y_axis='mel', fmax=8000,x_axis='time')
    plt.title('Reference power spectrogram')
    plt.colorbar(format='%+2.0f dB')
    plt.tight_layout()
    plt.savefig('foo.png')

