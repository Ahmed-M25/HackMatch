import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface HackerStats {
  name: string;
  school: string;
  techStack: string;
  seeking: string;
  contact: string;
}

export const profileList: HackerStats[] = [
  {
    name: "Alice Johnson",
    school: "University of Technology",
    techStack: "JavaScript, React, Node.js, OpenCV, Python",
    seeking: "Collaborators for AI/ML projects",
    contact: "alice.johnson@example.com",
  },
  {
    name: "Bob Smith",
    school: "Institute of Computing",
    techStack: "Python, Django, SQL",
    seeking: "Anybody who has frontend experience, especially in MongoDB",
    contact: "bob.smith@example.com",
  },
  {
    name: "Charlie Davis",
    school: "Technical University",
    techStack: "Java, Spring Boot, MongoDB, JavaScript, React",
    seeking: "An experienced frontend developer",
    contact: "charlie.davis@example.com",
  },
  {
    name: "Johnson Doe",
    school: "Technical University",
    techStack: "C++, C, Python, R",
    seeking: "An embedded systems developer",
    contact: "johnsond@example.com",
  },
  {
    name: "Emma Wilson",
    school: "University of Engineering",
    techStack: "Ruby on Rails, JavaScript, PostgreSQL",
    seeking: "Backend developers with experience in large-scale systems",
    contact: "emma.wilson@example.com",
  },
  {
    name: "Liam Brown",
    school: "State College of Technology",
    techStack: "Go, Docker, Kubernetes",
    seeking: "DevOps engineers with cloud infrastructure experience",
    contact: "liam.brown@example.com",
  },
  {
    name: "Sophia Martinez",
    school: "National Institute of Science",
    techStack: "Swift, Objective-C, iOS Development",
    seeking: "iOS developers for a new mobile app",
    contact: "sophia.martinez@example.com",
  },
  {
    name: "Oliver Smith",
    school: "City University",
    techStack: "PHP, Laravel, MySQL",
    seeking: "Full-stack developers with a focus on web applications",
    contact: "oliver.smith@example.com",
  },
  {
    name: "Ava Johnson",
    school: "Institute of Advanced Studies",
    techStack: "Scala, Akka, Apache Spark",
    seeking: "Data engineers with experience in big data frameworks",
    contact: "ava.johnson@example.com",
  },
  {
    name: "Noah Davis",
    school: "College of Applied Technology",
    techStack: "Kotlin, Android Studio",
    seeking: "Android developers for a cross-platform project",
    contact: "noah.davis@example.com",
  },
];