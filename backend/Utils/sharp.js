import sharp from "sharp"

const width = 856
const height = 856

export const resizeImage = async (image) => {
  try {
    const resizedImage = await sharp(image.buffer)
      .resize(width, height, {
        fit: "inside", // 이미지의 가로, 세로 중 작은 값에 맞춰서 비율을 유지하면서 리사이징
        withoutEnlargement: true, // 이미지가 작아질 때만 리사이징
      })
      // webp로 변환하는 이유는 이미지 용량을 줄이기 위함
      .toFormat("webp", {
        quality: 100,
      })
      .toBuffer()

    return resizedImage
  } catch (error) {
    console.error(error)
    throw error
  }
}
