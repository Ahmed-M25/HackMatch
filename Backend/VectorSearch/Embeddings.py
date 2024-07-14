import json
import numpy as np
from sentence_transformers import SentenceTransformer
import sys

# Redirect stderr to a log file
sys.stderr = open('embeddings_error.log', 'w')

# Log to check script start
print("Starting Embeddings.py script")

# Sample user profiles with preferences
try:
    with open('user_profiles.json', 'r') as f:
        user_profiles = json.load(f)
    print("User profiles loaded successfully")
except Exception as e:
    print(f"Error loading user profiles: {e}")
    sys.stderr.write(f"Error loading user profiles: {e}\n")
    raise

# Log to check user profiles loaded
print("User profiles loaded")

# Load pre-trained model
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    sys.stderr.write(f"Error loading model: {e}\n")
    raise

# Generate embeddings for user profiles
try:
    embeddings = [model.encode(profile['tech_stack'] + ' ' + profile['interests']) for profile in user_profiles]
    embeddings = np.array(embeddings)
    print("Embeddings generated successfully")
except Exception as e:
    print(f"Error generating embeddings: {e}")
    sys.stderr.write(f"Error generating embeddings: {e}\n")
    raise

# Save embeddings and user profiles
try:
    with open('embeddings.npy', 'wb') as f:
        np.save(f, embeddings)
    print("Embeddings saved successfully")

    with open('user_profiles.json', 'w') as f:
        json.dump(user_profiles, f)
    print("User profiles saved successfully")
except Exception as e:
    print(f"Error saving data: {e}")
    sys.stderr.write(f"Error saving data: {e}\n")
    raise

print("Embeddings.py script completed successfully")
