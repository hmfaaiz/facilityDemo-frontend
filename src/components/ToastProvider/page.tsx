// components/ToastProvider.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ToastProvider = ({ children }) => (
  <>
    <ToastContainer />
    {children}
  </>
);

export default ToastProvider;
