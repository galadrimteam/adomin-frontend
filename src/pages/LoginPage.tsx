import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADOMIN_HOME_PATH } from "../adominPaths";
import { privateAxios, setToken } from "../axios/privateAxios";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await privateAxios.post("/adomin/api/login", {
        email,
        password,
      });

      return res.data;
    },
    onSuccess: (data) => {
      if (typeof data.token !== "string") {
        throw new Error("No token in response");
      }
      setToken(data.token);
      navigate(ADOMIN_HOME_PATH);
    },
  });

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate();
        }}
      >
        <h1 className="text-center text-2xl">Connexion</h1>

        <TextField
          type="text"
          label="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Mot de passe"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <LoadingButton
          type="submit"
          loading={loginMutation.isPending}
          variant="outlined"
        >
          Se connecter
        </LoadingButton>

        {loginMutation.isError && (
          <div className="text-red-500 text-center">
            Email ou mot de passe incorrect
          </div>
        )}
      </form>
    </div>
  );
};
