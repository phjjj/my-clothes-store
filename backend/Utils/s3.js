import AWS from "aws-sdk"
import { v4 as uuidv4 } from "uuid"
import dotenv from "dotenv"
dotenv.config()
import { resizeImage } from "./sharp.js"

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export const uploadToS3 = async (file, fileName) => {
  // 이미지 리사이징
  const resizedImage = await resizeImage(file)
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName, // 파일 이름
      Body: resizedImage, // 파일 데이터
      ContentType: file.mimetype,
    }

    const data = await s3.upload(params).promise()

    return data.Location
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 특정 접두사를 가진 객체를 삭제하는 함수
export const deleteObjectsByPrefix = async (prefix) => {
  try {
    const data = await s3
      .listObjectsV2({
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: prefix,
      })
      .promise()

    if (!data.Contents.length) {
      return
    }

    const objects = data.Contents.map((object) => ({ Key: object.Key }))

    await s3
      .deleteObjects({
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: { Objects: objects },
      })
      .promise()
  } catch (error) {
    console.error(error)
    throw error
  }
}
