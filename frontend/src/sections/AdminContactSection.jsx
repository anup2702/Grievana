
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const AdminContactSection = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await API.get("/contact");
        setContacts(res.data);
      } catch (err) {
        toast.error("Failed to load contact messages");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading contact messages...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Contact Messages</h2>
      <div className="space-y-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact._id} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">{contact.name} <span className="text-gray-500 text-sm">({contact.email})</span></p>
              <p className="text-gray-700 mt-2">{contact.message}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No contact messages found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminContactSection;
