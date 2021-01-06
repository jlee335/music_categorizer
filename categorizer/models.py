'''
venv -> categorizer

Models are stored here

2D image 128 x LENGTH x 1    ->    Feature Vector
'''
  
import math
import torch
from torch import nn

class SimpleClassifier(nn.Module):
    def __init__(self):

        super(SimpleClassifier, self).__init__()
        

    def forward(self, mel):
        
        return torch.rand(2)


