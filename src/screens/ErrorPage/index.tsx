import { useRouteError } from "react-router-dom";
import "./index.css";
export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="error-app">
      <div className="background"></div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
