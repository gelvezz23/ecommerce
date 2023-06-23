import Card from "../Card";

const DeleteProduct = () => {
  return (
    <div className="container-fluid text-center">
      <div className="row">
        <Card deleteProp={true} />
      </div>
    </div>
  );
};

export default DeleteProduct;
