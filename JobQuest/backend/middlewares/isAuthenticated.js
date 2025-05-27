import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Check if token exists in cookies
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated", // Respond if no token found
                success: false,
            });
        }

        // Verify the token
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach user ID to request object for further use
        req.id = decode.userId;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error); // Log the error for debugging
        return res.status(500).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
