// REGISTER

function registerUser() {

    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    if (name === "" || email === "" || password === "") {
        alert("Fill all fields");
        return;
    }

    fetch("http://localhost:8080/api/users/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })

    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data === "Registration Successful") {
            document.getElementById("regName").value = "";
            document.getElementById("regEmail").value = "";
            document.getElementById("regPassword").value = "";
            showLogin(); // Optional: automatically switch to login form
        }
    })
    .catch(error => {
        console.error(error);
        alert("Registration Failed");
    });
}

// LOGIN
function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Fill all fields");
        return;
    }

    fetch("http://localhost:8080/api/users/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    })
    .then(response => response.text())
    .then(data => {

        alert(data);

        if (data === "Login Successful") {
            window.location.href = "dashboard.html";
        }

    })
    .catch(error => {
        console.error(error);
        alert("Login Failed");
    });
}

// AI

function askAI() {

    let question =
        document.getElementById("question").value;

    if(question === ""){
        return;
    }

    let chatBox =
        document.getElementById("chatBox");

    chatBox.innerHTML +=
    `
    <div class="user-msg">
        ${question}
    </div>
    `;

    let response =
        "StudyBuddy AI Response: " + question;

    chatBox.innerHTML +=
    `
    <div class="ai-msg">
        ${response}
    </div>
    `;

    document.getElementById("question").value = "";

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

// QUIZ

function submitQuiz() {

    let score = 0;

    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');
    let q3 = document.querySelector('input[name="q3"]:checked');

    if (!q1 || !q2 || !q3) {
        alert("Please answer all questions");
        return;
    }

    if (q1.value === "Language") {
        score++;
    }

    if (q2.value === "Hyper Text Markup Language") {
        score++;
    }

    if (q3.value === "MySQL") {
        score++;
    }

    document.getElementById("result").innerHTML =
        "Your Score: " + score + "/3 🎉";
}
function showLogin() {

    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

function showRegister() {

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
}
function showLogin() {
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

function showRegister() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
}
