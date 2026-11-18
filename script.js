const bmwModels = [
  {
    name: "BMW M4 Competition (G82)",
    category: "m-series",
    categoryLabel: "M-Series",
    featured: true,
    horsepower: "503 HP",
    zeroToSixty: "3.4s",
    engine: "3.0L M TwinPower Turbo Inline-6",
    drivetrain: "M xDrive / RWD",
    topSpeed: "180 mph",
    weight: "3,830 lbs",
    description: "Track-honed coupe combining aggressive aerodynamics with the legendary S58 twin-turbo inline-six engine."
  },
  {
    name: "BMW M5 CS (F90)",
    category: "m-series",
    categoryLabel: "M-Series",
    featured: true,
    horsepower: "627 HP",
    zeroToSixty: "2.9s",
    engine: "4.4L M TwinPower Turbo V8",
    drivetrain: "M xDrive AWD",
    topSpeed: "190 mph",
    weight: "4,114 lbs",
    description: "The lightest, most powerful factory M5 ever built, featuring carbon-ceramic brakes and gold-bronze accents."
  },
  {
    name: "BMW M3 Touring (G81)",
    category: "m-series",
    categoryLabel: "M-Series",
    featured: false,
    horsepower: "503 HP",
    zeroToSixty: "3.6s",
    engine: "3.0L M TwinPower Turbo Inline-6",
    drivetrain: "M xDrive AWD",
    topSpeed: "174 mph",
    weight: "4,112 lbs",
    description: "The first-ever factory M3 wagon blending everyday touring practicality with blistering Nürburgring pace."
  },
  {
    name: "BMW i4 M50",
    category: "electric",
    categoryLabel: "Electric / Hybrid",
    featured: true,
    horsepower: "536 HP",
    zeroToSixty: "3.7s",
    engine: "Dual-Motor All-Electric",
    drivetrain: "Electric AWD",
    topSpeed: "140 mph",
    weight: "5,018 lbs",
    description: "BMW M's first fully electric performance Gran Coupe, pairing instant torque with classic Gran Coupe styling."
  },
  {
    name: "BMW i8 Roadster",
    category: "electric",
    categoryLabel: "Electric / Hybrid",
    featured: false,
    horsepower: "369 HP",
    zeroToSixty: "4.2s",
    engine: "1.5L Turbo 3-Cyl + Electric Motor",
    drivetrain: "Hybrid AWD",
    topSpeed: "155 mph",
    weight: "3,514 lbs",
    description: "A futuristic plug-in hybrid sports car built around a lightweight carbon-fiber passenger cell."
  },
  {
    name: "BMW M3 GTR (E46)",
    category: "classic",
    categoryLabel: "Legends",
    featured: false,
    horsepower: "444 HP",
    zeroToSixty: "4.0s",
    engine: "4.0L P60B40 Naturally Aspirated V8",
    drivetrain: "Rear-Wheel Drive",
    topSpeed: "183 mph",
    weight: "2,976 lbs",
    description: "Homologation motorsport icon famous for its straight-cut gearbox whine and endurance racing dominance."
  },
  {
    name: "BMW M1 (E26)",
    category: "classic",
    categoryLabel: "Legends",
    featured: false,
    horsepower: "273 HP",
    zeroToSixty: "5.6s",
    engine: "3.5L M88/1 Inline-6",
    drivetrain: "Mid-Engine RWD",
    topSpeed: "165 mph",
    weight: "2,866 lbs",
    description: "Styled by Giorgetto Giugiaro, the mid-engine M1 launched the BMW M division and remains a timeless supercar."
  }
];

function createCardHTML(car) {
  return `
    <div class="car-card">
      <div>
        <span class="badge">${car.categoryLabel}</span>
        <h3>${car.name}</h3>
        <p>${car.description}</p>
      </div>
      <div>
        <div class="quick-specs">
          <div><span>Power</span><strong>${car.horsepower}</strong></div>
          <div><span>0-60 mph</span><strong>${car.zeroToSixty}</strong></div>
        </div>
        <button class="btn-outline" onclick="openModal('${car.name}')">View Full Specs</button>
      </div>
    </div>
  `;
}

