/* eslint-disable react/prop-types */
const Toast = () => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        className="toast align-items-center bg-success"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body text-light">
            Agregaste un nuevo producto
          </div>
          <button
            type="button"
            className="btn-close me-2 m-auto text-light bg-light"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
