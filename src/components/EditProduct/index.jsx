import Card from "../Card";

const EditProduct = () => {
  return (
    <div className="container-fluid text-center">
      <div className="row">
        <Card editProp={true} />
      </div>
    </div>
  );
};

export default EditProduct;
