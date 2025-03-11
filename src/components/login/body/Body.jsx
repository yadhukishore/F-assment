import { useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "../../../atom";
import { useLogin } from "../../../services/auth";
import { showSuccessToast, showErrorToast } from "../../../utils/tostMessage";
import LoginForm from "../loginform/LoginForm";
import { Container, Row, Col } from "react-bootstrap";
import "./Body.css"; 
import LiquidChrome from "./Bits/LiquidChrome";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const { trigger, isMutating } = useLogin();
  
  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (username, password, setErrors) => {
    try {
      const userData = await trigger({ username, password });
      setUser(userData);
      setIsAuthenticated(true);
      showSuccessToast("Login successful! Welcome back.");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
  
      // Extract proper error message from server response
      const errorMessage =
        error.response?.data?.message || "Invalid login credentials. Please try again.";
  
      setErrors({ general: errorMessage });
      showErrorToast(errorMessage);
    }
  };
  
  
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* LiquidChrome Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={true} />
      </div>

      {/* Login Form Content */}
      <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <LoginForm onLogin={handleLogin} isLoading={isMutating} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Body;