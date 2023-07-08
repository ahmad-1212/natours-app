/*eslint-disable*/

const stripe = Stripe(
  'pk_test_51NL1RzH8ChChFwPz11byOEDvmm5WJANx8ThQApbCGSKc6uTyxTunaikuu1gGbn9B7btAPJcVfg7O8keJcXZ5hzpI00DEx7XtWD'
);

const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    bookBtn.textContent = 'book tour now!';

    // 2) Create checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err.message);
    bookBtn.textContent = 'book tour now!';
  }
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
