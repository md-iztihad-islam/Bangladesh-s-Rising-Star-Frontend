import { useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../api/productApi";

function Store(){
    const navigate = useNavigate();
    const {data} = useGetProductQuery();
    const productData = data?.data;
    return(
        <div>
            <div className="flex flex-col mb-10 justify-center items-center mt-10">
                <h1 className="text-xl md:text-3xl font-bold">Store</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {
                        productData?.map((product) => <a key={product._id} href={product.productLink} target="_blank"> <Card data={product} /> </a>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Store;

function Card({data}){
    return(
        <div className="cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300 ease-in-out">
            <div className="card bg-base-100 w-80 shadow-sm">
                <figure>
                    <img
                        src={data?.productImage || "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b"}
                        alt="Shoes"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.productName}
                    </h2>
                    <h2 className="card-title">
                        {data.productPrice}
                    </h2>
                </div>
            </div>
        </div>
    );
};