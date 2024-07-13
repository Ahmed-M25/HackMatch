import json
import numpy as np
from sentence_transformers import SentenceTransformer
import sys

# Redirect stderr to a log file
sys.stderr = open('embeddings_error.log', 'w')

# Log to check script start
print("Starting Embeddings.py script")

# Sample user profiles with preferences
user_profiles = [
    {'user': 'Alice', 'tech_stack': 'Python, ML', 'interests': 'Data Science', 'preferences': ['Bob', 'Charlie']},
    {'user': 'Bob', 'tech_stack': 'JavaScript, React', 'interests': 'Web Development', 'preferences': ['Alice']},
    {'user': 'Charlie', 'tech_stack': 'Python, Data Science', 'interests': 'AI', 'preferences': ['Alice']},
    {'user': 'David', 'tech_stack': 'Java, Spring', 'interests': 'Backend Development', 'preferences': []},
    {'user': 'Eve', 'tech_stack': 'JavaScript, Node.js', 'interests': 'Full Stack', 'preferences': []},
    {'user': 'Frank', 'tech_stack': 'C++, Unreal Engine', 'interests': 'Game Development', 'preferences': []},
    {'user': 'Grace', 'tech_stack': 'Ruby on Rails', 'interests': 'Web Development', 'preferences': []},
    {'user': 'Hannah', 'tech_stack': 'Python, Django', 'interests': 'Web Development', 'preferences': []},
    {'user': 'Ivan', 'tech_stack': 'Go, Kubernetes', 'interests': 'Cloud Engineering', 'preferences': []},
    {'user': 'Judy', 'tech_stack': 'Swift, iOS', 'interests': 'Mobile Development', 'preferences': []}
]

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
