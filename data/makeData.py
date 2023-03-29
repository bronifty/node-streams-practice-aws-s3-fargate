import csv
import random
import os

filename = '2gb_file.csv'
size_limit = 2 * 1024 * 1024 * 1024  # 2 GB
header = ['Column1', 'Column2', 'Column3', 'Column4', 'Column5']

def generate_row():
    return [
        random.randint(1, 100000),
        random.uniform(0, 100),
        random.choice(['A', 'B', 'C', 'D', 'E']),
        random.choice(['X', 'Y', 'Z']),
        random.randint(1, 1000)
    ]

with open(filename, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(header)

    while os.path.getsize(filename) < size_limit:
        writer.writerow(generate_row())
