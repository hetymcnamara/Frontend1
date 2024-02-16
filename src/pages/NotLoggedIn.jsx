import { Link } from "react-router-dom";
import "./NotLoggedIn.modules.css";

export default function NotLoggedIn() {
  return (
    <main className="NotLoggedIn container-fluid not-logged-in">
      <article className="not-logged-in-container grid">
        <div className="text not-logged-in-div">
          <h3>Hi, you are not logged in.</h3>
          <Link to="/auth">
            <p>Sign up or Log in</p>
          </Link>
        </div>
        <div
          className="image"
          style={{
            backgroundImage: `url(https://t4.ftcdn.net/jpg/03/10/02/55/360_F_310025535_K3CIQlg6V7W2MlKtJvtka81kRtA8Ui5e.jpg?w=585&scale=down)`,
          }}
        ></div>
      </article>
    </main>
  );
}
