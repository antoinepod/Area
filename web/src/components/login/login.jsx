import React, {useEffect} from 'React';

function Login() {
  useEffect(() => {
    console.log("Login");
  }, []);
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}