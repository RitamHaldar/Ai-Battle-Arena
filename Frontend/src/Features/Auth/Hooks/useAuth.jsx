import { useDispatch } from "react-redux";
import { registerUser, loginUser, getUser, logoutUser } from "../Services/auth.api.js";
import { setLoading, setUser } from "../auth.slice.js";
export const useAuth = () => {
    const dispatch = useDispatch();

    const register = async ({ username, email, password }) => {
        try {
            dispatch(setLoading(true));
            const response = await registerUser({ username, email, password });
            dispatch(setUser(response.user));
        } catch (error) {
            console.error("Error registering user:", error);
        }
        finally {
            dispatch(setLoading(false))
        }
    };

    const login = async ({ email, password }) => {
        try {
            dispatch(setLoading(true));
            const response = await loginUser({ email, password });
            dispatch(setUser(response.user));
        } catch (error) {
            console.error("Error logging in user:", error);
        }
        finally {
            dispatch(setLoading(false))
        }
    };

    const getuser = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getUser();
            dispatch(setUser(response.user));
        } catch (error) {
            console.error("Error getting user:", error);
        }
        finally {
            dispatch(setLoading(false))
        }
    };

    const logout = async () => {
        try {
            dispatch(setLoading(true));
            const response = await logoutUser();
            dispatch(setUser(null));
            navigate("/login");
        } catch (error) {
            console.error("Error logging out user:", error);
        }
        finally {
            dispatch(setLoading(false))
        }
    };

    return {
        register,
        login,
        getuser,
        logout
    };
}