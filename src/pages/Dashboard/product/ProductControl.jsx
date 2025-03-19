import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation, useDeleteProductMutation, useGetProductQuery } from "../../../api/productApi";

function ProductControl() {
    const navigate = useNavigate();

    const [productID, setProductID] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productLink, setProductLink] = useState("");

    const onChangeHandler = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setProductImage(file);
        }
    };

    const [createProduct, { isSuccess, isError }] = useCreateProductMutation();
    const {data, refetch} = useGetProductQuery();
    const productData = data?.data;

    const [deleteProduct, {isSuccess: deleteSuccess, isError: deleteError}] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        await deleteProduct(id);
    };

    useEffect(() => {
        if(deleteSuccess){
            refetch();
        }
        if(deleteError){
            alert("Delete Failed");
        }
    }, [deleteSuccess, deleteError]);

    const createHandler = async () => {
        const formData = new FormData();
        formData.append("productID", productID);
        formData.append("productName", productName);
        formData.append("productPrice", productPrice);
        formData.append("productImage", productImage);
        formData.append("productLink", productLink);

        await createProduct(formData);
    };

    useEffect(() => {
        if(isSuccess) {
            refetch();
        }
        if(isError){
            alert("Create Failed");
        }
    }, [isSuccess, isError]);

    




    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Add Product</h1>
                <div>
                    <div className="flex flex-col gap-5 mt-5">
                        <label>Product ID:</label>
                        <input value={productID} onChange={(e) => setProductID(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Product Name:</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Product Price:</label>
                        <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Product Image:</label>
                        <input onChange={onChangeHandler} type="file" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Product Link:</label>
                        <input value={productLink} onChange={(e) => setProductLink(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="flex gap-5 mt-5">
                    <button onClick={createHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Add</button>
                    <button onClick={() => navigate(`/admin`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>
            </div>



            <div className="p-10">
                <h1 className="text-xl md:text-3xl font-bold">Tournament List</h1>
                <div>
                    <ul className="list rounded-box shadow-md bg-gray-200 hover:bg-gray-400">
  
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Tournament List</li>

                        <div>
                            {
                                productData?.map((product) => (
                                    <li className="list-row m-2" key={product._id}>
                                        <div><img className="size-10 rounded-box" src={product.productImage}/></div>
                                        <div>
                                        <div>{product.productName}</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">{productPrice}</div>
                                        </div>
                                        <div className="flex gap-5">
                                            <button onClick={() => deleteHandler(product._id)} className="btn btn-square btn-ghost w-[100px]">Delete</button>
                                        </div>
                                    </li>
                                ))
                            }
                        </div>
  
                    </ul>
                </div>
            </div>



        </div>
    );
};

export default ProductControl;