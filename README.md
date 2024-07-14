# Project Redream Team

[![Watch the video](https://github.com/user-attachments/assets/79dd531d-ce4a-46ac-9c09-85f1f875cac8/thumbnail-image.png)](https://github.com/user-attachments/assets/dc1bf37c-af23-47af-919e-151c69c44d18)

### Inspiration
Hackathons are fantastic opportunities for innovation, collaboration, and learning. However, one of the biggest challenges participants face is finding the right team to join. Inspired by this problem, we created DreamTeam to simplify and enhance the team formation process, ensuring that everyone can find a team that fits their skills and preferences perfectly.

### What We Learned
Building DreamTeam was an incredible learning experience. We deepened our understanding of:
- Machine learning algorithms, particularly K-means clustering
- The powerful capabilities of the Sentence Transformers for natural language processing
- Integrating a full-stack application using Node.js, Express, MongoDB, and React, which honed our skills in web development and API design

### How We Built It
- **Frontend**: Developed with React for a responsive and dynamic user interface, allowing participants to easily sign up, list their skills, and set their preferences.
- **Backend**: Utilized Node.js and Express to handle user authentication, data processing, and communication with the database.
- **Database**: Implemented MongoDB to store user profiles, ensuring scalability and efficient data retrieval.
- **Machine Learning**: Leveraged Sentence Transformers to encode user profiles into vectors and used K-means clustering for smart team formation based on these vectors.

### Challenges We Ran Into
- **Complex Matching Logic**: Implementing the K-means clustering algorithm and adjusting it to account for user preferences required significant tweaking and optimization.
- **Data Integration**: Ensuring that user data from MongoDB was correctly encoded and processed in the machine learning pipeline was challenging, especially when dealing with real-time updates.
- **User Interface**: Designing an intuitive and user-friendly interface that could handle various edge cases, such as incomplete profiles and changing preferences, was a key focus.

### What's Next for DreamTeam
- **Dynamic Re-Matching**: Allowing for dynamic re-matching during the hackathon in case of dropouts or changes in availability.

