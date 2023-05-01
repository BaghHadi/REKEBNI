// Page d'inscription

document.addEventListener("DOMContentLoaded", (e) => {
  let form = document.querySelector(".sign-up-card");
  e.preventDefault();
  // Create acc btn
  const createBtn = document.querySelector(".btn-signup");
  createBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      // Necessary input data
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById(
        "password-confirmation"
      ).value;
      const lastName = document.getElementById("last-name").value;
      const firstName = document.getElementById("first-name").value;
      const birthDate = document.getElementById("date").value;

      if (passwordConfirm != password)
        throw new Error("password fields unmatching ❌");

      const res = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          name: `${lastName} ${firstName}`,
          // lastName: lastName,
          // firstName: firstName,
          // birthDate:  birthDate,
        }),
      });
      if (!res.ok)
        throw new Error("Something is wrong ❌ , please try again later !");
      data = await res.json();
      window.location.href = "/login";
    } catch (err) {
      form.insertAdjacentText("afterbegin", err.message);
    }
  });
});