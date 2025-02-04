
// import React, { useState } from "react"
// import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
// import { Button } from "./ui/button"


// const Login= function FloatingLogin({ onLogin }) {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onLogin(username, password)
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
{/* <Card className="w-[350px] bg-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card> */}
{/* <Card className="w-[350px] bg-white">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter your information to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create account</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
export default Login; */}

import React, { useEffect, useState, useContext } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useRoleAuth } from "../context/RoleAuthContext"

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setRole } = useRoleAuth();

  const loginUser = async () => {
    try {
      let response = null;
      if (isLogin) {
        response = await axios.post("http://localhost:3001/api/auth/login", {
          Email,
          Password,
        });
      } else {
        if (Password === ConfirmPassword) {
          response = await axios.post("http://localhost:3001/api/auth/register", {
            Email,
            Password,
            ConfirmPassword,
            Name,
            LastName,
          });
        } else {
          console.error("Passwords do not match");
          return;
        }
      }

      if (response.data && response.data.token) {
        login(response.data.token);
        setRole(response.data.token);
        localStorage.setItem("site", response.data.token);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
    localStorage.setItem("site", "token");

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <Card className="w-[400px] bg-white">
        <CardHeader>
          <CardTitle>{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Sign in to continue."
              : "Enter your information to create an account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your first name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

