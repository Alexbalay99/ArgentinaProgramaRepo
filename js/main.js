"use strict";

const WORK_PROJECTS = [
  {
    name: "Apple",
    description:
      "Interfaz SPA para una forma parecida a un asistente dentro de una aplicación web para la inserción de gastos de construcción de bienes raíces",
    languages: ["javascript", "react"],
  },
];

const ACADEMIC_PROJECTS = [
  {
    name: "DCEMS Web Interface",
    description: "Una interfaz web para control stock",
    languages: ["dart", "python"],
  },
];

const PERSONAL_PROJECTS = [
  {
    name: "Aplicacion de android para lavadero de autos",
    description:
      "An Android app for customers to book car washes and check its state.",

    languages: ["dart", "flutter", "nodejs"],
  },
  {
    name: "Control de stock",
    description: "Sitio web dinamico para visualizar productos en stock.",
    languages: ["php", "bootstrap"],
  },
];

const LANGUAGES_IMGS = new Map([
  ["python", "img/python.png"],
  ["django", "img/django.png"],
  ["bootstrap", "img/bootstrap4.png"],
  ["dart", "img/dart.png"],
  ["flutter", "img/flutter.svg"],
  ["jquery", "img/jq.png"],
  ["c", "img/c.webp"],
  ["c++", "img/cpp.png"],
  ["css", "img/css3.png"],
  ["gwt", "img/gwt.svg"],
  ["html", "img/html5.webp"],
  ["java", "img/java.png"],
  ["javascript", "img/javascript.png"],
  ["nodejs", "img/nodejs.png"],
  ["php", "img/php.png"],
  ["react", "img/react.png"],
  ["svelte", "img/svelte.png"],
  ["wagtail", "img/wagtail.png"],
  ["json-schema", "img/json_schema.png"],
]);

class Project {
  constructor(name, description, languages) {
    this.name = name;
    this.description = description;
    this.languages = languages;
  }

  static fromDict(project_dict) {
    return new Project(
      project_dict["name"],
      project_dict["description"],
      project_dict["languages"]
    );
  }

  toDOMNode() {
    let wrapperButton = document.createElement("button");
    wrapperButton.classList.add("list-group-item");
    wrapperButton.classList.add("list-group-item-action");
    wrapperButton.classList.add("custom-button-wrapper");
    let row = document.createElement("div");
    row.classList.add("project-row");
    row.classList.add("p-2");
    row.classList.add("row");
    let projectName = document.createElement("div");
    projectName.classList.add("text-muted");
    projectName.classList.add("col-sm-3");
    projectName.classList.add("col-12");
    projectName.innerText = this.name;
    let projectDescription = document.createElement("div");
    projectDescription.classList.add("col-12");
    projectDescription.classList.add("col-sm-6");
    projectDescription.innerText = this.description;
    let projectLanguages = document.createElement("div");
    projectLanguages.classList.add("col-sm-3");
    projectLanguages.classList.add("justify-content-sm-end");
    projectLanguages.classList.add("col-12");
    projectLanguages.classList.add("d-flex");
    projectLanguages.classList.add("my-2");
    projectLanguages.classList.add("my-sm-0");
    projectLanguages.classList.add("justify-content-center");
    if (this.languages == null && this.description == null) {
      wrapperButton.classList.add("override-grey");
    } else {
      for (let lang of this.languages) {
        if (LANGUAGES_IMGS.has(lang)) {
          let lang_icon = document.createElement("img");
          lang_icon.classList.add("language-icon");
          lang_icon.classList.add("mr-2");
          lang_icon.src = LANGUAGES_IMGS.get(lang);
          projectLanguages.appendChild(lang_icon);
        }
      }
    }
    appendChildren(row, [projectName, projectDescription, projectLanguages]);
    wrapperButton.appendChild(row);
    return wrapperButton;
  }
}

class ProjectListing {
  constructor(projInstances) {
    this.projectInstances = projInstances;
  }

  static fromArray(projects_arr) {
    let projectInstances = [];
    for (let project of projects_arr) {
      projectInstances.push(Project.fromDict(project));
    }
    return new ProjectListing(projectInstances);
  }

