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


class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    displayInfo() {
        return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`
    }
}

class VehicleRegistry {
    constructor() {
        this.vehicles = []
    }

    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    removeVehicle(model) {
        const index = this.vehicles.findIndex(vehicle => vehicle.model === model);
        if (index !== -1) {
            this.vehicles.splice(index, 1)
        }
    }

    listVehicles() {
        return this.vehicles.map(vehicle => vehicle.displayInfo()).join('\n');
    }
}

const registry = new VehicleRegistry();
registry.addVehicle(new Vehicle("Toyota", "Corolla", 2020));
registry.addVehicle(new Vehicle("Ford", "Mustang", 1968));
registry.addVehicle(new Vehicle("Honda", "Civic", 2019));

console.log("Vehicles in registry:");
console.log(registry.listVehicles());

registry.removeVehicle("Mustang");

console.log("Vehicles in registry after removal:");
console.log(registry.listVehicles());



class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isCheckedOut = false
    } 
}


class TodoItem {
    constructor(content) {
        this.id = Date.now();
        this.content = content;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TodoList {
    constructor() {
        this.items = [];
    }

    addItem(content) {
        const newItem = new TodoItem(content);
        this.items.push(newItem);
        this.render();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.render();
    }

    toggleItemCompletion(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.toggleComplete();
        }
        this.render();
    } 

    render() {
        const displayList = document.querySelector('.displayList');
        displayList.innerHTML = '';
        this.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.content;
            if (item.completed) {
                listItem.style.textDecoration = 'line-through';
            }

            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Toggle';
            toggleBtn.onclick = () => this.toggleItemCompletion(item.id);

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = () => this.removeItem(item.id);

            displayList.appendChild(toggleBtn);
            displayList.appendChild(removeBtn);
            displayList.appendChild(listItem);
        })
    }
}

const addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', () => {
    const enterTodo = document.querySelector('#enterTodo');
    const content = enterTodo.value.trim();

    if (content) {
        todoList.addItem(content);
        enterTodo.value = '';
    }
})

const todoList = new TodoList();

