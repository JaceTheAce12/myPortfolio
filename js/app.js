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
        <img src="${project.img}" alt="${project.title} loading="lazy">
        <div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
    `
    projectDiv.href = `${project.link}`
    return projectDiv;
}

document.addEventListener('DOMContentLoaded', loadProjects);