  toDOMNode() {
    let wellContainer = document.createElement("div");
    wellContainer.classList.add("well");
    wellContainer.classList.add("list-group");
    wellContainer.classList.add("shadow");
    wellContainer.classList.add("main-border-radius");
    wellContainer.classList.add("project-container");
    wellContainer.id = "academic-well";
    wellContainer.setAttribute("data-simplebar", "");
    for (let project of this.projectInstances) {
      wellContainer.appendChild(project.toDOMNode());
    }
    return wellContainer;
  }
}

class PersonalContainer {
  constructor() {
    this.bodyNode = document.querySelector("#page-body");
    this.bodyNode.classList.add("mt-2");
    this.aboutPage = this.buildAboutPage();
    this.workPage = this.buildWorkProjectsPage();
    this.curriculumPage = this.buildCurriculumPage();
    this.academicProjectsPage = this.buildAcademicProjectsPage();
    this.personalProjectsPage = this.buildPersonalProjectsPage();
    this.contactsPage = this.buildContactsPage();
  }

  buildContainer() {
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("main-container");
    mainContainer.classList.add("p-4");
    return mainContainer;
  }

  buildAboutPage() {
    let container = this.buildContainer();
    let header = document.createElement("h1");
    header.classList.add("font-weight-light");
    header.innerText = "About me";
    let hr = document.createElement("hr");
    let content = document.createElement("p");
    content.classList.add("lead");
    content.innerHTML = `Actualmente me encuentro estudiando la carrera de desarrollador Full-stack en varios lugares al mismo tiempo. Argentina Programa, Udemy y Coderhouse, mas informacion de videos de Youtube.`;
    appendChildren(container, [header, hr, content]);
    return container;
  }

  buildCurriculumPage() {
    let container = this.buildContainer();
    container.classList.add("curriculum-container");
    let header = document.createElement("h1");
    header.classList.add("font-weight-light");
    header.innerText = "Curriculum Vitae";
    let hr = document.createElement("hr");
    let content = document.createElement("p");
    content.classList.add("lead");
    content.innerHTML =
      'Here you can view or <a target="_blank" rel="noopener noreferrer" class="pdf-link" href="pdf/CV_ING_jun_2021.pdf">download</a> my Curriculum Vitae.';
    let pdfViewer = document.createElement("embed");
    pdfViewer.src = "pdf/CV_ING_jun_2021.pdf";
    pdfViewer.setAttribute("type", "application/pdf");
    pdfViewer.classList.add("pdf-container");
    appendChildren(container, [
      header,
      hr,
      content,
      pdfViewer,
      this.buildPDFWarning(),
    ]);
    return container;
  }

  buildPDFWarning() {
    let container = document.createElement("div");
    container.classList.add("mobile-pdf-warn");
    let content = document.createElement("p");
    content.classList.add("lead");
    content.innerHTML =
      "Sadly looks like you are using a mobile browser. In order to view the pdf, you must download it first.";
    container.appendChild(content);
    return container;
  }

  buildWorkProjectsPage() {
    let container = this.buildContainer();
    let header = document.createElement("h1");
    header.classList.add("font-weight-light");
    header.innerText = "Work Projects";
    let hr = document.createElement("hr");
    let content = document.createElement("p");
    content.classList.add("lead");
    content.innerHTML = "Some of the projects made during my work hours.";
    let projectListing = ProjectListing.fromArray(WORK_PROJECTS);
    appendChildren(container, [
      header,
      hr,
      content,
      projectListing.toDOMNode(),
    ]);
    return container;
  }

  buildAcademicProjectsPage() {
    let container = this.buildContainer();
    let header = document.createElement("h1");
    header.classList.add("font-weight-light");
    header.innerText = "Academic Projects";
    let hr = document.createElement("hr");
    let content = document.createElement("p");
    content.classList.add("lead");
    content.innerHTML =
      "Some of my projects made during my master's degree classes.";
    let projectListing = ProjectListing.fromArray(ACADEMIC_PROJECTS);
    appendChildren(container, [
      header,
      hr,
      content,
      projectListing.toDOMNode(),
    ]);
    return container;
  }

