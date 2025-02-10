import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, UploadCloud, Calendar, MapPin, Users, Ticket } from "lucide-react";
// import { useEventStore } from "../store/useEventStore"; // Remove Zustand import
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../store/actions/eventActions';

function CreateEvent() {
  // const { createEvent, isLoading } = useEventStore(); // Remove Zustand
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.events.isLoading); // Assuming you have an isLoading in your eventReducer
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    category: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setSelectedImg(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(createEvent({ ...formData, imageUrl: selectedImg })); // Dispatch Redux action
    navigate("/dashboard");
  };

  const validateForm = () => {
    const requiredFields = [
      { field: "name", message: "Event title is required" },
      { field: "description", message: "Description is required" },
      { field: "date", message: "Date and time are required" },
      { field: "location", message: "Location is required" },
      { field: "capacity", message: "Capacity is required" },
      { field: "category", message: "Category is required" },
    ];

    return requiredFields.every(({ field, message }) => {
      if (!formData[field].trim()) {
        toast.error(message);
        return false;
      }
      return true;
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
            <p className="text-gray-500">Fill in the details to organize your event</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Cover Image
              </label>
              <div
                className={`group relative h-48 w-full border-2 border-dashed rounded-xl flex items-center justify-center
                  ${selectedImg ? "border-transparent" : "border-gray-300 hover:border-primary/50"} 
                  transition-colors duration-200 cursor-pointer`}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {selectedImg ? (
                  <img
                    src={selectedImg}
                    alt="Event cover"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center space-y-2">
                    <UploadCloud className="h-8 w-8 text-gray-400 mx-auto group-hover:text-primary" />
                    <p className="text-sm text-gray-500">
                      Drag and drop or <span className="text-primary">browse</span> your files
                    </p>
                    <p className="text-xs text-gray-400">JPEG, PNG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className="flex-1 input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1 -mt-1" />
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1 -mt-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter venue location"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Ticket className="inline h-4 w-4 mr-1 -mt-1" />
                    Event Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="networking">Networking</option>
                    <option value="social">Social</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1 -mt-1" />
                    Attendee Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    placeholder="Maximum attendees"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="h-5 w-5 animate-spin mr-2" />
                  Creating Event...
                </span>
              ) : (
                "Publish Event"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;