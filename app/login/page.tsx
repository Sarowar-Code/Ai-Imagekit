"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            alert(result.error);
        } else {
            // Redirect to the home page or any other page after successful login
            router.push("/");
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Login
                </button>
            </form>
            <div>
                <p>Don't have an account? </p>
                <button
                    onClick={() => router.push("/register")}
                    className="text-blue-500 hover:underline"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
