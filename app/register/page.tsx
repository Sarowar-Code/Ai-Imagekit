"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password do not match");
            return;
        }
        try {
            const res = await fetch("api/auth/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }
            const data = await res.json();

            console.log(data);
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const router = useRouter();
    return;
    <div className="container mx-auto p-4">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
        <div>
            <p>Already have an account? </p>
            <button
                onClick={() => router.push("/login")}
                className="text-blue-500 hover:underline"
            >
                Login
            </button>
        </div>
    </div>;
};

export default RegisterPage;