  buildPersonalProjectsPage() {
    let container = this.buildContainer();
    let header = document.createElement("h1");
    header.classList.add("font-weight-light");
    header.innerText = "Personal Projects";
    let hr = document.createElement("hr");
    let content = document.createElement("p");
    content.classList.add("lead");
    content.innerHTML = "Some of my projects outside of classes";
    let projectListing = ProjectListing.fromArray(PERSONAL_PROJECTS);
    appendChildren(container, [
      header,
      hr,
      content,
      projectListing.toDOMNode(),
    ]);
    return container;
  }

  buildContactsPage() {
    let container = this.buildContainer();
    let header = document.createElement("h1");
    header.classList.add("font-weight-light");
    header.innerText = "Contacts";
    let hr = document.createElement("hr");
    let content = document.createElement("p");
    content.classList.add("lead");
    content.innerHTML = "Here are some ways to get in touch with me.";
    let iconContainer = document.createElement("div");
    iconContainer.classList.add("contacts-icon-container");
    appendChildren(iconContainer, [
      this.createContactIcon(
        "fab",
        "fa-linkedin-in",
        "https://www.linkedin.com/in/jlucasp/"
      ),
      this.createContactIcon("fas", "fa-envelope", "mailto:jpires@evolutio.pt"),
      this.createContactIcon(
        "fab",
        "fa-github",
        "https://www.github.com/jlucasp25/"
      ),
    ]);
    appendChildren(container, [header, hr, content, iconContainer]);
    return container;
  }

  createContactIcon(iconType, iconName, link) {
    let icon = document.createElement("i");
    icon.classList.add("contact-icon");
    icon.classList.add(iconType);
    icon.classList.add("fa-3x");
    icon.classList.add(iconName);
    let anchor = document.createElement("a");
    anchor.setAttribute("target", "_blank");
    anchor.href = link;
    anchor.appendChild(icon);
    return anchor;
  }

  displayAboutPage() {
    this.clearBody();
    this.bodyNode.appendChild(this.aboutPage);
  }

  displayCurriculumPage() {
    this.clearBody();
    this.bodyNode.appendChild(this.curriculumPage);
  }

  displayAcademicProjectsPage() {
    this.clearBody();
    this.bodyNode.appendChild(this.academicProjectsPage);
  }

  displayWorkProjectsPage() {
    this.clearBody();
    this.bodyNode.appendChild(this.workPage);
  }

  displayPersonalProjectsPage() {
    this.clearBody();
    this.bodyNode.appendChild(this.personalProjectsPage);
  }

  displayContactsPage() {
    this.clearBody();
    this.bodyNode.appendChild(this.contactsPage);
  }

  clearBody() {
    while (this.bodyNode.firstChild) {
      this.bodyNode.removeChild(this.bodyNode.lastChild);
    }
  }
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

function appendChildren(parent, children) {
  children.forEach((child) => parent.append(child));
}

function enableCallbacks(personalContainer) {
  let links = [
    document.querySelector("#about-link"),
    document.querySelector("#curriculum-link"),
    document.querySelector("#work-link"),
    document.querySelector("#personal-link"),
    document.querySelector("#academic-link"),
    document.querySelector("#contacts-link"),
  ];
  links[0].addEventListener("click", () => {
    personalContainer.displayAboutPage();
  });
  links[1].addEventListener("click", () => {
    personalContainer.displayCurriculumPage();
  });
  links[2].addEventListener("click", () => {
    personalContainer.displayWorkProjectsPage();
  });
  links[3].addEventListener("click", () => {
    personalContainer.displayPersonalProjectsPage();
  });
  links[4].addEventListener("click", () => {
    personalContainer.displayAcademicProjectsPage();
  });
  links[5].addEventListener("click", () => {
    personalContainer.displayContactsPage();
  });
  for (let link of links) {
    link.setAttribute("data-toggle", "collapse");
    link.setAttribute("data-target", "#navbarButton");
  }
}

let page = new PersonalContainer();
enableCallbacks(page);
page.displayAboutPage();
