const form = document.querySelector("#participationForm");
const certificateSection = document.querySelector("#certificateSection");
const certName = document.querySelector("#certName");
const certRole = document.querySelector("#certRole");
const certLocation = document.querySelector("#certLocation");
const certId = document.querySelector("#certId");
const printButton = document.querySelector("#printCertificate");
const newEntryButton = document.querySelector("#newEntry");
const certificateIdField = document.querySelector("#certificateIdField");
const formSubject = document.querySelector("#formSubject");
const userCcField = document.querySelector("#userCcField");
const replyToField = document.querySelector("#replyToField");
const submitFrame = document.querySelector("iframe[name='formSubmitFrame']");

function certificateCode() {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("");
  const random = Math.floor(10000 + Math.random() * 90000);
  return `EY2026-${stamp}-${random}`;
}

function saveLocalSubmission(data) {
  try {
    const existing = JSON.parse(localStorage.getItem("earlyYearsParticipants") || "[]");
    existing.push({
      ...data,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem("earlyYearsParticipants", JSON.stringify(existing));
  } catch (e) {
    // localStorage may be unavailable (private mode); ignore.
  }
}

function resetSubmitButton() {
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = false;
  submitButton.textContent = "Submit & Generate Certificate";
}

form.addEventListener("submit", (event) => {
  // Take over submission so the hidden fields are guaranteed to be filled
  // BEFORE the form is sent to FormSubmit (fixes the race condition where
  // CC / reply-to / certificate ID arrived empty).
  event.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  // Collect the values the user typed.
  const data = Object.fromEntries(new FormData(form).entries());
  data.certificateId = certificateCode();

  // Populate hidden FormSubmit fields first.
  certificateIdField.value = data.certificateId;
  formSubject.value = `New Participation: ${data.fullName}`;
  userCcField.value = data.email || "";
  replyToField.value = data.email || "";

  // Save a local copy for the user's own records.
  saveLocalSubmission(data);

  // Now actually send the form (into the hidden iframe).
  form.submit();

  // Fill and reveal the certificate.
  certName.textContent = data.fullName;
  certRole.textContent = data.role;
  certLocation.textContent = [data.area, data.city, data.state].filter(Boolean).join(", ");
  certId.textContent = `Certificate ID: ${data.certificateId}`;

  certificateSection.classList.remove("hidden");
  certificateSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Re-enable the button once FormSubmit responds in the hidden iframe.
if (submitFrame) {
  submitFrame.addEventListener("load", () => {
    // Ignore the initial blank load before any submission.
    if (form.querySelector("button[type='submit']").disabled) {
      resetSubmitButton();
    }
  });
}

printButton.addEventListener("click", () => {
  window.print();
});

newEntryButton.addEventListener("click", () => {
  form.reset();
  resetSubmitButton();
  certificateSection.classList.add("hidden");
  document.querySelector("#participate").scrollIntoView({ behavior: "smooth", block: "start" });
});
