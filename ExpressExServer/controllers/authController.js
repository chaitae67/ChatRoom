const mysqlConnection = require('../config/mysqlConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.login = (req, res) => {
  const { userId, userPassword } = req.body;

  // 사용자 정보 조회
  const query = `SELECT * FROM User WHERE personalID = ?`;
  mysqlConnection.query(query, [userId], (error, results, fields) => {
    if (error) {
      console.error("Error executing MySQL query: " + error.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      // 해당 사용자가 존재하지 않음
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const user = results[0];

    // 비밀번호 해시와 비교
    bcrypt.compare(userPassword, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords: " + err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (!result) {
        // 비밀번호 불일치
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // 로그인 성공: JWT 토큰 생성 및 반환
      const payload = { userId: user.personalID, nickname: user.nickname };
      const secretKey = process.env.JWT_SECRET;
      const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, secretKey, options);

      // 사용자 데이터를 함께 보냄
      const response = {
        userId: user.personalID,
        nickname: user.nickname,
        token: token // 토큰도 함께 전달
      };
      console.log("User logged in:", response);
      res.status(200).json({ response });
    });
  });
};

exports.signup = async (req, res) => {
  try {
      const { userId, password, nickname, name, birthdate, phoneNumber, gender } = req.body;

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // MySQL 쿼리 실행
      mysqlConnection.query('INSERT INTO User (personalID, password, name, nickname, phone, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?, ?)', 
          [userId, hashedPassword, name, nickname, phoneNumber, birthdate,  gender],
          (error, results, fields) => {
              if (error) {
                  console.error('회원가입 실패:', error);
                  return res.status(500).json({ message: '회원가입에 실패했습니다.' });
              }
              console.log('회원가입 성공:', results);
              return res.status(200).json({ message: '회원가입에 성공했습니다.' });
          }
      );
  } catch (error) {
      console.error('회원가입 실패:', error);
      return res.status(500).json({ message: '회원가입에 실패했습니다.' });
  }
};
