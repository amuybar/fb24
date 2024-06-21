import json
import os

# Define the function to normalize names
def normalize_name(name):
    return ' '.join(name.replace("Hon.", "").strip().lower().split())

# Define the function to split names into sets of words
def name_to_set(name):
    return set(normalize_name(name).split())

# Define the function to check for partial name matches
def names_match(name1, name2, min_matches=2):
    set1 = name_to_set(name1)
    set2 = name_to_set(name2)
    return len(set1.intersection(set2)) >= min_matches

# Get the current directory (directory where the script is located)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Define the file paths
data_file_path = os.path.join(current_dir, 'data.json')
vote_file_path = os.path.join(current_dir, 'vote.json')

# Load the data from data.json
with open(data_file_path) as f:
    data_json = json.load(f)

# Load the data from vote.json
with open(vote_file_path) as f:
    vote_json = json.load(f)

# Create a dictionary from the data for easy lookup
data_dict = {normalize_name(entry['name']): entry for entry in data_json}

# Merge the data with enhanced matching
merged_data = []
for vote_entry in vote_json:
    vote_name = normalize_name(vote_entry['name'])
    for data_name, data_entry in data_dict.items():
        if names_match(vote_name, data_name):
            merged_entry = {
                "vote": vote_entry["vote"],
                "name": vote_entry["name"],
                "party": data_entry["party"],
                "constituency": data_entry["constituency"]
            }
            merged_data.append(merged_entry)
            break

# Get the first 10 entries
first_10_entries = merged_data[:10]
for entry in first_10_entries:
    print(entry)

# Save the merged data to a new JSON file
output_path = os.path.join(current_dir, 'merged_data.json')
with open(output_path, 'w') as f:
    json.dump(merged_data, f, indent=4)

print(f"Merged data saved to {output_path}")
