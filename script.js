let words = document.getElementById("words");
let timer = document.getElementById("timer");
let input = document.querySelector("input");
let boxTypeWord = document.getElementById("typeWord");
let result = document.getElementById("result");

input.focus();

let [
  currentElement,
  currectWord,
  wrongWord,
  countWord,
  currentListWordsKey,
  time,
  runTimer,
] = [null, 0, 0, 0, 0, 60, false];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let listLines = `If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.  While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs.  Creative Writing Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.  Tackle Writers' Block A random paragraph can also be an excellent way for a writer to tackle writers' block. Writing block can often happen due to being stuck with a current project that the writer is trying to complete. By inserting a completely random paragraph from which to begin, it can take down some of the issues that may have been causing the writers' block in the first place.  Beginning Writing Routine Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.  Writing Challenge Another writing challenge can be to take the individual sentences in the random paragraph and incorporate a single sentence from that into a new paragraph to create a short story. Unlike the random sentence generator, the sentences from the random paragraph will have some connection to one another so it will be a bit different. You also won't know exactly how many sentences will appear in the random paragraph.  Programmers It's not only writers who can benefit from this free online tool. If you're a programmer who's working on a project where blocks of text are needed, this tool can be a great way to get that. It's a good way to test your programming and that the tool being created is working well.  Above are a few examples of how the random paragraph generator can be beneficial. The best way to see if this random paragraph picker will be useful for your intended purposes is to give it a try. Generate a number of paragraphs to see if they are beneficial to your current project.  If you do find this paragraph tool useful, please do us a favor and let us know how you're using it. It's greatly beneficial for us to know the different ways this tool is being used so we can improve it with updates. This is especially true since there are times when the generators we create get used in completely unanticipated ways from when we initially created them. If you have the time, please send us a quick note on what you'd like to see changed or added to make it better in the future.  Frequently Asked Questions Can I use these random paragraphs for my project?  Yes! All of the random paragraphs in our generator are free to use for your projects.  Does a computer generate these paragraphs?  No! All of the paragraphs in the generator are written by humans, not computers. When first building this generator we thought about using computers to generate the paragraphs, but they weren't very good and many times didn't make any sense at all. We therefore took the time to create paragraphs specifically for this generator to make it the best that we could.  Can I contribute random paragraphs?  Yes. We're always interested in improving this generator and one of the best ways to do that is to add new and interesting paragraphs to the generator. If you'd like to contribute some random paragraphs, please contact us.  How many words are there in a paragraph?  There are usually about 200 words in a paragraph, but this can vary widely. Most paragraphs focus on a single idea that's expressed with an introductory sentence, then followed by two or more supporting sentences about the idea. A short paragraph may not reach even 50 words while long paragraphs can be over 400 words long, but generally speaking they tend to be approximately 200 words in length. `;
let splitLine = listLines.split(" ");
let newShuffleArray;
let listWords = [];

// for (let i = 0; i < newShuffleArray.length; i++) {
//   if (i == 300) {
//     break;
//   }

//   listWords.push(newShuffleArray[i]);
// }

let listWordForCurrentLoop = [];

for (let i = 0; i < 20; i++) {
  newShuffleArray = shuffle(splitLine);

  listWordForCurrentLoop = [];

  for (let i = 0; i < newShuffleArray.length; i++) {
    if (i == 26) {
      break;
    }

    listWordForCurrentLoop.push(newShuffleArray[i]);
  }

  listWords.push(listWordForCurrentLoop);
}

function createNewElement(word, number) {
  let span = document.createElement("span");

  span.setAttribute("class", "");
  span.setAttribute("data-word-number", number);

  span.innerHTML = word + " ";

  words.appendChild(span);
}

function loadWords(key) {
  let wordNumber = 0;

  listWords[key].forEach((word) => {
    createNewElement(word, wordNumber++);
  });

  if (key) {
    listAllSpan = document.querySelectorAll("#words span");
  }
}

loadWords(currentListWordsKey);

let listAllSpan = document.querySelectorAll("#words span");

let firstWord = words.firstElementChild;
firstWord.classList.add("active");

input.addEventListener("keydown", (e) => {
  if (!countWord) {
    listAllSpan[0].classList.add('active')
  }

  if (e.code === "Space" && input.value.trim() !== "") {
    if (currentElement.textContent.trim() === input.value.trim()) {
      currectWord++;
    } else {
      wrongWord++;

      currentElement.classList.remove("success");
      currentElement.classList.add("danger");
    }

    ++countWord;

    if (countWord == 26) {
      deleteOldWords();

      loadWords(++currentListWordsKey);
    }

    for (let span of listAllSpan) {
      if (span.classList.contains("active")) {
        oldSpan = span;
        oldSpan.classList.remove("active");

        currentElement = span.nextElementSibling;
        currentElement.classList.add("active");

        break;
      }
    }

    input.value = "";
  }
});

function deleteOldWords() {
  do {
    words.removeChild(words.lastElementChild);
  } while (words.children.length);

  countWord = 0;
}

input.addEventListener("input", typeWord);

function typeWord() {
  if (!runTimer) {
    runTimer = true;

    window.timers = setInterval(() => {
      timer.innerHTML = `0:${--time}`;

      if (time === 0) {
        words.style.display = "none";
        boxTypeWord.style.display = "none";

        result.innerHTML = `
          تعداد درست : <span style="color:green">${currectWord}</span> <br/>
          تعداد اشتباه: <span style="color:red">${wrongWord}</span>
        `;

        clearInterval(window.timers);
      }
    }, 1000);
  }

  checkWord();
}

function checkWord() {
  for (let span of listAllSpan) {
    if (span.classList.contains("active")) {
      currentElement = span;

      if (currentElement.classList.contains("success")) {
        currentElement.classList.remove("success");
      }

      break;
    }
  }

  let textElement = currentElement.textContent.trim();

  if (input.value.trim() !== "") {
    if (textElement.startsWith(input.value.trim())) {
      currentElement.classList.remove("danger");
      currentElement.classList.add("success");
    } else {
      currentElement.classList.remove("success");
      currentElement.classList.add("danger");
    }
  } else {
    currentElement.classList.remove("danger");
    currentElement.classList.remove("success");
    currentElement.classList.add("active");
  }
}
