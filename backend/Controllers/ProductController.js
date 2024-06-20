import productService from "../Services/ProductService.js";

const getProducts = async (req, res) => {
  const { category_id, limit, currentPage } = req.query;
  try {
    const { products, totalCount } = await productService.getAllProducts(
      category_id,
      limit,
      currentPage
    );

    if (!products) {
      return res.status(404).json({ message: "상품이 없습니다." });
    }

    const pagination = {
      currentPage: parseInt(currentPage),
      totalCount,
    };

    res.status(200).json({ products, pagination });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "상품 조회 실패", error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "상품이 없습니다." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "상품 조회 실패", error: error.message });
  }
};

// 상품 추가
const postProduct = async (req, res) => {
  try {
    const product = req.body;
    const images = req.files;

    await productService.createProduct(product, images);
    res.status(201).json({ message: "상품 등록 완료" });
  } catch (error) {
    res.status(500).json({ message: "상품 등록 실패", error: error.message });
  }
};

// 상품 수정
const putProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = req.body;
    const files = req.files;

    const result = await productService.updateProduct(
      productId,
      product,
      files
    );
    res.status(200).json({ message: "상품 수정 완료", result });
  } catch (error) {
    res.status(500).json({ message: "상품 수정 실패", error: error.message });
  }
};

// 상품 삭제
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);

    res.status(200).json({ message: "상품 삭제 완료" });
  } catch (error) {
    res.status(500).json({ message: "상품 삭제 실패", error: error.message });
  }
};

export { getProducts, getProduct, putProduct, postProduct, deleteProduct };
