import { Loader, UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// import { useEventStore } from "../store/useEventStore"; // Remove Zustand import
import { useDispatch, useSelector } from 'react-redux';
import { getEventById, updateEvent } from '../store/actions/eventActions';

function EditEvent() {
  const { id } = useParams();
  // const { getEventById, updateEvent, isLoading } = useEventStore(); // Remove Zustand
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const isLoading = useSelector((state) => state.events.isLoading);
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    category: "",
    imageUrl: ""
  });

  useEffect(() => {
    const fetchEvent = async () => {
      dispatch(getEventById(id));
    };
    fetchEvent();
  }, [id, dispatch]);

  useEffect(() => {
    if(events && events.length > 0){
      const eventData = events[0];
      if (eventData) {
        const formattedDate = new Date(eventData.date)
          .toISOString()
          .slice(0, 16);

        setFormData({
          name: eventData.name,
          description: eventData.description,
          date: formattedDate,
          location: eventData.location,
          capacity: eventData.capacity,
          category: eventData.category,
          imageUrl: eventData.imageUrl
        });
        setSelectedImg(eventData.imageUrl);
      }
    }
  }, [events]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.description.trim()) return toast.error("Description is required");
    if (!formData.date.trim()) return toast.error("Date is required");
    if (!formData.location.trim()) return toast.error("Location is required");
    if (!formData.capacity || formData.capacity <= 0) return toast.error("Capacity must be greater than 0");
    if(!formData.category.trim()) return toast.error("Category is required"); return true;
  };

  const handleImageChange=async(e)=> {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      dispatch(updateEvent(id, {
        ...formData,
        imageUrl: selectedImg,
      }));

      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Event</h1>
            <p className="text-gray-500">Update the details of your event</p>
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
                  Updating Event...
                </span>
              ) : (
                "Update Event"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;