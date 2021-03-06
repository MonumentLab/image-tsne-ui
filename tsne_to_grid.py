# -*- coding: utf-8 -*-

import argparse
import glob
import math
import numpy as np
import os
import pickle
from pprint import pprint
import rasterfairy
import sys

from lib.utils import *

# input
parser = argparse.ArgumentParser()
parser.add_argument('-in', dest="INPUT_FILE", default="data/photographic_tsne.csv", help="Input csv file")
parser.add_argument('-out', dest="OUTPUT_FILE", default="output/photographic_grid.p", help="File for output")
a = parser.parse_args()

model = np.loadtxt(a.INPUT_FILE, delimiter=",")
count = len(model)

print("Determining grid assignment...")
gridAssignment = rasterfairy.transformPointCloud2D(model)

grid, gridShape = gridAssignment
print("Resulting shape: %s x %s" % gridShape)

with open(a.OUTPUT_FILE, "wb") as f:
    pickle.dump(gridAssignment, f)
