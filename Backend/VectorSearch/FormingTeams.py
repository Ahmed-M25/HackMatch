import numpy as np
import faiss
import json
from sklearn.cluster import KMeans
import sys

# Redirect stderr to a log file
sys.stderr = open('formingteams_error.log', 'w')

# Log to check script start
print("Starting FormingTeams.py script")

# Load embeddings and user profiles
try:
    embeddings = np.load('embeddings.npy')
    with open('user_profiles.json', 'r') as f:
        user_profiles = json.load(f)
    print("Data loaded successfully")
except Exception as e:
    print(f"Error loading data: {e}")
    sys.stderr.write(f"Error loading data: {e}\n")
    raise

# Create a FAISS index
try:
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)
    print("FAISS index created successfully")
except Exception as e:
    print(f"Error creating FAISS index: {e}")
    sys.stderr.write(f"Error creating FAISS index: {e}\n")
    raise

# Function to modify distances based on preferences
def adjust_distances_for_preferences(embeddings, user_profiles, index):
    adjusted_distances = np.zeros((len(user_profiles), len(user_profiles)))
    for i in range(len(user_profiles)):
        for j in range(len(user_profiles)):
            if i != j:
                distance, _ = index.search(embeddings[i].reshape(1, -1), len(user_profiles))
                if user_profiles[j]['user'] in user_profiles[i]['preferences']:
                    adjusted_distances[i][j] = distance[0][j] * 0.5  # Reduce distance if preferred
                else:
                    adjusted_distances[i][j] = distance[0][j]
    return adjusted_distances

# Get adjusted distances
try:
    adjusted_distances = adjust_distances_for_preferences(embeddings, user_profiles, index)
    print("Adjusted distances calculated successfully")
except Exception as e:
    print(f"Error adjusting distances: {e}")
    sys.stderr.write(f"Error adjusting distances: {e}\n")
    raise

# Use adjusted distances to perform K-means clustering
try:
    num_clusters = (len(user_profiles) + 3) // 4  # To ensure that every team has a maximum of 4 members
    kmeans = KMeans(n_clusters=num_clusters)
    team_assignments = kmeans.fit_predict(adjusted_distances)
    print("K-means clustering completed successfully")
except Exception as e:
    print(f"Error in K-means clustering: {e}")
    sys.stderr.write(f"Error in K-means clustering: {e}\n")
    raise

# Assign users to teams ensuring no duplicates and max 4 per team
try:
    teams = {}
    assigned_users = set()
    
    for i, team in enumerate(team_assignments):
        if team not in teams:
            teams[team] = []
        if len(teams[team]) < 4 and user_profiles[i]['user'] not in assigned_users:
            teams[team].append(user_profiles[i])
            assigned_users.add(user_profiles[i]['user'])

    # Handle leftover users by creating new teams if necessary
    leftover_users = [user_profiles[i] for i in range(len(user_profiles)) if user_profiles[i]['user'] not in assigned_users]
    if leftover_users:
        for i in range(0, len(leftover_users), 4):
            new_team = len(teams)
            teams[new_team] = leftover_users[i:i + 4]

    print("Teams assigned successfully")
except Exception as e:
    print(f"Error assigning teams: {e}")
    sys.stderr.write(f"Error assigning teams: {e}\n")
    raise

# Convert keys to strings for JSON serialization
teams = {str(key): value for key, value in teams.items()}

# Save teams
try:
    with open('teams.json', 'w') as f:
        json.dump(teams, f)
    print("Teams saved successfully")
except Exception as e:
    print(f"Error saving teams: {e}")
    sys.stderr.write(f"Error saving teams: {e}\n")
    raise

print("FormingTeams.py script completed successfully")
