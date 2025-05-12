'use client';

import { useState } from 'react';

export default function Page() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
  });

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://crud-backend-dhruv.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message || 'Contact added');
      setForm({ firstName: '', lastName: '', age: '', email: '' });
    } catch (error) {
      alert('Failed to add contact');
      console.error(error);
    }
    setLoading(false);
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch('https://crud-backend-dhruv.onrender.com/contact');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      alert('Failed to fetch contacts');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Add Contact</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <button
        onClick={fetchContacts}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Get All Contacts
      </button>

      {contacts.length > 0 && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow space-y-2">
          <h3 className="text-xl font-semibold text-center">All Contacts</h3>
          {contacts.map((contact, i) => (
            <div key={i} className="border-b p-2">
              <p><strong>Name:</strong> {contact.firstName} {contact.lastName}</p>
              <p><strong>Age:</strong> {contact.age}</p>
              <p><strong>Email:</strong> {contact.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
