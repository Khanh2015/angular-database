import bcryptjs from "bcryptjs";
import { signUpValid, signInValid } from "../validations/userValid.js";
import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.join(" ============= "),
      });
    }
    const checkEmail = await Users.findOne({ email: req.body.email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email đã được đăng ký",
      });
    }

    const passwordHash = await bcryptjs.hash(req.body.password, 10);

    if (!passwordHash) {
      return res.status(400).json({
        message: "Mã hóa mật khẩu thất bại",
      });
    }

    const user = {
      email: req.body.email,
      password: passwordHash,
    };

    const data = await Users.create(user);

    if (!data) {
      return res.status(400).json({
        message: "Đăng ký thất bại",
      });
    }

    data.password = undefined;

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Đăng ký thất bại",
      details: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = signInValid.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const checkEmail = await Users.findOne({ email: req.body.email });

    if (!checkEmail) {
      return res.status(400).json({
        message: "Email chưa được đăng ký",
      });
    }

    const checkPassword = await bcryptjs.compare(
      req.body.password,
      checkEmail.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }

    const token = jwt.sign({ _id: checkEmail._id }, process.env.SECRET_CODE, {
      expiresIn: "1d",
    });

    if (!token) {
      return res.status(400).json({
        message: "Tạo token thất bại",
      });
    }

    checkEmail.password = undefined;

    return res.status(200).json({
      accessToken: token,
      user: checkEmail,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
