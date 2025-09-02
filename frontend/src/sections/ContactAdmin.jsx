import React from "react";

const contacts = [
  {
    _id: 1,
    name: "Dr. John Doe",
    department: "Computer Science",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    imageUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 2,
    name: "Dr. Jane Smith",
    department: "Hostel Affairs",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    imageUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    _id: 3,
    name: "Mr. Robert Brown",
    department: "Finance Department",
    email: "robert.brown@example.com",
    phone: "345-678-9012",
    imageUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    _id: 4,
    name: "Ms. Emily White",
    department: "Student Affairs",
    email: "emily.white@example.com",
    phone: "456-789-0123",
    imageUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    _id: 5,
    name: "Mr. Michael Green",
    department: "Library",
    email: "michael.green@example.com",
    phone: "567-890-1234",
    imageUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    _id: 6,
    name: "Dr. Sarah Black",
    department: "Sports Department",
    email: "sarah.black@example.com",
    phone: "678-901-2345",
    imageUrl: "https://i.pravatar.cc/150?img=6",
  },
];

const ContactAdmin = () => {
  return (
    <div className="flex-1 min-h-screen flex flex-col bg-theme-primary rounded-lg shadow-theme p-6">
      <h2 className="text-2xl font-bold mb-6 text-theme-primary">Contact Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-theme-secondary p-4 rounded-lg text-center">
            <img src={contact.imageUrl} alt={contact.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2 text-theme-primary">{contact.name}</h3>
            <p className="text-sm text-theme-secondary">
              <strong>Department:</strong> {contact.department}
            </p>
            <p className="text-sm text-theme-secondary">
              <strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-theme-primary hover:underline">{contact.email}</a>
            </p>
            <p className="text-sm text-theme-secondary">
              <strong>Phone:</strong> <a href={`tel:${contact.phone}`} className="text-theme-primary hover:underline">{contact.phone}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactAdmin;
