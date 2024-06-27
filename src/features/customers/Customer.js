import { useSelector } from "react-redux";
import store from "../../store";

function Customer() {
  const customerName = useSelector(store => store.customer.fullName)
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
