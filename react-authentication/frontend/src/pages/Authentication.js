import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const flag = searchParams.get("mode") || "signup";

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + flag, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    return json({ message: "Error sending data!" }, { status: 500 });
  }

  const resData = await response.json(); //Return response with token if login/signup went well
  localStorage.setItem("token", resData.token); //Will then use to send DELETE, POST request

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1); //It will creates a date that is one hour in the future.

  localStorage.setItem("expirationDate", expiration.toISOString());

  return redirect("/");
};
