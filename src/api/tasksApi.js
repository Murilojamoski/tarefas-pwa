import apiClient from './config.js';

const tasksApi = {
  getAll() {
    return apiClient.get('/tasks');
  },

  create(payload) {
    const data = {
      title: payload.title,
      latitude: payload.latitude ?? null,
      longitude: payload.longitude ?? null,
      geolocation_accuracy: payload.geolocation_accuracy ?? null,
      geolocation_timestamp: payload.geolocation_timestamp ?? null,
      location_label: payload.location_label ?? null,
    };
    if (payload.imgAttachmentKey) {
      data.img_attachment_key = payload.imgAttachmentKey;
    }
    return apiClient.post('/tasks', data);
  },

  update(id, data) {
    return apiClient.patch(`/tasks/${id}`, data);
  },

  remove(id) {
    return apiClient.delete(`/tasks/${id}`);
  },

   uploadImage(file, description = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (description) formData.append('description', description);
    return apiClient.post('/uploads/images/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};




export default tasksApi;