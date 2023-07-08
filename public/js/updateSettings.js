/*eslint-disable*/

const formData = document.querySelector('.form-user-data');
const formPass = document.querySelector('.form-user-settings');
const btnSave = document.querySelector('.btn--save-pass');
const photoInput = document.querySelector('.form__upload');

const updateUserSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    if (type === 'password') {
      btnSave.textContent = 'updating...';
      btnSave.disabled = true;
    }

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      btnSave.innerHTML = 'save password';
      btnSave.disabled = false;
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    btnSave.innerHTML = 'save password';
    btnSave.disabled = false;
    showAlert('error', err.response.data.message);
  }
};

if (formData) {
  formData.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateUserSettings(form, 'data');
  });
}

if (formPass) {
  formPass.addEventListener('submit', e => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    updateUserSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
  });
}

if (photoInput) {
  photoInput.addEventListener('change', () => {
    const url = URL.createObjectURL(photoInput.files[0]);
    document.querySelector('.form__user-photo').src = url;
  });
}
