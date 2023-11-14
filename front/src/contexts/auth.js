import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider ({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.matricula === JSON.parse(userToken).matricula
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (matricula, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
  
    const hasUser = usersStorage?.find(
      (user) => user.matricula === matricula && user.password === password
    );
  
    if (hasUser) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("user_token", JSON.stringify({ matricula, token }));
      setUser({ matricula });
    } else {
      return "Matricula ou senha incorretos";
    }
  };
  

  const signup = (matricula, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.matricula === matricula);

    if (hasUser?.length) {
      return "Já tem uma conta com esse Matricula";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { matricula, password }];
    } else {
      newUser = [{ matricula, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;