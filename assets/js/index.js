var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll(".app-section");
var apodDateInput = document.getElementById("apodDateInput");
var loadDateBtn = document.getElementById("loadDateBtn");

// ! side bar
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    e.preventDefault();

    var targetId = navLinks[i].dataset.section;

    // hide all sections
    for (let j = 0; j < sections.length; j++) {
      sections[j].classList.add("hidden");
    }

    // show selected section
    document.getElementById(targetId).classList.remove("hidden");

    // remove active state from all links
    for (let k = 0; k < navLinks.length; k++) {
      navLinks[k].classList.remove("bg-blue-500/10", "text-blue-400");
    }

    // add active state to clicked link
    navLinks[i].classList.add("bg-blue-500/10", "text-blue-400");
  });
}

apodDateInput.addEventListener("change", function () {
  document.getElementById("dataLoad").innerText = new Date(
    this.value
  ).toDateString();
});

loadDateBtn.addEventListener("click", async function (e) {
  var selectedDate = apodDateInput.value;
  var response = await fetch(
    `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=2`
  );
  var data = await response.json();
  //   console.log(data);
  if (data.results.length > 0) {
    displaySpace(data.results[0]);
    displayfeaturedLaunch(data.results[0]);
    displaylaunchesGrid(data.results)
  } else {
    document.getElementById("spaceContainer").innerHTML =
      "<p class='text-slate-400'>No launches on this date</p>";
  }
  e.preventDefault();
  // displaySpace(data.results);
});

function displaySpace(launch) {
  var imageSrc = launch.image?.image_url || "./assets/images/placeholder.webp";

  var launchDate = launch.net.split("T")[0];

  var description = launch.mission?.description || "No description available.";
  var htmlMarkup = "";

  htmlMarkup += `
    <div class="xl:col-span-2">
       <div
         class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
       >
         <img
           class="w-full h-full object-cover"
           src="${imageSrc}"
           alt="${launch.name}"
         />
       </div>
     </div>

     <div class="space-y-4 md:space-y-6">
       <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
         <h3 class="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
           ${launch.name}
        </h3>

         <div class="flex items-center space-x-4 mb-4 text-sm text-slate-400">
           <span id="apod-date-detail"
                    >
             <i class="far fa-calendar mr-2"></i>${launchDate}
           </span>
         </div>

         <p class="text-slate-300 leading-relaxed mb-4">
           ${description}
         </p>

         <div class="text-xs text-slate-400 italic mb-4">
           ${launch.abbrev}
         </div>
       </div>

      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
  <h4 class="font-semibold mb-3 flex items-center">
    <i class="fas fa-info-circle text-blue-400 mr-2"></i>
    Launch Details
  </h4>

  <div class="space-y-3 text-sm">
    <div class="flex justify-between">
      <span class="text-slate-400">Date</span>
      <span class="font-medium">${launchDate}</span>
    </div>

    <div class="flex justify-between">
      <span class="text-slate-400">Rocket</span>
      <span class="font-medium">
        ${launch.rocket?.configuration?.name || "—"}
      </span>
    </div>

    <div class="flex justify-between">
      <span class="text-slate-400">Provider</span>
      <span class="font-medium">
        ${launch.launch_service_provider?.name || "—"}
      </span>
    </div>

  </div>
</div>


      
    </div>

    `;

  document.getElementById("spaceContainer").innerHTML = htmlMarkup;
}

// ! launches section

function displayfeaturedLaunch(featuredLaunch) {
  var imageSrc =
    featuredLaunch.image?.image_url || "./assets/images/placeholder.webp";

  var launchDate = featuredLaunch.net.split("T")[0];

  var agencyName = featuredLaunch.launch_service_provider.name;
  var location = featuredLaunch.pad.location.name;
  var country = featuredLaunch.pad.country.name;

  var htmlMarkup = "";
  htmlMarkup += `
  <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${featuredLaunch.full_name?.name || ""}| ${featuredLaunch.name}
                    </h3>

                     <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>SpaceX</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${agencyName}</span>
                      </div>
                    </div>

                     <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${launchDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">12:00 PM UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${location}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${country}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      The third integrated flight test of Starship. The
                      prototype for the heavy-lift launch vehicle is currently
                      being built by SpaceX.
                    </p>

                     <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                     <img
                       class="w-full h-full object-cover"
                       src="${imageSrc}"
                       
                    /> 
                  
                     
                    
                </div>

  `;

  document.getElementById("featuredLaunch").innerHTML = htmlMarkup;
}


function displaylaunchesGrid (launchesGrid){
    var htmlMarkup = ""
    for (i = 0 ; i<launchesGrid.length ; i++){
         var launch = launchesGrid[i];
        htmlMarkup += `
         <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <i class="fas fa-space-shuttle text-5xl text-slate-700"></i>
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launch.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launch.launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launch.net.split("T")[0]}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">23:00 UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launch.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launch.pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>

        `
    }
    document.getElementById('launchesGrid').innerHTML = htmlMarkup;

}

// var planetsGrid.addEventListener

function displayPlantes (planetsGrid){
         

    var htmlMarkup = "";
    htmlMarkup += `
       <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="./assets/images/earth.png"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      Earth
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    Earth is the third planet from the Sun and the only
                    astronomical object known to harbor life. About 29% of
                    Earth's surface is land consisting of continents and
                    islands. The remaining 71% is covered with water, mostly by
                    oceans, seas, gulfs, and other salt-water bodies, but also
                    by lakes, rivers, and other fresh water, which together
                    constitute the hydrosphere.
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    149.6M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    6,371 km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    5.97 × 10²⁴ kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    5.51 g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    365.25 days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    24 hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">1</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    9.8 m/s²
                  </p>
                </div>
              </div>
            </div>

    `

    document.getElementById('planetsGrid').innerHTML = htmlMarkup;


}
