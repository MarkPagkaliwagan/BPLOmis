"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiPhone, FiLock, FiSave } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProfilePanel() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token || JSON.parse(storedUser).role !== "USER") {
      router.push("/Navsection/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setForm({
      firstName: parsedUser.firstName || "",
      lastName: parsedUser.lastName || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
      password: "",
    });
    setLoading(false);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  id: user.id,
  ...form,
}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setForm({ ...form, password: "" });
      alert("Profile updated successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-6 md:p-10 rounded-3xl shadow-xl bg-gray-50"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 mb-8">
          View and update your profile information
        </p>

        <div className="space-y-6">
          {/* First & Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            {["firstName", "lastName"].map((key) => (
              <div key={key} className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1 capitalize">
                  {key === "firstName" ? "First Name" : "Last Name"}
                </label>
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 bg-white shadow-inner transition-transform hover:scale-[1.01]">
                  <FiUser className="text-gray-400" />
                  <input
                    type="text"
                    name={key}
                    value={form[key as keyof typeof form]}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-gray-800 font-medium"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Email & Phone */}
          {[
            { key: "email", icon: <FiMail className="text-gray-400" /> },
            { key: "phone", icon: <FiPhone className="text-gray-400" /> },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-gray-700 font-semibold mb-1 capitalize">
                {field.key}
              </label>
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 bg-white shadow-inner transition-transform hover:scale-[1.01]">
                {field.icon}
                <input
                  type={field.key === "email" ? "email" : "text"}
                  name={field.key}
                  value={form[field.key as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-800 font-medium"
                />
              </div>
            </div>
          ))}

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 bg-white shadow-inner transition-transform hover:scale-[1.01]">
              <FiLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-transparent outline-none text-gray-800 font-medium"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-2xl shadow-lg transition-transform transform
            ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] text-white"}`}
          >
            <FiSave />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}