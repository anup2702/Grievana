import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-theme-primary text-center px-4">
    <h1 className="text-6xl font-bold text-theme-primary mb-4">404</h1>
    <p className="text-xl text-theme-secondary mb-8">Oops! The page you are looking for does not exist.</p>
    <Link to="/">
      <Button>Go Home</Button>
    </Link>
  </div>
);

export default NotFoundPage; 