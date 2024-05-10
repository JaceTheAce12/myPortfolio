async function loadProjects() {
    try {
        const response = await fetch('../data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
        const data = await response.json();
        addProjectsToDom(data.projects);
        console.log(data.projects);
    } catch(error) {
        console.error('Error loading projects:', error);
    }
}

const addProjectsToDom = (projects) => {
    const projectSection = document.querySelector('.projectSection');

    projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectSection.appendChild(projectElement);
    })
} 

const createProjectElement = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';
    projectDiv.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `
    projectDiv.href = `${project.link}`
    return projectDiv;
}

document.addEventListener('DOMContentLoaded', loadProjects);

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.posts = [];
    }

    addPost(post) {
        this.posts.push({post: post, comments: []});
    }

    getPosts() {
        return this.posts.map(post => `${post.post} Comments: ${post.comments.length}`);
    }

    addComment(postIndex, comment) {
        if (postIndex >= 0 && postIndex < this.posts.length) {
            this.posts[postIndex].comments.push(comment);
        } else {
            console.log('Invalid post index')
        }
    }

    getComments(postIndex) {
        if (postIndex >= 0 && postIndex < this.posts.length) {
            return this.posts[postIndex].comments;
        } else {
            return 'Invalid post index';
        }
    }
}

let user1 = new User("johnDoe", "john@example.com");
user1.addPost("Hello world!");
user1.addPost("Second post!");

user1.addComment(0, "Nice post!");
user1.addComment(0, "Thanks for sharing!");

console.log(user1.getPosts()); // Output basic info about posts
console.log(user1.getComments(0)); // Output comments for the first post


class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    displayInfo() {
        return `Title: ${this.title}, Author: ${this.author}`;
    }
}

const book = new Book("Harry Potter and the half blood Prince", "J.K. Rowling");

console.log(book.displayInfo());