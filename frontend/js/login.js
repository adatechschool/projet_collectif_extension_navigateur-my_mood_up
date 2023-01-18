const handleSubmit = async (email, password) => {
  try {
    console.log(email, password);
    const response = await axios.post("http://localhost:8080/user/login", {
      email: email,
      password: password,
    });
    if (response.data.token) {
      window.location.href = "/index.html";
    } else {
      alert("Une erreur est survenue, veuillez réssayer.");
    }
  } catch (error) {
    if (error.response.status === 400) {
      alert("Mauvais email et/ou mot de passe");
    }
    console.log(error.message);
  }
};

document.querySelector("#login-form").addEventListener("submit", (event) => {
  console.log("hello");
  event.preventDefault();
  const valueEmail = document.querySelector("#login-email").value;
  const valuePassword = document.querySelector("#login-password").value;
  handleSubmit(valueEmail, valuePassword);
});
