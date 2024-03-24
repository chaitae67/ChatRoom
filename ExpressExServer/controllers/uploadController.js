const asyncHandler = require('express-async-handler');
const axios = require('axios');
const FormData = require('form-data');
const uploadLayout = "../views/layouts/uploadLayout.ejs";


/**
 * 파일 업로드 페이지
 * GET /
 */
const uploadimage = asyncHandler(async (req, res) => {
  res.render("upload", { layout: uploadLayout });
});

/**
 * 파일 업로드 처리
 * POST /upload
 */

const postImage = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);

    const response = await axios.post('http://220.69.241.101:8000/analyze/', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log("Express 서버: FastAPI 서버로부터 응답 받음", response.data);
    res.json({message: "Express 서버: 결과를 성공적으로 받았습니다.", data: response.data});
  } catch (error) {
    console.error("Express 서버: 오류 발생", error);
    res.status(500).json({message: "서버 내부 오류가 발생했습니다.", error: error.message});
  }
};

module.exports = {
  uploadimage,
  postImage
};