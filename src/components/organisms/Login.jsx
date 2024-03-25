import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  return createPortal(
    <div
      className="modal"
      onClick={() => navigate('/')}
    >
      <div
        className="loginModal"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >

      <h1>hello</h1>
      </div>
    </div>,
    document.querySelector('#portal')
  );
}
 
export default Register;