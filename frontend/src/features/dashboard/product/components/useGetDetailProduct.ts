import { productService } from "@services/product";
import type { IProduct } from "@typeRules/product";
import { useEffect, useState } from "react";

export const useGetDetailProduct = (id?: number) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    if (id) {
      setLoading(true);
      productService
        .getById(id)
        .then((data) => {
          setProduct(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return {
    product, loading
  }
};
