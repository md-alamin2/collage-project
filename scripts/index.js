// login function
login = () => {
  const userId = document.getElementById("user-id").value;
  const convertedUserId = userId.trim();
  const password = document.getElementById("password").value;
  const convertedPassword = parseInt(password);

  if (convertedUserId.length > 0) {
    if (convertedPassword === 123456) {
      Swal.fire({
        title: "Login successfully",
        text: "Click ok to explore",
        icon: "success",
      });
      const banner = document.getElementById("banner");
      banner.classList.add("hidden");

      const navbar = document.getElementById("header");
      navbar.classList.remove("hidden");

      const vocabularySection = document.getElementById("vocabulary-section");
      vocabularySection.classList.remove("hidden");

      const faqSection = document.getElementById("faq-section");
      faqSection.classList.remove("hidden");
    } else {
      alert("Invalid password!! please enter 123456");
    }
  } else {
    alert("Please enter your name");
  }
};

// logout event
logout = () => {
  const banner = document.getElementById("banner");
  banner.classList.remove("hidden");

  const navbar = document.getElementById("header");
  navbar.classList.add("hidden");

  const vocabularySection = document.getElementById("vocabulary-section");
  vocabularySection.classList.add("hidden");

  const faqSection = document.getElementById("faq-section");
  faqSection.classList.add("hidden");
  // empty user name
  document.getElementById("user-id").value="";
  
  // empty password
  document.getElementById("password").value="";
};

// show loader
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("lessons-container").classList.add("hidden");
};

// hide loader
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("lessons-container").classList.remove("hidden");
};

// remove active btn function
const removeActive = () => {
  const activeBtn = document.getElementsByClassName("active");
  for (let btn of activeBtn) {
    btn.classList.remove("active");
  }
};

// fetching api for lesson btn
const loadLesson = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await response.json();
  loadLessonArr(data.data);
};

// showing lesson btn
const loadLessonArr = (arr) => {
  const btnContainer = document.getElementById("btn-container");

  for (let data of arr) {
    const div = document.createElement("div");
    div.innerHTML = `
        <button
            id="btn-${data.id}"
            onclick="loadVocabulary(${data.level_no}); clickedBtn(${data.id});"
            class="btn bg-white border-[#422AD5] text-[#422AD5] hover:bg-[#422AD5] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            Lesson-${data.level_no}
          </button>
        `;
    btnContainer.appendChild(div);
  }
};

// fetching vocabularies api
const loadVocabulary = async (level) => {
  showLoader();
  const response = await fetch(
    `https://openapi.programming-hero.com/api/level/${level}`
  );
  const data = await response.json();
  displayVocabulary(data.data);
};

// showing vocabularies
const displayVocabulary = (infos) => {
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = ``;

  hideLoader();
  // handle null word meaning
  if (infos.length === 0) {
    lessonsContainer.innerHTML = `
      <div class="col-span-3">
          <img class="w-fit mx-auto" src="./assets/alert-error.png" alt="error image">
              <p class="hind-siliguri-font text-sm text-[#79716B] text-center ">
                  এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
              </p>
              <h2 class="hind-siliguri-font text-3xl font-medium text-center">
                  নেক্সট Lesson এ যান
              </h2>
          </div>
      `;
  }

  infos.forEach((info) => {
    if (info.meaning === null) {
      info.meaning = "অর্থ নেই";
    }

    const vocabularyCard = document.createElement("div");
    vocabularyCard.innerHTML = `
        <div class="bg-white p-14 rounded-xl">
            <div class="text-center space-y-6">
                <p class="text-3xl font-bold">${info.word}</p>
                <p class="text-xl font-medium">meaning/pronunciation</p>
                <p class="hind-siliguri-font text-3xl font-semibold">"${info.meaning}/${info.pronunciation}"</p>
            </div>
            <div class="flex justify-between mt-14 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="btn-${info.id}" onclick="loadWordDetails(${info.id})" class="size-10 bg-[#1A91FF10] text-black p-2 rounded-xl cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="pronounceWord('${info.word}')" class="size-10 bg-[#1A91FF10] text-black p-2 rounded-xl cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                  </svg>   
            </div>
          </div>
        `;
    lessonsContainer.appendChild(vocabularyCard);
  });
};

// active btn function
const clickedBtn = (id) => {
  removeActive();
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add("active");
};

// load word details
const loadWordDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`
  );
  const data = await response.json();
  displayWordDetails(data.data);
};

// display word details
const displayWordDetails = (data) => {
  // handle null word meaning
  if (data.meaning === null) {
    data.meaning = "অর্থ পাওয়া যায়নি";
  }

  document.getElementById("Show_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <h2 class="text-xl font-medium">${data.word} (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 inline">
  <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
  <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
</svg>

      : ${data.pronunciation})</h2>

      <div class="mt-4">
        <p class="text-sm font-semibold">Meaning</p>
        <p class="hind-siliguri-font font-medium">${data.meaning}</p>
      </div>

      <div class="mt-5">
        <p class="text-sm font-semibold">Example</p>
        <p>${data.sentence}</p>
      </div>

      <div class="mt-5">
        <p class="font-semibold">সমার্থক শব্দ গুলো</p>
        <div id="synonyms-section" class="text-xl font-semibold flex flex-wrap gap-1 md:gap-4">
        </div>
      </div>
  `;

  // handel synonyms
  const synonymsSection = document.getElementById("synonyms-section");
  data.synonyms.forEach((element) => {
    const button = document.createElement("button");
    button.innerHTML = `
    <button class="btn">${element}</button>
    `;
    synonymsSection.appendChild(button);
  });
};

// pronunciation sound 
function pronounceWord(word) {
  // console.log(word);
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}

loadLesson();
