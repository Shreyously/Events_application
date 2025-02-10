// src/components/EventForm.jsx
import { useState } from 'react';

const EventForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    date: initialData.date || '',
    location: initialData.location || '',
    category: initialData.category || '',
    capacity: initialData.capacity || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default EventForm;