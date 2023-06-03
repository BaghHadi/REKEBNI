var user = JSON.parse(window.localStorage.getItem("userJson"));
var userId;
if (user) userId = user.id;
const loginRegisterTabs = document.querySelector(".nav-login");
const profileTab = document.querySelector(".nav-profile");

const showProfilePic = function () {
  var userPic = user.photo;
  document
    .querySelector(".profile-pic")
    .setAttribute("src", `../img/user/${userPic}`);
};

const signOutEventListener = function () {
  const profilSignOut = document.getElementById("signout"); // Déconnecter
  profilSignOut.addEventListener("click", async function () {
    await fetch("http://localhost:8000/api/v1/users/logout");
    window.localStorage.removeItem("userJson");
    window.location.href = "/";
  });
};
// search
document.addEventListener("DOMContentLoaded", () => {
  // Check if user connected show profil tab , else show login/register
  if (!userId) {
    profileTab.classList.add("hidden");
    loginRegisterTabs.classList.remove("hidden");
  } else {
    loginRegisterTabs.classList.add("hidden");
    profileTab.classList.remove("hidden");
    showProfilePic();
    signOutEventListener();
  }

  const trajetsLinksEventListener = function(){
    const departMenu = document.getElementById("departs") ;
    const destinationMenu = document.getElementById("arrives") ;
    const trajetsBtns = document.querySelectorAll(".trajet") ;
    trajetsBtns.forEach(btn=>{
      btn.addEventListener("click",function(){
        const locations = btn.querySelectorAll(".trajet-text") ;
        const depart=locations[0].textContent.toUpperCase().split(" ").join("-");
        const destination = locations[1].textContent.toUpperCase().split(" ").join("-") ; 
        if (depart && destination ){
          departMenu.value = depart ;
          destinationMenu.value = destination ;
        }
      })
    })
  }
  trajetsLinksEventListener() ;

  //

  const recherche = document.querySelector(".searchbar-btn");
  recherche.addEventListener("click", async (event) => {
    event.preventDefault();
    const departs = document.getElementById("departs");
    const departSelection = departs.options[departs.selectedIndex].value;
    const arriver = document.getElementById("arrives");
    const arriveSelection = arriver.options[arriver.selectedIndex].value;
    const date = document.getElementById("myDate");
    const dateValue = new Date(date.value).toISOString();
    const passager = document.getElementById("passengers").value;
    var passengersSelect = document.getElementById("passengers");
    var selectedPassengers = passengersSelect.value;
    localStorage.setItem("selectedPassengers", selectedPassengers);
    const url = `http://localhost:8000/api/v1/trajets?&Depart=${departSelection}&Arrivée=${arriveSelection}&date=${dateValue}&places[gte]=${passager}`;
    var passengersSelect = document.getElementById("passengers");
    var selectedPassengers = passengersSelect.value;
    localStorage.setItem("selectedPassengers", selectedPassengers);
    // Afficher le nombre de passagers choisi
    console.log("Nombre de passagers choisi : " + selectedPassengers);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = "../recherche";
        localStorage.setItem("mes-donnees", JSON.stringify(data));
      })
      .catch((error) => console.error(error));
  });
});
function revealOnScroll() {
  var revealItems = document.querySelectorAll(".info-title-text");
  for (var i = 0; i < revealItems.length; i++) {
    var windowHeight = window.innerHeight;
    var revealItemTop = revealItems[i].getBoundingClientRect().top;
    var revealItemPoint = 70;

    if (revealItemTop < windowHeight - revealItemPoint) {
      revealItems[i].classList.add("is-visible");
    }
  }
}
window.addEventListener("scroll", revealOnScroll);
const messages = [
  "Faites un geste pour l'environnement",
  "et voyagez en toute sérénité.",
];

const textElement = document.querySelector(".hero-subtext");
let currentMessageIndex = 0;
let currentCharacterIndex = 0;

function typeWriter() {
  if (currentMessageIndex < messages.length) {
    const currentMessage = messages[currentMessageIndex];

    if (currentCharacterIndex < currentMessage.length) {
      textElement.innerHTML += currentMessage.charAt(currentCharacterIndex);
      currentCharacterIndex++;
      setTimeout(typeWriter, 50);
    } else {
      currentMessageIndex++;
      currentCharacterIndex = 0;
      textElement.innerHTML += "<br>"; // Ajoute un saut de ligne après chaque message
      setTimeout(typeWriter, 500); // Attendre 1 seconde avant d'afficher le message suivant
    }
  }
}

typeWriter();
