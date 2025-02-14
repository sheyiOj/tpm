// JavaScript to toggle the visibility of the edit form
function toggleEditForm() {
    const editForm = document.getElementById('editForm');
    editForm.style.display = editForm.style.display === 'block' ? 'none' : 'block';
  }
  
  // Handle form submission to save profile changes
  document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const aboutMe = document.getElementById('aboutMe').value;
    const location = document.getElementById('location').value;
    const experience = document.getElementById('experience').value;
  
    // Here, you can add the logic to save the updated data, e.g., to a backend or local storage.
  
    alert('Profile updated successfully!');
  
    // Close the form after saving
    toggleEditForm();
  });
  