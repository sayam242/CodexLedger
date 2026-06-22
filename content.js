let lastUrl = location.href;



function handleSubmissionsPage(){
    const title=document.title;
    const problemName=title.split(" - ")[0];
    console.log("Problem Name:", problemName);
}

function handleDescriptionPage(){
    const slug = window.location.pathname.split("/")[2];
    const problemElement = document.querySelector(
    `a[href="/problems/${slug}/"]`
    );

    if (!problemElement) {
      console.log("Problem element not found");
      return;
    }    
    const rawText = problemElement.textContent.trim();

    const match = rawText.match(/^(\d+)\.\s(.+)$/);

    if (match) {
    const problemNumber = match[1];
    const problemTitle = match[2];

    console.log({
        problemNumber,
        problemTitle,
    });
    }
}

const observer = new MutationObserver(() => {
  const currentUrl = location.href;

  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;

    console.log("URL Changed:", currentUrl);

    if (window.location.pathname.includes("/submissions/")) {
      handleSubmissionsPage();
    }

    // if (window.location.pathname.includes("/problems/") && !window.location.pathname.includes("/submissions/")) {
    //   handleDescriptionPage();
    // }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function isSubmitButton(button) {
  return (
    button.tagName === "BUTTON" &&
    button.dataset.e2eLocator === "console-submit-button" &&
    button.getAttribute("aria-label") === "Submit" &&
    button.textContent.includes("Submit")
  );
}

document.addEventListener("click",(event)=>{
  // to access the button element clicked and used closest to detect click on icon also
  const button=event.target.closest("button");

  if(!button)return;

  if (isSubmitButton(button)) {
    console.log("Submit button clicked");
    handleDescriptionPage();
  }
  
})