// 1. Home Page Featured Grid
const featuredGrid = document.getElementById("featuredGrid");
if (featuredGrid) {
  featuredGrid.innerHTML = bmwModels.filter(c => c.featured).map(createCardHTML).join("");
}

// 2. Models Page Grid, Filter & Search
const carGrid = document.getElementById("carGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

let activeFilter = "all";
let searchQuery = "";

function renderModelsPage() {
  if (!carGrid) return;
  const filtered = bmwModels.filter(car => {
    const matchesCategory = activeFilter === "all" || car.category === activeFilter;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery) || car.engine.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  carGrid.innerHTML = filtered.length
    ? filtered.map(createCardHTML).join("")
    : `<p style="color: var(--text-muted);">No BMW models match your search.</p>`;
}

if (carGrid) {
  renderModelsPage();
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderModelsPage();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderModelsPage();
    });
  }
}

// 3. Head-to-Head Spec Comparator
const carSelect1 = document.getElementById("carSelect1");
const carSelect2 = document.getElementById("carSelect2");
const compareTable = document.getElementById("compareTable");

function renderComparison() {
  if (!carSelect1 || !carSelect2 || !compareTable) return;
  const c1 = bmwModels[carSelect1.value];
  const c2 = bmwModels[carSelect2.value];

  compareTable.innerHTML = `
    <thead>
      <tr>
        <th>Specification</th>
        <th>${c1.name}</th>
        <th>${c2.name}</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Division</td><td>${c1.categoryLabel}</td><td>${c2.categoryLabel}</td></tr>
      <tr><td>Powertrain</td><td>${c1.engine}</td><td>${c2.engine}</td></tr>
      <tr><td>Horsepower</td><td><strong>${c1.horsepower}</strong></td><td><strong>${c2.horsepower}</strong></td></tr>
      <tr><td>0–60 mph</td><td><strong>${c1.zeroToSixty}</strong></td><td><strong>${c2.zeroToSixty}</strong></td></tr>
      <tr><td>Drivetrain</td><td>${c1.drivetrain}</td><td>${c2.drivetrain}</td></tr>
      <tr><td>Top Speed</td><td>${c1.topSpeed}</td><td>${c2.topSpeed}</td></tr>
      <tr><td>Curb Weight</td><td>${c1.weight}</td><td>${c2.weight}</td></tr>
    </tbody>
  `;
}

if (carSelect1 && carSelect2) {
  bmwModels.forEach((car, index) => {
    carSelect1.add(new Option(car.name, index));
    carSelect2.add(new Option(car.name, index));
  });
  carSelect2.selectedIndex = 1; // Default compare 1st vs 2nd car
  renderComparison();
  carSelect1.addEventListener("change", renderComparison);
  carSelect2.addEventListener("change", renderComparison);
}

// 4. Spec Modal
const modal = document.getElementById("specModal");
const closeBtn = document.querySelector(".close-btn");

function openModal(carName) {
  const car = bmwModels.find(c => c.name === carName);
  if (!car || !modal) return;
  document.getElementById("modalCategory").textContent = car.categoryLabel;
  document.getElementById("modalTitle").textContent = car.name;
  document.getElementById("modalDesc").textContent = car.description;
  document.getElementById("modalSpecs").innerHTML = `
    <div class="spec-item"><span>Powertrain</span><strong>${car.engine}</strong></div>
    <div class="spec-item"><span>Horsepower</span><strong>${car.horsepower}</strong></div>
    <div class="spec-item"><span>0-60 mph</span><strong>${car.zeroToSixty}</strong></div>
    <div class="spec-item"><span>Drivetrain</span><strong>${car.drivetrain}</strong></div>
    <div class="spec-item"><span>Top Speed</span><strong>${car.topSpeed}</strong></div>
    <div class="spec-item"><span>Curb Weight</span><strong>${car.weight}</strong></div>
  `;
  modal.style.display = "flex";
}

if (closeBtn) closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

// 5. About Page Suggestion Form
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.getElementById("modelSuggestion").value.trim();
    document.getElementById("formStatus").textContent = `Thanks! "${val}" has been logged for the next Arnx Labs garage update.`;
    feedbackForm.reset();
  });
}
