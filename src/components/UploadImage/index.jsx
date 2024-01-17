import { useState } from "react";
import {
  createImage,
  createProduct,
  deleteImage,
  getOneImage,
} from "../../utils/appwriteConfig";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({});
  const [imageId, setImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [infoImage, setInfoImage] = useState(null);
  const [error, setError] = useState();
  const [success, setssucces] = useState();
  const handleChange = (event) => {
    setImage(event.target.files[0]);
    console.log("event");
  };
  const handleFormChange = (event) => {
    const { name, value } = event;
    setForm({ ...form, [name]: value });
  };

  const handleUpload = async (event) => {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();
    const response = await createImage(image);
    console.log(image);
    const imageInfo = await getOneImage(response.$id);
    setInfoImage(imageInfo);
    setImageId(response.$id);
    setForm({ image: imageInfo.href });
    imageInfo && setLoading(false);
    setError(response.message);
  };

  const handleDeleteImage = async (event) => {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();
    const response = await deleteImage(imageId);
    response && setInfoImage(null);
    response && setLoading(false);
    setError(response.message);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();
    const response = await createProduct(form);
    if (response) {
      setssucces("Registro exitoso");
      setInfoImage(null);
      setImageId(null);
      setForm(null);
      setLoading(false);
    }
    setError(response.message);
  };

  return (
    <div className="container-xl border my-5 p-3">
      <h2 className="text-center my-2">1. Sube la imagen del producto</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <div className="container border p-3 my-3">
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">
              <b>Imagen de producto</b> :
            </label>
            <input
              onChange={(event) => handleChange(event)}
              type="file"
              className="btn form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={(event) => handleUpload(event)}
          >
            subir imagen
          </button>
          {loading ? <h5>loading ...</h5> : null}
        </form>
      </div>
      <div className="container-xxl d-flex flex-wrap justify-content-start">
        {infoImage && (
          <div className="card col-sm-6 col-xl-6">
            <img className="card-img-top" src={infoImage.href} alt="imagen" />
            <div className="card-body">
              <button
                className="btn btn-danger"
                onClick={(event) => handleDeleteImage(event)}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {infoImage ? (
          <div className="col-sm-6 col-xl-6">
            <div id="formContent">
              <div className="fadeIn first">
                <h5>Información del producto</h5>
              </div>
              <form onSubmit={(event) => handleSubmit(event)}>
                <input
                  type="text"
                  className="fadeIn second"
                  name="name"
                  onChange={(event) => handleFormChange(event.target)}
                  placeholder="nombre de producto"
                  required
                />
                <input
                  type="text"
                  className="fadeIn second"
                  name="price"
                  onChange={(event) => handleFormChange(event.target)}
                  placeholder="precio"
                  required
                />
                <input
                  type="text"
                  className="fadeIn second"
                  name="description"
                  onChange={(event) => handleFormChange(event.target)}
                  placeholder="Descripcion"
                  required
                />
                <button
                  type="submit"
                  className="adeIn fourth btn btn-outline-success"
                >
                  Crear producto
                </button>
                {loading ? <h5>loading ...</h5> : null}
              </form>
            </div>
          </div>
        ) : (
          <h5> por favor debe subir la imagen de producto</h5>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
