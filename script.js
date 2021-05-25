const mainWindow = document.getElementById("content")
const sidebar = document.getElementById("sidebar")
const projectList = document.getElementById("project-list")
const about = document.getElementById("about")

function setup() {
  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent(document.body);
  noStroke();
  rectMode(CENTER); 
}

// let emptyObject = {
//   name: "",
//   year: null,
//   description: "",
//   embed: null,
//   images: [
//     {
//     src: "",
//     title: "",
//     caption: "",
//     link: null
//     }
//   ]
// }

projectArray.sort((a, b) => (a.year < b.year ? 1 : -1)).forEach(project => {
  addToSidebar(project)
})

function addToSidebar(project) {
  let li = document.createElement('li')
  li.innerText = project.name
  projectList.appendChild(li)
  li.style.cursor = "pointer"
  li.addEventListener('click', (e) => {
    canvas.style.display = "none"
    projectList.children.forEach(item => {
      item.style.textDecoration = "none"
    })
    displayProject(project)
    li.style.textDecoration = "line-through"
    li.style.color = "teal"
  })
}

function displayProject(project) {
  mainWindow.innerHTML = ""
  let h1 = document.createElement("h1")
  h1.innerText = project.name
  let desc = document.createElement("h3")
  desc.innerHTML = project.description
  mainWindow.append(h1, desc)

  for (let i = 0; i < project.images.length; i++) {
    let img = document.createElement('img')
    img.src = project.images[i].src;
    img.alt = project.images[i].title;
    let id = project.name+i;
    img.id = id.replace(/\s/g, '');
    let caption = document.createElement('p')
    caption.innerText = project.images[i].caption
    if (project.images[i].link) {
      let a = document.createElement("a")
      a.href = project.images[i].link
      a.target = "_blank"
      a.appendChild(img)
      mainWindow.appendChild(a)
    } else {
      mainWindow.appendChild(img)
    }
    mainWindow.appendChild(caption)
  }
  if (project.embed) {
    let object = document.createElement("object")
    object.data = project.embed
    object.width = "100%"
    object.height = "80%"
    let embed = document.createElement("embed")
    embed.src = project.embed
    
    object.appendChild(embed)
    mainWindow.appendChild(object)
  }
}

about.addEventListener('click', (e) => {
  mainWindow.innerHTML = ""
  let abt = document.createElement("h1")
  abt.innerText = "About"
  let desc = document.createElement("h3")
  desc.innerText = "Sidney Hirschman is a senior at Yale studying graphic design and currently serves as a press manager for one of the college's last letterpress studios. Sidney's favorite color is blue."
  let contact = document.createElement("h1")
  contact.innerText = "Contact"
  let contactInfo = document.createElement("h3")
  contactInfo.innerHTML = "You can email Sidney here: sidney dot hirschman at yale dot edu."
  let col = document.createElement("h1")
  col.innerText = "Colophon"
  let colophonInfo = document.createElement("h3")
  colophonInfo.innerHTML = "This website is being built by Sidney Hirschman and uses the web fonts Averia Libre and Overpass, as well as the p5.js JavaScript library."
  mainWindow.append(abt, desc, contact, contactInfo, col, colophonInfo)

  projectList.children.forEach(item => {
    item.style.textDecoration = "none"
  })
  // mainWindow.appendChild(desc)
})

function draw() {
  let inverseX = width - mouseX;
  let inverseY = height - mouseY;

  let newX = width/2 * mouseX
  let mouseDistanceFromCenterX = width/2 - mouseX
  let mouseDistanceFromCenterY = height/2 - mouseY
  let c = map(mouseDistanceFromCenterX, 0, width, 0, width);
  let d = map(mouseDistanceFromCenterY, 0, height, 0, height);
  let circleOpacity = 255

  background(255);
  clear();
  blendMode(MULTIPLY);

  // if (abs(mouseDistanceFromCenterX) <= 3 && abs(mouseDistanceFromCenterY) <= 3) {
  //   fill(0)
  //   ellipse(c + (width/2), d + (height/2), 300, 300);
  // } else {
    fill(0,183,235, circleOpacity);
    ellipse(c + (width/2), d + (height/2), 300, 300);
    fill(255,0,144, circleOpacity);
    ellipse((2*c) + (width/2), (d/2) + (height/2), 300, 300);
    fill(255,246,0,circleOpacity);
    ellipse((3*c) + (width/2), (d/3) + (height/2), 300, 300);
  // }

  // text("mouseX: "+mouseX, 100, 100)
  // text("mouseY: "+mouseY, 100, 150)
  // text("distance from middle X: "+mouseDistanceFromCenterX, 100, 200)
  // text("distance from middle Y: "+mouseDistanceFromCenterY, 100, 250)
}
