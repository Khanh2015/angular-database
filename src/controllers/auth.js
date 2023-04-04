import User from "../models/user.js";
import { signupSchema, signinSchema } from "../schemas/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_CODE } = process.env;
/**
 * B1: lấy ra req.body và dùng Joi validation
 * B2: Nếu validate lỗi thì trả về lỗi.
 * B3: Check xem email đã có trong hệ thống hay chưa bằng findOne({})
 * B4: Mã hoá password bằng bcryptjs
 * B5: Lưu dữ liệu vào database bằng model User.create()
 * B6: Xoá password và trả thông tin về cho người dùng.
 */

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Check xem email đăng ký này đã tồn tại trong DB hay chưa?
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Dùng bcrypt để mã hoá
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới với password đã được mã hoá
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Xoá bỏ password trước khi gửi lại thông báo phía client
    // const token = jwt.sign({ _id: user._id }, "123456", { expiresIn: "1d" });
    user.password = undefined;
    return res.status(201).json({
      message: "User created successfully",
      user,
      // accessToken: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Không đúng mật khẩu",
      });
    }
    const token = jwt.sign({ _id: user._id }, SECRET_CODE, {
      expiresIn: "1d",
    });

    user.password = undefined;

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
