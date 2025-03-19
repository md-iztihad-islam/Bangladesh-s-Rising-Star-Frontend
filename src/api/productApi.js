import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PRODUCT_API = 'http://localhost:5011/api/v1/product';

export const productApi = createApi({
    reducerPath: "liveApi",
    baseQuery: fetchBaseQuery({
        baseUrl: PRODUCT_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => ({
                url: "/add",
                method: "POST",
                body: productData
            })
        }),
        getProduct: builder.query({
            query: () => ({
                url: "/allproduct",
                method: "GET"
            })
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET"
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}/delete`,
                method: "DELETE"
            })
        })
    })
});

export const { useCreateProductMutation, useGetProductQuery, useGetProductByIdQuery, useDeleteProductMutation } = productApi;