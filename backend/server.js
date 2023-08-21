const path = require("path");
const { engine } = require("express-handlebars");
const express = require("express");
const asyncHandler = require("express-async-handler");
require("colors");
const connectDB = require("../config/connectDB");
const errorHandler = require("../backend/middlewares/errorHandler");
const envPath = path.join(__dirname, "..", "config", ".env");
const UsersModel = require("./models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/authMiddleware");
const RolesModel = require("./models/Roles");
const sendEmail = require("./services/sendEmail");

require("dotenv").config({ path: envPath });

const app = express();

app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "backend/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/sended", async (req, res) => {
  res.render("sended", {
    message: "Contact form send success",
    user: req.body.userName,
    email: req.body.userEmail,
  });
  await sendEmail(req.body);
});

// реєстрація - створення і збереження нового користувача в базі
// аутентифікація - перевірка данних і порівняння данних користувача (надані дані = дані в базі данних)
// авторизація - перевірка прав доступу
// розлогінення - вихід користувача із системи додатку

app.get("/register", (req, res) => {
  res.render("register");
});

app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // console.log(req.body);

    // отримуєм і валідуєм данні від користувача
    // шукаєм користувача в базі
    // якщо знайшли - помилка\редірект - користувач є в базі
    // якщо не знайшли - хешуємо пароль
    // зберігаємо користувача в базу з хешованим паролем

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    const candidate = await UsersModel.findOne({ email });
    if (candidate) {
      res.status(400);
      throw new Error("User already exists");
    }
    const roles = await RolesModel.findOne({ value: "USER" });
    const hashedPassword = bcrypt.hashSync(password, 5);
    const user = await UsersModel.create({
      ...req.body,
      password: hashedPassword,
      roles: [roles.value],
    });
    // console.log(hashedPassword);
    res.render("registerSuccess");
    // res.status(201).json({ code: 201, data: { email: user.email } });
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // отримуєм і валідуєм данні від користувача
    // шукаєм користувача в базі і розшифровуємо пароль
    // якщо не знайшли або неправильний пароль - Invalid email or password
    // якщо знайшли - генеруємо токен
    // зберігаємо токен в базі і відправляємо

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    const user = await UsersModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(400);
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      friends: ["Beer", "Vodka", "777"],
      id: user._id,
      roles: user.roles,
    });
    user.token = token;
    await user.save();

    res.render("loginSuccess");
    // res.status(200).json({ code: 200, data: { email: user.email, token: user.token } });
  })
);

app.post(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { id } = req.user;

    await UsersModel.findByIdAndUpdate(id, { token: null });
    res.status(200).json({ code: 200, message: "logout success" });
  })
);

function generateToken(data) {
  const payload = {
    ...data,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "3h" });
}

app.use("/api/v1", require("./routes/carsRoutes"));

app.use(errorHandler);

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`.green.italic.bold)
);
