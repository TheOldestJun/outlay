import prisma from "../../prisma";
import bcrypt from "bcrypt";

const Auth = async (req, res) => {
  //add new user with bcrypted password
  let { name, email, password, role } = req.body;
  if (req.body.command === "add-user") {
    if (!name || !email || !password || !role) {
      req.end(
        JSON.stringify({
          status: "error",
          message: "Заполните все данные",
        }),
      );
      return;
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        role: role,
      },
    });
    res.end(JSON.stringify(user));
  }
  //check user logging in
  if (req.body.command === "check-user") {
    let { email, password } = req.body;
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.end(
        JSON.stringify({
          status: "error",
          message: "Пользователя с таким мылом не существует",
        }),
      );
      return;
    }
    let passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      res.end(
        JSON.stringify({
          status: "error",
          message: "Неверный пароль",
        }),
      );
      return;
    }
    res.end(
      JSON.stringify({
        userName: user.name,
        userRole: user.role,
      }),
    );
  }
  if (req.body.command === "get-username") {
    let { email } = req.body;
    let result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    res.end(JSON.stringify(result.name));
  }
};

export default Auth;
