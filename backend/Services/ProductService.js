import ProductModel from "../Models/ProductModel.js";
import { uploadToS3, deleteObjectsByPrefix } from "../utils/s3.js";
import { v4 as uuidv4 } from "uuid";
import { resizeImage } from "../utils/sharp.js";
// 전체 상품 조회
const getAllProducts = async (category_id, limit, currentPage) => {
  const offset = limit * (currentPage - 1);

  const products = await ProductModel.getAllProducts(
    category_id,
    limit,
    offset
  );

  // 총 상품 개수
  let totalCount = 0;

  // 카테고리가 있을 경우 해당 카테고리의 상품 개수를 가져옴
  totalCount = await ProductModel.getTotalProducts(category_id);

  // // 이미지를 split하여 배열로 만들어줌
  products.forEach((product) => {
    product.images = product.images.split(",");
  });

  return { products, totalCount };
};

// 상품 상세 조회
const getProductById = async (productId) => {
  const product = await ProductModel.getProductById(productId);
  product.images = product.images.split(",");

  return product;
};

// 상품 추가
const createProduct = async (product, images) => {
  const result = await ProductModel.createProduct(product);
  const productId = result.insertId;

  const imageUrls = await Promise.all(
    images.map(async (image, idx) => {
      const fileName = `${productId}_${idx + 1}_${uuidv4()}`;
      const imageUrl = await uploadToS3(image, fileName);
      return { productId, imageUrl };
    })
  );

  await ProductModel.addProductImages(imageUrls);

  return productId;
};

// 상품 수정
const updateProduct = async (productId, product, images) => {
  // 기존 이미지를 S3에서 삭제
  await deleteObjectsByPrefix(productId);

  // 새로운 이미지를 업로드하고, 이미지 URL을 받아옴
  const imageUrls = await Promise.all(
    images.map(async (image, idx) => {
      const fileName = `${productId}_${idx + 1}_${uuidv4()}`;
      const imageUrl = await uploadToS3(image, fileName);
      return { productId, imageUrl };
    })
  );
  // 기존 이미지를 삭제하고, 새로운 이미지를 추가
  await ProductModel.deleteProductImages(productId);
  await ProductModel.addProductImages(imageUrls);

  return await ProductModel.updateProduct(productId, product);
};

// 상품 삭제
const deleteProduct = async (productId) => {
  // S3에서 이미지 삭제
  await deleteObjectsByPrefix(productId);
  // 상품 이미지 삭제
  await ProductModel.deleteProductImages(productId);

  return await ProductModel.deleteProduct(productId);
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
