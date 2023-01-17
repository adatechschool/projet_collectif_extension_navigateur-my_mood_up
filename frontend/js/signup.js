const handleSubmit = async (email, username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/user/signup", {
      email: email,
      username: username,
      password: password,
    });
    if (response.data.token) {
      window.location.href = "/index.html";
    } else {
      alert("Une erreur est survenue, veuillez réssayer.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const valueEmail = document.querySelector("#email").value;
  const valueUsername = document.querySelector("#username").value;
  const valuePassword = document.querySelector("#password").value;
  handleSubmit(valueEmail, valueUsername, valuePassword);
});
