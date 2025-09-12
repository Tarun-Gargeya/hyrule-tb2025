
import React, { useRef, useState } from "react";

export default function CompanyDashboard() {
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    company: '',
    studentEmail: '',
    name: '',
    position: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Placeholder: send file to backend
      alert(`Selected file: ${file.name}`);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateBadge = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/createBadge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Badge created successfully! Email sent to ${formData.studentEmail}`);
        setFormData({ company: '', studentEmail: '', name: '', position: '' });
      } else {
        alert('Error creating badge. Please try again.');
      }
    } catch (error) {
      alert('Error connecting to server. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 text-xl font-semibold shadow">
        Company Dashboard
      </nav>
      <div className="flex flex-1">
        {/* Main section */}
        <div className="flex-2 p-8 w-2/3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Create Badge for Student</h2>
            <form onSubmit={handleCreateBadge} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Email</label>
                <input
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="student@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer Intern"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium shadow"
              >
                {isLoading ? 'Creating Badge...' : 'Create Badge & Send Email'}
              </button>
            </form>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Upload Excel Sheet</h2>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div>
              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium shadow"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
        {/* Side section for previously accepted people */}
        <aside className="w-1/3 bg-gray-100 p-8 border-l border-gray-300">
          <h3 className="text-lg font-semibold mb-4">Previously Accepted</h3>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-lg shadow-sm">
              <strong>John Doe</strong><br />john@example.com
            </li>
            <li className="bg-white p-4 rounded-lg shadow-sm">
              <strong>Jane Smith</strong><br />jane@example.com
            </li>
            <li className="bg-white p-4 rounded-lg shadow-sm">
              <strong>Placeholder User</strong><br />placeholder@email.com
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
