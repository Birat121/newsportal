import jwt from "jsonwebtoken";

// 🔐 Admin Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    )
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "3d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      })
      .status(200)
      .json({ message: "Admin login successful", token });
  } catch (error) {
    next(error);
  }
};

// 🚪 Admin Logout
export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

// 👤 Get Current Admin Info (Optional)
export const getAdminProfile = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    res.status(200).json({ admin: { email: decoded.email } });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

